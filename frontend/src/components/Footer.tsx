"use client";
import React from 'react';
import { useRouter } from 'next/navigation';




export const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <footer className="print-hidden relative bg-slate-950 dark:bg-slate-950 text-white overflow-hidden">
      {/* Gradient top border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
              <img src="/logo.png" alt="DuroFiles" className="h-8 w-auto object-contain" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The free, privacy-first invoice generator for freelancers and businesses. No sign-up, no cloud, no limits.
            </p>

          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Company</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Feedback', href: '/feedback' },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 h-px bg-blue-500 transition-all duration-200 inline-block" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500">Legal</h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-1.5 group">
                    <span className="w-0 group-hover:w-2 h-px bg-blue-500 transition-all duration-200 inline-block" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Durozen Technologies Private Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              All systems operational
            </span>
            <span className="text-slate-700">·</span>
            <span>Made with ❤️ in Tamil Nadu, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
