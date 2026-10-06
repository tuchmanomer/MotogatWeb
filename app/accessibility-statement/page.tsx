import React from 'react';

export const metadata = {
    title: 'הצהרת נגישות | חברת מוטו-גת ייצור ושיווק בע"מ',
    description: 'הצהרת הנגישות הרשמית של חברת מוטו-גת ייצור ושיווק בע"מ - מכללה לעולם הרכב וחנות ציוד אבחון.',
};

export default function AccessibilityStatementPage() {
    return (
        <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', direction: 'rtl', textAlign: 'right', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>
                הצהרת נגישות
            </h1>

            <section style={{ marginBottom: '24px' }}>
                <p style={{ lineHeight: '1.7', color: '#334155' }}>
                    <strong>חברת מוטו-גת ייצור ושיווק בע"מ</strong><br />
                    הינה חברה למתן שירותים, הדרכות טכנולוגיות ומוצרים בתחום רכבים קלים וכבדים.
                </p>
                <p style={{ lineHeight: '1.7', color: '#334155' }}>
                    בהצהרה זו מטרתנו לייעל את השימוש ולשפר את השירות שלנו בכל הנוגע לנגישות ושוויון זכויות לאנשים בעלי מוגבלויות.
                </p>
                <p style={{ lineHeight: '1.7', color: '#334155' }}>
                    התאמת הנגישות שלנו בוצעה בהתאם לתקנה 35 בתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג 2013 לרמה AA בכפוף לשינויים והתאמות שבוצעו במסמך התקן הישראלי (ת"י 5568).
                </p>
                <p style={{ lineHeight: '1.7', color: '#334155' }}>
                    התאמת הנגישות נבדקה בדפדפנים כרום, פיירפוקס, ספארי, מוזילה ואדג'.
                </p>
            </section>

            {/* אמצעי נגישות הקיימים באתר */}
            <section style={{ marginBottom: '28px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
                    אמצעי נגישות הקיימים באתר:
                </h2>
                <ul style={{ paddingRight: '20px', lineHeight: '1.8', color: '#334155' }}>
                    <li>תמיכה בכל הדפדפנים התקניים המקובלים (כמו Chrome, Explorer, FireFox, Opera, Mozila).</li>
                    <li>תכני האתר נכתבו בשפה ברורה ונעשה שימוש בפונטים קריאים.</li>
                    <li>מבניות האתר בנויה מכותרות, פסקאות ורשימות.</li>
                    <li>התמצאות באתר היא פשוטה ונוחה וכוללת תפריטים זמינים וברורים.</li>
                    <li>הקישורים באתר ברורים ומסבירים להיכן מועברים לאחר לחיצה עליהם.</li>
                    <li>קישורים בתחילת הדף המאפשרים דילוג לתוכן.</li>
                    <li>תיאור טקסטואלי לתמונות ואייקונים עבור טכנולוגיות מסייעות.</li>
                    <li>התאמת האתר לסביבות עבודה ברזולוציות שונות (רספונסיביות).</li>
                    <li>כפתורי עצירה והפעלה של גלריות סרטונים.</li>
                    <li>הוטמעו חוקי ARIA העוזרים לפרש את תוכן האתר בצורה מדויקת וטובה יותר.</li>
                    <li>הנגשת תפריטים, טפסים ושדות, היררכיית כותרות, רכיבי טאבים, חלונות קופצים ועוד.</li>
                </ul>
            </section>

            {/* שינוי תצוגה באתר */}
            <section style={{ marginBottom: '28px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
                    שינוי תצוגה באתר
                </h2>
                <ul style={{ paddingRight: '20px', lineHeight: '1.8', color: '#334155' }}>
                    <li>
                        ניתן להגדיל או להקטין את תצוגת האתר באמצעות לחיצה על אחד מכפתורי ה- "CTRL" ביחד עם גלגלת העכבר או ביחד עם הסימן "+" עבור הגדלה או ביחד עם הסימן "-" עבור הקטנת התצוגה. כל לחיצה תקטין או תגדיל את המסך בעשרה אחוזים (10%).
                    </li>
                    <li>שינוי גודל הגופן ייעשה באמצעות שימוש בתפריט הנגישות המצוי באתר.</li>
                    <li>
                        גולשים אשר אין ברשותם עכבר או שאינם יכולים לעשות שימוש בעכבר יכולים להפעיל את התכונות המצויות באתר על ידי לחיצה על המקש "TAB". כל לחיצה תעביר את הסמן אל האפשרות הבאה באתר.
                    </li>
                    <li>לחיצה על מקש ה- "Enter" תפעיל את הקישור עליו נמצא הסמן.</li>
                    <li>
                        האתר אינו כולל הבהובים, ריצודים ותכנים בתנועה. במקומות אשר נמצאים תכנים כאלה, ניתן לעצור אותם בעמידה עליהם ולחיצה על העכבר או מעבר אליהם על ידי מקש ה- "TAB" ולחיצה על מקש ה- "Enter".
                    </li>
                </ul>
            </section>

            {/* התאמת אתר למוגבלי ראייה ושמיעה */}
            <section style={{ marginBottom: '28px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
                    התאמת אתר למוגבלי ראייה ושמיעה
                </h2>
                <ul style={{ paddingRight: '20px', lineHeight: '1.8', color: '#334155' }}>
                    <li>מגדילי ראות (רזולוציה) בסיסיים</li>
                    <li>תוכנות זיהוי קולי</li>
                    <li>חבילות זיהוי קולי של מערכות ההפעלה</li>
                </ul>
            </section>

            {/* הסדרי נגישות פיזיים במוטו-גת - קיסריה */}
            <section style={{ marginBottom: '28px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
                    הסדרי נגישות פיזיים במבנה החברה והמכללה
                </h2>
                <p style={{ lineHeight: '1.7', color: '#334155', marginBottom: '8px' }}>
                    <strong>כתובת המכללה והמשרדים:</strong> רחוב השיטה 10, פארק התעשייה קיסריה
                </p>
                <ul style={{ paddingRight: '20px', lineHeight: '1.8', color: '#334155' }}>
                    <li><strong>חניית נכים:</strong> קיימות חניות נכים מסומנות ומוסדרות בקרבת הכניסה למבנה.</li>
                    <li><strong>כניסה ודרכי גישה:</strong> הכניסה למבנה מונגשת באופן מלא לכיסאות גלגלים וללא מכשולים או מדרגות.</li>
                    <li><strong>שירותים נגישים:</strong> במבנה קיימים שירותי נכים נגישים ומאובזרים כחוק.</li>
                    <li><strong>כיתות הלימוד והמעבדות:</strong> מונגשות באופן מלא וכוללות מעברים מרווחים ונגישים.</li>
                    <li><strong>חיות שירות:</strong> מותרת הכנסת חיית שירות המיועדת לסייע לאדם עם מוגבלות.</li>
                </ul>
            </section>

            {/* סייגים לנגישות */}
            <section style={{ marginBottom: '28px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
                    סייגים לנגישות
                </h2>
                <p style={{ lineHeight: '1.7', color: '#334155' }}>
                    הנהלת האתר עושה ככל שניתן על מנת לוודא כי כלל הדפים המוצגים יהיו מונגשים. יחד עם זאת, יתכן וישנם דפים שטרם הונגשו, או שטרם נמצא פתרון טכנולוגי מתאים לצורך הנגשתם. בנוסף, יייתכן ובמודעות חיצוניות, אשר הוכנסו על ידי בעלי עסקים המפרסמים באתר, ההנגשה לא תהיה שלמה או מספקת.
                </p>
            </section>

            {/* פרטי אחראי נגישות */}
            <section style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>
                    נתקלתם בבעיה? אנחנו כאן כדי לסייע!
                </h2>
                <p style={{ lineHeight: '1.7', color: '#334155', marginBottom: '12px' }}>
                    אם נתקלתם בבעיית נגישות באתר או במתקני החברה, נשמח לעמוד לרשותכם:
                </p>
                <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <p style={{ margin: '4px 0', fontSize: '1rem', color: '#0f172a' }}>
                        <strong>רכז/ת הנגישות:</strong> יניב טוכמן
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '1rem', color: '#0f172a' }}>
                        <strong>טלפון במשרד:</strong> 04-6399883
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '1rem', color: '#0f172a' }}>
                        <strong>טלפון/ווואטסאפ לפניות נגישות:</strong> 054-8933777
                    </p>
                    <p style={{ margin: '4px 0', fontSize: '1rem', color: '#0f172a' }}>
                        <strong>אימייל:</strong> <a href="mailto:info@motogat.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>info@motogat.com</a>
                    </p>
                </div>
            </section>

            <footer style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '0.8rem', color: '#94a3b8' }}>
                תאריך עדכון הצהרת הנגישות: אוקטובר 2026 | מקור טופס הצהרת נגישות: צריח מדיה
            </footer>
        </main>
    );
}