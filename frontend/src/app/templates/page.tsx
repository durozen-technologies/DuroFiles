"use client";

import { useRouter } from 'next/navigation';
import { Footer } from '../../components/Footer';

export default function Templates() {
  const router = useRouter();

  const handleCreate = (template: string) => {
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      return 'id-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const newInvoice = {
      id: generateId(),
      templateId: template.toLowerCase() as any,
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
    const saved = localStorage.getItem('invoices_db');
    const invoices = saved ? JSON.parse(saved) : [];
    invoices.push(newInvoice);
    localStorage.setItem('invoices_db', JSON.stringify(invoices));
    router.push(`/invoice/${newInvoice.id}`);
  };

  const TemplateCard = ({ id, name, desc, color, image }: any) => (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} onClick={() => handleCreate(id || name)}>
      <div style={{ height: '200px', background: color, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', fontWeight: 800, overflow: 'hidden' }}>
        {image ? (
          <img src={image} alt={`${name} Preview`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          `${name} Preview`
        )}
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{name}</h3>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px' }}>{desc}</p>
        <button style={{ background: '#f1f5f9', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 600, width: '100%', cursor: 'pointer' }}>
          Use Template
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      
      <div style={{ padding: '60px 20px', textAlign: 'center', background: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '16px' }}>Template Marketplace</h1>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          <TemplateCard id="tech" name="Tech" desc="Green and sleek, optimized for software and IT services." color="#10b981" image="/templates/tech.png" />
          <TemplateCard id="amazon_style" name="Amazon Style" desc="A detailed, tabular template inspired by e-commerce invoices." color="#0f172a" image="/templates/amazon.png" />
          <TemplateCard id="gst_standard" name="GST Standard" desc="Formal, structured layout with detailed columns for Indian GST compliance." color="#1d4ed8" image="/templates/gststandard.png" />
          <TemplateCard id="instagram_style" name="Instagram Style" desc="Modern aesthetic with social media inspired pink and purple gradients." color="#db2777" image="/templates/instagram.png" />
          <TemplateCard id="modern" name="Modern" desc="A clean, professional template with a subtle purple accent." color="#6366f1" image="/templates/modern.png" />
          <TemplateCard id="classic" name="Classic" desc="Minimalist black and white design perfect for traditional businesses." color="#475569" image="/templates/classic.png" />
          <TemplateCard id="creative" name="Creative" desc="Bold orange accents for a creative agency look." color="#f97316" image="/templates/creative.png" />
        </div>
      </div>
      
      <div style={{ marginTop: 'auto' }}>
        <Footer />
      </div>
    </div>
  );
}
