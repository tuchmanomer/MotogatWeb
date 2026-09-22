import Link from 'next/link';
import { getSheetData } from '@/lib/sheets';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function CoursesPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const params = await searchParams;
    const searchQuery = params.search || '';

    const courses = await getSheetData('courses');

    const filteredCourses = (courses || []).filter((course: any) => {
        if (!course) return false;
        const title = course.title || '';
        const description = course.description || '';
        return (
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="container pageWrapper" style={{ paddingTop: '120px', paddingBottom: '80px', color: '#fff' }}>
            <h1 className="pageTitle" style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700 }}>
                קורסים והכשרות מקצועיות
            </h1>
            <p className="pageSubtitle" style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.1rem', marginTop: '10px', marginBottom: '40px' }}>
                מגוון הכשרות מעשיות בדיאגנוסטיקה, חשמל רכב ומערכות ניהול מנוע מתקדמות.
            </p>

            {/* שורת חיפוש */}
            <form method="GET" style={{ maxWidth: '600px', margin: '0 auto 50px auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    name="search"
                    defaultValue={searchQuery}
                    placeholder="חפש קורס לפי שם או מילת מפתח..."
                    style={{
                        width: '100%',
                        padding: '14px 20px 14px 50px',
                        background: 'rgba(30, 41, 59, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: '14px',
                        color: '#fff',
                        fontSize: '1rem',
                        outline: 'none',
                        backdropFilter: 'blur(8px)',
                        boxSizing: 'border-box'
                    }}
                />
                <button type="submit" style={{
                    position: 'absolute',
                    left: '12px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    color: '#94a3b8'
                }} aria-label="חפש">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>

            {filteredCourses.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px' }}>
                    לא נמצאו קורסים התואמים את החיפוש.
                </p>
            ) : (
                /* מרווח ענק ומאוזן של 40px בין כל הכרטיסים לכל הכיוונים */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '40px', alignItems: 'stretch' }}>
                    {filteredCourses.map((course: any, idx: number) => {
                        const courseId = (course.id !== undefined && course.id !== null && String(course.id).trim() !== '')
                            ? course.id
                            : (idx + 1);

                        return (
                            <div key={`course-${courseId}`} style={{
                                border: '1px solid rgba(255, 255, 255, 0.12)',
                                borderRadius: '18px',
                                padding: '26px',
                                background: '#1e293b',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
                                height: '100%',
                                boxSizing: 'border-box'
                            }}>
                                <div>
                                    {/* אזור תמונה אחיד */}
                                    <div style={{
                                        background: '#0f172a',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        marginBottom: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '180px',
                                        border: '1px solid rgba(255, 255, 255, 0.05)'
                                    }}>
                                        {course.image ? (
                                            <img
                                                src={course.image}
                                                alt={course.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>אין תמונה זמינה</div>
                                        )}
                                    </div>

                                    <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', color: '#fff', fontWeight: 'bold', minHeight: '3.5rem', display: 'flex', alignItems: 'center' }}>
                                        {course.title}
                                    </h3>

                                    <p style={{
                                        color: '#94a3b8',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.5',
                                        marginBottom: '20px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {course.description}
                                    </p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '18px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                                    <Link
                                        href={`/courses/${courseId}`}
                                        style={{
                                            color: '#38bdf8',
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        לפרטים נוספים ←
                                    </Link>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#38bdf8' }}>
                                        {course.price ? `₪${course.price}` : ''}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div style={{ marginTop: '60px', textAlign: 'center' }}>
                <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500 }}>
                    → חזרה לעמוד הבית
                </Link>
            </div>
        </div>
    );
}