"use client";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Printer, ArrowLeft, RefreshCw } from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const isEditor = pathname.startsWith('/invoice/');

  const handleResetLayout = () => {
    if (confirm("Are you sure you want to reset all dragged elements to their default positions?")) {
      localStorage.removeItem('invoice_positions');
      window.location.reload();
    }
  };

  return (
    <header className="print-hidden" style={{ padding: '0 30px', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderBottom: '1px solid #eaeaea', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Left: Logo or Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="DuroFiles Logo" style={{ height: '125px' }} />
          </div>
        </div>

        {isEditor && (
          <>
            <div style={{ width: '1px', height: '24px', background: '#cbd5e1' }} />
            <button 
              onClick={() => router.push('/dashboard')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          </>
        )}
      </div>

      {/* Center: Global Navigation or Editor Tools */}
      {!isEditor ? (
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center', fontWeight: 500, fontSize: '0.95rem', color: '#475569' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => router.push('/')}>Home</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => router.push('/templates')}>Templates</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => router.push('/tools')}>Tools</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => router.push('/help')}>Help</span>
        </nav>
      ) : (
        <div className="mobile-hidden" style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#64748b' }}>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, fontSize: '0.9rem' }}>
            <span style={{ transform: 'scaleX(-1)', display: 'inline-block' }}>&#x21BA;</span> Undo
          </button>
          <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'not-allowed', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, fontSize: '0.9rem' }}>
            <span>&#x21BA;</span> Redo
          </button>
          <div style={{ width: '1px', height: '16px', background: '#e2e8f0' }} />
          <select style={{ border: 'none', background: 'transparent', color: '#475569', fontWeight: 600, fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}>
            <option>100%</option>
            <option>75%</option>
            <option>50%</option>
          </select>
        </div>
      )}

      {/* Right: Auth / CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isEditor ? (
          <>
            <button 
              className="mobile-hidden"
              onClick={() => {}} 
              style={{ background: 'none', color: '#64748b', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            >
              Share
            </button>
            <button 
              onClick={handleResetLayout} 
              style={{ background: 'none', color: '#64748b', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            >
              <RefreshCw size={14} /> Reset Layout
            </button>
            <button 
              onClick={() => window.print()} 
              className="btn"
              style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
            >
              <Printer size={18} /> Download PDF
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => router.push('/dashboard')} 
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Dashboard
            </button>
          </>
        )}
      </div>
    </header>
  );
};
