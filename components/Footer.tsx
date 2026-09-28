import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="site-footer" dir="rtl" style={{ background: '#0f172a', color: '#94a3b8', padding: '60px 20px 20px', borderTop: '1px solid #1e293b' }}>
            <div className="footer-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>

                {/* עמודה 1 (מימין): אודות ורשתות חברתיות */}
                <div style={{ textAlign: 'right' }}>
                    <h3 className="footer-title" style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
                        מכללת מוטו גת     
                    </h3>
                    <p className="footer-text" style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>

                        מערך ההדרכה המוביל בישראל לעולם הרכב - כשידע ונסייון נפגשים
                    </p>
                    {/* אייקונים של פייסבוק ווואטסאפ - מעוצבים ואסתטיים */}
                    <div className="footer-socials" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start' }}>
                        <a
                            href="https://www.facebook.com/search/top?q=%D7%9E%D7%9B%D7%9C%D7%9C%D7%AA%20%D7%9E%D7%95%D7%98%D7%95-%D7%92%D7%AA%20moto-gat"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon facebook"
                            title="עמוד הפייסבוק של מוטו גת"
                            aria-label="Facebook"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                background: '#1e293b',
                                color: '#ffffff',
                                textDecoration: 'none',
                                transition: 'background 0.2s',
                                fontSize: '1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            f
                        </a>
                        <a
                            href="https://wa.me/972548933777"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon whatsapp"
                            title="שלח מסרון בוואטסאפ"
                            aria-label="WhatsApp"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                background: '#1e293b',
                                color: '#ffffff',
                                textDecoration: 'none',
                                transition: 'background 0.2s',
                                fontSize: '1rem'
                            }}
                        >
                            💬
                        </a>
                    </div>
                </div>

                {/* עמודה 2 (משמאל): פרטי התקשרות עם אייקונים נקיים ואלגנטיים */}
                <div style={{ textAlign: 'right' }}>
                    <h4 className="footer-subtitle" style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
                        פרטי התקשרות
                    </h4>
                    <ul className="footer-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                            <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
                                {/* אייקון מיקום נקי */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </span>
                            <span><strong>כתובת:</strong> ת.ד. 132, זיכרון-יעקב 30900</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                            <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
                                {/* אייקון טלפון נקי */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </span>
                            <span><strong>משרד:</strong> <a href="tel:0548933777" className="footer-link" style={{ color: '#cbd5e1', textDecoration: 'none' }}>054-8933777</a></span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                            <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
                                {/* אייקון מעטפה נקי */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </span>
                            <span><strong>אימייל:</strong> <a href="mailto:info@motogat.com" className="footer-link" style={{ color: '#cbd5e1', textDecoration: 'none' }}>info@motogat.com</a></span>
                        </li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom" style={{ textAlign: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #1e293b', fontSize: '0.85rem', color: '#64748b' }}>
                © {new Date().getFullYear()} מוטו גת - כל הזכויות שמורות
            </div>
        </footer>
    );
}