// חיבור ל-API של SUMIT - רץ בשרת בלבד (המפתח הפרטי לא מגיע לדפדפן)
const SUMIT_API_URL = 'https://api.sumit.co.il';

function getCredentials() {
    const companyId = Number(process.env.SUMIT_COMPANY_ID);
    const apiKey = process.env.SUMIT_API_KEY;

    if (!companyId || !apiKey) {
        throw new Error('חסרים SUMIT_COMPANY_ID או SUMIT_API_KEY בקובץ .env.local');
    }

    return { CompanyID: companyId, APIKey: apiKey };
}

export async function sumitRequest(path: string, body: Record<string, unknown>) {
    const res = await fetch(`${SUMIT_API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Credentials: getCredentials(), ...body }),
        cache: 'no-store',
    });

    const json = await res.json();

    // Status 0 = הצלחה, 1 = שגיאה עסקית, 2 = שגיאה טכנית
    if (!res.ok || json.Status !== 0) {
        throw new Error(json.UserErrorMessage || json.TechnicalErrorDetails || `SUMIT error (HTTP ${res.status})`);
    }

    return json.Data;
}

// שליפת פרטי תשלום לאימות אחרי החזרה מדף התשלום
export async function getSumitPayment(paymentId: number) {
    const data = await sumitRequest('/billing/payments/get/', { PaymentID: paymentId });
    return data?.Payment ?? null;
}
