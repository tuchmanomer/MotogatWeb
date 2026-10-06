import Link from 'next/link';

export default function Footer() {
    return (
        <footer
            role="contentinfo"
            aria-label="מידע תחתון ופרטי התקשרות"
            className="site-footer"
            dir="rtl"
            style={{ background: '#0f172a', color: '#94a3b8', padding: '60px 20px 20px', borderTop: '1px solid #1e293b' }}
        >
            <div className="footer-container" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>

                {/* עמודה 1 (מימין): אודות ורשתות חברתיות */}
                <div style={{ textAlign: 'right' }}>
                    <h2 className="footer-title" style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
                        מכללת מוטו גת
                    </h2>
                    <p className="footer-text" style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                        מערך ההדרכה המוביל בישראל לעולם הרכב - כשידע וניסיון נפגשים
                    </p>

                    {/* אייקונים של פייסבוק ווואטסאפ */}
                    <div className="footer-socials" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start' }}>
                        <a
                            href="https://www.facebook.com/search/top?q=%D7%9E%D7%9B%D7%9C%D7%9C%D7%AA%20%D7%9E%D7%95%D7%98%D7%95-%D7%92%D7%AA%20moto-gat"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="עמוד הפייסבוק של מוטו גת (נפתח בחלון חדש)"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#1e293b',
                                color: '#ffffff',
                                textDecoration: 'none',
                                transition: 'background 0.2s'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        <a
                            href="https://wa.me/972548933777"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="שלח הודעה בוואטסאפ למוטו גת (נפתח בחלון חדש)"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#1e293b',
                                color: '#ffffff',
                                textDecoration: 'none',
                                transition: 'background 0.2s'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* עמודה 2 (משמאל): פרטי התקשרות */}
                <div style={{ textAlign: 'right' }}>
                    <h2 className="footer-subtitle" style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
                        פרטי התקשרות
                    </h2>
                    <ul className="footer-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                            <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center' }} aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            </span>
                            <span><strong>כתובת:</strong> רחוב השיטה 10, פארק התעשייה קיסריה</span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                            <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center' }} aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </span>
                            <span><strong>משרד:</strong> <a href="tel:0548933777" aria-label="חייג לטלפון 054-8933777" style={{ color: '#cbd5e1', textDecoration: 'none' }}>054-8933777</a></span>
                        </li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                            <span style={{ color: '#3b82f6', display: 'flex', alignItems: 'center' }} aria-hidden="true">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </span>
                            <span><strong>אימייל:</strong> <a href="mailto:info@motogat.com" aria-label="שלח מייל ל-info@motogat.com" style={{ color: '#cbd5e1', textDecoration: 'none' }}>info@motogat.com</a></span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* החלק התחתון של הפוטר הכולל זכויות יוצרים וקישור להצהרת נגישות */}
            <div className="footer-bottom" style={{
                textAlign: 'center',
                marginTop: '40px',
                paddingTop: '20px',
                borderTop: '1px solid #1e293b',
                fontSize: '0.85rem',
                color: '#64748b',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px'
            }}>
                <div>© {new Date().getFullYear()} מוטו גת - כל הזכויות שמורות</div>
                <div>
                    <Link
                        href="/accessibility-statement"
                        style={{ color: '#94a3b8', textDecoration: 'underline' }}
                        className="hover:underline text-sm"
                    >
                        הצהרת נגישות
                    </Link>
                </div>
            </div>
        </footer>
    );
}