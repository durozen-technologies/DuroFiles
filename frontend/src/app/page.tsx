"use client";

import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  CheckCircle2,
  FileText,
  Download,
  Palette,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Footer } from '../components/Footer';

const FEATURES = [
  {
    icon: Zap,
    title: "100% Free, Forever",
    desc: "No subscription, no trial, no credit card. Unlimited invoices at zero cost.",
    accent: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    bgDark: "dark:bg-amber-950/20",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Shield,
    title: "No Account Required",
    desc: "Start instantly. Zero onboarding. Your data never leaves your device.",
    accent: "from-emerald-400 to-teal-500",
    bgLight: "bg-emerald-50",
    bgDark: "dark:bg-emerald-950/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: CheckCircle2,
    title: "GST & Tax Compliant",
    desc: "IGST, CGST, SGST with auto-calculations. Built for Indian businesses.",
    accent: "from-blue-400 to-indigo-500",
    bgLight: "bg-blue-50",
    bgDark: "dark:bg-blue-950/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: Download,
    title: "Instant PDF Download",
    desc: "Generate pixel-perfect A4 invoices. Download in one click, share instantly.",
    accent: "from-violet-400 to-purple-500",
    bgLight: "bg-violet-50",
    bgDark: "dark:bg-violet-950/20",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  {
    icon: Palette,
    title: "Custom Branding",
    desc: "Add your logo, signature, and UPI QR code for professional, branded invoices.",
    accent: "from-pink-400 to-rose-500",
    bgLight: "bg-pink-50",
    bgDark: "dark:bg-pink-950/20",
    textColor: "text-pink-600 dark:text-pink-400",
  },
  {
    icon: Users,
    title: "7 Premium Templates",
    desc: "GST Standard, Modern, Classic, Tech, Creative and more. Pick your style.",
    accent: "from-cyan-400 to-sky-500",
    bgLight: "bg-cyan-50",
    bgDark: "dark:bg-cyan-950/20",
    textColor: "text-cyan-600 dark:text-cyan-400",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Pick a Template",
    desc: "Choose from 7 professionally designed invoice templates built for different business styles.",
    icon: Palette,
  },
  {
    step: "02",
    title: "Fill Your Details",
    desc: "Add your company info, client details, items, GST rates, and payment QR — all in one place.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Download & Send",
    desc: "Click Download PDF to generate a perfect A4 invoice. Share it with your client instantly.",
    icon: Download,
  },
];

const FAQS = [
  {
    q: "Is there any limit to the number of invoices I can create?",
    a: "Absolutely not. Create, edit, and download unlimited invoices — completely free, forever.",
  },
  {
    q: "Where is my invoice data stored?",
    a: "All data is stored locally in your browser. We never transmit or store anything on our servers.",
  },
  {
    q: "Can I add payment QR code and bank details?",
    a: "Yes! Upload a UPI QR code image and add your full bank details directly on the invoice.",
  },
  {
    q: "Is it GST compliant for Indian businesses?",
    a: "Yes. DuroFiles supports IGST, CGST+SGST, HSN codes, and GSTIN fields for full GST compliance.",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* ─── HERO ────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-violet-100 to-pink-100 dark:from-violet-950/30 dark:to-pink-950/30 rounded-full blur-3xl opacity-40" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-8 shadow-sm">
            <Star size={11} fill="currentColor" />
            Free · No Sign-up · GST Ready · Private
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 leading-[1.08] tracking-tight">
            Create Professional<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Invoices in Seconds
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl leading-relaxed">
            Pick a template, fill your details, and download a beautiful PDF invoice instantly.
            100% free, no account needed, works offline.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <button
              onClick={() => router.push('/templates')}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-200"
            >
              <FileText size={18} />
              Create Free Invoice
              <ChevronRight size={16} />
            </button>
            <button
              onClick={() => router.push('/templates')}
              className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200"
            >
              View Templates
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
            {["No credit card", "No registration", "Download instantly", "Works offline"].map(item => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────── */}
      <section className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="relative flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {/* Step connector line (not on last) */}
                  {idx < 2 && (
                    <div className="hidden md:block absolute top-12 -right-4 w-8 h-px bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-700 z-10" />
                  )}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-blue-500/25">
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-xs font-black text-blue-400 dark:text-blue-500 tracking-widest mb-2">STEP {step.step}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─────────────────────────── */}
      <section className="px-6 py-20 md:py-28 bg-white dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Everything Included</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white mb-4">
              Why Choose DuroFiles?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
              Built for speed, compliance, and complete privacy. Everything you need, nothing you don't.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className={`group relative flex flex-col p-7 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                >
                  {/* Left accent stripe */}
                  <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-gradient-to-b ${feat.accent}`} />

                  <div className={`w-12 h-12 rounded-2xl ${feat.bgLight} ${feat.bgDark} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ${feat.textColor}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────── */}
      <section className="px-6 py-20 md:py-28 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">Got Questions?</p>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-7 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-start gap-3">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs flex items-center justify-center font-black mt-0.5">Q</span>
                  {faq.q}
                </h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA BANNER ─────────────────────── */}
      <section className="px-6 py-16 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to create your first invoice?
          </h2>
          <p className="text-blue-100 text-base mb-8 max-w-xl mx-auto">
            Join thousands of freelancers and businesses creating professional invoices with DuroFiles. Free forever.
          </p>
          <button
            onClick={() => router.push('/templates')}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-white text-blue-700 hover:bg-blue-50 shadow-xl shadow-blue-900/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <FileText size={18} />
            Get Started Free
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
