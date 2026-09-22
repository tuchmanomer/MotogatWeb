'use client';

import Link from 'next/link';

// רשימת המותגים עם השמות המדויקים מתוך התיקייה שלך
const brands = [
    { name: 'סוזוקי', logo: '/images/brands/suzuki.png' },
    { name: 'Changan', logo: '/images/brands/changan.png' },
    { name: 'Scania', logo: '/images/brands/scania.png' },
    { name: 'MAN', logo: '/images/brands/man.png' },
    { name: 'טויוטה', logo: '/images/brands/toyota.png' },
    { name: 'לקסוס', logo: '/images/brands/lexus.png' },
];

export default function Home() {
    return (
        <div>
            {/* Hero Section - עודכן לתמונת הפתיחה המקומית שלך */}
            <section
                className="hero"
                style={{
                    position: 'relative',
                    minHeight: '85vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '100px 20px 80px',
                    backgroundColor: '#f8fafc',
                    backgroundImage: `linear-gradient(180deg, rgba(248, 250, 252, 0.88) 0%, rgba(248, 250, 252, 0.97) 100%), url('/images/pics/opening.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderBottom: '1px solid #e2e8f0',
                }}
            >
                <div className="heroContent">
                    <h1 style={{ color: '#0f172a' }}>מכללת מוטו גת - מערך ההדרכה המוביל בישראל לעולם הרכב</h1>
                    <p style={{ color: '#475569' }}>
                        הדרכות עומק, ציוד אבחון מוסכי מתקדם ומסלולי הסמכה מעשיים לטכנאים ולחברות.
                    </p>

                    <div className="heroCTA" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/courses" className="btnPrimary">
                            לרשימת הקורסים
                        </Link>
                        <Link href="/shop/diagnostic" className="btnSecondary">
                            ציוד אבחון
                        </Link>
                        <Link href="/shop/demonstration" className="btnSecondary">
                            אמצעי המחשה
                        </Link>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '40px',
                        marginTop: '50px',
                        padding: '20px',
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                    }}>
                        <div style={{ color: '#334155', fontSize: '1.05rem', fontWeight: 600 }}>
                            מכללה מוכרת ע&quot;י משרד העבודה ומשרד התחבורה
                        </div>
                        <div style={{ width: '1px', height: '24px', background: '#cbd5e1' }} className="divider"></div>
                        <div style={{ color: '#334155', fontSize: '1.05rem', fontWeight: 600 }}>
                            מרכז ההדרכה הגדול והמקצועי בישראל
                        </div>
                        <div style={{ width: '1px', height: '24px', background: '#cbd5e1' }} className="divider"></div>
                        <div style={{ color: '#334155', fontSize: '1.05rem', fontWeight: 600 }}>
                            ייבואן רשמי של TOPDON בישראל
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about-section" style={{ padding: '90px 20px', background: '#ffffff', color: '#334155', borderBottom: '1px solid #e2e8f0' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{ color: '#2563eb', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            המומחיות שלנו
                        </span>
                        <h2 style={{ fontSize: '2.3rem', fontWeight: 700, color: '#0f172a', marginTop: '8px' }}>
                            כשאיכות וניסיון נפגשים בעולם הרכב
                        </h2>
                    </div>

                    <div style={{
                        background: '#f8fafc',
                        padding: '40px',
                        borderRadius: '24px',
                        border: '1px solid #e2e8f0',
                        lineHeight: 1.8,
                        fontSize: '1.05rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)'
                    }}>
                        <p style={{ marginBottom: '20px', color: '#334155' }}>
                            מכללת מוטו גת מכשירה את העובדים בענף הרכב ברמות השונות ועל מערכות הרכב השונות, החל מיסודות ועד לרמת אבחון ושיפוץ מכלולים, הן בנושאים המכניים והן בנושאי האלקטרוניקה ומערכות בקרה ותקשורת מתקדמות.
                        </p>
                        <p style={{ marginBottom: '20px', color: '#334155' }}>
                            מכללת מוטו גת הינה מערך ההדרכה של מספר יבואני רכב פרטי ורכב כבד בישראל מעל 25 שנה. בנוסף, מערך ההדרכה מבוסס על תפיסת <strong>&quot;Custom made&quot;</strong>, התאמה טכנית לצרכי הלקוח.
                        </p>
                        <p style={{ marginBottom: '20px', color: '#334155' }}>
                            מכללת מוטו-גת הינה מכללה מוכרת ע&quot;י משרד העבודה ומשרד התחבורה. בנוסף, המכללה נבחרה שוב ושוב לבנות מערכי שיעור ולהכשיר את הגורמים השונים במערכת הביטחון במספר פרויקטים שונים, ומספקת שירותי ייעוץ לחברות וסטארטאפים טכנולוגים בענף הרכב.
                        </p>

                        <div style={{ marginTop: '30px', paddingTop: '25px', borderTop: '1px solid #e2e8f0' }}>
                            <h4 style={{ color: '#0f172a', fontSize: '1.1rem', marginBottom: '12px' }}>בין לקוחותינו המובילים:</h4>
                            <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                                משרד הביטחון, משרד החינוך, משרד העבודה, סוזוקי , דיפאל , LEXUS, טויוטה , MAN משאיות ואוטובוסים, קבוצת סקניה, קבוצת כלמוביל, IVECO, MAXUS, משטרת ישראל ועוד רבים...
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services-section" className="services" style={{ padding: '90px 20px 40px', background: '#f8fafc' }}>
                <div className="container">
                    <div className="sectionTitle" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '2.3rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
                            תחומי ההתמחות שלנו
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1.1rem' }}>
                            הכשרה מעשית עם הציוד המתקדם ביותר בשוק
                        </p>
                    </div>

                    <div className="servicesGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
                        {/* כרטיס 1 */}
                        <Link href="/courses" style={{ textDecoration: 'none' }}>
                            <div className="serviceCard" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', height: '100%', transition: 'transform 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                <img
                                    src="/images/pics/workshop.jpeg"
                                    alt="תמונה"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'contain',
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '10px' }}>הכשרות טכנולוגיות ודיאגנוסטיקה</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                        קורסים מעשיים לאבחון תקולות מורכבות, מערכות ניהול מנוע, רשתות תקשורת ברכב ורכבים חשמליים.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* כרטיס 2 */}
                        <Link href="/courses" style={{ textDecoration: 'none' }}>
                            <div className="serviceCard" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', height: '100%', transition: 'transform 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                <img
                                    src="/images/pics/Ecar.jpeg"
                                    alt="הסמכה לרכב חשמלי והיברידי"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'contain',
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '10px' }}>הסמכה לרכב חשמלי והיברידי</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                        הכשרה מקצועית מתקדמת לטיפול, עבודה בטיחותית ואבחון תקלות במערכות מתח גבוה ברכבים חשמליים והיברידיים.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* כרטיס 3 */}
                        <Link href="/courses" style={{ textDecoration: 'none' }}>
                            <div className="serviceCard" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', height: '100%', transition: 'transform 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                <img
                                    src="/images/pics/class.jpeg"
                                    alt="תמונה"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'contain',
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '10px' }}>הסמכות וייעוץ מקצועי</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                        לווי אישי למוסכים ולטכנאים, הכנות למבחני הסמכה ושדרוג מערכי השירות והטכנולוגיה.
                                    </p>
                                </div>
                            </div>
                        </Link>

                        {/* כרטיס 4 */}
                        <Link href="/courses" style={{ textDecoration: 'none' }}>
                            <div className="serviceCard" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', height: '100%', transition: 'transform 0.2s', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                <img
                                    src="/images/pics/transmission.jpeg"
                                    alt="ניהול מוסך"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'contain',
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '10px' }}>קורס ניהול מוסך</h3>
                                    <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                        הכשרה מקיפה לניהול מתקדם של מוסכים, הבנת היבטים עסקיים, תפעוליים ורגולטוריים בענף הרכב.
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Shop Categories Section */}
            <section id="catalog-section" style={{ padding: '80px 20px', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span style={{ color: '#2563eb', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            הקטלוג המקצועי שלנו
                        </span>
                        <h2 style={{ fontSize: '2.3rem', fontWeight: 700, color: '#0f172a', marginTop: '8px' }}>
                            ציוד, ספרות ועזרי למידה מתקדמים לעולם הרכב
                        </h2>
                        <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '10px' }}>
                            בחר את הקטגוריה המבוקשת לצפייה במוצרים המובילים בתחום
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        {/* מוצרי אבחון */}
                        <div style={{ background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
                            <img src="/images/pics/diagnostic.jpg" alt="מוצרי אבחון" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '12px' }}>מוצרי אבחון ודיאגנוסטיקה</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1 }}>
                                    סורקי תקלות מתקדמים, ציוד מעבדה ייעודי, ומערכות בדיקה ממוחשבות למוסכים ולטכנאים מקצועיים.
                                </p>
                                <Link href="/shop/diagnostic" style={{ display: 'inline-block', textAlign: 'center', background: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>
                                    צפה במוצרי האבחון
                                </Link>
                            </div>
                        </div>

                        {/* ספרים וספרות טכנית */}
                        <div style={{ background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
                            <img src="/images/pics/books.jpeg" alt="ספרים" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '12px' }}>ספרים וספרות טכנית</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1 }}>
                                    ספרי הדרכה מקצועיים, ספרות טכנית מורשית, מדריכי מערכות ניהול מנוע וחומרי עזר ללימוד עולם הרכב.
                                </p>
                                <Link href="/shop/books" style={{ display: 'inline-block', textAlign: 'center', background: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>
                                    צפה בספרים המקצועיים
                                </Link>
                            </div>
                        </div>

                        {/* אמצעי המחשה */}
                        <div style={{ background: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
                            <img src="/images/pics/autotech.jpeg" alt="אמצעי המחשה" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '12px' }}>אמצעי המחשה ועזרי לימוד</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1 }}>
                                    מודלים חתוכים, פאנלים הדרכתיים, ועזרי ויזואליזציה מתקדמים להמחשת פעולת מערכות הרכב בכיתות לימוד ובמוסכים.
                                </p>
                                <Link href="/shop/demonstration" style={{ display: 'inline-block', textAlign: 'center', background: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>
                                    צפה באמצעי ההמחשה
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* פאנל היצרנים והשותפים */}
            <section style={{
                padding: '50px 20px',
                background: '#f1f5f9',
                borderTop: '1px solid #e2e8f0',
                borderBottom: '1px solid #e2e8f0',
                margin: '0'
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h3 style={{
                        color: '#64748b',
                        fontSize: '0.95rem',
                        letterSpacing: '1.5px',
                        marginBottom: '35px',
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
                        gap: '45px'
                    }}>
                        {brands.map((brand, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '45px',
                                    transition: 'opacity 0.2s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    style={{
                                        maxHeight: '40px',
                                        maxWidth: '130px',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}