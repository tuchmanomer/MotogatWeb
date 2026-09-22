'use client';

import { useRouter } from 'next/navigation';

export default function AddToCartButton({ product }: { product: any }) {
    const router = useRouter();

    const handleAddToCart = () => {
        try {
            const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const index = existingCart.findIndex((item: any) => String(item.id) === String(product.id));

            if (index > -1) {
                existingCart[index].quantity = (existingCart[index].quantity || 1) + 1;
            } else {
                existingCart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(existingCart));
            window.dispatchEvent(new Event('cartUpdated'));

            // מעבר מיידי לעמוד העגלה
            router.push('/cart');
        } catch (error) {
            console.error('Error adding to cart', error);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            style={{
                width: '100%',
                backgroundColor: '#16a34a',
                color: '#fff',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
        >
            הוספה לעגלה
        </button>
    );
}