"use client";

import { useRouter } from 'next/navigation';
import { Footer } from '../../components/Footer';
import { saveInvoice } from '../../utils/storage';
import { LayoutTemplate, ArrowRight, Star } from 'lucide-react';

const TEMPLATES = [
  {
    id: "tech",
    name: "Tech",
    desc: "Green and sleek, optimized for software and IT services.",
    color: "#10b981",
    image: "/templates/tech.png",
    tags: ["IT Services", "Software"],
    badge: "Popular",
  },
  {
    id: "amazon_style",
    name: "Amazon Style",
    desc: "A detailed, tabular template inspired by e-commerce invoices.",
    color: "#0f172a",
    image: "/templates/amazon.png",
    tags: ["E-commerce", "Retail"],
    badge: "Popular",
  },
  {
    id: "gst_standard",
    name: "GST Standard",
    desc: "Formal, structured layout with detailed columns for Indian GST compliance.",
    color: "#1d4ed8",
    image: "/templates/gststandard.png",
    tags: ["GST", "India"],
    badge: "GST Ready",
  },
  {
    id: "instagram_style",
    name: "Instagram Style",
    desc: "Modern aesthetic with social media inspired pink and purple gradients.",
    color: "#db2777",
    image: "/templates/instagram.png",
    tags: ["Creative", "Social"],
    badge: null,
  },
  {
    id: "modern",
    name: "Modern",
    desc: "A clean, professional template with a subtle purple accent.",
    color: "#6366f1",
    image: "/templates/modern.png",
    tags: ["Professional", "Clean"],
    badge: null,
  },
  {
    id: "classic",
    name: "Classic",
    desc: "Minimalist black and white design perfect for traditional businesses.",
    color: "#475569",
    image: "/templates/classic.png",
    tags: ["Traditional", "Minimal"],
    badge: null,
  },
  {
    id: "creative",
    name: "Creative",
    desc: "Bold orange accents for a creative agency look.",
    color: "#f97316",
    image: "/templates/creative.png",
    tags: ["Agency", "Bold"],
    badge: null,
  },
];

const BADGE_COLORS: Record<string, string> = {
  "Popular":   "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
  "GST Ready": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
};

export default function Templates() {
  const router = useRouter();

  const handleCreate = async (templateId: string) => {
    const generateId = () =>
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : 'id-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const newInvoice = {
      id: generateId(),
      templateId: templateId as any,
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      countryOfSupply: 'India',
      currency: '₹',
      logoUrl: '',
      billedBy: { name: '', address: '', gstin: '', pan: '', email: '', phone: '' },
      billedTo: { name: '', address: '', gstin: '', pan: '' },
      items: [{ id: generateId(), description: 'Sample Item', hsn: '', gstRate: 18, quantity: 1, rate: 1000 }],
      paymentDetails: { upiId: '' },
      notes: 'Thank you for your business!',
      terms: 'Payment is due within 15 days. Late payments may incur a 1.5% monthly fee.',
      hiddenFields: [] as string[],
    };

    await saveInvoice(newInvoice);
    router.push(`/invoice/${newInvoice.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* Hero */}
      <section className="relative px-6 py-16 md:py-24 text-center bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 right-1/4 w-96 h-96 bg-blue-100/60 dark:bg-blue-950/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-100/40 dark:bg-indigo-950/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-5 border border-blue-100 dark:border-blue-800">
            <LayoutTemplate size={12} />
            {TEMPLATES.length} Professional Templates
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-4">
            Template Marketplace
          </h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Select a tailored layout template designed to match your brand style and start generating invoices immediately.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEMPLATES.map(tmpl => (
            <div
              key={tmpl.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => handleCreate(tmpl.id)}
            >
              {/* Image / Preview */}
              <div
                className="h-44 relative flex items-center justify-center text-white text-lg font-extrabold overflow-hidden select-none"
                style={{ backgroundColor: tmpl.color }}
              >
                {tmpl.image ? (
                  <img
                    src={tmpl.image}
                    alt={`${tmpl.name} Preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="opacity-80">{tmpl.name}</span>
                )}
                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Use Template overlay button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-2 px-5 py-2.5 bg-white/95 text-slate-900 font-bold rounded-xl text-sm shadow-lg">
                    Use Template <ArrowRight size={14} />
                  </span>
                </div>

                {/* Badge */}
                {tmpl.badge && (
                  <div className="absolute top-3 left-3">
                    <span className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${BADGE_COLORS[tmpl.badge]}`}>
                      {tmpl.badge === "Popular" && <Star size={10} fill="currentColor" />}
                      {tmpl.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-1">
                    {tmpl.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {tmpl.desc}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {tmpl.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={e => { e.stopPropagation(); handleCreate(tmpl.id); }}
                  className="mt-auto w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-md hover:shadow-blue-500/25 transition-all duration-200"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
