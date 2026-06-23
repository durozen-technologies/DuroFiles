import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';
import { EditableLabel } from '../EditableLabel';
import { EditableValue } from '../EditableValue';
import { EditableImage } from '../EditableImage';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const TemplateModern: React.FC<Props> = ({ data, onChange }) => {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateIGST = () => {
    return data.items.reduce((sum, item) => {
      const amount = item.quantity * item.rate;
      return sum + (amount * (item.gstRate / 100));
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const igst = calculateIGST();
  const grandTotal = subtotal + igst;

  const upiUri = `upi://pay?pa=$<EditableValue value={data.upiId} onChange={(v) => onChange?.({...data, upiId: v})} placeholder="example@upi" />&pn=${encodeURIComponent(data.billedBy.name)}&am=${grandTotal.toFixed(2)}&cu=INR`;

  return (
    <div className="a4-paper template-modern" id="invoice-preview">
      <DraggableBlock id="header" data={data} onChange={onChange}>
        <div className="invoice-header">
          <div>
            <DraggableBlock id="header_title" data={data} onChange={onChange}>
              <div className="invoice-title"><EditableLabel id="lbl_invoice" defaultText="Invoice" data={data} onChange={onChange} /></div>
            </DraggableBlock>
            <div className="invoice-meta-grid">
              {!data.hiddenFields?.includes('invoiceNo') && (
                <>
                  <DraggableBlock id="meta_invNoLabel" data={data} onChange={onChange}><div className="meta-label"><EditableLabel id="lbl_invoiceNo" defaultText="Invoice No" data={data} onChange={onChange} /></div></DraggableBlock>
                  <DraggableBlock id="meta_invNoValue" data={data} onChange={onChange}><div className="meta-value"><EditableValue value={data.invoiceNumber} onChange={(v) => onChange?.({ ...data, invoiceNumber: v })} placeholder="INV-001" /></div></DraggableBlock>
                </>
              )}
              {!data.hiddenFields?.includes('invoiceDate') && (
                <>
                  <DraggableBlock id="meta_dateLabel" data={data} onChange={onChange}><div className="meta-label"><EditableLabel id="lbl_invoiceDate" defaultText="Invoice Date" data={data} onChange={onChange} /></div></DraggableBlock>
                  <DraggableBlock id="meta_dateValue" data={data} onChange={onChange}><div className="meta-value"><EditableValue value={data.date} onChange={(v) => onChange?.({ ...data, date: v })} placeholder="Date" /></div></DraggableBlock>
                </>
              )}
              {!data.hiddenFields?.includes('dueDate') && (
                <>
                  <DraggableBlock id="meta_dueDateLabel" data={data} onChange={onChange}><div className="meta-label"><EditableLabel id="lbl_dueDate" defaultText="Due Date" data={data} onChange={onChange} /></div></DraggableBlock>
                  <DraggableBlock id="meta_dueDateValue" data={data} onChange={onChange}><div className="meta-value"><EditableValue value={data.dueDate} onChange={(v) => onChange?.({ ...data, dueDate: v })} placeholder="Due Date" /></div></DraggableBlock>
                </>
              )}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {!data.hiddenFields?.includes('logo') && (
              <EditableImage src={data.logoUrl || ''} onChange={(v) => onChange?.({ ...data, logoUrl: v })} style={{ maxHeight: '60px', maxWidth: '200px', objectFit: 'contain' }} />
            )}
          </div>
        </div>
      </DraggableBlock>

      <div className="billed-sections">
        <DraggableBlock id="billedBy" data={data} onChange={onChange}>
          <div className="billed-box">
            <DraggableBlock id="billedBy_title" data={data} onChange={onChange}><div className="billed-title"><EditableLabel id="lbl_billedBy" defaultText="Billed By" data={data} onChange={onChange} /></div></DraggableBlock>
            <DraggableBlock id="billedBy_name" data={data} onChange={onChange}><div className="invoice-text-bold"><EditableValue value={data.billedBy.name} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, name: v } })} placeholder="Your Company Name" /></div></DraggableBlock>
            <DraggableBlock id="billedBy_address" data={data} onChange={onChange}><div className="invoice-text" style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}><EditableValue isTextArea value={data.billedBy.address} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, address: v } })} placeholder="Your Address" /></div></DraggableBlock>
            {data.billedBy.phone && <DraggableBlock id="billedBy_phone" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold"><EditableLabel id="lbl_phone" defaultText="Phone:" data={data} onChange={onChange} /></span> <EditableValue value={data.billedBy.phone} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, phone: v } })} placeholder="Phone" /></div></DraggableBlock>}
            {data.billedBy.email && <DraggableBlock id="billedBy_email" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold"><EditableLabel id="lbl_email" defaultText="Email:" data={data} onChange={onChange} /></span> <EditableValue value={data.billedBy.email} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, email: v } })} placeholder="Email" /></div></DraggableBlock>}
            {data.billedBy.gstin && !data.hiddenFields?.includes('gstin') && <DraggableBlock id="billedBy_gstin" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold"><EditableLabel id="lbl_gstin" defaultText="GSTIN:" data={data} onChange={onChange} /></span> <EditableValue value={data.billedBy.gstin} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, gstin: v } })} placeholder="GSTIN" /></div></DraggableBlock>}
            {data.billedBy.pan && <DraggableBlock id="billedBy_pan" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold"><EditableLabel id="lbl_pan" defaultText="PAN:" data={data} onChange={onChange} /></span> <EditableValue value={data.billedBy.pan} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, pan: v } })} placeholder="PAN" /></div></DraggableBlock>}
          </div>
        </DraggableBlock>
        <DraggableBlock id="billedTo" data={data} onChange={onChange}>
          <div className="billed-box">
            <DraggableBlock id="billedTo_title" data={data} onChange={onChange}><div className="billed-title"><EditableLabel id="lbl_billedTo" defaultText="Billed To" data={data} onChange={onChange} /></div></DraggableBlock>
            <DraggableBlock id="billedTo_name" data={data} onChange={onChange}><div className="invoice-text-bold"><EditableValue value={data.billedTo.name} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, name: v } })} placeholder="Client Name" /></div></DraggableBlock>
            <DraggableBlock id="billedTo_address" data={data} onChange={onChange}><div className="invoice-text" style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, address: v } })} placeholder="Client Address" /></div></DraggableBlock>
            {data.billedTo.gstin && !data.hiddenFields?.includes('customerGst') && <DraggableBlock id="billedTo_gstin" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold"><EditableLabel id="lbl_gstin" defaultText="GSTIN:" data={data} onChange={onChange} /></span> <EditableValue value={data.billedTo.gstin} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, gstin: v } })} placeholder="GSTIN" /></div></DraggableBlock>}
            {data.billedTo.pan && <DraggableBlock id="billedTo_pan" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold"><EditableLabel id="lbl_pan" defaultText="PAN:" data={data} onChange={onChange} /></span> <EditableValue value={data.billedTo.pan} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, pan: v } })} placeholder="PAN" /></div></DraggableBlock>}
          </div>
        </DraggableBlock>
      </div>

      {data.countryOfSupply && !data.hiddenFields?.includes('placeOfSupply') && (
        <div className="country-supply">
          <span className="invoice-text-bold"><EditableLabel id="lbl_country" defaultText="Country of Supply:" data={data} onChange={onChange} /></span> <EditableValue value={data.countryOfSupply} onChange={(v) => onChange?.({ ...data, countryOfSupply: v })} placeholder="Country" />
        </div>
      )}

      <DraggableBlock id="table" data={data} onChange={onChange}>
        <table className="invoice-table">
          <thead>
            <tr>
              <th><EditableLabel id="lbl_col_item" defaultText="Item" data={data} onChange={onChange} /></th>
              <th className="text-center" style={{ textAlign: 'center' }}><EditableLabel id="lbl_col_gst" defaultText="GST Rate" data={data} onChange={onChange} /></th>
              <th className="text-center" style={{ textAlign: 'center' }}><EditableLabel id="lbl_col_qty" defaultText="Qty" data={data} onChange={onChange} /></th>
              <th className="text-right" style={{ textAlign: 'right' }}><EditableLabel id="lbl_col_rate" defaultText="Rate" data={data} onChange={onChange} /></th>
              <th className="text-right" style={{ textAlign: 'right' }}><EditableLabel id="lbl_col_amt" defaultText="Amount" data={data} onChange={onChange} /></th>
              <th className="text-right" style={{ textAlign: 'right' }}><EditableLabel id="lbl_col_igst" defaultText="IGST" data={data} onChange={onChange} /></th>
              <th className="text-right" style={{ textAlign: 'right' }}><EditableLabel id="lbl_col_total" defaultText="Total" data={data} onChange={onChange} /></th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
               <tr>
                 <td colSpan={7} style={{ textAlign: 'center', color: '#9ca3af', padding: '30px' }}>
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
              const amount = item.quantity * item.rate;
              const itemIgst = amount * (item.gstRate / 100);
              const total = amount + itemIgst;
              return (
                <tr key={item.id || index} className="invoice-row-group" style={{ position: "relative" }}>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    {onChange && <button className="delete-item-btn print-hidden" onClick={() => { const newItems = [...data.items]; newItems.splice(index, 1); onChange({ ...data, items: newItems }); }}>×</button>}
                    <span>{index + 1}.</span>
                    <div>
                      <div className="invoice-text-main"><EditableValue value={item.description} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, description: v }; onChange?.({ ...data, items: newItems }) }} placeholder="Item Name" /></div>
                      {!data.hiddenFields?.includes('hsn') && (
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}><EditableLabel id="lbl_hsn" defaultText="HSN:" data={data} onChange={onChange} /> <EditableValue value={item.hsn} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, hsn: v }; onChange?.({ ...data, items: newItems }) }} placeholder="HSN" /></div>
                      )}
                    </div>
                  </td>
                  <td className="text-center" style={{ textAlign: 'center' }}><EditableValue value={item.gstRate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, gstRate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" />%</td>
                  <td className="text-center" style={{ textAlign: 'center' }}><EditableValue value={item.quantity.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, quantity: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                  <td className="text-right" style={{ textAlign: 'right' }}>{data.currency || '₹'}<EditableValue value={item.rate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, rate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                  <td className="text-right" style={{ textAlign: 'right' }}>{data.currency || '₹'}<EditableValue value={amount.toFixed(2)} onChange={(v) => { const newItems = [...data.items]; const newAmt = parseFloat(v) || 0; newItems[index] = { ...item, rate: item.quantity > 0 ? newAmt / item.quantity : newAmt }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                  <td className="text-right" style={{ textAlign: 'right' }}>{data.currency || '₹'}{itemIgst.toFixed(2)}</td>
                  <td className="text-right" style={{ textAlign: 'right' }}>{data.currency || '₹'}{total.toFixed(2)}</td>
                </tr>
              );
            })}
            {data.items.length > 0 && onChange && (
              <tr className="print-hidden">
                <td colSpan={7} style={{ textAlign: 'center', padding: '10px' }}>
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

      <div className="invoice-bottom">
        <DraggableBlock id="payment" data={data} onChange={onChange}>
          <div className="payment-info">
            {(!data.hiddenFields?.includes('qrCode') || !data.hiddenFields?.includes('upiId')) && (
              <>
                {!data.hiddenFields?.includes('qrCode') && (
                  <>
                    <DraggableBlock id="payment_title" data={data} onChange={onChange}><div className="payment-title"><EditableLabel id="lbl_scanToPay" defaultText="Scan to pay via UPI" data={data} onChange={onChange} /></div></DraggableBlock>
                    <DraggableBlock id="payment_desc" data={data} onChange={onChange}><div className="payment-desc"><EditableLabel id="lbl_scanDesc" defaultText="Maximum of 1 lakh can be transferred via upi in a single day" data={data} onChange={onChange} /></div></DraggableBlock>
                    <DraggableBlock id="payment_qr" data={data} onChange={onChange}>
                      <div className="qr-code-box">
                        <QRCodeSVG value={upiUri} size={90} />
                      </div>
                    </DraggableBlock>
                  </>
                )}
                {!data.hiddenFields?.includes('upiId') && (
                  <DraggableBlock id="payment_upiId" data={data} onChange={onChange}><div className="upi-id"><EditableValue value={data.upiId} onChange={(v) => onChange?.({ ...data, upiId: v })} placeholder="example@upi" /></div></DraggableBlock>
                )}
              </>
            )}
            
            {/* Bank Details Section */}
            {!data.hiddenFields?.includes('bankDetails') && (
              <div style={{ marginTop: data.upiId ? '16px' : '0' }}>
                <DraggableBlock id="payment_bank_title" data={data} onChange={onChange}><div className="payment-title"><EditableLabel id="lbl_bank_details" defaultText="Bank Details" data={data} onChange={onChange} /></div></DraggableBlock>
                <div style={{ fontSize: '0.8rem', lineHeight: '1.5', marginTop: '4px' }}>
                  <DraggableBlock id="payment_bankName" data={data} onChange={onChange}><div><span style={{ fontWeight: 600 }}><EditableLabel id="lbl_bank_name" defaultText="Bank:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.bankName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, bankName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Bank Name" /></div></DraggableBlock>
                  <DraggableBlock id="payment_accNo" data={data} onChange={onChange}><div><span style={{ fontWeight: 600 }}><EditableLabel id="lbl_acc_no" defaultText="A/C No:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.accountNumber} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, accountNumber: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Account Number" /></div></DraggableBlock>
                  <DraggableBlock id="payment_ifsc" data={data} onChange={onChange}><div><span style={{ fontWeight: 600 }}><EditableLabel id="lbl_ifsc" defaultText="IFSC:" data={data} onChange={onChange} /></span> <EditableValue value={data.paymentDetails?.ifsc} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, ifsc: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="IFSC Code" /></div></DraggableBlock>
                </div>
              </div>
            )}
          </div>
        </DraggableBlock>
        <DraggableBlock id="totals" data={data} onChange={onChange}>
          <div className="invoice-totals">
            <div className="totals-row">
              <DraggableBlock id="totals_subLabel" data={data} onChange={onChange}><span><EditableLabel id="lbl_tot_amount" defaultText="Amount" data={data} onChange={onChange} /></span></DraggableBlock>
              <DraggableBlock id="totals_subVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{subtotal.toFixed(2)}</span></DraggableBlock>
            </div>
            <div className="totals-row">
              <DraggableBlock id="totals_igstLabel" data={data} onChange={onChange}><span><EditableLabel id="lbl_tot_igst" defaultText="IGST" data={data} onChange={onChange} /></span></DraggableBlock>
              <DraggableBlock id="totals_igstVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{igst.toFixed(2)}</span></DraggableBlock>
            </div>
            <div className="totals-row grand-total">
              <DraggableBlock id="totals_grandLabel" data={data} onChange={onChange}><span><EditableLabel id="lbl_tot_total" defaultText="Total (INR)" data={data} onChange={onChange} /></span></DraggableBlock>
              <DraggableBlock id="totals_grandVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{grandTotal.toFixed(2)}</span></DraggableBlock>
            </div>
          </div>
        </DraggableBlock>
      </div>

      {!data.hiddenFields?.includes('notes') && data.notes && (
        <DraggableBlock id="modern_notes" data={data} onChange={onChange}>
          <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#555' }}>
            <strong>Notes:</strong>
            <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}><EditableValue isTextArea value={data.notes} onChange={(v) => onChange?.({ ...data, notes: v })} placeholder="Enter notes here..." /></div>
          </div>
        </DraggableBlock>
      )}
      {!data.hiddenFields?.includes('terms') && data.terms && (
        <DraggableBlock id="modern_terms_cond" data={data} onChange={onChange}>
          <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#555' }}>
            <strong>Terms &amp; Conditions:</strong>
            <div style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}><EditableValue isTextArea value={data.terms} onChange={(v) => onChange?.({ ...data, terms: v })} placeholder="Enter your terms and conditions here..." /></div>
          </div>
        </DraggableBlock>
      )}
      {!data.hiddenFields?.includes('signature') && (
        <DraggableBlock id="footerNote" data={data} onChange={onChange}>
          <div className="invoice-footer-note">
            <EditableLabel id="lbl_footerNote" defaultText="This is an electronically generated document, no signature is required." data={data} onChange={onChange} />
          </div>
        </DraggableBlock>
      )}
    </div>
  );
};
