'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CartIcon() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const updateCount = () => {
            try {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                const total = Array.isArray(cart)
                    ? cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
                    : 0;
                setCount(total);
            } catch (e) {
                setCount(0);
            }
        };
        updateCount();

        // cartUpdated - שינוי באותו טאב, storage - שינוי בטאב אחר
        window.addEventListener('cartUpdated', updateCount);
        window.addEventListener('storage', updateCount);
        return () => {
            window.removeEventListener('cartUpdated', updateCount);
            window.removeEventListener('storage', updateCount);
        };
    }, []);

    return (
        <Link
            href="/cart"
            aria-label={count > 0 ? `עגלת קניות, ${count} פריטים` : 'עגלת קניות'}
            title="עגלת קניות"
            className="cart-icon-link"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            {count > 0 && (
                <span className="cart-badge">{count > 99 ? '99+' : count}</span>
            )}
        </Link>
    );
}
