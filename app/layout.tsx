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

                {/* Header / Navigation */}
                <header style={{
                    backgroundColor: '#0f172a',
                    borderBottom: '1px solid #1e293b',
                    padding: '12px 16px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    direction: 'rtl'
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        alignItems: 'center',
                        width: '100%',
                        gap: '20px'
                    }}>

                        {/* צד ימין: הלוגו בתיבה לבנה */}
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Link href="/" style={{
                                backgroundColor: '#ffffff',
                                padding: '4px 10px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                width: 'fit-content'
                            }}>
                                <img src="/logo.png" alt="MOTOGAT" style={{ height: '30px', width: 'auto', display: 'block' }} />
                            </Link>
                        </div>

                        {/* אמצע: כפתורי הניווט ממורכזים לחלוטין */}
                        <nav style={{
                            display: 'flex',
                            gap: 'clamp(16px, 3vw, 36px)',
                            fontSize: 'clamp(14px, 1.5vw, 16px)',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Link href="/" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>בית</Link>
                            <Link href="/courses" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>קורסים</Link>
                            <Link href="/articles" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>מאמרים</Link>
                            <Link href="/shop/diagnostic" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600, whiteSpace: 'nowrap' }}>חנות</Link>
                        </nav>

                        {/* צד שמאל: כפתור יצירת קשר */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Link href="https://wa.me/972548933777" target="_blank" style={{
                                backgroundColor: '#22c55e',
                                color: '#000000',
                                border: 'none',
                                padding: '6px 14px',
                                borderRadius: '6px',
                                fontWeight: 600,
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

                {/* תוסף נגישות צף - נגיש לי */}
                <Script
                    src="https://www.nagish.li/accessibility/nagishli.js"
                    strategy="afterInteractive"
                />

            </body>
        </html>
    );
}