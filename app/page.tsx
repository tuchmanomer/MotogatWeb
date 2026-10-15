'use client';



import Link from 'next/link';
import { useEffect, useState } from 'react';
import TeachersPanel from '@/components/TeachersPanel';

// עיצוב דינאמי לכרטיסי "תחומי ההתמחות" ו"הקטלוג המקצועי" - באותו סגנון של כרטיסי הצוות
const cardStyles = `
    .serviceCard, .catalogCard {
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.6s ease;
    }
    .serviceCard:hover, .catalogCard:hover {
        transform: translateY(-6px);
        border-color: #bfdbfe !important;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 20px 40px -12px rgba(37, 99, 235, 0.25) !important;
    }
    .serviceCard img, .catalogCard img {
        transition: transform 0.5s ease;
    }
    .serviceCard:hover img, .catalogCard:hover img {
        transform: scale(1.06);
    }

    /* כל כרטיס הקטלוג לחיץ - הקישור של הכפתור נמתח על כל הכרטיס */
    .stretched-link::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
    }
    .catalogCard:hover .stretched-link {
        background: #1d4ed8 !important;
    }

    /* כניסה עדינה בגלילה - רק כש-JavaScript פעיל, כדי שהתוכן תמיד יוצג */
    .reveal-ready .reveal {
        opacity: 0;
        transform: translateY(24px);
    }
    .reveal-ready .reveal.is-visible {
        opacity: 1;
        transform: none;
    }
    .reveal-ready .reveal.is-visible:hover {
        transform: translateY(-6px);
    }

    /* פס הלוגואים של השותפים */
    .brands-panel {
        max-width: 1200px;
        margin: 0 auto;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 24px;
        padding: 28px 0 32px;
        box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -8px rgba(15, 23, 42, 0.10);
        overflow: hidden;
    }
    .brands-header {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 26px;
        padding: 0 20px;
    }
    .brands-title {
        margin: 0;
        color: #475569;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 1.5px;
    }
    .brands-toggle {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 1px solid #cbd5e1;
        background: #ffffff;
        color: #1d4ed8;
        font-size: 0.7rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }
    /* הלוגואים נעלמים בהדרגה בקצוות */
    .brands-viewport {
        direction: ltr;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
        mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
    }
    @keyframes brandsScroll {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
    }
    .brands-track {
        display: flex;
        align-items: center;
        width: max-content;
        animation: brandsScroll 40s linear infinite;
    }
    .brands-panel:hover .brands-track,
    .brands-track.is-paused {
        animation-play-state: paused;
    }
    .brand-logo {
        flex-shrink: 0;
        width: 170px;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 24px;
        box-sizing: border-box;
    }
    .brand-logo img {
        max-height: 42px;
        max-width: 120px;
        object-fit: contain;
        transition: transform 0.3s ease;
    }
    .brand-logo:hover img {
        transform: scale(1.08);
    }
    @media (max-width: 640px) {
        .brands-title { font-size: 0.85rem; letter-spacing: 0.5px; text-align: center; }
        .brand-logo { width: 130px; padding: 0 16px; }
        .brand-logo img { max-width: 96px; max-height: 34px; }
    }

    @media (prefers-reduced-motion: reduce) {
        .brands-track { animation: none; flex-wrap: wrap; justify-content: center; width: auto; }
        .brands-toggle { display: none; }
        .serviceCard:hover, .catalogCard:hover,
        .serviceCard:hover img, .catalogCard:hover img { transform: none; }
        .reveal-ready .reveal { opacity: 1; transform: none; }
    }
`;



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

    // עצירה ידנית של פס הלוגואים (נגישות: אפשרות לעצור תוכן שזז לבד)
    const [brandsPaused, setBrandsPaused] = useState(false);

    // הכרטיסים נכנסים בעדינות כשגוללים אליהם (אחד אחרי השני)
    useEffect(() => {
        const cards = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        document.documentElement.classList.add('reveal-ready');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const el = entry.target as HTMLElement;
                // כרטיסי ההתמחות עטופים בקישור - לכן מחפשים את הרשת שמכילה אותם
                const group = el.closest('.servicesGrid') || el.parentElement;
                const siblings = Array.from(group?.querySelectorAll('.reveal') || []);
                el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * 0.1}s`;
                el.classList.add('is-visible');
                // אחרי הכניסה מבטלים את העיכוב, כדי שאפקט ה-hover יגיב מיד
                setTimeout(() => { el.style.transitionDelay = ''; }, 1000);
                observer.unobserve(el);
            });
        }, { threshold: 0.15 });

        cards.forEach((card) => observer.observe(card));
        return () => {
            observer.disconnect();
            document.documentElement.classList.remove('reveal-ready');
        };
    }, []);

    return (

        <div>
            <style>{cardStyles}</style>

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


                }}

            >

                <div className="heroContent">

                    <h1 style={{ color: '#0f172a' }}>מכללת מוטו גת - מערך ההדרכה המוביל בישראל לעולם הרכב</h1>

                    <p style={{ color: '#475569' }}>

                        הדרכות עומק, ציוד אבחון מוסכי מתקדם ומסלולי הסמכה מעשיים לטכנאים ולחברות.

                    </p>



                    <div className="heroCTA" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>

                        {/* קפיצה לאזורים בעמוד הבית */}
                        <a href="#services-section" className="btnSecondary">
                            תחומי התמחות
                        </a>

                        <a href="#staff-section" className="btnPrimary">
                            צוות המכללה
                        </a>

                        <a href="#catalog-section" className="btnSecondary">
                            קטלוג מקצועי
                        </a>

                    </div>



                    {/* פס אמינות: 3 אריחים נפרדים עם אייקון. במחשב בשורה אחת, בטלפון אחד מתחת לשני */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                        gap: '14px',
                        marginTop: '50px',
                        padding: '14px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '20px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 10px 30px -10px rgba(15, 23, 42, 0.18)'
                    }}>
                        {[
                            {
                                text: 'מכללה מוכרת ע"י משרד העבודה ומשרד התחבורה',
                                icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" /></>
                            },
                            {
                                text: 'מרכז ההדרכה הגדול והמקצועי בישראל',
                                icon: <><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 2 9 2 12 0v-5" /></>
                            },
                            {
                                text: 'ייבואן רשמי של TOPDON בישראל',
                                icon: <><circle cx="12" cy="8" r="6" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>
                            },
                        ].map((item) => (
                            <div
                                key={item.text}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '12px',
                                    padding: '14px 16px',
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '14px',
                                    textAlign: 'center'
                                }}
                            >
                                <span style={{
                                    flexShrink: 0,
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '12px',
                                    background: '#eff6ff',
                                    color: '#2563eb',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        {item.icon}
                                    </svg>
                                </span>
                                <span style={{ color: '#0f172a', fontSize: '1rem', fontWeight: 600, lineHeight: 1.4 }}>
                                    {item.text}
                                </span>
                            </div>
                        ))}

                    </div>

                </div>

            </section>



            {/* About Section */}

            <section id="about-section" style={{ padding: '90px 20px', background: '#f8fafc', color: '#334155' }}>
                <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span style={{ color: '#2563eb', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            מכללת מוטו-גת
                        </span>
                        <h2 style={{ fontSize: '2.3rem', fontWeight: 700, color: '#0f172a', marginTop: '8px' }}>
                            כשידע וניסיון נפגשים בעולם הרכב
                        </h2>
                    </div>

                    <div style={{
                        background: '#ffffff',
                        padding: '40px',
                        borderRadius: '24px',
                        border: '1px solid #e2e8f0',
                        lineHeight: 1.8,
                        fontSize: '1.05rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)'
                    }}>
                        <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                            כשידע מניע את עולם הרכב
                        </h3>
                        <p style={{ marginBottom: '16px', color: '#334155' }}>
                            מכללת מוטו-גת היא מרכז מוביל להכשרה, הדרכה וייעוץ טכנולוגי בענף הרכב בישראל, עם ניסיון של למעלה מ-30 שנה בהכשרת אנשי מקצוע ובהובלת מערכי ההדרכה של יבואני רכב פרטי וכבד.
                        </p>
                        <p style={{ marginBottom: '16px', color: '#334155' }}>
                            המכללה מתמחה בהכשרה מקיפה, מיסודות הרכב ועד לרמות המתקדמות ביותר של אבחון תקלות בתחומי המכונאות, הדיאגנוסטיקה, החשמל, מערכות הבקרה והתקשורת המתקדמות.
                        </p>
                        <p style={{ marginBottom: '0', color: '#334155' }}>
                            ההכשרות משלבות ידע תיאורטי מעמיק עם יישום מעשי, תוך היכרות מעמיקה עם הטכנולוגיות המתחדשות והמערכות המתקדמות ביותר בענף הרכב.
                        </p>

                        <div style={{ marginTop: '32px' }}>
                            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                                היתרון שלנו הוא התאמה מדויקת לצורך.
                            </h3>
                            <p style={{ marginBottom: '16px', color: '#334155' }}>
                                תפיסת ה-<strong>Custom Made</strong> של מכללת מוטו-גת מאפשרת לבנות לכל לקוח מערך הכשרה ייעודי, המותאם לטכנולוגיה, לאתגרים המקצועיים ולדרישות בשטח.
                            </p>
                            <p style={{ marginBottom: '0', color: '#334155' }}>
                                המכללה מוכרת על ידי משרד העבודה ומשרד התחבורה, נבחרה לפתח מערכי לימוד ולהכשיר גורמים במערכת הביטחון במסגרת פרויקטים ייעודיים ומעניקה שירותי ייעוץ לחברות ולסטארטאפים טכנולוגיים בענף.
                            </p>
                        </div>

                        <div style={{ marginTop: '32px' }}>
                            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                                הניסיון שלנו. הסטנדרטים שלנו. האמון של המובילים בענף.
                            </h3>
                            <p style={{ marginBottom: '0', color: '#334155' }}>
                                בין לקוחותינו נמנים משרד הביטחון, משרד החינוך, משרד העבודה, משטרת ישראל, סוזוקי, דיפאל, LEXUS, טויוטה, MAN משאיות ואוטובוסים, קבוצת סקניה, קבוצת כלמוביל, IVECO, MAXUS וגופים מובילים נוספים.
                            </p>
                        </div>

                        <div style={{ marginTop: '32px' }}>
                            <h3 style={{ color: '#0f172a', fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>
                                אז, בואו נדבר על ההכשרה שלך
                            </h3>
                            <p style={{ marginBottom: '16px', color: '#334155' }}>
                                כל ארגון מתמודד עם אתגרים מקצועיים וטכנולוגיים משלו.
                                <br />
                                אנחנו כאן כדי להקשיב, להבין את הצרכים שלך ולבנות יחד פתרון הדרכה מדויק, מעשי ומותאם לך אישית.
                            </p>
                            <p style={{ marginBottom: '0', color: '#0f172a', fontWeight: 600 }}>
                                צור איתנו קשר, ספר לנו לאן אתה רוצה להגיע, אנחנו כבר נדע להניע את הגלגלים הנכונים
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

                            <div className="serviceCard reveal" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>

                                <img

                                    src="/images/pics/workshop.jpeg"

                                    alt="הכשרות טכנולוגיות ודיאגנוסטיקה"

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

                            <div className="serviceCard reveal" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>

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

                            <div className="serviceCard reveal" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>

                                <img

                                    src="/images/pics/class.jpeg"

                                    alt="הסמכות וייעוץ מקצועי"

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

                            <div className="serviceCard reveal" style={{ background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', height: '100%', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>

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



            {/* פאנל צוות המורים - נטען מלשונית STUFF בגיליון */}
            <TeachersPanel
                id="staff-section"
                group="management"
                title="הנהלת המכללה"
                subtitle="האנשים שמובילים את מוטו-גת"
            />
            <TeachersPanel group="teachers" />

            {/* Shop Categories Section */}

            <section id="catalog-section" style={{ padding: '80px 20px', background: '#f8fafc' }}>

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

                        <div className="catalogCard reveal" style={{ position: 'relative', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>

                            <img src="/images/pics/diagnostic.jpg" alt="מוצרי אבחון" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />

                            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

                                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '12px' }}>מוצרי אבחון ודיאגנוסטיקה</h3>

                                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1 }}>

                                    סורקי תקלות מתקדמים, ציוד מעבדה ייעודי, ומערכות בדיקה ממוחשבות למוסכים ולטכנאים מקצועיים.

                                </p>

                                <Link href="/shop/diagnostic" className="stretched-link" style={{ display: 'inline-block', textAlign: 'center', background: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>

                                    צפה במוצרי האבחון

                                </Link>

                            </div>

                        </div>



                        {/* ספרים וספרות טכנית */}

                        <div className="catalogCard reveal" style={{ position: 'relative', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>

                            <img src="/images/pics/books.jpeg" alt="ספרים" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />

                            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

                                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '12px' }}>ספרים וספרות טכנית</h3>

                                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1 }}>

                                    ספרי הדרכה מקצועיים, ספרות טכנית מורשית, מדריכי מערכות ניהול מנוע וחומרי עזר ללימוד עולם הרכב.

                                </p>

                                <Link href="/shop/books" className="stretched-link" style={{ display: 'inline-block', textAlign: 'center', background: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>

                                    צפה בספרים המקצועיים

                                </Link>

                            </div>

                        </div>



                        {/* אמצעי המחשה */}

                        <div className="catalogCard reveal" style={{ position: 'relative', background: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>

                            <img src="/images/pics/autotech.jpeg" alt="אמצעי המחשה" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />

                            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>

                                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '12px' }}>אמצעי המחשה ועזרי לימוד</h3>

                                <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1 }}>

                                    מודלים חתוכים, פאנלים הדרכתיים, ועזרי ויזואליזציה מתקדמים להמחשת פעולת מערכות הרכב בכיתות לימוד ובמוסכים.

                                </p>

                                <Link href="/shop/demonstration" className="stretched-link" style={{ display: 'inline-block', textAlign: 'center', background: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600 }}>

                                    צפה באמצעי ההמחשה

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>



            {/* פאנל היצרנים והשותפים - פס לוגואים נע ברציפות */}
            <section aria-label="שותפים, יצרנים ולקוחות" style={{ padding: '30px 20px 80px', background: '#f8fafc' }}>
                <div className="brands-panel">
                    <div className="brands-header">
                        <h3 className="brands-title">שותפים, יצרנים ולקוחות מובילים בתעשייה</h3>
                        <button
                            type="button"
                            className="brands-toggle"
                            onClick={() => setBrandsPaused((p) => !p)}
                            aria-label={brandsPaused ? 'הפעלת תנועת הלוגואים' : 'עצירת תנועת הלוגואים'}
                        >
                            {brandsPaused ? '▶' : '❚❚'}
                        </button>
                    </div>

                    <div className="brands-viewport">
                        {/* הרשימה מוצגת 4 פעמים כדי שהתנועה תהיה רציפה בלי קפיצה */}
                        <div className={`brands-track${brandsPaused ? ' is-paused' : ''}`}>
                            {[0, 1, 2, 3].map((copy) =>
                                brands.map((brand) => (
                                    <div className="brand-logo" key={`${copy}-${brand.name}`} aria-hidden={copy > 0 ? true : undefined}>
                                        <img src={brand.logo} alt={copy === 0 ? brand.name : ''} loading="lazy" />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>

        </div>

    );

}