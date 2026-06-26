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

export const TemplateCreative: React.FC<Props> = ({ data, onChange }) => {
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

  const upiUri = `upi://pay?pa=${data.upiId}&pn=${encodeURIComponent(data.billedBy.name)}&am=${formatCurrency(grandTotal, 'en-IN')}&cu=INR`;

  return (
    <div className="a4-paper template-creative" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#333' }}>
      
      <DraggableBlock id="header" data={data} onChange={onChange}>
        <div style={{ background: '#f97316', color: 'white', margin: '-20mm -20mm 20px -20mm', padding: '20mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <DraggableBlock id="header_title" data={data} onChange={onChange}><h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>INVOICE</h1></DraggableBlock>
            {!data.hiddenFields?.includes('invoiceNo') && (
              <DraggableBlock id="header_invNo" data={data} onChange={onChange}><p style={{ fontSize: '1.2rem', opacity: 0.9 }}>#<EditableValue value={data.invoiceNumber} onChange={(v) => onChange?.({...data, invoiceNumber: v})} placeholder="INV-001" /></p></DraggableBlock>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            {!data.hiddenFields?.includes('logo') && (
              <DraggableBlock id="header_logo" data={data} onChange={onChange}>
                <EditableImage
                  src={data.logoUrl || ''}
                  onChange={(src) => onChange?.({ ...data, logoUrl: src })}
                  fallbackText="Upload Logo"
                  style={{ width: '120px', height: '60px', marginLeft: 'auto' }}
                />
              </DraggableBlock>
            )}
          </div>
        </div>
      </DraggableBlock>

      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        <DraggableBlock id="billedBy" data={data} onChange={onChange} style={{ flex: 1 }}>
          <div>
            <DraggableBlock id="billedBy_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>From</h3></DraggableBlock>
            <DraggableBlock id="billedBy_name" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}><EditableValue value={data.billedBy.name} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, name: v}})} placeholder="Your Company Name" /></p></DraggableBlock>
            <DraggableBlock id="billedBy_address" data={data} onChange={onChange}><p style={{ whiteSpace: 'pre-wrap', color: '#555', marginTop: '4px' }}><EditableValue isTextArea value={data.billedBy.address} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, address: v}})} placeholder="Your Address" /></p></DraggableBlock>
            <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>
              {data.billedBy.phone && <DraggableBlock id="billedBy_phone" data={data} onChange={onChange}><div>P: <EditableValue value={data.billedBy.phone} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, phone: v}})} placeholder="Phone" /></div></DraggableBlock>}
              {data.billedBy.email && <DraggableBlock id="billedBy_email" data={data} onChange={onChange}><div>E: <EditableValue value={data.billedBy.email} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, email: v}})} placeholder="Email" /></div></DraggableBlock>}
              {showGst && <DraggableBlock id="billedBy_gstin" data={data} onChange={onChange}><div>GST: <EditableValue value={data.billedBy.gstin} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, gstin: v}})} placeholder="GSTIN" /></div></DraggableBlock>}
            </div>
          </div>
        </DraggableBlock>

        <DraggableBlock id="billedTo" data={data} onChange={onChange} style={{ flex: 1 }}>
          <div>
            <DraggableBlock id="billedTo_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>To</h3></DraggableBlock>
            <DraggableBlock id="billedTo_name" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}><EditableValue value={data.billedTo.name} onChange={(v) => onChange?.({...data, billedTo: {...data.billedTo, name: v}})} placeholder="Client Name" /></p></DraggableBlock>
            <DraggableBlock id="billedTo_address" data={data} onChange={onChange}><p style={{ whiteSpace: 'pre-wrap', color: '#555', marginTop: '4px' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({...data, billedTo: {...data.billedTo, address: v}})} placeholder="Client Address" /></p></DraggableBlock>
          </div>
        </DraggableBlock>

        <DraggableBlock id="details" data={data} onChange={onChange} style={{ width: '200px' }}>
          <div>
             <DraggableBlock id="details_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Details</h3></DraggableBlock>
             <div style={{ background: '#fff7ed', padding: '15px', borderRadius: '8px', border: '1px solid #ffedd5' }}>
               {!data.hiddenFields?.includes('invoiceDate') && (
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                   <DraggableBlock id="details_dateLabel" data={data} onChange={onChange}><span style={{ color: '#666' }}>Date:</span></DraggableBlock>
                   <DraggableBlock id="details_dateVal" data={data} onChange={onChange}><span style={{ fontWeight: 'bold' }}><EditableValue value={data.date} onChange={(v) => onChange?.({...data, date: v})} placeholder="Date" /></span></DraggableBlock>
                 </div>
               )}
               {!data.hiddenFields?.includes('dueDate') && (
                 <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                   <DraggableBlock id="details_dueLabel" data={data} onChange={onChange}><span style={{ color: '#666' }}>Due:</span></DraggableBlock>
                   <DraggableBlock id="details_dueVal" data={data} onChange={onChange}><span style={{ fontWeight: 'bold' }}><EditableValue value={data.dueDate} onChange={(v) => onChange?.({...data, dueDate: v})} placeholder="Due Date" /></span></DraggableBlock>
                 </div>
               )}
             </div>
          </div>
        </DraggableBlock>
      </div>

      <DraggableBlock id="table" data={data} onChange={onChange}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0', marginBottom: '40px' }}>
          <thead>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #f97316', color: '#f97316' }}>Description</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #f97316', color: '#f97316' }}>Qty</th>
              <th style={{ padding: '15px', textAlign: 'right', borderBottom: '2px solid #f97316', color: '#f97316' }}>Rate</th>
              <th style={{ padding: '15px', textAlign: 'right', borderBottom: '2px solid #f97316', color: '#f97316' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
               <tr>
                 <td colSpan={4} style={{ textAlign: 'center', color: '#9ca3af', padding: '30px' }}>
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
              return (
                <tr key={item.id || index}>
                  <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                    {onChange && (
                      <button className="delete-item-btn print-hidden" onClick={() => { const newItems = [...data.items]; newItems.splice(index, 1); onChange({...data, items: newItems}); }} style={{ marginRight: '6px' }}>×</button>
                    )}
                    <div style={{ fontWeight: 'bold', display: 'inline' }}><EditableValue value={item.description} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, description: v}; onChange?.({...data, items: newItems})}} placeholder="Item Name" /></div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>HSN: <EditableValue value={item.hsn} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, hsn: v}; onChange?.({...data, items: newItems})}} placeholder="HSN" />{showGst && <span> | GST: <EditableValue value={item.gstRate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, gstRate: parseFloat(v)||0}; onChange?.({...data, items: newItems})}} placeholder="0" />%</span>}</div>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #eee' }}><EditableValue value={item.quantity.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, quantity: parseFloat(v)||0}; onChange?.({...data, items: newItems})}} placeholder="0" /></td>
                  <td style={{ padding: '15px', textAlign: 'right', borderBottom: '1px solid #eee' }}>{data.currency || '₹'}<EditableValue value={item.rate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, rate: parseFloat(v)||0}; onChange?.({...data, items: newItems})}} placeholder="0" /></td>
                  <td style={{ padding: '15px', textAlign: 'right', borderBottom: '1px solid #eee', fontWeight: 'bold' }}><span tabIndex={0} onKeyDown={handleRowKeyDown} style={{outline: 'none'}}>{data.currency || '₹'}<EditableValue value={amount.toString()} onChange={(v) => { const newItems = [...data.items]; const newAmt = parseFloat(v) || 0; newItems[index] = {...item, rate: item.quantity > 0 ? newAmt / item.quantity : newAmt}; onChange?.({...data, items: newItems})}} placeholder="0" /></span></td>
                </tr>
              );
            })}
            {data.items.length > 0 && onChange && (
              <tr className="print-hidden">
                <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>
                  <button 
                    className="add-item-btn"
                    onClick={() => onChange({...data, items: [...data.items, { id: Math.random().toString(), description: '', hsn: '', gstRate: 18, quantity: 1, rate: 0 }]})}
                  >
                    + Add Item
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </DraggableBlock>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <DraggableBlock id="payment" data={data} onChange={onChange} style={{ width: '50%' }}>
          <div>
            {(!data.hiddenFields?.includes('qrCode') || !data.hiddenFields?.includes('upiId')) && (
              <div>
                 <DraggableBlock id="payment_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}><EditableLabel id="lbl_payment_method" defaultText="Payment Method" data={data} onChange={onChange} /></h3></DraggableBlock>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                   <div style={{ background: '#fff7ed', padding: '10px', borderRadius: '8px' }}>
                      <DraggableBlock id="payment_qr" data={data} onChange={onChange}><EditableImage src={data.qrCodeUrl || ''} onChange={(src) => onChange?.({...data, qrCodeUrl: src})} fallbackText="Upload QR" style={{ width: '90px', height: '90px', margin: '0 auto' }} /></DraggableBlock>
                   </div>
                   <div>
                     <DraggableBlock id="payment_scanText" data={data} onChange={onChange}><p style={{ fontWeight: 'bold' }}><EditableLabel id="lbl_scanToPay" defaultText="Scan to Pay" data={data} onChange={onChange} /></p></DraggableBlock>
                     <DraggableBlock id="payment_upiId" data={data} onChange={onChange}><p style={{ color: '#666', fontSize: '0.9rem', marginTop: '4px' }}><EditableValue value={data.upiId} onChange={(v) => onChange?.({ ...data, upiId: v })} placeholder="example@upi" /></p></DraggableBlock>
                   </div>
                 </div>
              </div>
            )}
            
            {/* Bank Details Section */}
            {!data.hiddenFields?.includes('bankDetails') && (
              <div style={{ marginTop: (!data.hiddenFields?.includes('qrCode') || !data.hiddenFields?.includes('upiId')) ? '20px' : '0' }}>
                <DraggableBlock id="payment_bank_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}><EditableLabel id="lbl_bank_details" defaultText="Bank Details" data={data} onChange={onChange} /></h3></DraggableBlock>
                <div style={{ fontSize: '0.8rem', lineHeight: '1.6', color: '#555' }}>
                  <DraggableBlock id="payment_bankName" data={data} onChange={onChange}><div><span style={{ fontWeight: 'bold', color: '#333' }}><EditableLabel id="lbl_bank_name" defaultText="Bank:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.bankName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, bankName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Bank Name" /></div></DraggableBlock>
                  <DraggableBlock id="payment_accNo" data={data} onChange={onChange}><div><span style={{ fontWeight: 'bold', color: '#333' }}><EditableLabel id="lbl_acc_no" defaultText="A/C No:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.accountNumber} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, accountNumber: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Account Number" /></div></DraggableBlock>
                  <DraggableBlock id="payment_ifsc" data={data} onChange={onChange}><div><span style={{ fontWeight: 'bold', color: '#333' }}><EditableLabel id="lbl_ifsc" defaultText="IFSC:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.ifsc} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, ifsc: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="IFSC Code" /></div></DraggableBlock>
                  <DraggableBlock id="payment_branch" data={data} onChange={onChange}><div><span style={{ fontWeight: 'bold', color: '#333' }}><EditableLabel id="lbl_branch" defaultText="Branch:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.branchName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, branchName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Branch Name" /></div></DraggableBlock>
                </div>
              </div>
            )}
          </div>
        </DraggableBlock>
        
        <DraggableBlock id="totals" data={data} onChange={onChange} style={{ width: '40%' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
              <DraggableBlock id="totals_subLabel" data={data} onChange={onChange}><span>Subtotal</span></DraggableBlock>
              <DraggableBlock id="totals_subVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(subtotal)}</span></DraggableBlock>
            </div>
            {showGst && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#666' }}>
                <DraggableBlock id="totals_igstLabel" data={data} onChange={onChange}><span>Total Tax (IGST)</span></DraggableBlock>
                <DraggableBlock id="totals_igstVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(igst)}</span></DraggableBlock>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '2px solid #e2e8f0', fontSize: '1.4rem', fontWeight: 800, color: '#f97316' }}>
              <DraggableBlock id="totals_grandLabel" data={data} onChange={onChange}><span>Total</span></DraggableBlock>
              <DraggableBlock id="totals_grandVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(grandTotal)}</span></DraggableBlock>
            </div>
          </div>
        </DraggableBlock>
      </div>

      {data.countryOfSupply && !data.hiddenFields?.includes('placeOfSupply') && (
        <DraggableBlock id="countryOfSupply" data={data} onChange={onChange}>
          <div style={{ marginTop: '40px', fontSize: '0.85rem', color: '#666' }}>
            <strong>Country of Supply:</strong> <EditableValue value={data.countryOfSupply} onChange={(v) => onChange?.({...data, countryOfSupply: v})} placeholder="Country" />
          </div>
        </DraggableBlock>
      )}

      <DraggableBlock id="creative_notes" data={data} onChange={onChange}>
        <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#555' }}>
          <strong>Notes:</strong>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}><EditableValue isTextArea value={data.notes} onChange={(v) => onChange?.({...data, notes: v})} placeholder="Enter notes here..." /></div>
        </div>
      </DraggableBlock>
      <DraggableBlock id="creative_terms_cond" data={data} onChange={onChange}>
        <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#555' }}>
          <strong>Terms &amp; Conditions:</strong>
          <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}><EditableValue isTextArea value={data.terms} onChange={(v) => onChange?.({...data, terms: v})} placeholder="Enter your terms and conditions here..." /></div>
        </div>
      </DraggableBlock>

      <DraggableBlock id="footerNote" data={data} onChange={onChange}>
        <div style={{ textAlign: 'center', marginTop: '60px', padding: '20px', color: '#999', fontSize: '0.8rem' }}>
          Thank you for your business!
        </div>
      </DraggableBlock>
    </div>
  );
};
