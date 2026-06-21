"use client";

import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Settings</h1>
        <button style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
          Save Changes
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '40px', maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
          <div style={{ width: '48px', height: '48px', background: '#f1f5f9', color: '#475569', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Application Settings</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Manage your default preferences.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#1e293b' }}>Default Currency</label>
            <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <option value="₹">INR (₹)</option>
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#1e293b' }}>Theme</label>
            <select style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode (Coming Soon)</option>
            </select>
          </div>
          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e2e8f0' }}>
            <button style={{ background: 'white', color: '#ef4444', border: '1px solid #ef4444', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              Reset All Local Data
            </button>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '8px' }}>Warning: This will permanently delete all invoices stored in your browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
