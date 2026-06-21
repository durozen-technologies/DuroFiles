import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const TemplateCreative: React.FC<Props> = ({ data, onChange }) => {
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

  const upiUri = `upi://pay?pa=${data.upiId}&pn=${encodeURIComponent(data.billedBy.name)}&am=${grandTotal.toFixed(2)}&cu=INR`;

  return (
    <div className="a4-paper template-creative" style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: '#333' }}>
      
      <DraggableBlock id="header" data={data} onChange={onChange}>
        <div style={{ background: '#f97316', color: 'white', margin: '-20mm -20mm 20px -20mm', padding: '20mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <DraggableBlock id="header_title" data={data} onChange={onChange}><h1 style={{ fontSize: '3.5rem', fontWeight: 800, margin: 0, letterSpacing: '-1px' }}>INVOICE</h1></DraggableBlock>
            <DraggableBlock id="header_invNo" data={data} onChange={onChange}><p style={{ fontSize: '1.2rem', opacity: 0.9 }}>#{data.invoiceNumber || '001'}</p></DraggableBlock>
          </div>
          <div style={{ textAlign: 'right' }}>
            {data.logoUrl ? (
              <DraggableBlock id="header_logo" data={data} onChange={onChange}><img src={data.logoUrl} alt="Company Logo" style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain', background: 'white', padding: '10px', borderRadius: '8px' }} /></DraggableBlock>
            ) : (
              <DraggableBlock id="header_brand" data={data} onChange={onChange}><h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{data.billedBy.name || 'Your Brand'}</h2></DraggableBlock>
            )}
          </div>
        </div>
      </DraggableBlock>

      <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
        <DraggableBlock id="billedBy" data={data} onChange={onChange} style={{ flex: 1 }}>
          <div>
            <DraggableBlock id="billedBy_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>From</h3></DraggableBlock>
            <DraggableBlock id="billedBy_name" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{data.billedBy.name || 'Your Company Name'}</p></DraggableBlock>
            <DraggableBlock id="billedBy_address" data={data} onChange={onChange}><p style={{ whiteSpace: 'pre-wrap', color: '#555', marginTop: '4px' }}>{data.billedBy.address || 'Your Address'}</p></DraggableBlock>
            <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>
              {data.billedBy.phone && <DraggableBlock id="billedBy_phone" data={data} onChange={onChange}><div>P: {data.billedBy.phone}</div></DraggableBlock>}
              {data.billedBy.email && <DraggableBlock id="billedBy_email" data={data} onChange={onChange}><div>E: {data.billedBy.email}</div></DraggableBlock>}
              {data.billedBy.gstin && <DraggableBlock id="billedBy_gstin" data={data} onChange={onChange}><div>GST: {data.billedBy.gstin}</div></DraggableBlock>}
            </div>
          </div>
        </DraggableBlock>

        <DraggableBlock id="billedTo" data={data} onChange={onChange} style={{ flex: 1 }}>
          <div>
            <DraggableBlock id="billedTo_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>To</h3></DraggableBlock>
            <DraggableBlock id="billedTo_name" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{data.billedTo.name || 'Client Name'}</p></DraggableBlock>
            <DraggableBlock id="billedTo_address" data={data} onChange={onChange}><p style={{ whiteSpace: 'pre-wrap', color: '#555', marginTop: '4px' }}>{data.billedTo.address || 'Client Address'}</p></DraggableBlock>
            {data.billedTo.gstin && <DraggableBlock id="billedTo_gstin" data={data} onChange={onChange}><p style={{ marginTop: '10px', fontSize: '0.85rem', color: '#666' }}>GST: {data.billedTo.gstin}</p></DraggableBlock>}
          </div>
        </DraggableBlock>

        <DraggableBlock id="details" data={data} onChange={onChange} style={{ width: '200px' }}>
          <div>
             <DraggableBlock id="details_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Details</h3></DraggableBlock>
             <div style={{ background: '#fff7ed', padding: '15px', borderRadius: '8px', border: '1px solid #ffedd5' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                 <DraggableBlock id="details_dateLabel" data={data} onChange={onChange}><span style={{ color: '#666' }}>Date:</span></DraggableBlock>
                 <DraggableBlock id="details_dateVal" data={data} onChange={onChange}><span style={{ fontWeight: 'bold' }}>{data.date}</span></DraggableBlock>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <DraggableBlock id="details_dueLabel" data={data} onChange={onChange}><span style={{ color: '#666' }}>Due:</span></DraggableBlock>
                 <DraggableBlock id="details_dueVal" data={data} onChange={onChange}><span style={{ fontWeight: 'bold' }}>{data.dueDate}</span></DraggableBlock>
               </div>
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
                 <td colSpan={4} style={{ textAlign: 'center', padding: '30px', color: '#999' }}>No items added</td>
               </tr>
            )}
            {data.items.map((item, index) => {
              const amount = item.quantity * item.rate;
              return (
                <tr key={item.id || index}>
                  <td style={{ padding: '15px', borderBottom: '1px solid #eee' }}>
                    <div style={{ fontWeight: 'bold' }}>{item.description || 'Item Name'}</div>
                    {item.hsn && <div style={{ fontSize: '0.8rem', color: '#888' }}>HSN: {item.hsn} | GST: {item.gstRate}%</div>}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #eee' }}>{item.quantity}</td>
                  <td style={{ padding: '15px', textAlign: 'right', borderBottom: '1px solid #eee' }}>{data.currency || '₹'}{item.rate.toFixed(2)}</td>
                  <td style={{ padding: '15px', textAlign: 'right', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>{data.currency || '₹'}{amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DraggableBlock>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <DraggableBlock id="payment" data={data} onChange={onChange} style={{ width: '50%' }}>
          <div>
            {data.upiId && (
              <div>
                 <DraggableBlock id="payment_title" data={data} onChange={onChange}><h3 style={{ color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Payment Method</h3></DraggableBlock>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                   <div style={{ background: '#fff7ed', padding: '10px', borderRadius: '8px' }}>
                      <DraggableBlock id="payment_qr" data={data} onChange={onChange}><QRCodeSVG value={upiUri} size={90} /></DraggableBlock>
                   </div>
                   <div>
                     <DraggableBlock id="payment_scanText" data={data} onChange={onChange}><p style={{ fontWeight: 'bold' }}>Scan to Pay</p></DraggableBlock>
                     <DraggableBlock id="payment_upiId" data={data} onChange={onChange}><p style={{ color: '#666', fontSize: '0.9rem', marginTop: '4px' }}>UPI ID: {data.upiId}</p></DraggableBlock>
                   </div>
                 </div>
              </div>
            )}
          </div>
        </DraggableBlock>
        
        <DraggableBlock id="totals" data={data} onChange={onChange} style={{ width: '40%' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
              <DraggableBlock id="totals_subLabel" data={data} onChange={onChange}><span>Subtotal</span></DraggableBlock>
              <DraggableBlock id="totals_subVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{subtotal.toFixed(2)}</span></DraggableBlock>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#666' }}>
              <DraggableBlock id="totals_igstLabel" data={data} onChange={onChange}><span>Total Tax (IGST)</span></DraggableBlock>
              <DraggableBlock id="totals_igstVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{igst.toFixed(2)}</span></DraggableBlock>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '15px', borderTop: '2px solid #e2e8f0', fontSize: '1.4rem', fontWeight: 800, color: '#f97316' }}>
              <DraggableBlock id="totals_grandLabel" data={data} onChange={onChange}><span>Total</span></DraggableBlock>
              <DraggableBlock id="totals_grandVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{grandTotal.toFixed(2)}</span></DraggableBlock>
            </div>
          </div>
        </DraggableBlock>
      </div>

      {data.countryOfSupply && (
        <DraggableBlock id="countryOfSupply" data={data} onChange={onChange}>
          <div style={{ marginTop: '40px', fontSize: '0.85rem', color: '#666' }}>
            <strong>Country of Supply:</strong> {data.countryOfSupply}
          </div>
        </DraggableBlock>
      )}

      <DraggableBlock id="footerNote" data={data} onChange={onChange}>
        <div style={{ textAlign: 'center', marginTop: '60px', padding: '20px', color: '#999', fontSize: '0.8rem' }}>
          Thank you for your business!
        </div>
      </DraggableBlock>
    </div>
  );
};
