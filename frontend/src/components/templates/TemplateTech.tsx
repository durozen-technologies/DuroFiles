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

export const TemplateTech: React.FC<Props> = ({ data, onChange }) => {
  const showGst = !data.hiddenFields?.includes('gst');

  const calculateTotal = () => {
    const amounts = data.items.map(item => {
      const amount = multiply(item.quantity, item.rate);
      const igst = showGst ? calculateTax(amount, item.gstRate) : 0;
      return add(amount, igst);
    });
    return sum(amounts);
  };

  const calculateSubTotal = () => {
    const amounts = data.items.map(item => multiply(item.quantity, item.rate));
    return sum(amounts);
  };

  const grandTotal = calculateTotal();
  const subTotal = calculateSubTotal();

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
    <div className="a4-paper template-tech" style={{ position: 'relative', paddingBottom: '40mm' }}>
      {/* Decorative Green Stripe (Left) */}
      <div style={{
        position: 'absolute',
        top: '-20mm',
        bottom: '-20mm',
        left: '-20mm',
        width: '15mm',
        backgroundColor: '#1f584f',
        zIndex: 0
      }} />

      {/* Decorative Footer */}
      <div style={{
        position: 'absolute',
        bottom: '-20mm',
        left: '-20mm',
        right: '-20mm',
        height: '45mm',
        display: 'flex',
        zIndex: 0,
        color: 'white'
      }}>
        <DraggableBlock id="billedByHeader" data={data} onChange={onChange} style={{ flex: 1, display: 'flex' }}>
          <div style={{ flex: 1, backgroundColor: '#a695a5', padding: '10mm 15mm 10mm 25mm', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <DraggableBlock id="billedBy_name" data={data} onChange={onChange}><h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px 0' }}><EditableValue value={data.billedBy.name} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, name: v}})} placeholder="Your Company" /></h2></DraggableBlock>
            <DraggableBlock id="billedBy_emailTop" data={data} onChange={onChange}><p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}><EditableValue value={data.billedBy.email} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, email: v}})} placeholder="Email" /></p></DraggableBlock>
          </div>
        </DraggableBlock>
        <DraggableBlock id="billedBy" data={data} onChange={onChange} style={{ flex: 1, display: 'flex' }}>
          <div style={{ flex: 1, backgroundColor: '#8b7a8a', padding: '10mm 15mm', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.8rem', lineHeight: 1.5 }}>
            <DraggableBlock id="billedBy_email" data={data} onChange={onChange}><p style={{ margin: 0 }}><EditableValue value={data.billedBy.email} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, email: v}})} placeholder="Email" /></p></DraggableBlock>
            <DraggableBlock id="billedBy_address" data={data} onChange={onChange}><p style={{ margin: 0, whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.billedBy.address} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, address: v}})} placeholder="Your Address" /></p></DraggableBlock>
            <DraggableBlock id="billedBy_phone" data={data} onChange={onChange}><p style={{ margin: 0 }}><EditableValue value={data.billedBy.phone} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, phone: v}})} placeholder="Phone" /></p></DraggableBlock>
            {showGst && <DraggableBlock id="billedBy_gstin" data={data} onChange={onChange}><p style={{ margin: 0 }}><EditableLabel id="lbl_gstin" defaultText="GSTIN: " data={data} onChange={onChange} /><EditableValue value={data.billedBy.gstin} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, gstin: v}})} placeholder="GSTIN" /> | PAN: <EditableValue value={data.billedBy.pan} onChange={(v) => onChange?.({...data, billedBy: {...data.billedBy, pan: v}})} placeholder="PAN" /></p></DraggableBlock>}
          </div>
        </DraggableBlock>
      </div>

      {/* Main Content Container (brings it above the absolute stripes) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <DraggableBlock id="header" data={data} onChange={onChange}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              {!data.hiddenFields?.includes('logo') && (
                <DraggableBlock id="header_logo" data={data} onChange={onChange}>
                  <EditableImage
                    src={data.logoUrl || ''}
                    onChange={(src) => onChange?.({ ...data, logoUrl: src })}
                    fallbackText="Upload Logo"
                    style={{ width: '120px', height: '60px' }}
                  />
                </DraggableBlock>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <DraggableBlock id="header_title" data={data} onChange={onChange}><h1 style={{ fontSize: '3.5rem', fontWeight: 600, color: '#1f584f', margin: '0 0 20px 0', letterSpacing: '2px' }}><EditableLabel id="lbl_invoice" defaultText="INVOICE" data={data} onChange={onChange} /></h1></DraggableBlock>
            </div>
          </div>
        </DraggableBlock>

        {/* Info Blocks */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <DraggableBlock id="billedTo" data={data} onChange={onChange}>
            <div>
              <DraggableBlock id="billedTo_title" data={data} onChange={onChange}><h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#111' }}>ISSUED TO:</h3></DraggableBlock>
              <DraggableBlock id="billedTo_name" data={data} onChange={onChange}><p style={{ fontWeight: 600, margin: '0 0 4px 0', color: '#111' }}><EditableValue value={data.billedTo.name} onChange={(v) => onChange?.({...data, billedTo: {...data.billedTo, name: v}})} placeholder="Client Name" /></p></DraggableBlock>
              <DraggableBlock id="billedTo_address" data={data} onChange={onChange}><p style={{ margin: '0 0 4px 0', color: '#444', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({...data, billedTo: {...data.billedTo, address: v}})} placeholder="Client Address" /></p></DraggableBlock>
              {data.billedTo.pan && <DraggableBlock id="billedTo_pan" data={data} onChange={onChange}><p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}><EditableLabel id="lbl_pan" defaultText="PAN: " data={data} onChange={onChange} /><EditableValue value={data.billedTo.pan} onChange={(v) => onChange?.({...data, billedTo: {...data.billedTo, pan: v}})} placeholder="PAN" /></p></DraggableBlock>}
            </div>
          </DraggableBlock>

          <DraggableBlock id="details" data={data} onChange={onChange}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '8px 16px', fontSize: '0.9rem' }}>
                {!data.hiddenFields?.includes('invoiceNo') && (
                  <>
                    <DraggableBlock id="details_invNoLabel" data={data} onChange={onChange}><div style={{ color: '#666', fontWeight: 600 }}>INVOICE NO:</div></DraggableBlock>
                    <DraggableBlock id="details_invNoVal" data={data} onChange={onChange}><div style={{ color: '#444' }}><EditableValue value={data.invoiceNumber} onChange={(v) => onChange?.({...data, invoiceNumber: v})} placeholder="INV-001" /></div></DraggableBlock>
                  </>
                )}
                
                {!data.hiddenFields?.includes('invoiceDate') && (
                  <>
                    <DraggableBlock id="details_dateLabel" data={data} onChange={onChange}><div style={{ color: '#666', fontWeight: 600 }}>DATE ISSUED:</div></DraggableBlock>
                    <DraggableBlock id="details_dateVal" data={data} onChange={onChange}><div style={{ color: '#444' }}><EditableValue value={data.date} onChange={(v) => onChange?.({...data, date: v})} placeholder="Date" /></div></DraggableBlock>
                  </>
                )}
                
                {!data.hiddenFields?.includes('dueDate') && (
                  <>
                    <DraggableBlock id="details_dueLabel" data={data} onChange={onChange}><div style={{ color: '#666', fontWeight: 600 }}>DUE DATE:</div></DraggableBlock>
                    <DraggableBlock id="details_dueVal" data={data} onChange={onChange}><div style={{ color: '#444' }}><EditableValue value={data.dueDate} onChange={(v) => onChange?.({...data, dueDate: v})} placeholder="Due Date" /></div></DraggableBlock>
                  </>
                )}
                
                {data.countryOfSupply && !data.hiddenFields?.includes('placeOfSupply') && (
                  <>
                    <DraggableBlock id="details_posLabel" data={data} onChange={onChange}><div style={{ color: '#666', fontWeight: 600 }}>PLACE OF SUPPLY:</div></DraggableBlock>
                    <DraggableBlock id="details_posVal" data={data} onChange={onChange}><div style={{ color: '#444' }}><EditableValue value={data.countryOfSupply} onChange={(v) => onChange?.({...data, countryOfSupply: v})} placeholder="Country" /></div></DraggableBlock>
                  </>
                )}
              </div>
            </div>
          </DraggableBlock>
        </div>

        {/* Table */}
        <DraggableBlock id="table" data={data} onChange={onChange}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e2ccd8' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#111', fontWeight: 700, fontSize: '0.95rem' }}><EditableLabel id="lbl_col_item" defaultText="Description" data={data} onChange={onChange} /></th>
                <th style={{ padding: '12px 16px', textAlign: 'right', color: '#111', fontWeight: 700, fontSize: '0.95rem' }}>Price</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#111', fontWeight: 700, fontSize: '0.95rem' }}>QTY</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', color: '#111', fontWeight: 700, fontSize: '0.95rem' }}><EditableLabel id="lbl_col_total" defaultText="Total" data={data} onChange={onChange} /></th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => {
                const amount = multiply(item.quantity, item.rate);
                return (
                  <tr key={index} style={{ borderBottom: '1px solid #eaeaea' }}>
                    <td style={{ padding: '12px 16px', color: '#333', fontSize: '0.95rem' }}>
                      {onChange && (
                        <button className="delete-item-btn print-hidden" onClick={() => { const newItems = [...data.items]; newItems.splice(index, 1); onChange({...data, items: newItems}); }} style={{ marginRight: '6px' }}>×</button>
                      )}
                      <EditableValue value={item.description} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, description: v}; onChange?.({...data, items: newItems})}} placeholder="Item Name" />
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#333', fontSize: '0.95rem' }}>{data.currency || '₹'}<EditableValue value={item.rate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, rate: parseFloat(v)||0}; onChange?.({...data, items: newItems})}} placeholder="0" /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: '#333', fontSize: '0.95rem' }}><EditableValue value={item.quantity.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, quantity: parseFloat(v)||0}; onChange?.({...data, items: newItems})}} placeholder="0" /></td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#333', fontSize: '0.95rem' }}><span tabIndex={0} onKeyDown={handleRowKeyDown} style={{outline: 'none'}}>{data.currency || '₹'}<EditableValue value={amount.toString()} onChange={(v) => { const newItems = [...data.items]; const newAmt = parseFloat(v) || 0; newItems[index] = {...item, rate: item.quantity > 0 ? newAmt / item.quantity : newAmt}; onChange?.({...data, items: newItems})}} placeholder="0" /></span></td>
                  </tr>
                );
              })}
            {data.items.length > 0 && onChange && (
            <tr className="print-hidden">
              <td colSpan={7} style={{ textAlign: 'center', padding: '10px' }}>
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

        {/* Totals Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Side: Payment Info & Terms */}
          <DraggableBlock id="payment" data={data} onChange={onChange} style={{ width: '50%' }}>
            <div>
              {(!data.hiddenFields?.includes('qrCode') || !data.hiddenFields?.includes('upiId')) && (
                <div style={{ marginBottom: '20px' }}>
                  <DraggableBlock id="payment_title" data={data} onChange={onChange}><h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 8px 0', color: '#111' }}><EditableLabel id="lbl_payment_method" defaultText="Payment Method" data={data} onChange={onChange} /></h4></DraggableBlock>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ background: '#fff', padding: '8px', border: '1px solid #ddd', borderRadius: '8px' }}>
                      <DraggableBlock id="payment_qr" data={data} onChange={onChange}><EditableImage src={data.qrCodeUrl || ''} onChange={(src) => onChange?.({...data, qrCodeUrl: src})} fallbackText="Upload QR" style={{ width: '80px', height: '80px', margin: '0 auto' }} /></DraggableBlock>
                    </div>
                    <div>
                      <DraggableBlock id="payment_method" data={data} onChange={onChange}><p style={{ margin: '0 0 4px 0', color: '#444', fontSize: '0.9rem', fontWeight: 'bold' }}><EditableLabel id="lbl_scanToPay" defaultText="Scan to Pay via UPI" data={data} onChange={onChange} /></p></DraggableBlock>
                      <DraggableBlock id="payment_upiId" data={data} onChange={onChange}><p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}><EditableValue value={data.upiId} onChange={(v) => onChange?.({...data, upiId: v})} placeholder="example@upi" /></p></DraggableBlock>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Bank Details Section */}
              {!data.hiddenFields?.includes('bankDetails') && (
                <div style={{ marginBottom: '20px' }}>
                  <DraggableBlock id="payment_bank_title" data={data} onChange={onChange}><h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 8px 0', color: '#111' }}><EditableLabel id="lbl_bank_details" defaultText="Bank Details" data={data} onChange={onChange} /></h4></DraggableBlock>
                  <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#444' }}>
                    <DraggableBlock id="payment_bankName" data={data} onChange={onChange}><div><span style={{ fontWeight: 'bold', color: '#111' }}><EditableLabel id="lbl_bank_name" defaultText="Bank:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.bankName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, bankName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Bank Name" /></div></DraggableBlock>
                    <DraggableBlock id="payment_accNo" data={data} onChange={onChange}><div><span style={{ fontWeight: 'bold', color: '#111' }}><EditableLabel id="lbl_acc_no" defaultText="A/C No:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.accountNumber} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, accountNumber: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Account Number" /></div></DraggableBlock>
                    <DraggableBlock id="payment_ifsc" data={data} onChange={onChange}><div><span style={{ fontWeight: 'bold', color: '#111' }}><EditableLabel id="lbl_ifsc" defaultText="IFSC:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.ifsc} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, ifsc: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="IFSC Code" /></div></DraggableBlock>
                    <DraggableBlock id="payment_branch" data={data} onChange={onChange}><div><span style={{ fontWeight: 'bold', color: '#111' }}><EditableLabel id="lbl_branch" defaultText="Branch:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.branchName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, branchName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Branch Name" /></div></DraggableBlock>
                  </div>
                </div>
              )}
              
              <div>
                <DraggableBlock id="terms_title" data={data} onChange={onChange}><h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 8px 0', color: '#111' }}>Terms and Conditions:</h4></DraggableBlock>
                <DraggableBlock id="terms_desc" data={data} onChange={onChange}><p style={{ margin: 0, color: '#666', fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                  Please pay within 15 days of receiving this invoice. Late payments may be subject to a 1.5% monthly fee.
                </p></DraggableBlock>
              </div>
            </div>
          </DraggableBlock>

          {/* Right Side: Totals */}
          <DraggableBlock id="totals" data={data} onChange={onChange} style={{ width: '40%' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', color: '#333', fontSize: '0.95rem' }}>
                <DraggableBlock id="totals_subLabel" data={data} onChange={onChange}><span>Sub Total</span></DraggableBlock>
                <DraggableBlock id="totals_subVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(subTotal)}</span></DraggableBlock>
              </div>
              
              {data.items.map((item, index) => {
                if (showGst && item.gstRate > 0) {
                  const amount = multiply(item.quantity, item.rate);
                  const igst = calculateTax(amount, item.gstRate);
                  return (
                    <div key={`tax-${index}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', color: '#333', fontSize: '0.95rem' }}>
                      <DraggableBlock id={`totals_igstLabel_${index}`} data={data} onChange={onChange}><span>Tax (GST <EditableValue value={item.gstRate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = {...item, gstRate: parseFloat(v)||0}; onChange?.({...data, items: newItems})}} placeholder="0" />%)</span></DraggableBlock>
                      <DraggableBlock id={`totals_igstVal_${index}`} data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(igst)}</span></DraggableBlock>
                    </div>
                  );
                }
                return null;
              })}

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: '#e2ccd8', marginTop: '8px', fontWeight: 700, color: '#111', fontSize: '1.1rem' }}>
                <DraggableBlock id="totals_grandLabel" data={data} onChange={onChange}><span>Grand Total</span></DraggableBlock>
                <DraggableBlock id="totals_grandVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{formatCurrency(grandTotal)}</span></DraggableBlock>
              </div>
            </div>
          </DraggableBlock>
        </div>
      </div>
    </div>
  );
};
