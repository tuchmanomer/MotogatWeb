import React from 'react';

const brands = [
    { name: 'סוזוקי', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2016.svg' },
    { name: 'Changan', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Changan_logo_%282019%29.svg' },
    { name: 'Scania', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Scania_wordmark.svg' },
    { name: 'MAN', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/MAN_Logo.svg' },
    { name: 'כלמוביל', logo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=200&auto=format&fit=crop' }, // תמונה חלופית או שם טקסטואלי נקי
    { name: 'טויוטה', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Toyota_logo_%282020%29.svg' },
    { name: 'לקסוס', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Lexus_division_Emblem.svg' },
    { name: 'תעשייה אווירית', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Israel_Aerospace_Industries_logo.svg' },
];

export default function BrandsPanel() {
    return (
        <section style={{
            padding: '40px 20px',
            background: 'rgba(15, 23, 42, 0.6)',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            margin: '40px 0'
        }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                <h3 style={{
                    color: '#94a3b8',
                    fontSize: '0.95rem',
                    letterSpacing: '1px',
                    marginBottom: '28px',
                    fontWeight: 600,
                    textTransform: 'uppercase'
                }}>
                    שותפים, יצרנים ולקוחות מובילים בתעשייה
                </h3>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '35px'
                }}>
                    {brands.map((brand, idx) => (
                        <div
                            key={idx}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px',
                                opacity: 0.85,
                                filter: 'brightness(0) invert(1)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                                minWidth: '90px'
                            }}
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
                            />
                            <span style={{ fontSize: '0.75rem', color: '#cbd5e1', filter: 'none' }}>{brand.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}