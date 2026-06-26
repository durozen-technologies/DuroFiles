"use client";

import { useEffect, useState } from 'react';
import { getAllInvoices } from '../../utils/storage';
import type { InvoiceData } from '../../types/invoice';
import { FileText, IndianRupee, Clock, Users } from 'lucide-react';

export default function DashboardOverview() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loadInvoices = async () => {
      const data = await getAllInvoices();
      setInvoices(data);
    };
    loadInvoices();
  }, []);

  if (!isMounted) return null;

  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((acc, inv) => {
    return acc + inv.items.reduce((sum, item) => sum + (item.quantity * item.rate * (1 + item.gstRate / 100)), 0);
  }, 0);

  // Simplified metric for "Customers" (unique client names)
  const uniqueClients = new Set(invoices.map(i => i.billedTo.name).filter(Boolean)).size;

  const MetricCard = ({ title, value, icon, color }: any) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#64748b' }}>{title}</h3>
        <div style={{ padding: '8px', borderRadius: '8px', background: `${color}15`, color: color }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{value}</div>
    </div>
  );

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>Dashboard Overview</h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>Welcome back. Here's what's happening with your invoices today.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        <MetricCard title="Total Invoices" value={totalInvoices} icon={<FileText size={20} />} color="#3b82f6" />
        <MetricCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} icon={<IndianRupee size={20} />} color="#10b981" />
        <MetricCard title="Pending Amount" value="₹0.00" icon={<Clock size={20} />} color="#f59e0b" />
        <MetricCard title="Total Clients" value={uniqueClients} icon={<Users size={20} />} color="#8b5cf6" />
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '20px' }}>Recent Activity</h2>
        {invoices.length === 0 ? (
          <p style={{ color: '#64748b' }}>No recent activity to show. Create your first invoice!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {invoices.slice(0, 5).map((inv, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: i === 4 ? 'none' : '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: '#0f172a' }}>{inv.invoiceNumber}</div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Created for {inv.billedTo.name || 'Unknown Client'}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 600, color: '#0f172a' }}>
                  {inv.currency || '₹'}
                  {inv.items.reduce((sum, item) => sum + (item.quantity * item.rate * (1 + item.gstRate / 100)), 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
