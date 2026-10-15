import { NextResponse } from 'next/server';
import { getShopProducts } from '@/lib/shopSheets';
import { sumitRequest } from '@/lib/sumit';
import { sendToOrdersSheet } from '@/lib/ordersSheet';

export const dynamic = 'force-dynamic';

// המחירים בגיליון לא כוללים מע"מ - SUMIT יוסיף מע"מ לפי הגדרות החברה.
// אם המחירים בגיליון כוללים מע"מ, לשנות ל-true.
const VAT_INCLUDED = false;

// קידומת המוצר בעגלה (למשל "books-3") ← שם הגיליון בקובץ השיטס.
// מוצרי אבחון נשמרים בעגלה בלי קידומת.
const PREFIX_TO_SHEET: Record<string, string> = {
    demonstration: 'demonstration',
    books: 'books',
    workingTools: 'working tools',
};
const DEFAULT_SHEET = 'diagnostic';

// מחיר משלוח (לפני מע"מ, כמו מחירי המוצרים)
const SHIPPING_PRICE = 60;

// שיעור המע"מ - משמש רק לחישוב הסכום הצפוי בגיליון ההזמנות (SUMIT מחשב את המע"מ בעצמו)
const VAT_RATE = 0.18;

function parseCartId(cartId: string) {
    for (const [prefix, sheet] of Object.entries(PREFIX_TO_SHEET)) {
        if (cartId.startsWith(`${prefix}-`)) {
            return { sheet, productId: cartId.slice(prefix.length + 1) };
        }
    }
    return { sheet: DEFAULT_SHEET, productId: cartId };
}

function parsePrice(price: string) {
    return Number(String(price).replace(/[^0-9.]+/g, '')) || 0;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const cartItems: { id: string; quantity: number }[] = Array.isArray(body?.items) ? body.items : [];
        const customer = body?.customer || {};

        const name = String(customer.name || '').trim();
        const phone = String(customer.phone || '').trim();
        const email = String(customer.email || '').trim();
        const city = String(customer.city || '').trim();
        const address = String(customer.address || '').trim();
        const shippingMethod = body?.shippingMethod;

        if (!name || !phone || !email) {
            return NextResponse.json({ error: 'יש למלא שם לחשבונית, טלפון ואימייל' }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'כתובת האימייל לא תקינה' }, { status: 400 });
        }
        if (shippingMethod !== 'delivery' && shippingMethod !== 'pickup') {
            return NextResponse.json({ error: 'יש לבחור משלוח או איסוף עצמי' }, { status: 400 });
        }
        if (shippingMethod === 'delivery' && (!city || !address)) {
            return NextResponse.json({ error: 'למשלוח יש למלא עיר וכתובת' }, { status: 400 });
        }
        if (cartItems.length === 0) {
            return NextResponse.json({ error: 'העגלה ריקה' }, { status: 400 });
        }

        // שליפת המוצרים מהגיליון - המחיר נלקח רק מכאן, לא מהדפדפן
        const sheetsCache: Record<string, any[]> = {};
        const items = [];
        let hasOutOfStock = false;
        let netTotal = 0;
        const productLines: string[] = [];

        for (const cartItem of cartItems) {
            const quantity = Math.floor(Number(cartItem.quantity));
            if (!Number.isFinite(quantity) || quantity < 1 || quantity > 99) {
                return NextResponse.json({ error: 'כמות לא תקינה בעגלה' }, { status: 400 });
            }

            const { sheet, productId } = parseCartId(String(cartItem.id));
            if (!sheetsCache[sheet]) {
                sheetsCache[sheet] = await getShopProducts(sheet);
            }

            const product = sheetsCache[sheet].find((p: any) => String(p.id) === productId);
            const unitPrice = product ? parsePrice(product.price) : 0;

            if (!product || unitPrice <= 0) {
                return NextResponse.json(
                    { error: `המוצר "${product?.title || productId}" לא זמין לרכישה. יש להסיר אותו מהעגלה.` },
                    { status: 400 }
                );
            }

            // סטטוס המלאי נלקח מהגיליון (עמודת status), לא מהעגלה
            const outOfStock = product.inStock === false;
            if (outOfStock) hasOutOfStock = true;

            items.push({
                Item: { Name: product.title, ExternalIdentifier: String(cartItem.id) },
                Quantity: quantity,
                UnitPrice: unitPrice,
                Description: outOfStock ? `${product.title} * (לא במלאי - אספקה עד 21 ימי עסקים)` : product.title,
            });

            netTotal += unitPrice * quantity;
            productLines.push(`${product.title}${outOfStock ? ' *' : ''} × ${quantity} (₪${unitPrice})`);
        }

        if (shippingMethod === 'delivery') {
            items.push({
                Item: { Name: 'משלוח', ExternalIdentifier: 'shipping' },
                Quantity: 1,
                UnitPrice: SHIPPING_PRICE,
            });
            netTotal += SHIPPING_PRICE;
        }

        // זמן אספקה: 7 ימי עסקים, או 21 אם יש בהזמנה מוצר שלא במלאי
        const supplyNote = hasOutOfStock ? 'זמן אספקה: עד 21 ימי עסקים' : 'זמן אספקה: עד 7 ימי עסקים';
        const deliveryNote = (shippingMethod === 'delivery'
            ? `משלוח לכתובת: ${address}, ${city}`
            : 'איסוף עצמי מקיסריה') + ` | ${supplyNote}`;

        const siteUrl = process.env.SITE_URL || new URL(req.url).origin;
        const orderId = `MG-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

        const data = await sumitRequest('/billing/payments/beginredirect/', {
            Customer: {
                Name: name,
                Phone: phone,
                EmailAddress: email || null,
                City: shippingMethod === 'delivery' ? city : null,
                Address: shippingMethod === 'delivery' ? address : null,
            },
            DocumentDescription: deliveryNote,
            Items: items,
            VATIncluded: VAT_INCLUDED,
            ExternalIdentifier: orderId,
            RedirectURL: `${siteUrl}/checkout/success`,
            CancelRedirectURL: `${siteUrl}/cart`,
            SendUpdateByEmailAddress: email,
            UpdateCustomerOnSuccess: true,
            // מסמך סופי (לא טיוטה) - כדי שהחשבונית תישלח ללקוח מיד אחרי התשלום
            DraftDocument: false,
            UpdateOrganizationOnSuccess: true,
            Language: 0, // עברית
        });

        if (!data?.RedirectURL) {
            throw new Error('SUMIT לא החזיר כתובת לדף התשלום');
        }

        // רישום ההזמנה בגיליון כ"ממתין לתשלום" - מתעדכן ל"שולם" בדף האישור
        const expectedTotal = VAT_INCLUDED ? netTotal : Math.round(netTotal * (1 + VAT_RATE) * 100) / 100;
        await sendToOrdersSheet({
            action: 'create',
            order: {
                orderId,
                name,
                phone,
                email,
                products: productLines.join('\n'),
                shipping: shippingMethod === 'delivery' ? `משלוח (₪${SHIPPING_PRICE})` : 'איסוף עצמי מקיסריה',
                address: shippingMethod === 'delivery' ? `${address}, ${city}` : '',
                supplyTime: hasOutOfStock ? '21 ימי עסקים' : '7 ימי עסקים',
                netTotal,
                expectedTotal,
            },
        });

        return NextResponse.json({ redirectUrl: data.RedirectURL });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: 'לא ניתן לפתוח את דף התשלום כרגע. נסו שוב או צרו קשר.' }, { status: 500 });
    }
}
