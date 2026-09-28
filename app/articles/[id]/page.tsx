'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { getSheetData } from '@/lib/sheets';

export const dynamic = 'force-dynamic';

type Article = Record<string, any>;

function cleanGoogleDocHtml(html: string) {
    const parser = new DOMParser();
    const documentHtml = parser.parseFromString(html, 'text/html');

    // שומר את כל ה-CSS ש-Google Docs יצר עבור צבעים, גדלים, בולד וכו'
    const styles = Array.from(documentHtml.querySelectorAll('style'))
        .map((style) => style.outerHTML)
        .join('\n');

    // הסרת אלמנטים לא רלוונטיים/מסוכנים
    documentHtml
        .querySelectorAll('script, iframe, object, embed, form')
        .forEach((element) => element.remove());

    // מסיר event handlers וקישורי javascript
    documentHtml.querySelectorAll('*').forEach((element) => {
        Array.from(element.attributes).forEach((attribute) => {
            const name = attribute.name.toLowerCase();
            const value = attribute.value.trim().toLowerCase();

            if (name.startsWith('on')) {
                element.removeAttribute(attribute.name);
            }

            if (
                (name === 'href' || name === 'src') &&
                value.startsWith('javascript:')
            ) {
                element.removeAttribute(attribute.name);
            }
        });
    });

    // כל מספר מבודד מהטקסט העברי סביבו. בלי זה פסקה שמתחילה ב-1.
    // או מכילה 400V / 3.5 עשויה לשנות את כיוון התצוגה שלה.
    const walker = documentHtml.createTreeWalker(
        documentHtml.body,
        NodeFilter.SHOW_TEXT
    );
    const textNodes: Text[] = [];
    let node: Node | null;

    while ((node = walker.nextNode())) {
        if (
            node.textContent?.match(/\d/) &&
            node.parentElement?.tagName !== 'STYLE' &&
            node.parentElement?.tagName !== 'SCRIPT'
        ) {
            textNodes.push(node as Text);
        }
    }

    textNodes.forEach((textNode) => {
        const parts = (textNode.textContent || '').split(
            /(\d+(?:[.,:/-]\d+)*[%₪]?)/g
        );

        if (parts.length === 1) return;

        const fragment = documentHtml.createDocumentFragment();

        parts.forEach((part) => {
            if (!part) return;

            if (/^\d+(?:[.,:/-]\d+)*[%₪]?$/.test(part)) {
                const number = documentHtml.createElement('bdi');
                number.className = 'inline-number';
                number.setAttribute('dir', 'ltr');
                number.textContent = part;
                fragment.appendChild(number);
            } else {
                fragment.appendChild(documentHtml.createTextNode(part));
            }
        });

        textNode.parentNode?.replaceChild(fragment, textNode);
    });

    // Google Docs מייצא לעתים תמונה בתוך מעטפת עם height קבוע ו-overflow: hidden.
    // מאפסים את העטיפות עד לרכיב הבלוק הקרוב, כדי שהתמונה תוצג בשלמותה ובמרכז.
    documentHtml.querySelectorAll('img').forEach((image) => {
        image.classList.add('doc-image');

        let parent = image.parentElement;

        while (parent && parent !== documentHtml.body) {
            parent.classList.add('doc-image-container');
            parent.style.setProperty('display', 'block', 'important');
            parent.style.setProperty('width', '100%', 'important');
            parent.style.setProperty('height', 'auto', 'important');
            parent.style.setProperty('max-height', 'none', 'important');
            parent.style.setProperty('min-height', '0', 'important');
            parent.style.setProperty('overflow', 'visible', 'important');
            parent.style.setProperty('clip-path', 'none', 'important');
            parent.style.setProperty('transform', 'none', 'important');
            parent.style.setProperty('float', 'none', 'important');
            parent.style.setProperty('text-align', 'center', 'important');

            if (['P', 'DIV', 'TD', 'LI'].includes(parent.tagName)) break;
            parent = parent.parentElement;
        }

        image.style.setProperty('display', 'block', 'important');
        image.style.setProperty('position', 'static', 'important');
        image.style.setProperty('float', 'none', 'important');
        image.style.setProperty('transform', 'none', 'important');
        image.style.setProperty('width', 'auto', 'important');
        image.style.setProperty('max-width', '60%', 'important');
        image.style.setProperty('height', 'auto', 'important');
        image.style.setProperty('max-height', 'none', 'important');
        image.style.setProperty('object-fit', 'contain', 'important');
        image.style.setProperty('object-position', 'center', 'important');
        image.style.setProperty('margin', '20px auto', 'important');
    });

    return `
    ${styles}
    <div class="google-doc-original" dir="rtl">
      ${documentHtml.body.innerHTML}
    </div>
  `;
}

