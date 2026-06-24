"use client";

import { useState } from 'react';
import { Footer } from '../../components/Footer';
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Retrieve the script URL from the environment variables
      const SCRIPT_URL = process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL || '';
      
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // This prevents the browser from blocking the request due to Google's redirect
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // With 'no-cors', the response is opaque, meaning we can't read response.json()
      // But if fetch didn't throw a network error, we can safely assume it was sent!
      setSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });

    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      {/* Hero / Header */}
      <section style={{ padding: '80px 20px 60px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.02em' }}>Contact Us</h1>
          <p style={{ fontSize: '1.25rem', color: '#475569', lineHeight: 1.6 }}>
            To discuss custom invoice templates, branding, automation, and software solutions tailored to your needs.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '20px 20px 80px 20px', flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '40px' }}>
          
          {/* Form Column */}
          <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '30px', color: '#0f172a' }}>Send us a message</h3>
            
            {success ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', background: '#ecfdf5', borderRadius: '16px', border: '1px solid #10b981' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#065f46', margin: '0 0 10px 0' }}>Message Sent!</h4>
                <p style={{ color: '#047857', margin: 0 }}>Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setSuccess(false)} style={{ marginTop: '20px', padding: '10px 20px', background: 'transparent', border: '1px solid #10b981', color: '#065f46', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {error && <div style={{ padding: '12px', background: '#fef2f2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #fecaca', fontSize: '0.9rem' }}>{error}</div>}
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>Name</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your Name" style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>Email</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>Company</label>
                    <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="Your Company" style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>Phone</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Your Phone Number" style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', transition: 'border-color 0.2s', backgroundColor: '#f8fafc' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#475569' }}>Message</label>
                  <textarea required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="How can we help you?" rows={6} style={{ padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', resize: 'vertical', backgroundColor: '#f8fafc' }}></textarea>
                </div>
                <button type="submit" disabled={loading} style={{ padding: '18px', borderRadius: '12px', background: 'var(--primary-color)', color: 'white', fontWeight: 700, fontSize: '1.15rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.4)', transition: 'transform 0.2s, box-shadow 0.2s', opacity: loading ? 0.7 : 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  {loading ? <><Loader2 size={24} className="animate-spin" /> Sending...</> : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '30px', color: '#0f172a' }}>Enterprise contact desk</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '50%', color: '#3b82f6' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Office</h4>
                    <p style={{ margin: 0, color: '#64748b', lineHeight: 1.5, fontSize: '1.05rem' }}>Namakkal, Tamil Nadu</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '50%', color: '#3b82f6' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Email</h4>
                    <p style={{ margin: 0, color: '#64748b', lineHeight: 1.5, fontSize: '1.05rem' }}>info@durozen.in</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '50%', color: '#3b82f6' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Phone</h4>
                    <p style={{ margin: 0, color: '#64748b', lineHeight: 1.5, fontSize: '1.05rem' }}>+(91) 81223 39694</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '50%', color: '#3b82f6' }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 6px 0', fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>Business hours</h4>
                    <p style={{ margin: 0, color: '#64748b', lineHeight: 1.5, fontSize: '1.05rem' }}>Monday to Saturday<br/>9:30 AM - 6:30 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0', background: 'white', padding: '10px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.3251437428935!2d78.21522499999999!3d11.1489563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babcbd8fe6408d7%3A0x70d17da5da2fc025!2sDurozen%20Technologies%20Private%20Limited!5e1!3m2!1sen!2sin!4v1782280167237!5m2!1sen!2sin" 
                width="100%" 
                height="320" 
                style={{ border: 0, borderRadius: '16px' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
