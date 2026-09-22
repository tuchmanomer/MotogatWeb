import Link from 'next/link';
import { getShopProducts } from '@/lib/shopSheets';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function DemonstrationPage({
    searchParams,
}: {
    searchParams: Promise<{ search?: string }>;
}) {
    const params = await searchParams;
    const searchQuery = params.search || '';

    // שליפת הנתונים מהשיטס עבור אמצעי המחשה
    const products = await getShopProducts('demonstration');
    const safeProducts = Array.isArray(products) ? products : [];

    // סינון הדגמים לפי שורת החיפוש בצורה בטוחה
    const filteredProducts = safeProducts.filter((product: any) => {
        if (!product) return false;
        const title = product.title || '';
        const description = product.description || '';
        return (
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="container pageWrapper" style={{ paddingTop: '120px', paddingBottom: '80px', color: '#fff', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
            <h1 className="pageTitle" style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '20px' }}>
                אמצעי המחשה
            </h1>
            <p className="pageSubtitle" style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.1rem', marginTop: '10px', marginBottom: '30px' }}>
                מגוון אמצעי המחשה מתקדמים ללמידה מעשית ודיאגנוסטיקה ברכב.
            </p>

            {/* כפתורי ניווט בין קטגוריות החנות */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <Link href="/shop/diagnostic" className="btnSecondary">מוצרי אבחון</Link>
                <Link href="/shop/demonstration" className="btnPrimary">אמצעי המחשה</Link>
                <Link href="/shop/books" className="btnSecondary">ספרי לימוד</Link>
            </div>

            {/* שורת חיפוש מעוצבת בדיוק כמו בקורסים */}
            <form method="GET" style={{ maxWidth: '600px', margin: '0 auto 40px auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    name="search"
                    defaultValue={searchQuery}
                    placeholder="חפש דגם לפי שם או מילת מפתח..."
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
                    color: '#94a3b8',
                    transition: 'color 0.2s'
                }} aria-label="חפש">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>

            {/* רשת הדגמים */}
            {filteredProducts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px' }}>
                    לא נמצאו דגמים התואמים את החיפוש.
                </p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
                    {filteredProducts.map((product: any, idx: number) => {
                        // חילוץ המשפט הראשון בלבד עבור התצוגה המקדימה בכרטיס
                        const firstLine = product.description ? product.description.split(/[\r\n.]+/)[0].trim() : '';

                        return (
                            <Link
                                key={`product-${product.id || 'item'}-${idx}`}
                                href={`/shop/demonstration/${product.id}`}
                                style={{
                                    background: '#1e293b', // רקע כהה תואם לעיצוב הספרים
                                    border: '1px solid rgba(255, 255, 255, 0.12)',
                                    borderRadius: '18px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                                    textDecoration: 'none',
                                    height: '100%',
                                    boxSizing: 'border-box',
                                    transition: 'transform 0.2s ease, border-color 0.2s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                <div>
                                    {/* אזור תמונה מלאה */}
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
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                                אין תמונה
                                            </div>
                                        )}
                                    </div>

                                    <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', color: '#fff', fontWeight: 'bold', minHeight: '3.5rem', display: 'flex', alignItems: 'center' }}>
                                        {product.title}
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
                                        {firstLine ? `${firstLine}...` : ''}
                                    </p>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                                    <span style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: 600 }}>
                                        לפרטים נוספים ←
                                    </span>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#38bdf8', direction: 'ltr' }}>
                                        {product.price}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <Link href="/" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 500 }}>
                    → חזרה לעמוד הבית
                </Link>
            </div>
        </div>
    );
}