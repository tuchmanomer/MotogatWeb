'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
                setCartItems(savedCart);
            } catch (e) {
                setCartItems([]);
            }
        };
        loadCart();

        window.addEventListener('cartUpdated', loadCart);
        return () => window.removeEventListener('cartUpdated', loadCart);
    }, []);

    const updateQuantity = (id: string, delta: number) => {
        const updated = cartItems.map(item => {
            if (String(item.id) === String(id)) {
                const newQty = (item.quantity || 1) + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        }).filter(Boolean);

        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const removeItem = (id: string) => {
        const updated = cartItems.filter(item => String(item.id) !== String(id));
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const totalPrice = cartItems.reduce((sum, item) => {
        const cleanPrice = Number(String(item.price).replace(/[^0-9.-]+/g, '')) || 0;
        return sum + cleanPrice * (item.quantity || 1);
    }, 0);

    const handleCheckout = () => {
        const itemsSummary = cartItems.map(i => `- ${i.title} (כמות: ${i.quantity || 1}) - ₪${i.price}`).join('\n');
        const message = `שלום, אני מעוניין לבצע הזמנה וסליקה עבור הפריטים הבאים:\n\n${itemsSummary}\n\nסה״כ לתשלום: ₪${totalPrice}`;
        window.open(`https://wa.me/972548933777?text=${encodeURIComponent(message)}`, '_blank');
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px', color: '#1e293b', direction: 'rtl' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0f172a' }}>עגלת הקניות שלך ריקה</h2>
                <Link href="/shop/diagnostic" style={{ color: '#0284c7', fontSize: '1.1rem', textDecoration: 'none' }}>
                    ← חזרה לדגמי האבחון
                </Link>
            </div>
        );
    }

    return (
        <div style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto', color: '#1e293b', direction: 'rtl' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', fontWeight: 700, color: '#0f172a' }}>עגלת קניות</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        style={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            borderRadius: '16px',
                            padding: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '20px',
                            flexWrap: 'wrap'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {item.image && (
                                <img src={item.image} alt={item.title} style={{ width: '70px', height: '70px', objectFit: 'contain', background: '#f8fafc', borderRadius: '8px', padding: '5px', border: '1px solid #e2e8f0' }} />
                            )}
                            <div>
                                <h3 style={{ margin: '0 0 5px', fontSize: '1.2rem', color: '#0f172a' }}>{item.title}</h3>
                                <div style={{ color: '#0284c7', fontWeight: 'bold' }}>₪{item.price}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '8px', padding: '5px 10px', border: '1px solid #e2e8f0' }}>
                                <button onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
                                <span style={{ margin: '0 15px', fontWeight: 'bold', color: '#0f172a' }}>{item.quantity || 1}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                            </div>

                            <button
                                onClick={() => removeItem(item.id)}
                                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}
                            >
                                מחיקה
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', borderRadius: '16px', padding: '30px', textAlign: 'left' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px', textAlign: 'right' }}>
                    סה״כ לתשלום: <span style={{ color: '#0284c7' }}>₪{totalPrice.toLocaleString()}</span>
                </div>

                <button
                    onClick={handleCheckout}
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
                        textAlign: 'center',
                        transition: 'background-color 0.2s'
                    }}
                >
                    מעבר לתשלום / סליקה
                </button>
            </div>
        </div>
    );
}