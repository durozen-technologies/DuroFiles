"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, FileText, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

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
  const [scrolled, setScrolled] = useState(false);

  const isEditor = pathname.startsWith('/invoice/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

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
        className={cn(
          "print-hidden w-full sticky top-0 z-[100] transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 shadow-sm"
            : "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">

          {/* Left: Logo */}
          <div
            className="flex items-center cursor-pointer shrink-0"
            onClick={() => navigate('/')}
          >
            <img src="/logo.png" alt="DuroFiles Logo" className="h-24 md:h-24 w-auto object-contain" />
          </div>

          {/* Center: Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* CTA Button — desktop only */}
            <button
              onClick={() => navigate('/templates')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200"
            >
              <FileText size={14} />
              Create Invoice
              <ChevronRight size={13} />
            </button>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <>
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] md:hidden transition-opacity duration-300",
            menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        />

        {/* Drawer */}
        <div
          className={cn(
            "fixed top-0 right-0 h-full w-[280px] z-[300] md:hidden flex flex-col transition-transform duration-300 ease-out",
            "bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <img src="/logo.png" alt="DuroFiles" className="h-7 w-auto object-contain" />
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col p-3 flex-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => navigate(link.href)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 mb-1",
                  pathname === link.href
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA at bottom of drawer */}
          <div className="p-5 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => navigate('/templates')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
            >
              <FileText size={15} />
              Create Invoice
            </button>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-3">
              © {new Date().getFullYear()} Durozen Technologies
            </p>
          </div>
        </div>
      </>
    </>
  );
};
