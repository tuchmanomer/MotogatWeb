const SHEET_ID = '1DcifIAmklNYbvQzKineuiZiYySH6nXEX9P_gabXVnK4';

export async function getSheetData(tabName: 'courses' | 'products') {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${tabName}`;
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
            }
        });

        if (!res.ok) return [];

        const text = await res.text();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}') + 1;

        if (jsonStart === -1 || jsonEnd === -1) return [];

        const parsed = JSON.parse(text.substring(jsonStart, jsonEnd));
        const rows = parsed.table?.rows || [];

        if (rows.length === 0) return [];

        // חילוץ כותרות מ-cols
        const cols = parsed.table?.cols || [];
        const headers = cols.map((col: any) => (col.label ? String(col.label).trim().toLowerCase() : ''));

        return rows.map((row: any, rowIndex: number) => {
            const cells = row.c || [];
            const item: Record<string, any> = {};

            cells.forEach((cell: any, index: number) => {
                // חילוץ הערך מתוך האובייקט v או f
                let val = '';
                if (cell !== null && cell !== undefined) {
                    if (cell.v !== null && cell.v !== undefined) {
                        val = cell.v;
                    } else if (cell.f !== null && cell.f !== undefined) {
                        val = cell.f;
                    }
                }

                const headerKey = headers[index];
                if (headerKey) {
                    item[headerKey] = val;
                }

                // גיבוי לפי אינדקס עמודה מוחלט (A, B, C, D, E, F, G, H)
                if (index === 0) item['c_id'] = val;
                if (index === 1) item['c_title'] = val;
                if (index === 2) item['c_description'] = val;
                if (index === 3) item['c_duration'] = val;
                if (index === 4) item['c_price'] = val;
                if (index === 5) item['c_image'] = val;
                if (index === 6) item['c_badge'] = val;
                if (index === 7) item['c_prerequisites'] = val;
            });

            return {
                id: item.id || item.c_id || String(rowIndex + 1),
                title: item.title || item.c_title || '',
                description: item.description || item.c_description || '',
                duration: item.duration || item.c_duration || '',
                price: item.price || item.c_price || '',
                image: item.image || item.c_image || '',
                badge: item.badge || item.bage || item.c_badge || '',
                prerequisites: item.prerequisites || item.c_prerequisites || '',
            };
        });
    } catch (error) {
        console.error(`Error fetching sheet tab (${tabName}):`, error);
        return [];
    }
}