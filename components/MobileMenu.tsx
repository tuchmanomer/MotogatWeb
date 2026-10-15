'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// תפריט המבורגר למובייל - מוצג רק במסכים צרים (ראו .mobile-menu-btn ב-layout.tsx)
const LINKS = [
    { href: '/', label: 'בית' },
    { href: '/shop/diagnostic', label: 'חנות' },
    { href: '/courses', label: 'קורסים' },
    { href: '/articles', label: 'מאמרים' },
    { href: '/contact', label: 'השארת פרטים' },
];

export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const wrapperRef = useRef<HTMLDivElement>(null);

    // סגירה במעבר עמוד
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    // סגירה ב-Escape או בלחיצה מחוץ לתפריט
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        const onClick = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, [open]);

    return (
        <div ref={wrapperRef}>
            <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu-panel"
                aria-label={open ? 'סגירת התפריט' : 'פתיחת התפריט'}
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                    {open ? (
                        <>
                            <line x1="6" y1="6" x2="18" y2="18" />
                            <line x1="18" y1="6" x2="6" y2="18" />
                        </>
                    ) : (
                        <>
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="17" x2="20" y2="17" />
                        </>
                    )}
                </svg>
            </button>

            {open && (
                <nav id="mobile-menu-panel" className="mobile-menu-panel" aria-label="תפריט ראשי">
                    {LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={pathname === link.href ? 'is-active' : undefined}
                            aria-current={pathname === link.href ? 'page' : undefined}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            )}
        </div>
    );
}
