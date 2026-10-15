'use client';

import { useEffect, useState } from 'react';

type Teacher = {
    name: string;
    role: string;
    description: string;
    image: string;
    group?: 'management' | 'teachers';
};

type TeachersPanelProps = {
    // אילו אנשי צוות להציג: הנהלה או מורים (לפי השיוך בגיליון)
    group?: 'management' | 'teachers';
    title?: string;
    subtitle?: string;
    // עוגן לקפיצה מכפתורים בעמוד (למשל #staff-section)
    id?: string;
};

// זמן החלפה בין קבוצות הכרטיסיות (במילישניות)
const ROTATE_MS = 12000;

// כמה כרטיסיות מוצגות לפי רוחב המסך
function getPerView() {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
}

export default function TeachersPanel({
    group = 'teachers',
    title = 'צוות המורים שלנו',
    subtitle = 'אנשי מקצוע עם ניסיון מעשי בעולם הרכב',
    id,
}: TeachersPanelProps) {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [perView, setPerView] = useState(3);
    const [page, setPage] = useState(0);
    const [paused, setPaused] = useState(false);
    // עצירה ידנית בכפתור (נגישות: אפשרות לעצור תוכן שזז לבד)
    const [stopped, setStopped] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [failedImages, setFailedImages] = useState<string[]>([]);

    // שליפת המורים מהגיליון (לשונית STUFF)
    useEffect(() => {
        fetch('/api/teachers')
            .then((res) => res.json())
            .then((data) => {
                const all: Teacher[] = Array.isArray(data.teachers) ? data.teachers : [];
                setTeachers(all.filter((t) => (t.group || 'teachers') === group));
            })
            .catch(() => setTeachers([]));
    }, [group]);

    // התאמה לגודל המסך + כיבוד הגדרת "הפחתת תנועה"
    useEffect(() => {
        const update = () => setPerView(getPerView());
        update();
        window.addEventListener('resize', update);

        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(motion.matches);

        return () => window.removeEventListener('resize', update);
    }, []);

    const pageCount = Math.max(1, Math.ceil(teachers.length / perView));
    const canRotate = teachers.length > perView;

    // החזרה לקבוצה הראשונה אם מספר הקבוצות השתנה (למשל אחרי שינוי גודל מסך)
    useEffect(() => {
        if (page >= pageCount) setPage(0);
    }, [page, pageCount]);

    // החלפה אוטומטית
    useEffect(() => {
        if (!canRotate || paused || stopped || reducedMotion) return;
        const timer = setInterval(() => setPage((p) => (p + 1) % pageCount), ROTATE_MS);
        return () => clearInterval(timer);
    }, [canRotate, paused, stopped, reducedMotion, pageCount]);

    const autoPlaying = canRotate && !stopped && !reducedMotion;

    // כרטיסי ההנהלה רחבים יותר ועם מקום ליותר שורות תיאור
    const isManagement = group === 'management';
    const cardWidth = isManagement ? 540 : 384;
    const descriptionLines = isManagement ? 18 : 8;

    if (teachers.length === 0) return null;

    // הקבוצה הנוכחית - אם חסרים מורים בקבוצה האחרונה, משלימים מתחילת הרשימה
    const visible = canRotate
        ? Array.from({ length: perView }, (_, i) => teachers[(page * perView + i) % teachers.length])
        : teachers;

    return (
        <section
            id={id}
            aria-label={title}
            style={{ padding: '70px 20px', maxWidth: '1200px', margin: '0 auto', direction: 'rtl', scrollMarginTop: '110px' }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <style>{`
                @keyframes teachersFadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                /* backwards (ולא both) - כדי שאחרי הכניסה אפקט ה-hover יעבוד */
                .teachers-grid > div {
                    animation: teachersFadeIn 0.6s ease backwards;
                }
                .teacher-card {
                    position: relative;
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 24px;
                    padding: 0 24px 30px;
                    text-align: center;
                    overflow: hidden;
                    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.10);
                    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
                }
                .teacher-card:hover {
                    transform: translateY(-6px);
                    border-color: #bfdbfe;
                    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 20px 40px -12px rgba(37, 99, 235, 0.25);
                }
                .teacher-card-band {
                    height: 90px;
                    margin: 0 -24px;
                    background: linear-gradient(135deg, #dbeafe 0%, #e0f2fe 50%, #f0f9ff 100%);
                }
                .teacher-photo {
                    width: 128px;
                    height: 128px;
                    border-radius: 50%;
                    object-fit: cover;
                    display: block;
                    margin: -64px auto 18px;
                    background: #f1f5f9;
                    border: 5px solid #ffffff;
                    box-shadow: 0 0 0 2px #93c5fd, 0 10px 24px -6px rgba(37, 99, 235, 0.35);
                    position: relative;
                }
                /* כרטיסי ההנהלה: אותו עיצוב, בגרסה קומפקטית יותר לגובה */
                .teacher-card--compact {
                    padding: 0 22px 22px;
                }
                .teacher-card--compact .teacher-card-band {
                    height: 64px;
                    margin: 0 -22px;
                }
                .teacher-card--compact .teacher-photo {
                    width: 104px;
                    height: 104px;
                    margin: -52px auto 12px;
                    border-width: 4px;
                }
                .teacher-card--compact h3 {
                    font-size: 1.3rem !important;
                    margin-bottom: 8px !important;
                }
                .teacher-card--compact h3 + div {
                    margin-bottom: 12px !important;
                }
                .teacher-card--compact p {
                    font-size: 0.88rem !important;
                    line-height: 1.55 !important;
                }
                @media (prefers-reduced-motion: reduce) {
                    .teachers-grid > div { animation: none; }
                    .teacher-card, .teacher-card:hover { transition: none; transform: none; }
                }
            `}</style>

            <h2 style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>
                {title}
            </h2>
            {subtitle && (
                <p style={{ textAlign: 'center', color: '#475569', fontSize: '1.1rem', margin: '0 0 40px' }}>
                    {subtitle}
                </p>
            )}

            <div
                key={`${page}-${perView}`}
                className="teachers-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${Math.min(perView, visible.length)}, minmax(0, 1fr))`,
                    gap: '24px',
                    // מעט כרטיסיות (למשל 2 מנהלים) - לא נמתחות לכל הרוחב אלא נשארות ממורכזות
                    maxWidth: `${Math.min(perView, visible.length) * cardWidth}px`,
                    margin: '0 auto'
                }}
            >
                {visible.map((teacher, i) => (
                    <div
                        key={`${teacher.name}-${i}`}
                        className={isManagement ? 'teacher-card teacher-card--compact' : 'teacher-card'}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        {/* פס צבע עדין בראש הכרטיסייה - התמונה "יושבת" עליו */}
                        <div className="teacher-card-band" />

                        {/* תמונה שלא נטענה (למשל קובץ Drive שלא שותף) מוחלפת באות הראשונה של השם */}
                        {teacher.image && !failedImages.includes(teacher.image) ? (
                            <img
                                src={teacher.image}
                                alt={teacher.name}
                                className="teacher-photo"
                                onError={() => setFailedImages((prev) => [...prev, teacher.image])}
                            />
                        ) : (
                            <div
                                className="teacher-photo"
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', fontSize: '2.6rem', fontWeight: 700 }}
                            >
                                {teacher.name.charAt(0)}
                            </div>
                        )}

                        <h3 style={{ margin: '0 0 10px', fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
                            {teacher.name}
                        </h3>
                        {teacher.role && (
                            <div style={{ display: 'inline-block', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #dbeafe', borderRadius: '999px', padding: '5px 14px', fontWeight: 600, fontSize: '0.9rem', marginBottom: '16px' }}>
                                {teacher.role}
                            </div>
                        )}
                        {teacher.description && (
                            // מורים: עד 8 שורות, הנהלה: עד 18 - טקסט ארוך יותר נחתך עם "..." כדי שהכרטיסיות יישארו באותו גובה
                            <p
                                title={teacher.description}
                                style={{
                                    color: '#64748b',
                                    fontSize: '0.92rem',
                                    lineHeight: 1.65,
                                    margin: 0,
                                    whiteSpace: 'pre-line',
                                    display: '-webkit-box',
                                    WebkitLineClamp: descriptionLines,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden'
                                }}
                            >
                                {teacher.description}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* נקודות ניווט בין הקבוצות */}
            {canRotate && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '28px' }}>
                    {/* כפתור עצירה/הפעלה של ההחלפה האוטומטית */}
                    {!reducedMotion && (
                        <button
                            type="button"
                            onClick={() => setStopped((s) => !s)}
                            aria-label={autoPlaying ? 'עצירת החלפה אוטומטית של המורים' : 'הפעלת החלפה אוטומטית של המורים'}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1px solid #cbd5e1',
                                background: '#ffffff',
                                color: '#1d4ed8',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: '6px'
                            }}
                        >
                            {autoPlaying ? '❚❚' : '▶'}
                        </button>
                    )}
                    {Array.from({ length: pageCount }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setPage(i)}
                            aria-label={`קבוצת מורים ${i + 1} מתוך ${pageCount}`}
                            aria-current={i === page}
                            style={{
                                width: i === page ? '28px' : '10px',
                                height: '10px',
                                borderRadius: '999px',
                                border: 'none',
                                padding: 0,
                                cursor: 'pointer',
                                background: i === page ? '#2563eb' : '#cbd5e1',
                                transition: 'width 0.3s, background 0.3s'
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
