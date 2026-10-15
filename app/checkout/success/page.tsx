import Link from 'next/link';
import { getSumitPayment } from '@/lib/sumit';
import ClearCart from '@/components/ClearCart';
import { sendToOrdersSheet } from '@/lib/ordersSheet';

export const dynamic = 'force-dynamic';

export default async function CheckoutSuccessPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>;
}) {
    const params = await searchParams;
    const paymentId = Number(params['OG-PaymentID']);

    // אימות מול SUMIT שהתשלום באמת בוצע - לא סומכים על הכתובת בלבד
    let payment: any = null;
    if (paymentId) {
        try {
            payment = await getSumitPayment(paymentId);
        } catch (error) {
            console.error('Error verifying SUMIT payment:', error);
        }
    }

    const isValid = Boolean(payment?.ValidPayment);

    // עדכון ההזמנה בגיליון ל"שולם" - רק אחרי אימות מול SUMIT.
    // הגיליון מונע כפילויות אם הלקוח מרענן את הדף.
    if (isValid) {
        await sendToOrdersSheet({
            action: 'paid',
            payment: {
                orderId: params['OG-ExternalIdentifier'] || payment.ExternalIdentifier || '',
                paymentId: payment.ID,
                amount: payment.Amount,
                customerName: payment.CustomerID ? `לקוח SUMIT ${payment.CustomerID}` : '',
            },
        });
    }

    return (
        <div style={{ textAlign: 'center', padding: '100px 20px', maxWidth: '600px', margin: '0 auto', color: '#1e293b', direction: 'rtl' }}>
            {isValid ? (
                <>
                    <ClearCart />
                    <div style={{ fontSize: '4rem', marginBottom: '10px' }}>✅</div>
                    <h1 style={{ fontSize: '2.2rem', marginBottom: '15px', color: '#0f172a' }}>התשלום התקבל בהצלחה!</h1>
                    <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '10px' }}>
                        תודה על הרכישה. ניצור איתך קשר בהקדם לתיאום המשלוח.
                    </p>
                    <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '30px' }}>
                        סכום ששולם: <strong style={{ color: '#0284c7' }}>₪{Number(payment.Amount).toLocaleString()}</strong>
                        {' · '}
                        מספר תשלום: {payment.ID}
                    </p>
                </>
            ) : (
                <>
                    <div style={{ fontSize: '4rem', marginBottom: '10px' }}>⚠️</div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '15px', color: '#0f172a' }}>לא הצלחנו לאמת את התשלום</h1>
                    <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '30px' }}>
                        אם חויבת, אל דאגה - צור איתנו קשר ונבדוק את ההזמנה.
                    </p>
                </>
            )}

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/shop/diagnostic" style={{ background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>
                    חזרה לחנות
                </Link>
                <a href="https://wa.me/972548933777" target="_blank" rel="noopener noreferrer" style={{ background: '#15803d', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>
                    יצירת קשר
                </a>
            </div>
        </div>
    );
}
