import Link from 'next/link';

interface CourseProps {
    course: {
        id: string;
        title: string;
        description: string;
        duration: string;
        price: string;
        image: string;
        badge?: string;
        prerequisites?: string;
    };
    basePath?: string;
}

export default function CourseCard({ course, basePath = '/shop/diagnostic' }: CourseProps) {
    const firstLine = course.description ? course.description.split(/[\r\n.]+/)[0].trim() : '';

    // הנתיב המלא לעמוד הייחודי של המוצר
    const detailHref = `${basePath}/${course.id}`;

    const cardContent = (
        <div
            style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                background: 'rgba(30, 41, 59, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                boxSizing: 'border-box',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
        >
            <div>
                {/* קונטיינר תמונה לבן וממורכז */}
                <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#ffffff',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '15px',
                    overflow: 'hidden',
                    padding: '10px',
                    boxSizing: 'border-box'
                }}>
                    {course.image ? (
                        <img
                            src={course.image}
                            alt={course.title}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    ) : (
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>אין תמונה</span>
                    )}
                </div>

                {/* תגית */}
                {course.badge && (
                    <span style={{ fontSize: '0.8rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 10px', borderRadius: '12px', fontWeight: 600, display: 'inline-block', marginBottom: '10px' }}>
                        {course.badge}
                    </span>
                )}

                {/* כותרת */}
                <h3 style={{ margin: '0 0 10px', fontSize: '1.3rem', color: '#fff', fontWeight: 600 }}>
                    {course.title || 'ללא שם'}
                </h3>

                {/* תיאור קצר */}
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
                    {firstLine ? `${firstLine}...` : ''}
                </p>
            </div>

            {/* חלק תחתון: מחיר וכפתור מעבר */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#38bdf8' }}>
                        {course.price ? `₪${course.price}` : ''}
                    </span>
                    <span style={{ color: '#60a5fa', fontSize: '0.9rem', fontWeight: 600 }}>
                        לפרטים נוספים ←
                    </span>
                </div>
            </div>
        </div>
    );

    // עטיפת הקישור שמובילה לעמוד הייחודי של המוצר
    return (
        <Link
            href={detailHref}
            style={{ textDecoration: 'none', display: 'block', height: '100%' }}
        >
            {cardContent}
        </Link>
    );
}