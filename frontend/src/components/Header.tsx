"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Templates',  href: '/templates' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Feedback',   href: '/feedback' },
];

export const Header: React.FC = () => {
  const router   = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isEditor = pathname.startsWith('/invoice/');

  // Track screen size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  if (isEditor) return null;

  const navigate = (href: string) => {
    router.push(href);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className="print-hidden"
        style={{
          padding: '0 30px',
          height: '70px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'white',
          borderBottom: '1px solid #eaeaea',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Left: Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src="/logo.png" alt="DuroFiles Logo" style={{ height: '125px' }} />
        </div>

        {/* Center: Desktop nav */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: '24px', alignItems: 'center', fontWeight: 500, fontSize: '0.95rem', color: '#475569' }}>
            {NAV_LINKS.map(link => (
              <span
                key={link.href}
                onClick={() => navigate(link.href)}
                style={{
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                  color: pathname === link.href ? '#2563eb' : '#475569',
                  fontWeight: pathname === link.href ? 700 : 500,
                }}
              >
                {link.label}
              </span>
            ))}
          </nav>
        )}

        {/* Right: Hamburger (mobile only) */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              borderRadius: '8px',
              color: '#0f172a',
              transition: 'background 0.2s',
            }}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        )}

        {/* Spacer for desktop balance */}
        {!isMobile && <div style={{ width: '125px' }} />}
      </header>

      {/* Mobile Drawer — slides in from right */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.35)',
              zIndex: 200,
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? 'all' : 'none',
              transition: 'opacity 0.25s ease',
            }}
          />

          {/* Drawer panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100dvh',
              width: '260px',
              background: 'white',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.12)',
              zIndex: 300,
              display: 'flex',
              flexDirection: 'column',
              transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* Drawer header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              borderBottom: '1px solid #f1f5f9',
            }}>
              <img src="/logo.png" alt="DuroFiles" style={{ height: '60px' }} />
              <button
                onClick={() => setMenuOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: '4px' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '16px 0', flex: 1 }}>
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => navigate(link.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 24px',
                    background: pathname === link.href ? '#eff6ff' : 'none',
                    border: 'none',
                    borderLeft: pathname === link.href ? '3px solid #2563eb' : '3px solid transparent',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: pathname === link.href ? 700 : 500,
                    color: pathname === link.href ? '#2563eb' : '#334155',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'background 0.15s',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Footer */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9' }}>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8' }}>
                © {new Date().getFullYear()} Durozen Technologies
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};
