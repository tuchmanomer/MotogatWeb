import Link from 'next/link';
import { getSheetData } from '@/lib/sheets';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
    const articles = await getSheetData('articles' as 'courses' | 'products');
    const safeArticles = Array.isArray(articles) ? articles : [];

    return (
        <div className="container pageWrapper" style={{ paddingTop: '120px', paddingBottom: '80px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
                <h1 className="pageTitle" style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, color: '#0f172a' }}>
                    כתבות ומאמרים
                </h1>
                <p className="pageSubtitle" style={{ textAlign: 'center', color: '#64748b', fontSize: '1.1rem', marginTop: '10px', marginBottom: '40px' }}>
                    מגוון מאמרים מקצועיים, מדריכים וחידושים עולמיים בתחום הדיאגנוסטיקה ומערכות רכב מתקדמות.
                </p>

                {/* רשימת הכרטיסיות */}
                {safeArticles.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#64748b', marginTop: '40px', fontSize: '1.1rem' }}>
                        כרגע אין מאמרים זמינים להצגה.
                    </p>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '30px', alignItems: 'stretch' }}>
                        {safeArticles.map((article: any, idx: number) => {
                            const articleId = (article.id !== undefined && article.id !== null && String(article.id).trim() !== '')
                                ? article.id
                                : (idx + 1);

                            return (
                                <Link
                                    key={`article-${articleId}`}
                                    href={`/articles/${articleId}`}
                                    style={{
                                        background: '#1e293b',
                                        borderRadius: '20px',
                                        padding: '16px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        boxShadow: '0 10px 20px -5px rgba(15, 23, 42, 0.15)',
                                        textDecoration: 'none',
                                        height: '100%',
                                        boxSizing: 'border-box',
                                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div>
                                        <div style={{
                                            background: '#ffffff', // רקע לבן בתוך הקונטיינר של התמונה
                                            borderRadius: '14px',
                                            overflow: 'hidden',
                                            marginBottom: '16px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '200px',
                                            padding: '12px', // מרווח פנימי עדין מסביב לתמונה
                                            border: '1px solid #e2e8f0', // מסגרת עדינה תואמת
                                            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)'
                                        }}>
                                            {article.image ? (
                                                <img
                                                    src={article.image}
                                                    alt={article.title}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'contain' // השתמשנו ב-contain כדי למנוע חיתוך של תמונות שקופות או מלבניות
                                                    }}
                                                />
                                            ) : (
                                                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>אין תמונה זמינה</div>
                                            )}
                                        </div>

                                        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#ffffff', fontWeight: 'bold', padding: '0 8px' }}>
                                            {article.title}
                                        </h3>

                                        <p style={{
                                            color: '#94a3b8',
                                            fontSize: '0.9rem',
                                            lineHeight: '1.5',
                                            marginBottom: '16px',
                                            padding: '0 8px',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {article.description}
                                        </p>
                                    </div>

                                    <div style={{ padding: '0 8px 8px 8px', display: 'flex', justifyContent: 'flex-start' }}>
                                        <span style={{
                                            color: '#38bdf8',
                                            fontWeight: 600,
                                            fontSize: '0.9rem',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}>
                                            לקריאת המאמר ←
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                <div style={{ marginTop: '60px', textAlign: 'center' }}>
                    <Link href="/" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 500, fontSize: '1.05rem' }}>
                        ← חזרה לעמוד הבית
                    </Link>
                </div>
            </div>
        </div>
    );
}