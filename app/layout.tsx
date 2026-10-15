import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';
import CartIcon from '@/components/CartIcon';
import AccessibilityButton from '@/components/AccessibilityButton';
import MobileMenu from '@/components/MobileMenu';

export const metadata = {
    title: 'מוטו גת - המכללה לעולם הרכב | MOTOGAT',
    description: 'הכשרות טכנולוגיות, דיאגנוסטיקה וציוד אבחון מתקדם',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="he" dir="rtl" data-scroll-behavior="smooth">
            <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, background: '#f8fafc', color: '#0f172a' }}>

                {/* CSS רספונסיבי מותאם למובייל ולמיקום כפתור הנגישות בפינה התחתונה הימנית */}
                <style>{`
                    /* 3 עמודות: לוגו | קישורים במרכז המדויק | עגלה + יצירת קשר */
                    .desktop-header-nav {
                        display: grid;
                        grid-template-columns: 1fr auto 1fr;
                        align-items: center;
                        width: 100%;
                        max-width: 1200px;
                        margin: 0 auto;
                    }

                    .desktop-header-nav > :first-child {
                        justify-self: start;
                    }

                    .desktop-header-nav > :last-child {
                        justify-self: end;
                    }

                    .desktop-links {
                        display: flex;
                        gap: 32px;
                        font-size: 16px;
                        align-items: center;
                        justify-content: center;
                    }

                    /* אייקון עגלת קניות */
                    .cart-icon-link {
                        position: relative;
                        color: #e2e8f0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 36px;
                        height: 36px;
                        border-radius: 8px;
                        transition: background-color 0.2s, color 0.2s;
                    }

                    .cart-icon-link:hover {
                        background-color: #1e293b;
                        color: #22c55e;
                    }

                    /* בועת כמות הפריטים בעגלה */
                    .cart-badge {
                        position: absolute;
                        top: -4px;
                        left: -4px;
                        min-width: 18px;
                        height: 18px;
                        padding: 0 5px;
                        box-sizing: border-box;
                        border-radius: 999px;
                        background-color: #ef4444;
                        color: #ffffff;
                        font-size: 11px;
                        font-weight: 700;
                        line-height: 18px;
                        text-align: center;
                        border: 2px solid #0f172a;
                    }

                    /* התאמה למובייל: 3 עמודות שוות בשורה השנייה למרכוז מדויק של "מאמרים" */
                    /* כפתור התפריט ופאנל התפריט - מוצגים רק במובייל */
                    .mobile-menu-btn {
                        display: none;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                        border: 1px solid #334155;
                        background: transparent;
                        color: #e2e8f0;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }

                    .mobile-menu-panel {
                        position: absolute;
                        top: 100%;
                        left: 0;
                        right: 0;
                        background: #0f172a;
                        border-top: 1px solid #1e293b;
                        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.35);
                        padding: 8px 16px 16px;
                        display: flex;
                        flex-direction: column;
                        animation: mobileMenuIn 0.2s ease;
                    }

                    @keyframes mobileMenuIn {
                        from { opacity: 0; transform: translateY(-6px); }
                        to { opacity: 1; transform: none; }
                    }

                    .mobile-menu-panel a {
                        color: #e2e8f0;
                        text-decoration: none;
                        font-size: 17px;
                        font-weight: 600;
                        padding: 14px 6px;
                        border-bottom: 1px solid #1e293b;
                    }

                    .mobile-menu-panel a:last-child {
                        border-bottom: none;
                    }

                    .mobile-menu-panel a.is-active {
                        color: #38bdf8;
                    }

                    /* מובייל: שורה אחת - לוגו מימין, משמאל עגלה + יצירת קשר + כפתור תפריט */
                    @media (max-width: 768px) {
                        .desktop-header-nav {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        }

                        .desktop-links {
                            display: none !important;
                        }

                        .mobile-menu-btn {
                            display: flex;
                        }

                        .header-contact {
                            padding: 7px 12px !important;
                            font-size: 13px !important;
                        }
                    }

                    /* גלילה חלקה לקישורים בתוך העמוד (#...), עם מרווח מהבאר העליון הדביק */
                    html {
                        scroll-behavior: smooth;
                    }

                    #services-section,
                    #catalog-section {
                        scroll-margin-top: 90px;
                    }

                    /* כרטיסי מוצרים, קורסים ומאמרים: כניסה עדינה + אפקט מעבר עכבר (בלי לשנות את העיצוב עצמו) */
                    @keyframes shopCardIn {
                        from { opacity: 0; transform: translateY(18px); }
                        to { opacity: 1; transform: none; }
                    }
                    .shop-card {
                        animation: shopCardIn 0.5s ease backwards;
                        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
                    }
                    .shop-card:nth-child(2) { animation-delay: 0.06s; }
                    .shop-card:nth-child(3) { animation-delay: 0.12s; }
                    .shop-card:nth-child(4) { animation-delay: 0.18s; }
                    .shop-card:nth-child(n+5) { animation-delay: 0.24s; }
                    .shop-card:hover {
                        transform: translateY(-6px);
                        border-color: rgba(56, 189, 248, 0.45) !important;
                        box-shadow: 0 20px 40px -12px rgba(56, 189, 248, 0.30) !important;
                    }
                    .shop-card img {
                        transition: transform 0.5s ease;
                    }
                    .shop-card:hover img {
                        transform: scale(1.05);
                    }

                    /* כפתור נגישות עגול כחול בפינה הימנית התחתונה (components/AccessibilityButton.tsx) */
                    .a11y-fab {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        z-index: 999998;
                        width: 56px;
                        height: 56px;
                        border-radius: 50%;
                        border: 3px solid #ffffff;
                        background: #1d4ed8;
                        color: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        box-shadow: 0 6px 18px rgba(29, 78, 216, 0.45);
                        transition: transform 0.2s ease, background 0.2s ease;
                    }

                    .a11y-fab:hover {
                        background: #1e40af;
                        transform: scale(1.06);
                    }

                    /* הפס השחור של נגיש-לי מוסתר כשהתפריט סגור - הכפתור העגול מחליף אותו */
                    #NagishLiBarStrip:not(.open) {
                        display: none !important;
                    }

                    /* ביטול אפשרות הזזת התפריט לפינות אחרות */
                    #NagishLiMove {
                        display: none !important;
                    }

                    /* נגישות: מסגרת פוקוס ברורה לניווט במקלדת (גוברת גם על outline: none בשדות) */
                    *:focus-visible {
                        outline: 3px solid #2563eb !important;
                        outline-offset: 2px !important;
                        border-radius: 4px;
                    }

                    /* נגישות: קישור "דילוג לתוכן" - מוסתר עד שמגיעים אליו עם Tab */
                    .skip-link {
                        position: absolute;
                        top: -100px;
                        right: 16px;
                        z-index: 2000;
                        background: #ffffff;
                        color: #0f172a;
                        padding: 10px 16px;
                        border-radius: 8px;
                        font-weight: 700;
                        text-decoration: none;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                    }

                    .skip-link:focus {
                        top: 10px;
                    }

                    @media (prefers-reduced-motion: reduce) {
                        *, *::before, *::after {
                            animation-duration: 0.01ms !important;
                            transition-duration: 0.01ms !important;
                            scroll-behavior: auto !important;
                        }
                    }
                `}</style>

                {/* נגישות: דילוג ישיר לתוכן הראשי למשתמשי מקלדת וקוראי מסך */}
                <a href="#main-content" className="skip-link">דילוג לתוכן הראשי</a>

                {/* Header / Navigation */}
                <header style={{
                    backgroundColor: '#0f172a',
                    borderBottom: '1px solid #1e293b',
                    padding: '10px 16px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    direction: 'rtl'
                }}>
                    <div className="desktop-header-nav">

                        {/* ימין: הלוגו */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link href="/" aria-label="מוטו גת - לדף הבית" style={{
                                backgroundColor: '#ffffff',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                                <img src="/logo.png" alt="MOTOGAT" style={{ height: '28px', width: 'auto', display: 'block' }} />
                            </Link>
                        </div>

                        {/* מרכז: קישורי הניווט (במחשב בלבד - במובייל דרך תפריט ההמבורגר) */}
                        <nav className="desktop-links" aria-label="ניווט ראשי">
                            <Link href="/" className="desktop-home-link" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>בית</Link>
                            <Link href="/shop/diagnostic" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>חנות</Link>
                            <Link href="/articles" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>מאמרים</Link>
                            <Link href="/courses" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>קורסים</Link>
                        </nav>

                        {/* שמאל: עגלת קניות + כפתור יצירת קשר + תפריט (במובייל) */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <CartIcon />

                            <Link
                                href="https://wa.me/972548933777"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="ליצירת קשר בוואטסאפ (נפתח בחלון חדש)"
                                className="header-contact"
                                style={{
                                backgroundColor: '#22c55e',
                                color: '#000000',
                                border: 'none',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontWeight: 700,
                                fontSize: '13px',
                                textDecoration: 'none',
                                display: 'inline-block',
                                whiteSpace: 'nowrap'
                            }}>
                                ליצירת קשר
                            </Link>

                            <MobileMenu />
                        </div>

                    </div>
                </header>

                {/* Main Content */}
                <main id="main-content" tabIndex={-1} style={{ flexGrow: 1, backgroundColor: '#f8fafc', color: '#0f172a', outline: 'none' }}>
                    {children}
                </main>

                {/* Footer */}
                <Footer />

                {/* תוסף נגישות נגיש-לי 2.3 - הקבצים בתיקייה public/nagishli (אסור לשנות אותם לפי הרישיון).
                    ההגדרות לפי מחולל קוד ההתקנה הרשמי: עברית, פינה ימנית תחתונה, כחול, קישור להצהרת הנגישות */}
                <Script id="nagishli-config" strategy="afterInteractive">
                    {`nl_lang = "he"; nl_pos = "br"; nl_color = "blue"; nl_link = "/accessibility-statement"; nl_dir = "/nagishli/nl-files/";`}
                </Script>
                <Script src="/nagishli/nagishli.js?v=2.3" strategy="lazyOnload" />
                <AccessibilityButton />

            </body>
        </html>
    );
}
