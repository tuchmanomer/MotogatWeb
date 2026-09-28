const SHEET_ID = '1DcifIAmklNYbvQzKineuiZiYySH6nXEX9P_gabXVnK4';

export async function getShopProducts(sheetName: string = 'diagnostic') {
    try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
        const res = await fetch(url, { cache: 'no-store' });

        if (!res.ok) return [];

        const csvText = await res.text();

        // פונקציה חכמה שקוראת את ה-CSV ומתעלמת מירידות שורה שנמצאות בתוך מרכאות (תוך תמיכה בטקסטים ארוכים)
        const parseCSVRows = (text: string) => {
            const rows = [];
            let currentRow = [];
            let cur = '';
            let inQuotes = false;

            for (let i = 0; i < text.length; i++) {
                const c = text[i];
                const nextC = text[i + 1];

                if (c === '"') {
                    if (inQuotes && nextC === '"') {
                        cur += '"';
                        i++; // דילוג על מרכאות כפולות
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (c === ',' && !inQuotes) {
                    currentRow.push(cur.trim());
                    cur = '';
                } else if ((c === '\n' || c === '\r') && !inQuotes) {
                    if (c === '\r' && nextC === '\n') {
                        i++;
                    }
                    currentRow.push(cur.trim());
                    if (currentRow.some(cell => cell !== '')) {
                        rows.push(currentRow);
                    }
                    currentRow = [];
                    cur = '';
                } else {
                    cur += c;
                }
            }
            currentRow.push(cur.trim());
            if (currentRow.some(cell => cell !== '')) {
                rows.push(currentRow);
            }
            return rows;
        };

        const allRows = parseCSVRows(csvText);
        if (allRows.length <= 1) return [];

        // דילוג על שורת ה-Header
        const dataRows = allRows.slice(1);

        return dataRows.map((cols, idx) => {
            const cleanCell = (val: string) => val ? val.replace(/^"|"$/g, '').trim() : '';

            return {
                id: cleanCell(cols[0]) || String(idx + 1),
                title: cleanCell(cols[1]) || '',
                description: cleanCell(cols[2]) || '',
                price: cleanCell(cols[3]) || '',
                image: cleanCell(cols[4]) || '',
                buy: cleanCell(cols[5]) || '', // <-- הוספת מיפוי לעמודה F עבור קישור הרכישה
            };
        }).filter(item => item.title !== '');
    } catch (error) {
        console.error('Error fetching shop products:', error);
        return [];
    }
}

// שומר על תאימות עם שמות פונקציות קודמים אם קבצים אחרים במערכת קוראים להם
export async function getSheetData(sheetName: string = 'diagnostic') {
    return getShopProducts(sheetName);
}