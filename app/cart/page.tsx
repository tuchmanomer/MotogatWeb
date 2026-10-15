'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// מחיר המשלוח מוצג כאן בלבד - השרת מחשב אותו בעצמו (app/api/checkout/route.ts)
const SHIPPING_PRICE = 60;

export default function CartPage() {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [customer, setCustomer] = useState({ name: '', phone: '', email: '', city: '', address: '' });
    const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup' | ''>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadCart = () => {
            try {
                const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
                setCartItems(Array.isArray(savedCart) ? savedCart : []);
            } catch (e) {
                setCartItems([]);
            }
        };
        loadCart();

        window.addEventListener('cartUpdated', loadCart);
        return () => window.removeEventListener('cartUpdated', loadCart);
    }, []);

    // שמירת העגלה ועדכון הבועה באייקון העגלה ב-Header
    const saveCart = (updated: any[]) => {
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const updateQuantity = (id: string, delta: number) => {
        const updated = cartItems.map(item => {
            if (String(item.id) === String(id)) {
                const newQty = (item.quantity || 1) + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        }).filter(Boolean);

        saveCart(updated);
    };

    const removeItem = (id: string) => {
        const updated = cartItems.filter(item => String(item.id) !== String(id));
        saveCart(updated);
    };

    const itemsTotal = cartItems.reduce((sum, item) => {
        const cleanPrice = Number(String(item.price).replace(/[^0-9.-]+/g, '')) || 0;
        return sum + cleanPrice * (item.quantity || 1);
    }, 0);
    const shippingCost = shippingMethod === 'delivery' ? SHIPPING_PRICE : 0;
    const totalPrice = itemsTotal + shippingCost;

    // מעבר לדף התשלום של SUMIT - הסכום מחושב בשרת לפי הגיליון, לא לפי העגלה
    const handleCheckout = async () => {
        setError('');

        if (!customer.name.trim() || !customer.phone.trim() || !customer.email.trim()) {
            setError('יש למלא שם לחשבונית, טלפון ואימייל');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
            setError('כתובת האימייל לא תקינה');
            return;
        }
        if (!shippingMethod) {
            setError('יש לבחור משלוח או איסוף עצמי');
            return;
        }
        if (shippingMethod === 'delivery' && (!customer.city.trim() || !customer.address.trim())) {
            setError('למשלוח יש למלא עיר וכתובת');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cartItems.map(i => ({ id: i.id, quantity: i.quantity || 1 })),
                    customer,
                    shippingMethod,
                }),
            });
            const data = await res.json();

            if (!res.ok || !data.redirectUrl) {
                setError(data.error || 'לא ניתן לפתוח את דף התשלום כרגע');
                setLoading(false);
                return;
            }

            window.location.href = data.redirectUrl;
        } catch (e) {
            setError('שגיאת תקשורת. נסו שוב.');
            setLoading(false);
        }
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px 14px',
        borderRadius: '10px',
        border: '1px solid #cbd5e1',
        fontSize: '1rem',
        boxSizing: 'border-box',
        direction: 'rtl',
        color: '#0f172a',
        background: '#fff'
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '100px 20px', color: '#1e293b', direction: 'rtl' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0f172a' }}>עגלת הקניות שלך ריקה</h2>
                <Link href="/shop/diagnostic" style={{ color: '#0369a1', fontSize: '1.1rem', textDecoration: 'none' }}>
                    ← חזרה לחנות
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
                                <h3 style={{ margin: '0 0 5px', fontSize: '1.2rem', color: '#0f172a' }}>
                                    {item.title}
                                    {item.inStock === false && <span style={{ color: '#f59e0b' }}> *</span>}
                                </h3>
                                <div style={{ color: '#0284c7', fontWeight: 'bold' }}>₪{item.price}</div>
                                {/* זמן אספקה לפי מלאי */}
                                {item.inStock === false ? (
                                    <div style={{ color: '#b45309', fontSize: '0.85rem', fontWeight: 600, marginTop: '4px' }}>
                                        * לא זמין במלאי · זמן אספקה 21 ימי עסקים
                                    </div>
                                ) : (
                                    <div style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: 600, marginTop: '4px' }}>
                                        במלאי · זמן אספקה 7 ימי עסקים
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '8px', padding: '5px 10px', border: '1px solid #e2e8f0' }}>
                                <button type="button" aria-label={`הפחתת כמות: ${item.title}`} onClick={() => updateQuantity(item.id, -1)} style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '1.2rem', cursor: 'pointer' }}>-</button>
                                <span style={{ margin: '0 15px', fontWeight: 'bold', color: '#0f172a' }}>{item.quantity || 1}</span>
                                <button type="button" aria-label={`הוספת כמות: ${item.title}`} onClick={() => updateQuantity(item.id, 1)} style={{ background: 'none', border: 'none', color: '#0f172a', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
                            </div>

                            <button
                                type="button"
                                aria-label={`מחיקת ${item.title} מהעגלה`}
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
                {/* בחירת אופן קבלת ההזמנה */}
                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>אופן קבלת ההזמנה</div>
                    <div role="radiogroup" aria-label="אופן קבלת ההזמנה" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                            { value: 'delivery' as const, label: 'משלוח עד הבית', price: `₪${SHIPPING_PRICE}` },
                            { value: 'pickup' as const, label: 'איסוף עצמי מקיסריה', price: 'חינם' },
                        ].map(option => (
                            <label
                                key={option.value}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '10px',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: shippingMethod === option.value ? '2px solid #0284c7' : '1px solid #cbd5e1',
                                    background: shippingMethod === option.value ? '#f0f9ff' : '#fff',
                                    cursor: 'pointer',
                                    color: '#0f172a',
                                    fontWeight: 600
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input
                                        type="radio"
                                        name="shippingMethod"
                                        value={option.value}
                                        checked={shippingMethod === option.value}
                                        onChange={() => setShippingMethod(option.value)}
                                        style={{ width: '18px', height: '18px', accentColor: '#0284c7' }}
                                    />
                                    {option.label}
                                </span>
                                <span style={{ color: '#0284c7' }}>{option.price}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'right', color: '#475569', fontSize: '1rem', marginBottom: '6px' }}>
                    מוצרים: ₪{itemsTotal.toLocaleString()}
                    {shippingMethod === 'delivery' && <> · משלוח: ₪{SHIPPING_PRICE}</>}
                </div>
                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '6px', textAlign: 'right' }}>
                    סה״כ: <span style={{ color: '#0284c7' }}>₪{totalPrice.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '20px', textAlign: 'right' }}>
                    לא כולל מע&quot;מ. הסכום הסופי יוצג בדף התשלום.
                </div>
                {cartItems.some(item => item.inStock === false) && (
                    <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '10px 14px', color: '#92400e', fontSize: '0.9rem', marginBottom: '20px', textAlign: 'right' }}>
                        * בהזמנה יש מוצרים שאינם במלאי - זמן האספקה של ההזמנה יהיה עד 21 ימי עסקים.
                    </div>
                )}

                {/* פרטי הלקוח לחשבונית */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', textAlign: 'right' }}>
                    <input
                        type="text"
                        placeholder="שם לחשבונית *"
                        aria-label="שם לחשבונית"
                        aria-required="true"
                        autoComplete="name"
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        style={inputStyle}
                    />
                    <input
                        type="tel"
                        placeholder="טלפון *"
                        aria-label="טלפון"
                        aria-required="true"
                        autoComplete="tel"
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        style={inputStyle}
                    />
                    <input
                        type="email"
                        placeholder="אימייל לקבלת החשבונית *"
                        aria-label="אימייל לקבלת החשבונית"
                        aria-required="true"
                        autoComplete="email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        style={inputStyle}
                    />

                    {/* כתובת למשלוח - רק למי שבחר משלוח */}
                    {shippingMethod === 'delivery' && (
                        <>
                            <input
                                type="text"
                                placeholder="עיר *"
                        aria-label="עיר"
                        aria-required="true"
                                autoComplete="address-level2"
                                value={customer.city}
                                onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                                style={inputStyle}
                            />
                            <input
                                type="text"
                                placeholder="רחוב, מספר בית ודירה *"
                        aria-label="רחוב, מספר בית ודירה"
                        aria-required="true"
                                autoComplete="street-address"
                                value={customer.address}
                                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                                style={inputStyle}
                            />
                        </>
                    )}

                    {shippingMethod === 'pickup' && (
                        <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '12px 14px', color: '#475569', fontSize: '0.95rem' }}>
                            📍 האיסוף מקיסריה. ניצור איתך קשר לתיאום מועד האיסוף.
                        </div>
                    )}
                </div>

                {error && (
                    <div role="alert" style={{ color: '#b91c1c', fontWeight: 600, marginBottom: '15px', textAlign: 'right' }}>
                        {error}
                    </div>
                )}

                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    style={{
                        width: '100%',
                        backgroundColor: loading ? '#86efac' : '#16a34a',
                        color: '#fff',
                        padding: '16px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        cursor: loading ? 'wait' : 'pointer',
                        textAlign: 'center',
                        transition: 'background-color 0.2s'
                    }}
                >
                    {loading ? 'מעביר לדף התשלום...' : 'מעבר לתשלום מאובטח 🔒'}
                </button>
            </div>
        </div>
    );
}
