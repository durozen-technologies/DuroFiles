import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { InvoiceData, LineItem } from '../types/invoice';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionProps> = ({ title, isOpen, onToggle, children }) => (
  <div style={{ marginBottom: '16px', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
    <div 
      onClick={onToggle}
      style={{ padding: '16px', background: isOpen ? 'var(--bg-color)' : 'white', borderBottom: isOpen ? '1px solid var(--border-color)' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 600, color: 'var(--text-main)', transition: 'background 0.2s' }}
    >
      {title}
      {isOpen ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
    </div>
    {isOpen && (
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    )}
  </div>
);

export const InvoiceForm: React.FC<Props> = ({ data, onChange }) => {
  const [openSection, setOpenSection] = useState<string>('General Info');

  const handleChange = (section: keyof InvoiceData, field: string, value: any) => {
    if (typeof data[section] === 'object' && !Array.isArray(data[section])) {
      onChange({
        ...data,
        [section]: {
          ...data[section] as any,
          [field]: value
        }
      });
    } else {
      onChange({
        ...data,
        [section]: value
      });
    }
  };

  const handleSimpleChange = (field: keyof InvoiceData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, logoUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: uuidv4(),
      description: '',
      hsn: '',
      gstRate: 18,
      quantity: 1,
      rate: 0
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...data, items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    onChange({ ...data, items: newItems });
  };



  return (
    <div style={{ paddingRight: '10px' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--text-main)' }}>Invoice Details</h2>
      
      <AccordionSection title="General Info" isOpen={openSection === 'General Info'} onToggle={() => setOpenSection(openSection === 'General Info' ? '' : 'General Info')}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
            <label>Invoice Template</label>
            <select className="form-control" value={data.templateId || 'modern'} onChange={e => handleSimpleChange('templateId', e.target.value)}>
              <option value="modern">Modern (Purple)</option>
              <option value="classic">Classic (Minimal)</option>
              <option value="creative">Creative (Bold)</option>
              <option value="tech">Tech (Green/Purple)</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Currency</label>
            <select className="form-control" value={data.currency || '₹'} onChange={e => handleSimpleChange('currency', e.target.value)}>
              <option value="₹">₹ (INR)</option>
              <option value="$">$ (USD)</option>
              <option value="€">€ (EUR)</option>
              <option value="£">£ (GBP)</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Invoice Number</label>
          <input type="text" className="form-control" value={data.invoiceNumber} onChange={e => handleSimpleChange('invoiceNumber', e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Date</label>
            <input type="date" className="form-control" value={data.date} onChange={e => handleSimpleChange('date', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Due Date</label>
            <input type="date" className="form-control" value={data.dueDate} onChange={e => handleSimpleChange('dueDate', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Country of Supply</label>
          <input type="text" className="form-control" value={data.countryOfSupply || ''} onChange={e => handleSimpleChange('countryOfSupply', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Company Logo</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleLogoUpload} />
          {data.logoUrl && <button type="button" className="btn btn-secondary" style={{ marginTop: '8px', padding: '6px 12px', fontSize: '0.8rem' }} onClick={() => onChange({ ...data, logoUrl: '' })}>Remove Logo</button>}
        </div>
      </AccordionSection>

      <AccordionSection title="Billed By (Your Details)" isOpen={openSection === 'Billed By (Your Details)'} onToggle={() => setOpenSection(openSection === 'Billed By (Your Details)' ? '' : 'Billed By (Your Details)')}>
        <div className="form-group">
          <label>Company Name</label>
          <input type="text" className="form-control" value={data.billedBy.name} onChange={e => handleChange('billedBy', 'name', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea className="form-control" rows={3} value={data.billedBy.address} onChange={e => handleChange('billedBy', 'address', e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>GSTIN</label>
            <input type="text" className="form-control" value={data.billedBy.gstin} onChange={e => handleChange('billedBy', 'gstin', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>PAN</label>
            <input type="text" className="form-control" value={data.billedBy.pan} onChange={e => handleChange('billedBy', 'pan', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Phone</label>
            <input type="text" className="form-control" value={data.billedBy.phone} onChange={e => handleChange('billedBy', 'phone', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Email</label>
            <input type="email" className="form-control" value={data.billedBy.email} onChange={e => handleChange('billedBy', 'email', e.target.value)} />
          </div>
        </div>
      </AccordionSection>

      <AccordionSection title="Billed To (Client Details)" isOpen={openSection === 'Billed To (Client Details)'} onToggle={() => setOpenSection(openSection === 'Billed To (Client Details)' ? '' : 'Billed To (Client Details)')}>
        <div className="form-group">
          <label>Client Name</label>
          <input type="text" className="form-control" value={data.billedTo.name} onChange={e => handleChange('billedTo', 'name', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea className="form-control" rows={3} value={data.billedTo.address} onChange={e => handleChange('billedTo', 'address', e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>GSTIN</label>
            <input type="text" className="form-control" value={data.billedTo.gstin} onChange={e => handleChange('billedTo', 'gstin', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>PAN</label>
            <input type="text" className="form-control" value={data.billedTo.pan} onChange={e => handleChange('billedTo', 'pan', e.target.value)} />
          </div>
        </div>
      </AccordionSection>

      <AccordionSection title="Line Items" isOpen={openSection === 'Line Items'} onToggle={() => setOpenSection(openSection === 'Line Items' ? '' : 'Line Items')}>
        {data.items.map((item, index) => (
          <div key={item.id} style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Item {index + 1}</span>
              <button onClick={() => removeItem(index)} style={{ background: 'none', border: 'none', color: 'var(--danger-color)', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <input type="text" className="form-control" value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
               <div className="form-group" style={{ flex: 2 }}>
                <label>HSN</label>
                <input type="text" className="form-control" value={item.hsn} onChange={e => updateItem(index, 'hsn', e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>GST %</label>
                <input type="number" className="form-control" value={item.gstRate} onChange={e => updateItem(index, 'gstRate', parseFloat(e.target.value) || 0)} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Quantity</label>
                <input type="number" className="form-control" value={item.quantity} onChange={e => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Rate</label>
                <input type="number" className="form-control" value={item.rate} onChange={e => updateItem(index, 'rate', parseFloat(e.target.value) || 0)} />
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-secondary" onClick={addItem} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Add New Item
        </button>
      </AccordionSection>

      <AccordionSection title="Tax Settings" isOpen={openSection === 'Tax Settings'} onToggle={() => setOpenSection(openSection === 'Tax Settings' ? '' : 'Tax Settings')}>
        <div className="form-group">
          <label>GST Type</label>
          <select 
            className="form-control" 
            value={data.taxSettings?.type || 'IGST'} 
            onChange={e => handleChange('taxSettings', 'type', e.target.value)}
          >
            <option value="IGST">IGST (Inter-state)</option>
            <option value="CGST_SGST">CGST + SGST (Intra-state)</option>
          </select>
        </div>
      </AccordionSection>

      <AccordionSection title="Payment Details" isOpen={openSection === 'Payment Details'} onToggle={() => setOpenSection(openSection === 'Payment Details' ? '' : 'Payment Details')}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Bank Name</label>
            <input type="text" className="form-control" value={data.paymentDetails?.bankName || ''} onChange={e => handleChange('paymentDetails', 'bankName', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Account Number</label>
            <input type="text" className="form-control" value={data.paymentDetails?.accountNumber || ''} onChange={e => handleChange('paymentDetails', 'accountNumber', e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>IFSC Code</label>
            <input type="text" className="form-control" value={data.paymentDetails?.ifsc || ''} onChange={e => handleChange('paymentDetails', 'ifsc', e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>UPI ID</label>
            <input type="text" className="form-control" placeholder="example@upi" value={data.paymentDetails?.upiId || ''} onChange={e => handleChange('paymentDetails', 'upiId', e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label>Payment Terms / Instructions</label>
          <textarea className="form-control" rows={2} value={data.paymentDetails?.paymentTerms || ''} onChange={e => handleChange('paymentDetails', 'paymentTerms', e.target.value)} />
        </div>
      </AccordionSection>
      
      <AccordionSection title="Extra Sections" isOpen={openSection === 'Extra Sections'} onToggle={() => setOpenSection(openSection === 'Extra Sections' ? '' : 'Extra Sections')}>
        <div className="form-group">
          <label>Notes</label>
          <textarea className="form-control" rows={2} placeholder="Thank you for your business." value={data.notes || ''} onChange={e => handleSimpleChange('notes', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Terms & Conditions</label>
          <textarea className="form-control" rows={2} value={data.terms || ''} onChange={e => handleSimpleChange('terms', e.target.value)} />
        </div>
      </AccordionSection>
    </div>
  );
};
