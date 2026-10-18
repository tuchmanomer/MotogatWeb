'use client';

import { useState } from 'react';

type CartProduct = {
    id: string;
    title: string;
    price: string;
    image?: string;
    inStock?: boolean;
};

export default function AddToCartButton({
    product,
    style,
    label = '🛒 הוספה לעגלה',
}: {
    product: CartProduct;
    style?: React.CSSProperties;
    label?: string;
}) {
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        let cart: any[] = [];
        try {
            const saved = JSON.parse(localStorage.getItem('cart') || '[]');
            cart = Array.isArray(saved) ? saved : [];
        } catch (e) {
            cart = [];
        }

        // אם המוצר כבר בעגלה - מעלים כמות, אחרת מוסיפים אותו
        const existing = cart.find((item) => String(item.id) === String(product.id));
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
            existing.inStock = product.inStock !== false;
        } else {
            cart.push({ ...product, inStock: product.inStock !== false, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // עדכון הבועה באייקון העגלה ב-Header
        window.dispatchEvent(new Event('cartUpdated'));

        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <button
            className="cart-btn"
            type="button"
            onClick={handleAdd}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: added ? '#16a34a' : '#2563eb',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s',
                ...style,
            }}
        >
            {/* aria-live - קוראי מסך יכריזו "נוסף לעגלה" אחרי הלחיצה */}
            <span aria-live="polite">{added ? '✓ נוסף לעגלה' : label}</span>
        </button>
    );
}
