import React from 'react';

import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';
import { EditableLabel } from '../EditableLabel';
import { EditableValue } from '../EditableValue';
import { EditableImage } from '../EditableImage';
import { multiply, sum, calculateTax, add } from '../../utils/math';
import { formatCurrency } from '../../utils/formatters';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const TemplateClassic: React.FC<Props> = ({ data, onChange }) => {
  const calculateSubtotal = () => {
    const amounts = data.items.map(item => multiply(item.quantity, item.rate));
    return sum(amounts);
  };

  const showGst = !data.hiddenFields?.includes('gst');

  const calculateIGST = () => {
    if (!showGst) return 0;
    const taxes = data.items.map(item => {
      const amount = multiply(item.quantity, item.rate);
      return calculateTax(amount, item.gstRate);
    });
    return sum(taxes);
  };

  const subtotal = calculateSubtotal();
  const igst = calculateIGST();
  const grandTotal = add(subtotal, igst);

  const handleRowKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (onChange) {
        onChange({
          ...data,
          items: [...data.items, { id: Math.random().toString(), description: '', hsn: '', gstRate: 18, quantity: 1, rate: 0 }]
        });
      }
    }
  };

  const upiUri = `upi://pay?pa=$<EditableValue value={data.upiId} onChange={(v) => onChange?.({...data, upiId: v})} placeholder="example@upi" />&pn=${encodeURIComponent(data.billedBy.name)}&am=${formatCurrency(grandTotal, 'en-IN')}&cu=INR`;

  return (
    <div className="a4-paper template-classic" style={{ fontFamily: '"Times New Roman", Times, serif', color: '#000' }}>
      <DraggableBlock id="header" data={data} onChange={onChange}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '20px' }}>
          <div>
            <DraggableBlock id="header_title" data={data} onChange={onChange}><h1 style={{ fontSize: '3rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}><EditableLabel id="lbl_invoice" defaultText="Invoice" data={data} onChange={onChange} /></h1></DraggableBlock>
            <div style={{ marginTop: '10px' }}>
              {!data.hiddenFields?.includes('invoiceNo') && (
                <DraggableBlock id="header_invNo" data={data} onChange={onChange}><p><strong><EditableLabel id="lbl_invoiceNo" defaultText="Invoice No:" data={data} onChange={onChange} /></strong> <EditableValue value={data.invoiceNumber} onChange={(v) => onChange?.({ ...data, invoiceNumber: v })} placeholder="INV-001" /></p></DraggableBlock>
              )}
              {!data.hiddenFields?.includes('invoiceDate') && (
                <DraggableBlock id="header_date" data={data} onChange={onChange}><p><strong><EditableLabel id="lbl_invoiceDate" defaultText="Date:" data={data} onChange={onChange} /></strong> <EditableValue value={data.date} onChange={(v) => onChange?.({ ...data, date: v })} placeholder="Date" /></p></DraggableBlock>
              )}
              {!data.hiddenFields?.includes('dueDate') && (
                <DraggableBlock id="header_dueDate" data={data} onChange={onChange}><p><strong><EditableLabel id="lbl_dueDate" defaultText="Due Date:" data={data} onChange={onChange} /></strong> <EditableValue value={data.dueDate} onChange={(v) => onChange?.({ ...data, dueDate: v })} placeholder="Due Date" /></p></DraggableBlock>
              )}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {!data.hiddenFields?.includes('logo') && (
              <DraggableBlock id="header_logo" data={data} onChange={onChange}>
                <EditableImage
                  src={data.logoUrl || ''}
                  onChange={(src) => onChange?.({ ...data, logoUrl: src })}
                  fallbackText="Upload Logo"
                  style={{ width: '120px', height: '60px', marginLeft: 'auto', marginBottom: '8px' }}
                />
              </DraggableBlock>
            )}

            <DraggableBlock id="billedBy_name" data={data} onChange={onChange}><h2 style={{ fontSize: '1.25rem', margin: 0 }}><EditableValue value={data.billedBy.name} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, name: v } })} placeholder="Your Company Name" /></h2></DraggableBlock>
            <DraggableBlock id="billedBy_address" data={data} onChange={onChange}><p style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}><EditableValue isTextArea value={data.billedBy.address} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, address: v } })} placeholder="Your Address" /></p></DraggableBlock>
            {data.billedBy.phone && <DraggableBlock id="billedBy_phone" data={data} onChange={onChange}><p style={{ fontSize: '0.9rem' }}><EditableLabel id="lbl_phone" defaultText="Tel: " data={data} onChange={onChange} /><EditableValue value={data.billedBy.phone} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, phone: v } })} placeholder="Phone" /></p></DraggableBlock>}
            {data.billedBy.email && <DraggableBlock id="billedBy_email" data={data} onChange={onChange}><p style={{ fontSize: '0.9rem' }}><EditableLabel id="lbl_email" defaultText="Email: " data={data} onChange={onChange} /><EditableValue value={data.billedBy.email} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, email: v } })} placeholder="Email" /></p></DraggableBlock>}
            {showGst && <DraggableBlock id="billedBy_gstin" data={data} onChange={onChange}><p style={{ fontSize: '0.9rem' }}><EditableLabel id="lbl_gstin" defaultText="GSTIN: " data={data} onChange={onChange} /><EditableValue value={data.billedBy.gstin} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, gstin: v } })} placeholder="GSTIN" /></p></DraggableBlock>}
          </div>
        </div>
      </DraggableBlock>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <DraggableBlock id="billedTo" data={data} onChange={onChange} style={{ width: '45%' }}>
          <div>
            <DraggableBlock id="billedTo_title" data={data} onChange={onChange}><h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px' }}><EditableLabel id="lbl_billedTo" defaultText="Bill To:" data={data} onChange={onChange} /></h3></DraggableBlock>
            <DraggableBlock id="billedTo_name" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}><EditableValue value={data.billedTo.name} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, name: v } })} placeholder="Client Name" /></p></DraggableBlock>
            <DraggableBlock id="billedTo_address" data={data} onChange={onChange}><p style={{ whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, address: v } })} placeholder="Client Address" /></p></DraggableBlock>
          </div>
        </DraggableBlock>
        {data.countryOfSupply && !data.hiddenFields?.includes('placeOfSupply') && (
          <DraggableBlock id="countryOfSupply" data={data} onChange={onChange} style={{ width: '45%' }}>
            <div style={{ textAlign: 'right' }}>
              <DraggableBlock id="countryOfSupply_val" data={data} onChange={onChange}><p><strong><EditableLabel id="lbl_country" defaultText="Country of Supply:" data={data} onChange={onChange} /></strong><br /><EditableValue value={data.countryOfSupply} onChange={(v) => onChange?.({ ...data, countryOfSupply: v })} placeholder="Country" /></p></DraggableBlock>
            </div>
          </DraggableBlock>
        )}
      </div>

      <DraggableBlock id="table" data={data} onChange={onChange}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}><EditableLabel id="lbl_col_item" defaultText="Description" data={data} onChange={onChange} /></th>
              <th style={{ padding: '10px', textAlign: 'center' }}><EditableLabel id="lbl_col_hsn" defaultText="HSN" data={data} onChange={onChange} /></th>
              <th style={{ padding: '10px', textAlign: 'center' }}><EditableLabel id="lbl_col_qty" defaultText="Qty" data={data} onChange={onChange} /></th>
              <th style={{ padding: '10px', textAlign: 'right' }}><EditableLabel id="lbl_col_rate" defaultText="Rate" data={data} onChange={onChange} /></th>
              {showGst && <th style={{ padding: '10px', textAlign: 'right' }}><EditableLabel id="lbl_col_gst" defaultText="GST" data={data} onChange={onChange} /></th>}
              <th style={{ padding: '10px', textAlign: 'right' }}><EditableLabel id="lbl_col_total" defaultText="Total" data={data} onChange={onChange} /></th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
               <tr>
                 <td colSpan={showGst ? 6 : 5} style={{ textAlign: 'center', color: '#9ca3af', padding: '30px' }}>
                    <div style={{ marginBottom: '10px' }}>No items added yet</div>
                    {onChange && (
                      <button 
                        className="print-hidden"
                        onClick={() => onChange({...data, items: [{ id: Math.random().toString(), description: '', hsn: '', gstRate: 18, quantity: 1, rate: 0 }]})}
                        style={{ padding: '8px 16px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                      >
                        + Add Item
                      </button>
                    )}
                 </td>
               </tr>
            )}
            {data.items.map((item, index) => {
              const amount = multiply(item.quantity, item.rate);
              const itemIgst = calculateTax(amount, item.gstRate);
              const total = add(amount, itemIgst);
              return (
                <tr key={item.id || index} style={{ borderBottom: '1px solid #eee' }} className="invoice-row-group">
                  <td style={{ padding: '10px' }}>
                    {onChange && (
                      <button className="delete-item-btn print-hidden" onClick={() => { const newItems = [...data.items]; newItems.splice(index, 1); onChange({ ...data, items: newItems }); }} style={{ marginRight: '6px' }}>×</button>
                    )}
                    <EditableValue value={item.description} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, description: v }; onChange?.({ ...data, items: newItems }) }} placeholder="Item Name" />
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}><EditableValue value={item.hsn} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, hsn: v }; onChange?.({ ...data, items: newItems }) }} placeholder="HSN" /></td>
                  <td style={{ padding: '10px', textAlign: 'center' }}><EditableValue value={item.quantity.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, quantity: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>{data.currency || '₹'}<EditableValue value={item.rate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, rate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                  {showGst && <td style={{ padding: '10px', textAlign: 'right' }}><EditableValue value={item.gstRate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, gstRate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" />%</td>}
                  <td style={{ padding: '10px', textAlign: 'right' }}><span tabIndex={0} onKeyDown={handleRowKeyDown} style={{outline: 'none'}}>{data.currency || '₹'}{formatCurrency(total)}</span></td>
                </tr>
              );
            })}
            {data.items.length > 0 && onChange && (
              <tr className="print-hidden">
                <td colSpan={showGst ? 6 : 5} style={{ textAlign: 'center', padding: '10px' }}>
                  <button
                    className="add-item-btn"
                    onClick={() => onChange({ ...data, items: [...data.items, { id: Math.random().toString(), description: '', hsn: '', gstRate: 18, quantity: 1, rate: 0 }] })}
                  >
                    + Add Item
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </DraggableBlock>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DraggableBlock id="payment" data={data} onChange={onChange} style={{ width: '50%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
            {(!data.hiddenFields?.includes('qrCode') || !data.hiddenFields?.includes('upiId')) && (
              <div style={{ border: '1px solid #ccc', padding: '15px', width: 'fit-content' }}>
                <DraggableBlock id="payment_title" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '0.9rem' }}><EditableLabel id="lbl_scanToPay" defaultText="Pay via UPI" data={data} onChange={onChange} /></p></DraggableBlock>
                <DraggableBlock id="payment_qr" data={data} onChange={onChange}><EditableImage src={data.qrCodeUrl || ''} onChange={(src) => onChange?.({...data, qrCodeUrl: src})} fallbackText="Upload QR" style={{ width: '80px', height: '80px', margin: '0 auto' }} /></DraggableBlock>
                <DraggableBlock id="payment_upiId" data={data} onChange={onChange}><p style={{ fontSize: '0.8rem', marginTop: '5px' }}><EditableValue value={data.upiId} onChange={(v) => onChange?.({ ...data, upiId: v })} placeholder="example@upi" /></p></DraggableBlock>
              </div>
            )}
            
            {/* Bank Details Section */}
            {!data.hiddenFields?.includes('bankDetails') && (
              <div style={{ border: '1px solid #ccc', padding: '15px', width: 'fit-content' }}>
                <DraggableBlock id="payment_bank_title" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '0.9rem' }}><EditableLabel id="lbl_bank_details" defaultText="Bank Details" data={data} onChange={onChange} /></p></DraggableBlock>
                <div style={{ fontSize: '0.8rem', lineHeight: '1.5' }}>
                  <DraggableBlock id="payment_bankName" data={data} onChange={onChange}><p style={{ margin: '2px 0' }}><span style={{ fontWeight: 'bold' }}><EditableLabel id="lbl_bank_name" defaultText="Bank:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.bankName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, bankName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Bank Name" /></p></DraggableBlock>
                  <DraggableBlock id="payment_accNo" data={data} onChange={onChange}><p style={{ margin: '2px 0' }}><span style={{ fontWeight: 'bold' }}><EditableLabel id="lbl_acc_no" defaultText="A/C No:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.accountNumber} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, accountNumber: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Account Number" /></p></DraggableBlock>
                  <DraggableBlock id="payment_ifsc" data={data} onChange={onChange}><p style={{ margin: '2px 0' }}><span style={{ fontWeight: 'bold' }}><EditableLabel id="lbl_ifsc" defaultText="IFSC:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.ifsc} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, ifsc: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="IFSC Code" /></p></DraggableBlock>
                  <DraggableBlock id="payment_branch" data={data} onChange={onChange}><p style={{ margin: '2px 0' }}><span style={{ fontWeight: 'bold' }}><EditableLabel id="lbl_branch" defaultText="Branch:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.branchName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, branchName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Branch Name" /></p></DraggableBlock>
                </div>
              </div>
            )}
          </div>
        </DraggableBlock>
        <DraggableBlock id="totals" data={data} onChange={onChange} style={{ width: '40%' }}>
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 10px', textAlign: 'right' }}><DraggableBlock id="totals_subLabel" data={data} onChange={onChange}><span><EditableLabel id="lbl_tot_amount" defaultText="Subtotal:" data={data} onChange={onChange} /></span></DraggableBlock></td>
                  <td style={{ padding: '5px 10px', textAlign: 'right' }}><DraggableBlock id="totals_subVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(subtotal)}</span></DraggableBlock></td>
                </tr>
                {showGst && (
                  <tr>
                    <td style={{ padding: '5px 10px', textAlign: 'right' }}><DraggableBlock id="totals_igstLabel" data={data} onChange={onChange}><span><EditableLabel id="lbl_tot_igst" defaultText="IGST:" data={data} onChange={onChange} /></span></DraggableBlock></td>
                    <td style={{ padding: '5px 10px', textAlign: 'right' }}><DraggableBlock id="totals_igstVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(igst)}</span></DraggableBlock></td>
                  </tr>
                )}
                <tr style={{ borderTop: '2px solid #000', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  <td style={{ padding: '10px', textAlign: 'right' }}><DraggableBlock id="totals_grandLabel" data={data} onChange={onChange}><span><EditableLabel id="lbl_tot_total" defaultText="Total:" data={data} onChange={onChange} /></span></DraggableBlock></td>
                  <td style={{ padding: '10px', textAlign: 'right' }}><DraggableBlock id="totals_grandVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(grandTotal)}</span></DraggableBlock></td>
                </tr>

              </tbody>
            </table>
          </div>
        </DraggableBlock>
      </div>
      <DraggableBlock id="classic_notes" data={data} onChange={onChange}>
        <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#555' }}>
          <strong>Notes:</strong>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}><EditableValue isTextArea value={data.notes} onChange={(v) => onChange?.({ ...data, notes: v })} placeholder="Enter notes here..." /></div>
        </div>
      </DraggableBlock>
      <DraggableBlock id="classic_terms_cond" data={data} onChange={onChange}>
        <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#555' }}>
          <strong>Terms &amp; Conditions:</strong>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}><EditableValue isTextArea value={data.terms} onChange={(v) => onChange?.({ ...data, terms: v })} placeholder="Enter your terms and conditions here..." /></div>
        </div>
      </DraggableBlock>

      <DraggableBlock id="footerNote" data={data} onChange={onChange}>
        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          <EditableLabel id="lbl_footerNote" defaultText="This is an electronically generated document, no signature is required." data={data} onChange={onChange} />
        </div>
      </DraggableBlock>
    </div>
  );
};
