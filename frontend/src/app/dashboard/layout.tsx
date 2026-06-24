"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Users, Package, Settings, Trash2, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleCreateNew = () => {
    const newInvoice = {
      id: uuidv4(),
      templateId: 'modern' as const,
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      countryOfSupply: 'India',
      currency: '₹',
      billedBy: { name: '', address: '', gstin: '', pan: '', email: '', phone: '' },
      billedTo: { name: '', address: '', gstin: '', pan: '' },
      items: [{ id: uuidv4(), description: 'Sample Item', hsn: '', gstRate: 18, quantity: 1, rate: 1000 }],
      paymentDetails: { upiId: '' }
    };
    const saved = localStorage.getItem('invoices_db');
    const invoices = saved ? JSON.parse(saved) : [];
    invoices.push(newInvoice);
    localStorage.setItem('invoices_db', JSON.stringify(invoices));
    router.push(`/invoice/${newInvoice.id}`);
  };

  const NavItem = ({ icon, label, path }: any) => {
    const isActive = pathname === path;
    return (
      <div
        onClick={() => router.push(path)}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
          borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s',
          background: isActive ? '#eff6ff' : 'transparent',
          color: isActive ? '#2563eb' : '#475569',
          fontWeight: isActive ? 600 : 500
        }}
      >
        {React.cloneElement(icon, { size: 20 })}
        <span>{label}</span>
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <div style={{ flex: 1, display: 'flex', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Sidebar Navigation */}
        <aside style={{ width: '260px', padding: '30px 20px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '8px' }}>

          <button onClick={handleCreateNew} style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
            <Plus size={18} /> New Invoice
          </button>

          <NavItem icon={<LayoutDashboard />} label="Overview" path="/templates" />
          <NavItem icon={<FileText />} label="Invoices" path="/templates/invoices" />
          <NavItem icon={<Users />} label="Clients" path="/templates/clients" />
          <NavItem icon={<Package />} label="Products" path="/templates/products" />

          <div style={{ margin: '20px 0', height: '1px', background: '#e2e8f0' }} />

          <NavItem icon={<Trash2 />} label="Trash" path="/templates/trash" />
          <NavItem icon={<Settings />} label="Settings" path="/templates/settings" />
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '30px 40px', overflowY: 'auto', height: 'calc(100vh - 70px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