export default function ArticleDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const requestedId = String(resolvedParams.id).trim();

    const [article, setArticle] = useState<Article | null>(null);
    const [articleHtmlContent, setArticleHtmlContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function loadData() {
            try {
                const articles = await getSheetData(
                    'articles' as 'courses' | 'products'
                );

                const safeArticles: Article[] = Array.isArray(articles)
                    ? articles
                    : [];

                const numericId = Number(requestedId);

                const foundArticle =
                    safeArticles.find((item, index) => {
                        const rowId =
                            item.id !== undefined && item.id !== null
                                ? String(item.id).trim()
                                : '';

                        return (
                            rowId === requestedId ||
                            (!Number.isNaN(numericId) && index + 1 === numericId) ||
                            (!Number.isNaN(numericId) && index === numericId)
                        );
                    }) ||
                    (!Number.isNaN(numericId)
                        ? safeArticles[numericId - 1]
                        : undefined) ||
                    safeArticles[0] ||
                    {};

                if (cancelled) return;

                setArticle(foundArticle);

                const rawContent =
                    foundArticle.content ||
                    foundArticle.article ||
                    foundArticle.artical ||
                    Object.values(foundArticle).find(
                        (value) =>
                            typeof value === 'string' &&
                            value.includes('docs.google.com/document')
                    ) ||
                    '';

                if (
                    typeof rawContent === 'string' &&
                    rawContent.includes('docs.google.com/document')
                ) {
                    const match = rawContent.match(/\/d\/([a-zA-Z0-9-_]+)/);

                    if (match?.[1]) {
                        const documentId = match[1];
                        const exportUrl = `https://docs.google.com/document/d/${documentId}/export?format=html`;

                        const response = await fetch(exportUrl);

                        if (!response.ok) {
                            throw new Error('לא ניתן לטעון את תוכן המאמר מ-Google Docs');
                        }

                        const googleDocHtml = await response.text();

                        if (!cancelled) {
                            setArticleHtmlContent(cleanGoogleDocHtml(googleDocHtml));
                        }
                    } else if (!cancelled) {
                        setArticleHtmlContent(rawContent);
                    }
                } else if (!cancelled) {
                    setArticleHtmlContent(String(rawContent));
                }
            } catch (error) {
                console.error('Error loading article:', error);

                if (!cancelled) {
                    setArticleHtmlContent(
                        'אירעה שגיאה בטעינת המאמר. נסו לרענן את העמוד.'
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            cancelled = true;
        };
    }, [requestedId]);

    const title = article
        ? article.title || article.Description || article.description || 'מאמר מקצועי'
        : 'טוען...';

    if (loading) {
        return (
            <div
                dir="rtl"
                style={{
                    minHeight: '100vh',
                    backgroundColor: '#f8fafc',
                    color: '#1e293b',
                    paddingTop: '150px',
                    textAlign: 'center',
                }}
            >
                <p style={{ fontSize: '1.2rem', color: '#64748b' }}>
                    טוען מאמר...
                </p>
            </div>
        );
    }

    const containsHtml =
        articleHtmlContent.includes('<') && articleHtmlContent.includes('>');

    return (
        <main
            dir="rtl"
            style={{
                minHeight: '100vh',
                backgroundColor: '#f8fafc',
                color: '#1e293b',
                paddingTop: '100px',
                paddingBottom: '80px',
                textAlign: 'right',
            }}
        >
            <div
                style={{
                    maxWidth: '850px',
                    margin: '0 auto',
                    padding: '0 20px',
                }}
            >
                <div style={{ marginBottom: '30px', textAlign: 'right' }}>
                    <Link
                        href="/articles"
                        style={{
                            color: '#0284c7',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        ← חזרה לכל המאמרים
                    </Link>
                </div>

                <article
                    style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        padding: 'clamp(24px, 5vw, 48px)',
                        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)',
                        border: '1px solid #e2e8f0',
                        overflow: 'hidden',
                    }}
                >
                    <h1
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
                            fontWeight: 800,
                            color: '#0f172a',
                            margin: '0 0 24px',
                            lineHeight: 1.25,
                            textAlign: 'right',
                            direction: 'rtl',
                        }}
                    >
                        {title}
                    </h1>

                    <hr
                        style={{
                            border: 'none',
                            borderTop: '1px solid #e2e8f0',
                            margin: '32px 0',
                        }}
                    />

                    <div
                        className="google-doc-content"
                        dir="rtl"
                        style={{
                            fontSize: '1.125rem',
                            lineHeight: 1.6, /* תוקן מ-2 ל-1.6 לשורות צפופות ומאוזנות יותר */
                            color: '#334155',
                            direction: 'rtl',
                            textAlign: 'right',
                            unicodeBidi: 'isolate',
                        }}
                    >
                        {containsHtml ? (
                            <div
                                dir="rtl"
                                dangerouslySetInnerHTML={{ __html: articleHtmlContent }}
                            />
                        ) : (
                            <div style={{ whiteSpace: 'pre-wrap', direction: 'rtl' }}>
                                {articleHtmlContent || 'תוכן המאמר טרם הוזן.'}
                            </div>
                        )}
                    </div>

                    <style jsx global>{`
            .google-doc-content,
            .google-doc-content .google-doc-original {
              direction: rtl !important;
              text-align: right !important;
              unicode-bidi: isolate !important;
            }

            .google-doc-content .google-doc-original {
              max-width: 100%;
              overflow-wrap: anywhere;
            }

            .google-doc-content .google-doc-original p {
              direction: rtl !important;
              text-align: right !important;
              unicode-bidi: isolate !important;
              margin-top: 0;
              margin-bottom: 1em; /* תוקן מ-1.35em ל-1em בלבד כדי לצמצם רווחים בין פסקאות */
              line-height: 1.6 !important; /* אחידות לרווח השורות בתוך הפסקאות */
            }

            .google-doc-content .google-doc-original h1,
            .google-doc-content .google-doc-original h2,
            .google-doc-content .google-doc-original h3,
            .google-doc-content .google-doc-original h4,
            .google-doc-content .google-doc-original h5,
            .google-doc-content .google-doc-original h6 {
              direction: rtl !important;
              text-align: right !important;
              line-height: 1.3;
              margin-top: 1.4em; /* צמצום מרווח מעל כותרות */
              margin-bottom: 0.5em; /* צמצום מרווח מתחת לכותרות */
            }

            .google-doc-content .google-doc-original h1 {
              font-size: 2rem;
            }

            .google-doc-content .google-doc-original h2 {
              font-size: 1.5rem;
            }

            .google-doc-content .google-doc-original h3 {
              font-size: 1.25rem;
            }

            .google-doc-content .google-doc-original strong,
            .google-doc-content .google-doc-original b {
              font-weight: 700;
            }

            .google-doc-content .google-doc-original u {
              text-underline-offset: 3px;
            }

            .google-doc-content .google-doc-original a {
              color: #0284c7;
              text-decoration: underline;
              text-underline-offset: 3px;
            }

            .google-doc-content .google-doc-original ul,
            .google-doc-content .google-doc-original ol {
              direction: rtl !important;
              text-align: right !important;
              padding-right: 1.7rem !important;
              padding-left: 0 !important;
              margin: 1rem 0;
            }

            .google-doc-content .google-doc-original li {
              direction: rtl !important;
              text-align: right !important;
              unicode-bidi: isolate !important;
              margin-bottom: 0.4rem;
              line-height: 1.6 !important;
            }

            .google-doc-content .google-doc-original .inline-number {
              direction: ltr !important;
              unicode-bidi: isolate !important;
              display: inline-block;
            }

            .google-doc-content .google-doc-original .doc-image-container {
              display: block !important;
              width: 100% !important;
              max-width: 100% !important;
              height: auto !important;
              max-height: none !important;
              min-height: 0 !important;
              overflow: visible !important;
              clip-path: none !important;
              transform: none !important;
              float: none !important;
              text-align: center !important;
            }

            .google-doc-content .google-doc-original .doc-image {
              display: block !important;
              position: static !important;
              float: none !important;
              transform: none !important;
              width: auto !important;
              max-width: 60% !important;
              height: auto !important;
              max-height: none !important;
              object-fit: contain !important;
              object-position: center !important;
              margin: 20px auto !important;
              border-radius: 12px;
              box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
            }

            .google-doc-content .google-doc-original table {
              display: block;
              max-width: 100%;
              overflow-x: auto;
              direction: rtl !important;
              margin: 1.5rem 0;
              border-collapse: collapse;
            }

            .google-doc-content .google-doc-original td,
            .google-doc-content .google-doc-original th {
              text-align: right;
              vertical-align: top;
              border: 1px solid #e2e8f0;
              padding: 0.75rem;
            }

            @media (max-width: 640px) {
              .google-doc-content {
                font-size: 1rem !important;
              }

              .google-doc-content .google-doc-original h1 {
                font-size: 1.6rem;
              }

              .google-doc-content .google-doc-original h2 {
                font-size: 1.35rem;
              }

              .google-doc-content .google-doc-original .doc-image {
                max-width: 85% !important;
              }
            }
          `}</style>
                </article>
            </div>
        </main>
    );
}