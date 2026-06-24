"use client";

import { useState } from 'react';
import { Footer } from '../../components/Footer';
import { MessageSquare, Star, Loader2, CheckCircle2 } from 'lucide-react';

export default function Feedback() {
  const [formData, setFormData] = useState({ name: '', email: '', feedback: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const SCRIPT_URL = process.env.NEXT_PUBLIC_FEEDBACK_SCRIPT_URL || '';

      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, rating }),
      });

      setSuccess(true);
      setFormData({ name: '', email: '', feedback: '' });
      setRating(0);
    } catch (err: any) {
      setError(err.message || 'Failed to send feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ padding: '80px 20px 60px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Share Your Feedback
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#475569', lineHeight: 1.6 }}>
            Help us improve DuroFiles !! Your feedback shapes what we build next.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section style={{ padding: '20px 20px 80px 20px', flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '680px', width: '100%' }}>
          <div style={{ background: 'white', padding: '48px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', color: '#0f172a' }}>
              Feedback Form
            </h3>
            <p style={{ color: '#64748b', marginBottom: '36px', fontSize: '0.95rem' }}>
              About this application, tell us what you think!
            </p>

            {success ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 20px', textAlign: 'center', background: '#ecfdf5', borderRadius: '16px', border: '1px solid #10b981' }}>
                <CheckCircle2 size={56} color="#10b981" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#065f46', margin: '0 0 10px 0' }}>Thank You!</h4>
                <p style={{ color: '#047857', margin: '0 0 24px 0', fontSize: '1rem' }}>
                  Your feedback has been received. We really appreciate it! 🙌
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  style={{ padding: '10px 24px', background: 'transparent', border: '1px solid #10b981', color: '#065f46', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {error && (
                  <div style={{ padding: '12px 16px', background: '#fef2f2', color: '#b91c1c', borderRadius: '10px', border: '1px solid #fecaca', fontSize: '0.9rem' }}>
                    {error}
                  </div>
                )}

                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>
                    Name <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', backgroundColor: '#f8fafc', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                  />
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>
                    Email <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', backgroundColor: '#f8fafc', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                  />
                </div>

                {/* Star Rating */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>
                    Rate your experience
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        size={36}
                        style={{ cursor: 'pointer', transition: 'transform 0.15s' }}
                        fill={(hoverRating || rating) >= star ? '#f59e0b' : 'none'}
                        color={(hoverRating || rating) >= star ? '#f59e0b' : '#cbd5e1'}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                  {rating > 0 && (
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'][rating]} — {rating}/5 stars
                    </span>
                  )}
                </div>

                {/* Feedback */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>
                    Feedback <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    required
                    value={formData.feedback}
                    onChange={e => setFormData({ ...formData, feedback: e.target.value })}
                    placeholder="Share your thoughts, suggestions, or report any issues with DuroFiles..."
                    rows={6}
                    style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', resize: 'vertical', backgroundColor: '#f8fafc', fontFamily: 'inherit', lineHeight: 1.6 }}
                    onFocus={e => e.target.style.borderColor = '#2563eb'}
                    onBlur={e => e.target.style.borderColor = '#cbd5e1'}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ padding: '18px', borderRadius: '12px', background: 'var(--primary-color, #2563eb)', color: 'white', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)', transition: 'transform 0.2s, box-shadow 0.2s', opacity: loading ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
                >
                  {loading ? <><Loader2 size={22} className="animate-spin" /> Sending...</> : '🚀 Submit Feedback'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
