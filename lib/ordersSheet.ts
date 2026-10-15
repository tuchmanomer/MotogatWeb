// רישום הזמנות ומתעניינים בגיליון "הזמנות אתר" דרך Apps Script - רץ בשרת בלבד.
// בהזמנות: תקלה ברישום לא עוצרת את התשלום - רק נרשמת בטרמינל.

type OrdersSheetAction =
    | { action: 'create'; order: Record<string, unknown> }
    | { action: 'paid'; payment: Record<string, unknown> }
    | { action: 'lead'; lead: Record<string, unknown> };

// מחזיר true אם הרישום בגיליון הצליח
export async function sendToOrdersSheet(payload: OrdersSheetAction): Promise<boolean> {
    const url = process.env.ORDERS_SHEET_URL;
    const secret = process.env.ORDERS_SHEET_SECRET;

    if (!url || !secret) {
        console.warn('Orders sheet: חסרים ORDERS_SHEET_URL או ORDERS_SHEET_SECRET בקובץ .env.local - הנתונים לא נרשמו בגיליון');
        return false;
    }

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ secret, ...payload }),
            cache: 'no-store',
            signal: AbortSignal.timeout(15000),
        });
        const json = await res.json().catch(() => null);

        if (!json?.ok) {
            console.error(`Orders sheet error (${payload.action}):`, json?.error || `HTTP ${res.status}`);
            return false;
        }
        return true;
    } catch (error) {
        console.error(`Orders sheet request failed (${payload.action}):`, error);
        return false;
    }
}
