"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { getAllInvoices, deleteInvoice, saveInvoice } from '../../../utils/storage';
import type { InvoiceData } from '../../../types/invoice';

export default function Dashboard() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsMounted(true);
    setInvoices(getAllInvoices());
  }, []);

  const handleCreateNew = () => {
    const newId = uuidv4();
    const newInvoice: InvoiceData = {
      id: newId,
      templateId: 'modern',
      invoiceNumber: 'INV-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      countryOfSupply: 'United Kingdom (UK)',
      logoUrl: '',
      billedBy: {
        name: '',
        address: '',
        gstin: '',
        pan: '',
        email: '',
        phone: ''
      },
      billedTo: { name: '', address: '', gstin: '', pan: '' },
      items: [
        { id: uuidv4(), description: 'Web Development Services', hsn: '998311', gstRate: 18, quantity: 1, rate: 50000 }
      ],
      paymentDetails: { upiId: 'merchant@upi' }
    };
    saveInvoice(newInvoice);
    router.push(`/invoice/${newId}`);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this invoice?')) {
      deleteInvoice(id);
      setInvoices(getAllInvoices());
    }
  };

  if (!isMounted) return null;

  const filteredInvoices = invoices.filter(inv => {
    return inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
           (inv.billedTo.name || '').toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{ height: '100%', overflowY: 'auto', width: '100%', background: '#fafbfc' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => router.push('/')} className="btn btn-secondary" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px' }}>
              <ArrowLeft size={16} /> Back
            </button>
            <h1 style={{ color: 'var(--primary-color)', fontSize: '2rem', margin: 0 }}>Recent Invoices (Local)</h1>
          </div>
          <button className="btn" onClick={handleCreateNew} style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Create New
          </button>
        </div>

        {invoices.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Search by Invoice No or Client Name..." 
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ maxWidth: '400px' }}
            />
          </div>
        )}

        {invoices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '12px', border: '1px dashed var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '80px', height: '80px', background: '#e0e7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <FileText size={40} color="var(--primary-color)" />
            </div>
            <h3 style={{ marginBottom: '12px', fontSize: '1.5rem', fontWeight: 700 }}>No Invoices Yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>You haven't created any invoices. Click the button below to generate your first professional invoice.</p>
            <button className="btn" onClick={handleCreateNew} style={{ width: 'auto', margin: '0 auto', display: 'inline-flex' }}>
              <Plus size={18} /> Create First Invoice
            </button>
          </div>
        ) : filteredInvoices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <p style={{ color: 'var(--text-muted)' }}>No invoices match your search.</p>
          </div>
        ) : (
          <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
                <tr>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Invoice No</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600 }}>Client Name</th>
                  <th style={{ padding: '16px', textAlign: 'right', fontWeight: 600 }}>Amount</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => {
                  const total = inv.items.reduce((sum, item) => {
                    const amount = item.quantity * item.rate;
                    const igst = amount * (item.gstRate / 100);
                    return sum + amount + igst;
                  }, 0);
                  
                  return (
                    <tr 
                      key={inv.id} 
                      onClick={() => router.push(`/invoice/${inv.id}`)}
                      style={{ borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                      onMouseOut={e => e.currentTarget.style.background = 'white'}
                    >
                      <td style={{ padding: '16px', fontWeight: 500, color: 'var(--primary-color)' }}>{inv.invoiceNumber}</td>
                      <td style={{ padding: '16px', color: 'var(--text-muted)' }}>{inv.date}</td>
                      <td style={{ padding: '16px' }}>{inv.billedTo.name || 'Unnamed Client'}</td>
                      <td style={{ padding: '16px', textAlign: 'right', fontWeight: 500 }}>₹{total.toFixed(2)}</td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button 
                          onClick={(e) => handleDelete(inv.id, e)}
                          style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '8px' }}
                          title="Delete Invoice"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
    </div>
  );
}
