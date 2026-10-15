// שליפת המורים מלשונית "STUFF" בקובץ השיטס של המוצרים (קובץ ציבורי).
// עמודות: name | role | description | image

const SHEET_ID = '1DcifIAmklNYbvQzKineuiZiYySH6nXEX9P_gabXVnK4';
const SHEET_NAME = 'STUFF';

export type Teacher = {
    name: string;
    role: string;
    description: string;
    image: string;
    // management = הנהלה (פאנל עליון), teachers = מורים (פאנל המתחלף)
    group: 'management' | 'teachers';
};

// שיוך להנהלה: לפי עמודה אופציונלית "type" (מנהל / מורה), ואם אין - לפי התפקיד
function getGroup(type: string, role: string): Teacher['group'] {
    const t = type.trim().toLowerCase();
    if (/^(מנהל|מנהלים|הנהלה|manager|management)$/.test(t)) return 'management';
    if (/^(מורה|מורים|teacher|teachers)$/.test(t)) return 'teachers';
    return /מנכ"ל|סמנכ"ל|מנהל|יו"ר|מייסד/.test(role) ? 'management' : 'teachers';
}

// קישור שיתוף של Google Drive (.../file/d/ID/view) לא מציג תמונה - ממירים לקישור תמונה ישיר
function toImageUrl(url: string) {
    const match = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]+)/);
    return match ? `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600` : url;
}

export async function getTeachers(): Promise<Teacher[]> {
    try {
        // פורמט JSON של Google - מטפל בעצמו בפסיקים, מרכאות וירידות שורה בתוך תאים
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&headers=1&sheet=${encodeURIComponent(SHEET_NAME)}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];

        const text = await res.text();
        const json = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));

        const headers: string[] = (json.table?.cols || []).map((c: any) => String(c.label || '').trim().toLowerCase());
        const col = (name: string) => headers.indexOf(name);

        // אם הלשונית לא קיימת, Google מחזיר את הלשונית הראשונה - מוודאים שזו באמת לשונית המורים
        if (col('name') === -1 || col('role') === -1) {
            console.warn(`Teachers: לא נמצאה לשונית "${SHEET_NAME}" עם עמודות name ו-role`);
            return [];
        }

        const cell = (row: any, name: string) => {
            const i = col(name);
            const value = i === -1 ? '' : row.c?.[i]?.v;
            return value === null || value === undefined ? '' : String(value).trim();
        };

        return (json.table?.rows || [])
            .map((row: any) => ({
                name: cell(row, 'name'),
                role: cell(row, 'role'),
                description: cell(row, 'description'),
                image: toImageUrl(cell(row, 'image')),
                group: getGroup(cell(row, 'type'), cell(row, 'role')),
            }))
            .filter((t: Teacher) => t.name !== '');
    } catch (error) {
        console.error('Error fetching teachers:', error);
        return [];
    }
}
