'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

function ContactFormContent() {
    const searchParams = useSearchParams();
    const subjectParam = searchParams.get('subject') || '';

    // כתובת ה-Web App של Google Apps Script
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzFQM-7JsB963FDWylSfL206jlczTgGppiMseQm1_9zehSNl5wIcHHyQVrkyY59ztCSPA/exec';

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        subject: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (subjectParam) {
            setFormData((prev) => ({
                ...prev,
                subject: subjectParam,
            }));
        }
    }, [subjectParam]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formPayload = new FormData();
        formPayload.append('fullName', formData.fullName);
        formPayload.append('phone', formData.phone);
        formPayload.append('email', formData.email);
        formPayload.append('course', formData.subject);
        formPayload.append('notes', formData.message);

        try {
            await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formPayload,
                mode: 'no-cors'
            });

            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('אירעה שגיאה בשליחת הנתונים, אנא נסה שוב.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '50px 30px',
                background: '#1e293b',
                borderRadius: '18px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                maxWidth: '650px',
                margin: '0 auto',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>✅</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#38bdf8' }}>הפרטים נשלחו בהצלחה!</h3>
                <p style={{ color: '#94a3b8', fontSize: '1.05rem', marginBottom: '30px' }}>
                    תודה שפנית אלינו. צוות מוטו-גת יצור איתך קשר בהקדם.
                </p>
                <Link href="/" style={{
                    background: '#2563eb',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    display: 'inline-block'
                }}>
                    חזרה לעמוד הבית
                </Link>
            </div>
        );
    }

    return (
        <div style={{
            maxWidth: '650px',
            margin: '0 auto',
            background: '#1e293b',
            padding: '40px',
            borderRadius: '18px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
            boxSizing: 'border-box'
        }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px', width: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>שם מלא *</label>
                    <input
                        type="text"
                        required
                        placeholder="ישראל ישראלי"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>טלפון *</label>
                    <input
                        type="tel"
                        required
                        placeholder="050-0000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>אימייל</label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>נושא / התעניינות (קורס/מוצר)</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="נושא הפנייה או הקורס המבוקש"
                        style={{
                            width: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>הערות נוספות</label>
                    <textarea
                        rows={4}
                        placeholder="פרט במה נוכל לעזור..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            padding: '14px 16px',
                            borderRadius: '12px',
                            background: '#0f172a',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#fff',
                            fontSize: '1rem',
                            outline: 'none',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '10px',
                        padding: '15px',
                        background: loading ? '#94a3b8' : '#2563eb',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        width: '100%',
                        boxSizing: 'border-box',
                        transition: 'background-color 0.2s'
                    }}
                >
                    {loading ? 'שולח נתונים...' : 'שליחת הפרטים'}
                </button>
            </form>
        </div>
    );
}

export default function ContactPage() {
    return (
        <div className="container pageWrapper" style={{ paddingTop: '120px', paddingBottom: '80px', color: '#fff' }}>
            <h1 className="pageTitle" style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '10px' }}>
                השארת פרטים
            </h1>
            <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.1rem', marginBottom: '40px' }}>
                השאר פרטים ונחזור אליך בהקדם לייעוץ והרשמה.
            </p>

            <Suspense fallback={<div style={{ textAlign: 'center', color: '#94a3b8' }}>טוען טופס...</div>}>
                <ContactFormContent />
            </Suspense>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <Link href="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 500 }}>
                    → חזרה לעמוד הבית
                </Link>
            </div>
        </div>
    );
}