import './globals.css';
import Link from 'next/link';
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

                {/* Header / Navigation ממומרז לחלוטין */}
                <header style={{
                    backgroundColor: '#0f172a',
                    borderBottom: '1px solid #1e293b',
                    padding: '14px 24px',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    direction: 'rtl'
                }}>
                    <div style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%'
                    }}>

                        {/* צד ימין: הלוגו בתיבה לבנה (מוגדר עם flex: 1 כדי לאזן את הצד השני) */}
                        <div style={{ display: 'flex', justifyContent: 'flex-start', flex: 1 }}>
                            <Link href="/" style={{
                                backgroundColor: '#ffffff',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                width: 'fit-content'
                            }}>
                                <img src="/logo.png" alt="MOTOGAT" style={{ height: '36px', width: 'auto', display: 'block' }} />
                            </Link>
                        </div>

                        {/* אמצע: כפתורי הניווט (ממורזים בדיוק במרכז) */}
                        <nav style={{ display: 'flex', gap: '36px', fontSize: '16px', alignItems: 'center', justifyContent: 'center' }}>
                            <Link href="/" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600 }}>בית</Link>
                            <Link href="/courses" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600 }}>קורסים</Link>
                            <Link href="/articles" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600 }}>מאמרים</Link>
                            <Link href="/shop/diagnostic" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 600 }}>חנות</Link>
                        </nav>

                        {/* צד שמאל: עגלה ויצירת קשר (מוגדר עם flex: 1 ויישור לשמאל כדי לשמור על סימטריה) */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1, gap: '12px', alignItems: 'center' }}>
                           

                            <Link href="https://wa.me/972548933777" target="_blank" style={{
                                backgroundColor: '#22c55e',
                                color: '#000000',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '6px',
                                fontWeight: 600,
                                fontSize: '14px',
                                textDecoration: 'none',
                                display: 'inline-block'
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

            </body>
        </html>
    );
}