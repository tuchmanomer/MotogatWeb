import Link from 'next/link';

// אריח פעולה מעוצב בדף המוצר: מסמכי PDF (מפרט טכני / מדריך משתמש) או השארת פרטים
// accent = צבע האריח בפורמט "R, G, B" (תכלת למפרט, ירוק למדריך, סגול להשארת פרטים)
export default function SpecSheetLink({
    href,
    label = 'למפרט טכני',
    subtitle = 'PDF · נפתח בלשונית חדשה',
    accent = '14, 165, 233',
    icon = 'spec',
    newTab = true,
    ariaLabel,
    style,
}: {
    href: string;
    label?: string;
    subtitle?: string;
    accent?: string;
    icon?: 'spec' | 'manual' | 'contact' | 'phone';
    // תיאור לקוראי מסך (ברירת מחדל: מסמך PDF שנפתח בחלון חדש)
    ariaLabel?: string;
    // מסמכים נפתחים בלשונית חדשה, קישורים פנימיים באתר - באותה לשונית
    newTab?: boolean;
    style?: React.CSSProperties;
}) {
    if (!href) return null;

    const tileStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 16px',
        borderRadius: '14px',
        textDecoration: 'none',
        textAlign: 'right',
        background: `linear-gradient(135deg, rgba(${accent}, 0.22), rgba(${accent}, 0.06))`,
        border: `1px solid rgba(${accent}, 0.5)`,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
        ...style,
    };

    const content = (
        <>
            {/* אייקון בריבוע צבעוני */}
            <span style={{
                flexShrink: 0,
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: `rgb(${accent})`,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 6px 16px -4px rgba(${accent}, 0.6)`
            }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {icon === 'manual' && (
                        <>
                            <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z" />
                            <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z" />
                        </>
                    )}
                    {icon === 'contact' && (
                        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" />
                    )}
                    {icon === 'phone' && (
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                    )}
                    {icon === 'spec' && (
                        <>
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="8" y1="13" x2="16" y2="13" />
                            <line x1="8" y1="17" x2="13" y2="17" />
                        </>
                    )}
                </svg>
            </span>

            <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexGrow: 1 }}>
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '1rem' }}>{label}</span>
                {subtitle && (
                    <span style={{ color: `rgb(${accent})`, fontSize: '0.8rem', fontWeight: 600, filter: 'brightness(1.35)' }}>{subtitle}</span>
                )}
            </span>

            {/* חץ */}
            <svg className="tile-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
            </svg>
        </>
    );

    if (!newTab) {
        return (
            <Link href={href} className="doc-tile" style={tileStyle}>
                {content}
            </Link>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel || `${label} (PDF, נפתח בחלון חדש)`}
            className="doc-tile"
            style={tileStyle}
        >
            {content}
        </a>
    );
}
