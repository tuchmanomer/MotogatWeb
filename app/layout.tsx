import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import Footer from '@/components/Footer';

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
        <html lang="he" dir="rtl">
            <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', margin: 0, background: '#f8fafc', color: '#0f172a' }}>

                {/* CSS רספונסיבי מותאם ומבודד */}
                <style>{`
                    .desktop-header-nav {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                        max-width: 1200px;
                        margin: 0 auto;
                    }

                    .desktop-links {
                        display: flex;
                        gap: 32px;
                        font-size: 16px;
                        align-items: center;
                        justify-content: center;
                    }

                    .mobile-home-link {
                        display: none;
                    }

                    @media (max-width: 768px) {
                        .desktop-header-nav {
                            flex-wrap: wrap;
                            gap: 8px;
                        }

                        .mobile-home-link {
                            display: inline-block;
                            color: #e2e8f0;
                            text-decoration: none;
                            font-weight: 700;
                            font-size: 15px;
                        }

                        .desktop-home-link {
                            display: none !important;
                        }

                        .desktop-links {
                            order: 3;
                            width: 100%;
                            justify-content: space-around;
                            padding: 12px 0 6px;
                            border-top: 1px solid #1e293b;
                            font-size: 15px;
                            font-weight: 600;
                            gap: 12px;
                        }
                    }
                `}</style>

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
                            <Link href="/" style={{
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

                        {/* במובייל בלבד: כפתור "בית" באמצע השורה העליונה */}
                        <Link href="/" className="mobile-home-link">
                            בית
                        </Link>

                        {/* אמצע: קישורי הניווט */}
                        <nav className="desktop-links">
                            <Link href="/" className="desktop-home-link" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>בית</Link>
                            <Link href="/courses" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>קורסים</Link>
                            <Link href="/articles" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>מאמרים</Link>
                            <Link href="/shop/diagnostic" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>חנות</Link>
                        </nav>

                        {/* שמאל: כפתור יצירת קשר */}
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Link href="https://wa.me/972548933777" target="_blank" style={{
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
                        </div>

                    </div>
                </header>

                {/* Main Content */}
                <main style={{ flexGrow: 1, backgroundColor: '#f8fafc', color: '#0f172a' }}>
                    {children}
                </main>

                {/* Footer */}
                <Footer />

                {/* תוסף נגישות יציב וחינמי (UserWay) שרץ ישירות ללא תלויות */}
                <Script
                    src="https://cdn.userway.org/widget.js"
                    data-account="free-widget"
                    strategy="afterInteractive"
                />

            </body>
        </html>
    );
}