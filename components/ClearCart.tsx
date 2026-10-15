'use client';

import { useEffect } from 'react';

// מרוקן את העגלה אחרי תשלום מוצלח ומעדכן את הבועה ב-Header
export default function ClearCart() {
    useEffect(() => {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
    }, []);

    return null;
}
