'use client';

import { useEffect, useState } from 'react';

// כפתור נגישות עגול בפינה הימנית התחתונה - פותח וסוגר את התפריט של תוסף נגיש-לי.
// קובצי התוסף עצמם לא משתנים (לפי הרישיון) - רק המיקום וההסתרה של הפס השחור נעשים מבחוץ.

// מיקום התפריט כשהוא פתוח - מעל הכפתור העגול
const MENU_POSITION: Record<string, string> = { top: 'auto', left: 'auto', right: '20px', bottom: '88px' };

export default function AccessibilityButton() {
    const [ready, setReady] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let observer: MutationObserver | null = null;

        // התוסף שומר מיקום שהגולש בחר ומחיל אותו עם !important - מחזירים תמיד לפינה הימנית התחתונה
        const pin = (bar: HTMLElement) => {
            for (const [prop, value] of Object.entries(MENU_POSITION)) {
                if (bar.style.getPropertyValue(prop) !== value || bar.style.getPropertyPriority(prop) !== 'important') {
                    bar.style.setProperty(prop, value, 'important');
                }
            }
        };

        const setup = () => {
            const bar = document.getElementById('NagishLiBar');
            const strip = document.getElementById('NagishLiBarStrip');
            if (!bar || !strip) return false;

            pin(bar);
            setOpen(strip.classList.contains('open'));
            observer = new MutationObserver(() => {
                pin(bar);
                setOpen(strip.classList.contains('open'));
            });
            observer.observe(bar, { attributes: true, attributeFilter: ['style'] });
            observer.observe(strip, { attributes: true, attributeFilter: ['class'] });
            setReady(true);
            return true;
        };

        // התוסף נטען מאוחר (lazyOnload) - מחכים שיופיע
        if (setup()) return () => observer?.disconnect();
        const timer = setInterval(() => {
            if (setup()) clearInterval(timer);
        }, 500);
        return () => {
            clearInterval(timer);
            observer?.disconnect();
        };
    }, []);

    // אם התוסף לא נטען - לא מציגים כפתור שלא עושה כלום
    if (!ready) return null;

    return (
        <button
            type="button"
            className="a11y-fab"
            onClick={() => document.getElementById('NagishLiTitle')?.click()}
            aria-label={open ? 'סגירת תפריט הנגישות' : 'פתיחת תפריט הנגישות'}
            aria-expanded={open}
            title="נגישות"
        >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.5 6c-2.61.7-5.67 1-8.5 1s-5.89-.3-8.5-1L3 8c1.86.5 4 .83 6 1v13h2v-6h2v6h2V9c2-.17 4.14-.5 6-1l-.5-2zM12 6c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
            </svg>
        </button>
    );
}
