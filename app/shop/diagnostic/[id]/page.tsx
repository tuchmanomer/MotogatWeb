import Link from 'next/link';
import { getShopProducts } from '@/lib/shopSheets';
import AddToCartButton from '@/components/AddToCartButton';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    // שליפת כל המוצרים מה־Google Sheet
    const products = await getShopProducts('diagnostic');
    const safeProducts = Array.isArray(products) ? products : [];

    // חיפוש המוצר הספציפי לפי ה־id בכתובת
    const product = safeProducts.find((p: any) => String(p.id) === String(id));

    if (!product) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px', color: '#fff', direction: 'rtl' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>המוצר המבוקש לא נמצא</h2>
                <Link href="/shop/diagnostic" style={{ color: '#38bdf8', fontSize: '1.1rem', textDecoration: 'none' }}>
                    ← חזרה לחנות
                </Link>
            </div>
        );
    }

    // איתור התיאור מתוך שדות אפשריים שונים בגיליון
    const productDescription = product.description || product.desc || product.details || product.summary;

    return (
        <div style={{ padding: '60px 20px', maxWidth: '1000px', margin: '0 auto', color: '#fff', direction: 'rtl' }}>
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    padding: '40px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '40px',
                    textAlign: 'right',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                }}
            >
                {/* תמונת המוצר מימין */}
                <div style={{ flex: '1', minWidth: '280px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', maxWidth: '400px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                            />
                        ) : (
                            <div style={{ color: '#000', height: '250px', display: 'flex', alignItems: 'center' }}>אין תמונה זמינה</div>
                        )}
                    </div>
                </div>

                {/* פרטי המוצר, תיאור, מחיר וכפתורים משמאל */}
                <div style={{ flex: '1', minWidth: '280px' }}>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '15px', lineHeight: '1.2' }}>
                        {product.title}
                    </h1>

                    {/* תיאור המוצר מתוך הגיליון (אם קיים באחד מהשדות) */}
                    {productDescription && (
                        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '20px', whiteSpace: 'pre-line' }}>
                            {productDescription}
                        </p>
                    )}

                    {/* מחיר אמיתי מהגיליון עם סימן שקל מימין */}
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38bdf8', marginBottom: '30px', direction: 'ltr', textAlign: 'right' }}>
                        {product.price} ₪
                    </div>

                    {/* אזור הכפתורים */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {/* כפתור הוספה לעגלה */}
                        <AddToCartButton product={product} />

                        {/* כפתור השארת פרטים / התעניינות במוצר */}
                        <Link
                            href={`/contact?subject=${encodeURIComponent(`התעניינות במוצר: ${product.title}`)}`}
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                background: 'transparent',
                                color: '#38bdf8',
                                border: '1px solid #38bdf8',
                                padding: '12px 20px',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontSize: '1rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            השארת פרטים והתעניינות במוצר
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}