import Link from 'next/link';
import { getSheetData } from '@/lib/sheets';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const courses = await getSheetData('courses');

    const targetId = decodeURIComponent(id).trim();

    // חיפוש מדויק שמתאים את ה-ID מעמודה A או את האינדקס הסידורי בטבלה
    const course = (courses || []).find((c: any, idx: number) => {
        if (!c) return false;

        const courseIdField = c.id !== undefined && c.id !== null ? String(c.id).trim() : '';
        const sequentialId = String(idx + 1);
        const zeroIndexId = String(idx);

        return courseIdField === targetId || sequentialId === targetId || zeroIndexId === targetId;
    });

    if (!course) {
        return (
            <div style={{ padding: '150px 20px', textAlign: 'center', color: '#fff' }}>
                <h2>הקורס אינו נמצא</h2>
                <Link href="/courses" style={{ color: '#38bdf8', display: 'inline-block', marginTop: '20px' }}>
                    ← חזרה לרשימת הקורסים
                </Link>
            </div>
        );
    }

    // פיצול תנאי הקדם לפי פסיקים לרשימה נקייה
    const prerequisitesList = course.prerequisites
        ? String(course.prerequisites).split(',').map((item: string) => item.trim()).filter(Boolean)
        : [];

    // בדיקה במספר שמות אפשריים בגיליון עבור התעודות (badge, certification, certificate או כל וריאציה)
    const rawBadge = course.badge || course.certification || course.certificate || course['תעודה'] || course['הסמכה'] || '';
    const badgeStr = String(rawBadge).trim();

    const certificationsList = badgeStr
        ? badgeStr.includes(',')
            ? badgeStr.split(',').map((item: string) => item.trim()).filter(Boolean)
            : [badgeStr]
        : [];

    // קישור לוואטסאפ (החלף את מספר הטלפון במספר האמיתי שלך, לדוגמה: 972501234567)
    const whatsappNumber = "972500000000"; // <-- נא לעדכן את המספר שלך כאן
    const whatsappMessage = encodeURIComponent(`היי, אני מעוניין לקבל פרטים נוספים על הקורס: ${course.title}`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return (
        <div style={{ padding: '120px 20px 80px', maxWidth: '900px', margin: '0 auto', color: '#fff' }}>
            <Link href="/courses" style={{ color: '#38bdf8', textDecoration: 'none', fontSize: '0.95rem', display: 'inline-block', marginBottom: '20px' }}>
                ← חזרה לקורסים
            </Link>

            <div style={{ background: '#1e293b', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)' }}>
                {course.image && (
                    <div style={{ background: '#0f172a', borderRadius: '12px', padding: '20px', marginBottom: '30px', textAlign: 'center', maxHeight: '350px' }}>
                        <img src={course.image} alt={course.title} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }} />
                    </div>
                )}

                <h1 style={{ fontSize: '2.2rem', marginBottom: '15px', fontWeight: 'bold' }}>{course.title}</h1>

                {/* משך הקורס */}
                {course.duration && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '1.05rem', color: '#94a3b8' }}>
                        <span>⏱️</span>
                        <span>משך הקורס: <strong style={{ color: '#fff' }}>{course.duration}</strong></span>
                    </div>
                )}

                {/* מחיר */}
                <div style={{ fontSize: '1.4rem', color: '#38bdf8', fontWeight: 'bold', marginBottom: '30px' }}>
                    {course.price ? `₪${course.price}` : ''}
                </div>

                {/* תיאור הקורס */}
                <div style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#cbd5e1', marginBottom: '35px', whiteSpace: 'pre-line' }}>
                    {course.description || 'אין תיאור זמין עבור קורס זה כרגע.'}
                </div>

                {/* תנאי קבלה */}
                {prerequisitesList.length > 0 && (
                    <div style={{ background: '#0f172a', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', padding: '20px', marginBottom: '25px' }}>
                        <h3 style={{ fontSize: '1.2rem', color: '#38bdf8', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>📋</span> תנאי קבלה
                        </h3>
                        <ul style={{ margin: 0, paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#cbd5e1' }}>
                            {prerequisitesList.map((req, index) => (
                                <li key={index} style={{ lineHeight: '1.5' }}>{req}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* תעודות והסמכות */}
                {certificationsList.length > 0 ? (
                    <div style={{ background: '#0f172a', border: '1px solid rgba(52, 211, 153, 0.2)', borderRadius: '12px', padding: '20px', marginBottom: '35px' }}>
                        <h3 style={{ fontSize: '1.2rem', color: '#34d399', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>🎓</span> תעודות והסמכות בסיום
                        </h3>
                        <ul style={{ margin: 0, paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#cbd5e1' }}>
                            {certificationsList.map((cert, index) => (
                                <li key={index} style={{ lineHeight: '1.5' }}>{cert}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div style={{ background: '#0f172a', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '12px', padding: '15px', marginBottom: '35px', fontSize: '0.85rem', color: '#64748b' }}>
                        ℹ️ לא נמצאו נתונים בשדה badge עבור קורס זה. (מפתחות זמינים בגיליון: {Object.keys(course).join(', ')})
                    </div>
                )}

                {/* כפתורי פעולה */}
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <Link
                        href={`/contact?subject=${encodeURIComponent(`התעניינות בקורס: ${course.title}`)}`}
                        style={{
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            padding: '14px 28px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        הירשם עכשיו / השאר פרטים
                    </Link>

                    <a
                        href="https://wa.me/972548933777"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: '#22c55e',
                            color: '#ffffff',
                            padding: '14px 28px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'inline-block',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        לפרטים נוספים
                    </a>
                </div>
            </div>
        </div>
    );
}