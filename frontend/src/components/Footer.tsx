import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="print-hidden" style={{ borderTop: '1px solid var(--border-color)', background: 'white', padding: '60px 20px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', marginBottom: '40px' }}>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>Product</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Invoice Generator</a></li>
            <li><a href="/templates" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Templates</a></li>
            <li><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>API</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>Resources</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Blog</a></li>
            <li><a href="/help" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Help Center</a></li>
            <li><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Tutorials</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="/about" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>About Us</a></li>
            <li><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Contact</a></li>
            <li><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', color: '#0f172a' }}>Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="/privacy" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Privacy Policy</a></li>
            <li><a href="/terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Terms of Service</a></li>
            <li><a href="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.95rem' }}>Refund Policy</a></li>
          </ul>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--border-color)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>© {new Date().getFullYear()} DuroFiles. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e2e8f0' }} />
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e2e8f0' }} />
          <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#e2e8f0' }} />
        </div>
      </div>
    </footer>
  );
};
