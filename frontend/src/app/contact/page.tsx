"use client";

import { useState } from 'react';
import { Footer } from '../../components/Footer';
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle2, MessageSquare, Building2 } from 'lucide-react';

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: "Office",
    value: "Namakkal, Tamil Nadu",
    sub: "India",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-900/30",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@durozen.in",
    sub: "We respond within 24 hours",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-900/30",
    href: "mailto:info@durozen.in",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+(91) 81223 39694",
    sub: "Direct business line",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-900/30",
    href: "tel:+918122339694",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon – Sat, 9:30 AM – 6:30 PM IST",
    sub: "",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-50 dark:bg-orange-900/30",
  },
];

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
      const SCRIPT_URL = process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL || '';
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Hero */}
      <section className="relative px-6 py-16 md:py-24 text-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-1/3 w-80 h-80 bg-blue-100/60 dark:bg-blue-950/30 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-5 border border-blue-100 dark:border-blue-800">
            <MessageSquare size={12} />
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-5 leading-tight">
            Contact Us
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Discuss custom templates, branding, automation, and software solutions tailored to your business needs.
          </p>
        </div>
      </section>

      {/* Contact info bar */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {CONTACT_ITEMS.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className={`text-sm font-semibold truncate block ${item.color} hover:underline`}>
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{item.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 py-16 flex-1">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form — takes 3 cols */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <MessageSquare size={18} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Send us a message</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500">We'll get back to you within 24 hours</p>
              </div>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-500/20">
                <CheckCircle2 size={52} className="text-emerald-500 mb-4" />
                <h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">Message Sent!</h4>
                <p className="text-emerald-600 dark:text-emerald-300/80 mb-6 text-sm max-w-xs">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-xl border border-emerald-600 dark:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl border border-red-500/20 text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Name <span className="text-red-500">*</span></label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your Name" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email <span className="text-red-500">*</span></label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company</label>
                    <input type="text" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="Your Company" className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Your Phone Number" className={inputClass} />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message <span className="text-red-500">*</span></label>
                  <textarea required value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="How can we help you?" rows={6} className={`${inputClass} resize-none`} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column — 2 cols */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Enterprise card */}
            <div className="bg-white dark:bg-slate-900 p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Enterprise Contact</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Direct business enquiries</p>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {CONTACT_ITEMS.map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className={`w-9 h-9 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className={`text-sm font-semibold ${item.color} hover:underline`}>{item.value}</a>
                        ) : (
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.value}</p>
                        )}
                        {item.sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.sub}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex-1 min-h-[200px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3221.3251437428935!2d78.21522499999999!3d11.1489563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babcbd8fe6408d7%3A0x70d17da5da2fc025!2sDurozen%20Technologies%20Private%20Limited!5e1!3m2!1sen!2sin!4v1782280167237!5m2!1sen!2sin"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
