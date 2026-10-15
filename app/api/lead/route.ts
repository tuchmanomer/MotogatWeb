import { NextResponse } from 'next/server';
import { sendToOrdersSheet } from '@/lib/ordersSheet';

export const dynamic = 'force-dynamic';

// קיצור טקסט כדי שלא ישלחו לגיליון ערכים ענקיים
const clean = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max);

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // שדה מלכודת לבוטים - מוסתר מבני אדם, בוטים ממלאים אותו
        if (clean(body?.website, 200)) {
            return NextResponse.json({ ok: true });
        }

        const lead = {
            fullName: clean(body?.fullName, 100),
            phone: clean(body?.phone, 30),
            email: clean(body?.email, 150),
            subject: clean(body?.subject, 300),
            notes: clean(body?.notes, 2000),
        };

        if (!lead.fullName || !lead.phone) {
            return NextResponse.json({ error: 'יש למלא שם מלא וטלפון' }, { status: 400 });
        }

        const ok = await sendToOrdersSheet({ action: 'lead', lead });
        if (!ok) {
            return NextResponse.json({ error: 'לא הצלחנו לשמור את הפרטים. נסו שוב או פנו אלינו בוואטסאפ.' }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('Lead error:', error);
        return NextResponse.json({ error: 'לא הצלחנו לשמור את הפרטים. נסו שוב או פנו אלינו בוואטסאפ.' }, { status: 500 });
    }
}
