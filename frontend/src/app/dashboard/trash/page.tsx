"use client";

import { Trash2 } from 'lucide-react';

export default function TrashPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Trash</h1>
        <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
          Empty Trash
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ width: '64px', height: '64px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Trash2 size={32} />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Trash is Empty</h2>
        <p style={{ color: '#64748b', maxWidth: '400px', margin: '0 auto' }}>Deleted invoices will appear here for 30 days before being permanently removed.</p>
      </div>
    </div>
  );
}
