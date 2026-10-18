'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getShopProducts } from '@/lib/shopSheets';
import AddToCartButton from '@/components/AddToCartButton';

export default function WorkingToolsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchProducts() {
            try {
                // שליפת נתונים מגיליון 'working tools'
                const data = await getShopProducts('working tools');
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching working tools products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // סינון המוצרים לפי שורת החיפוש בצורה בטוחה
    const filteredProducts = products.filter((product: any) => {
        if (!product) return false;
        const title = product.title || '';
        const description = product.description || '';
        return (
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="container" style={{ padding: '120px 20px 80px', maxWidth: '1200px', margin: '0 auto', color: '#1e293b' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', color: '#0f172a' }}>כלי עבודה</h1>
            <p className="pageSubtitle" style={{ textAlign: 'center', color: '#64748b', fontSize: '1.1rem', marginTop: '10px', marginBottom: '40px' }}>
                כלי עבודה מקצועיים, ציוד סדנא ופתרונות מתקדמים למוסכים ולעולם הרכב.
            </p>

            {/* ניווט בין קטגוריות החנות */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <Link href="/shop/diagnostic" className="btnSecondary">מוצרי אבחון</Link>
                <Link href="/shop/demonstration" className="btnSecondary">אמצעי המחשה</Link>
                <Link href="/shop/books" className="btnSecondary">ספרי לימוד</Link>
                <Link href="/shop/working-tools" className="btnPrimary">כלי עבודה</Link>
            </div>

            {/* שורת חיפוש מעוצבת */}
            <div style={{ maxWidth: '600px', margin: '0 auto 40px auto', position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="חפש כלי עבודה לפי שם או מילת מפתח..."
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
                <span style={{
                    position: 'absolute',
                    left: '12px',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    color: '#94a3b8',
                    pointerEvents: 'none'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>טוען כלי עבודה...</div>
            ) : filteredProducts.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '40px' }}>
                    לא נמצאו מוצרים התואמים את החיפוש.
                </p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
                    {filteredProducts.map((product: any, idx: number) => (
                        <ProductCard key={product.id || idx} product={product} />
                    ))}
                </div>
            )}

            <div style={{ marginTop: '50px', textAlign: 'center' }}>
                <Link href="/" style={{ color: '#1d4ed8', textDecoration: 'none', fontWeight: 500 }}>
                    ← חזרה לעמוד הבית
                </Link>
            </div>
        </div>
    );
}

// קומפוננטת כרטיס מוצר עם תיאור מקוצר (3 שורות)
function ProductCard({ product }: { product: any }) {
    return (
        <div className="shop-card" style={{
            background: '#1e293b',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '18px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            height: '100%',
            boxSizing: 'border-box'
        }}>
            <div>
                {/* אזור תמונה בריבוע לבן */}
                <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '15px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    {product.image ? (
                        <img src={product.image} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>אין תמונה זמינה</div>
                    )}
                </div>

                <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', color: '#fff', fontWeight: 'bold', minHeight: '3.5rem', display: 'flex', alignItems: 'center' }}>
                    {product.title}
                </h3>

                {/* תיאור מוצר מוגבל ל-3 שורות נקיות */}
                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px', minHeight: '4.5rem' }}>
                    <p style={{
                        margin: 0,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'pre-line'
                    }}>
                        {product.description || 'אין תפוסה או תיאור זמין למוצר זה כרגע.'}
                    </p>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '12px' }}>
                    <div style={{ textAlign: 'right', width: '100%' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#38bdf8', direction: 'ltr', display: 'inline-block' }}>₪{product.price}</span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginTop: '2px' }}>לא כולל מע&quot;מ</span>
                        {product.inStock === false && (
                            <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700, display: 'block', marginTop: '4px', textAlign: 'right' }}>לא זמין במלאי *</span>
                        )}
                    </div>

                    {/* הכפתור מופיע לכל מוצר עם מחיר - העגלה לא צריכה את קישור ה-buy */}
                    {Number(String(product.price).replace(/[^0-9.]+/g, '')) > 0 ? (
                        // הוספה לעגלה במקום מעבר ישיר לדף התשלום - באותו עיצוב של כפתור הרכישה
                        <AddToCartButton
                            product={{
                                id: `workingTools-${product.id}`,
                                inStock: product.inStock !== false,
                                title: product.title || '',
                                price: String(product.price ?? ''),
                                image: product.image || '',
                            }}
                            label="רכישה 🛒"
                            style={{
                                display: 'inline-block',
                                background: '#2563eb',
                                color: '#ffffff',
                                border: 'none',
                                padding: '10px 18px',
                                borderRadius: '10px',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                transition: 'background-color 0.2s ease',
                                whiteSpace: 'nowrap',
                                marginRight: '15px'
                            }}
                        />
                    ) : (
                        <span style={{ color: '#94a3b8', fontSize: '0.9rem', whiteSpace: 'nowrap', marginRight: '15px' }}>לא זמין לרכישה</span>
                    )}
                </div>

                {/* כפתור השארת פרטים והתעניינות */}
                <Link
                    className="ghost-btn"
                    href={`/contact?subject=${encodeURIComponent(`התעניינות בכלי עבודה: ${product.title}`)}`}
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        background: 'transparent',
                        color: '#38bdf8',
                        border: '1px solid rgba(56, 189, 248, 0.3)',
                        padding: '10px',
                        borderRadius: '10px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                    }}
                >
                    השארת פרטים והתעניינות
                </Link>
            </div>
        </div>
    );
}