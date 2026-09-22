import Link from 'next/link';
import { getShopProducts } from '@/lib/shopSheets';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const products = await getShopProducts('demonstration');
    const safeProducts = Array.isArray(products) ? products : [];

    // איתור הדגם הספציפי לפי ה-ID מתוך ה-URL
    const product = safeProducts.find((p: any) => String(p.id) === String(id));

    if (!product) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px', color: '#fff' }}>
                <h2>הדגם המבוקש לא נמצא</h2>
                <Link href="/shop/demonstration" style={{ color: '#38bdf8', marginTop: '20px', display: 'inline-block', textDecoration: 'none' }}>
                    ← חזרה לאמצעי ההמחשה
                </Link>
            </div>
        );
    }

    // יצירת קישור ישיר לווצאפ עם הודעה מוכנה
    const whatsappMessage = encodeURIComponent(`שלום, אני מעוניין לקבל פרטים נוספים על אמצעי ההמחשה: ${product.title}`);
    const whatsappUrl = `https://wa.me/972500000000?text=${whatsappMessage}`; // יש לעדכן את מספר הטלפון במידת הצורך

    return (
        <div className="container" style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', color: '#fff' }}>
            <Link href="/shop/demonstration" style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-block', marginBottom: '25px', fontSize: '0.95rem' }}>
                ← חזרה לכל אמצעי ההמחשה
            </Link>

            <div style={{
                background: '#1e293b',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '20px',
                padding: '40px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '40px',
                alignItems: 'start',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
                {/* אזור תמונה מלאה */}
                <div style={{
                    background: '#0f172a',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '350px',
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
                        <div style={{ color: '#64748b', fontSize: '1rem' }}>
                            אין תמונה לדגם זה
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div>
                        <h1 style={{ fontSize: '2.2rem', marginBottom: '15px', color: '#fff', fontWeight: 700 }}>
                            {product.title}
                        </h1>

                        {/* טקסט בהיר וברור לקריאה */}
                        <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '30px', whiteSpace: 'pre-line' }}>
                            {product.description}
                        </p>
                    </div>

                    <div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#38bdf8', marginBottom: '20px', direction: 'ltr', textAlign: 'right' }}>
                            {product.price ? `₪${product.price}` : ''}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <Link
                                href={`/contact?subject=${encodeURIComponent(`התעניינות במוצר אמצעי המחשה: ${product.title}`)}`}
                                style={{
                                    display: 'block',
                                    textAlign: 'center',
                                    background: '#2563eb',
                                    color: '#fff',
                                    padding: '14px 20px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    transition: 'background 0.2s'
                                }}
                            >
                                השארת פרטים והתעניינות
                            </Link>

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    textAlign: 'center',
                                    background: '#22c55e',
                                    color: '#fff',
                                    padding: '14px 20px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '1.1rem',
                                    transition: 'background 0.2s'
                                }}
                            >
                                לפרטים נוספים
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}