'use client';
import { useState } from 'react';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemName: string; // שם הקורס או המוצר
    itemType: 'קורס' | 'מוצר';
}

export default function LeadModal({ isOpen, onClose, itemName, itemType }: LeadModalProps) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        // החלף את המחרוזת למטה ב-Access Key שקיבלת מ-Web3Forms
        formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY');
        formData.append('subject', `פנייה חדשה באתר: ${itemType} - ${itemName}`);

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                setSubmitted(true);
            }
        } catch (err) {
            alert('אירעה שגיאה בשליחה. אנא נסה שנית.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
            <div style={{
                background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px', width: '100%', maxWidth: '450px', padding: '28px', position: 'relative'
            }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '16px', left: '16px', background: 'none', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>

                {submitted ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <h3 style={{ color: '#22c55e', fontSize: '1.5rem', marginBottom: '10px' }}>הפרטים נשלחו בהצלחה!</h3>
                        <p style={{ color: '#94a3b8' }}>ניצור איתך קשר בהקדם בנוגע ל-{itemName}.</p>
                        <button onClick={onClose} style={{ marginTop: '20px', background: '#3b82f6', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer' }}>סגור</button>
                    </div>
                ) : (
                    <>
                        <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '6px' }}>התעניינות ב-{itemType}</h3>
                        <p style={{ color: '#60a5fa', fontWeight: 600, marginBottom: '20px' }}>{itemName}</p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <input type="hidden" name="מתעניין_ב" value={`${itemType}: ${itemName}`} />

                            <div>
                                <label style={{ color: '#cbd5e1', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>שם מלא *</label>
                                <input required type="text" name="name" placeholder="ישראל ישראלי" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                            </div>

                            <div>
                                <label style={{ color: '#cbd5e1', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>מספר טלפון *</label>
                                <input required type="tel" name="phone" placeholder="050-0000000" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                            </div>

                            <div>
                                <label style={{ color: '#cbd5e1', fontSize: '0.85rem', display: 'block', marginBottom: '4px' }}>דואר אלקטרוני</label>
                                <input type="email" name="email" placeholder="name@example.com" style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
                            </div>

                            <button type="submit" disabled={loading} style={{ marginTop: '10px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                                {loading ? 'שולח...' : 'שלח פרטים לייעוץ'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
