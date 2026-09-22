'use client';
import { useState } from 'react';
import LeadModal from '../components/LeadModal';

export default function ShopList({ products }: { products: any[] }) {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {products.map((product) => (
                    <div key={product.id || product.title} style={{ background: 'rgba(30, 41, 59, 0.4)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                        {product.image && <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
                        <div style={{ padding: '20px' }}>
                            <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>{product.title}</h3>
                            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '16px' }}>{product.description}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.2rem' }}>{product.price} ₪</span>
                                <button
                                    onClick={() => setSelectedProduct(product.title)}
                                    style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    פרטים והזמנה
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <LeadModal
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                itemName={selectedProduct || ''}
                itemType="מוצר"
            />
        </>
    );
}