'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getShopProducts } from '@/lib/shopSheets';

export default function BooksPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getShopProducts('books');
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching books:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="container" style={{ padding: '120px 20px 80px', maxWidth: '1200px', margin: '0 auto', color: '#1e293b' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', color: '#0f172a' }}>ספרי לימוד</h1>
            <p style={{ textAlign: 'center', color: '#475569', fontSize: '1.1rem', marginBottom: '40px' }}>
                עיין במבחר ספרי הלימוד המקצועיים שלנו.
            </p>

            {/* כפתורי ניווט בין קטגוריות החנות */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                <Link href="/shop/diagnostic" className="btnSecondary">מוצרי אבחון</Link>
                <Link href="/shop/demonstration" className="btnSecondary">אמצעי המחשה</Link>
                <Link href="/shop/books" className="btnPrimary">ספרי לימוד</Link>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>טוען ספרי לימוד...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
                    {products.map((product: any, idx: number) => (
                        <ProductCard key={product.id || idx} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}

// קומפוננטת כרטיס מוצר מעוצבת עם מסגרת תמונה לבנה ושליפת תמונה גמישה מהשיטס
function ProductCard({ product }: { product: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // בדיקה גמישה למספר שמות אפשריים של שדה התמונה ב-Google Sheets (כדי שזה תמיד יעבוד)
    const productImage = product.image || product.img || product.imageUrl || product.picture;

    const handleAddToCart = () => {
        try {
            const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const index = existingCart.findIndex((item: any) => String(item.id) === String(product.id));

            if (index > -1) {
                existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
            } else {
                existingCart.push({ ...product, image: productImage, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(existingCart));
            window.dispatchEvent(new Event('cartUpdated'));
            router.push('/cart');
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    return (
        <div style={{
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
                {/* אזור ייעודי לתמונה עם מסגרת לבנה נקייה */}
                <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '15px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '200px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                    {productImage ? (
                        <img src={productImage} alt={product.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    ) : (
                        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>אין תמונה זמינה</div>
                    )}
                </div>

                <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem', color: '#fff', fontWeight: 'bold', minHeight: '3.5rem', display: 'flex', alignItems: 'center' }}>
                    {product.title}
                </h3>

                <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '8px' }}>
                    {isOpen ? (
                        <p style={{ margin: 0 }}>{product.description}</p>
                    ) : (
                        <p style={{
                            margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {product.description}
                        </p>
                    )}
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#38bdf8',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        padding: 0,
                        textAlign: 'right',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    {isOpen ? 'הצג פחות ▲' : 'פרטים נוספים... ▼'}
                </button>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '12px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#38bdf8', direction: 'ltr' }}>₪{product.price}</span>
                    <button
                        onClick={handleAddToCart}
                        style={{
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            border: 'none',
                            padding: '10px 18px',
                            borderRadius: '10px',
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                        }}
                    >
                        הוספה לעגלה 🛒
                    </button>
                </div>

                <Link
                    href={`/contact?subject=${encodeURIComponent(`התעניינות במוצר: ${product.title}`)}`}
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