import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const TemplateClassic: React.FC<Props> = ({ data, onChange }) => {
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
    <div className="a4-paper template-classic" style={{ fontFamily: '"Times New Roman", Times, serif', color: '#000' }}>
      <DraggableBlock id="header" data={data} onChange={onChange}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '20px', marginBottom: '20px' }}>
          <div>
            <DraggableBlock id="header_title" data={data} onChange={onChange}><h1 style={{ fontSize: '3rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Invoice</h1></DraggableBlock>
            <div style={{ marginTop: '10px' }}>
              <DraggableBlock id="header_invNo" data={data} onChange={onChange}><p><strong>Invoice No:</strong> {data.invoiceNumber || 'INV-001'}</p></DraggableBlock>
              <DraggableBlock id="header_date" data={data} onChange={onChange}><p><strong>Date:</strong> {data.date}</p></DraggableBlock>
              <DraggableBlock id="header_dueDate" data={data} onChange={onChange}><p><strong>Due Date:</strong> {data.dueDate}</p></DraggableBlock>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {data.logoUrl && (
              <DraggableBlock id="header_logo" data={data} onChange={onChange}><img src={data.logoUrl} alt="Company Logo" style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain', marginBottom: '10px' }} /></DraggableBlock>
            )}
            <DraggableBlock id="billedBy_name" data={data} onChange={onChange}><h2 style={{ fontSize: '1.25rem', margin: 0 }}>{data.billedBy.name || 'Your Company Name'}</h2></DraggableBlock>
            <DraggableBlock id="billedBy_address" data={data} onChange={onChange}><p style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>{data.billedBy.address || 'Your Address'}</p></DraggableBlock>
            {data.billedBy.phone && <DraggableBlock id="billedBy_phone" data={data} onChange={onChange}><p style={{ fontSize: '0.9rem' }}>Tel: {data.billedBy.phone}</p></DraggableBlock>}
            {data.billedBy.email && <DraggableBlock id="billedBy_email" data={data} onChange={onChange}><p style={{ fontSize: '0.9rem' }}>Email: {data.billedBy.email}</p></DraggableBlock>}
            {data.billedBy.gstin && <DraggableBlock id="billedBy_gstin" data={data} onChange={onChange}><p style={{ fontSize: '0.9rem' }}>GSTIN: {data.billedBy.gstin}</p></DraggableBlock>}
          </div>
        </div>
      </DraggableBlock>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <DraggableBlock id="billedTo" data={data} onChange={onChange} style={{ width: '45%' }}>
          <div>
            <DraggableBlock id="billedTo_title" data={data} onChange={onChange}><h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', marginBottom: '10px' }}>Bill To:</h3></DraggableBlock>
            <DraggableBlock id="billedTo_name" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{data.billedTo.name || 'Client Name'}</p></DraggableBlock>
            <DraggableBlock id="billedTo_address" data={data} onChange={onChange}><p style={{ whiteSpace: 'pre-wrap' }}>{data.billedTo.address || 'Client Address'}</p></DraggableBlock>
            {data.billedTo.gstin && <DraggableBlock id="billedTo_gstin" data={data} onChange={onChange}><p>GSTIN: {data.billedTo.gstin}</p></DraggableBlock>}
          </div>
        </DraggableBlock>
        {data.countryOfSupply && (
          <DraggableBlock id="countryOfSupply" data={data} onChange={onChange} style={{ width: '45%' }}>
            <div style={{ textAlign: 'right' }}>
              <DraggableBlock id="countryOfSupply_val" data={data} onChange={onChange}><p><strong>Country of Supply:</strong><br/>{data.countryOfSupply}</p></DraggableBlock>
            </div>
          </DraggableBlock>
        )}
      </div>

      <DraggableBlock id="table" data={data} onChange={onChange}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>HSN</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Rate</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>GST</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
               <tr>
                 <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No items added yet</td>
               </tr>
            )}
            {data.items.map((item, index) => {
              const amount = item.quantity * item.rate;
              const itemIgst = amount * (item.gstRate / 100);
              const total = amount + itemIgst;
              return (
                <tr key={item.id || index} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{item.description || 'Item Name'}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{item.hsn}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>{data.currency || '₹'}{item.rate.toFixed(2)}</td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>{item.gstRate}%</td>
                  <td style={{ padding: '10px', textAlign: 'right' }}>{data.currency || '₹'}{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DraggableBlock>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DraggableBlock id="payment" data={data} onChange={onChange} style={{ width: '50%' }}>
          <div>
            {data.upiId && (
              <div style={{ border: '1px solid #ccc', padding: '15px', display: 'inline-block' }}>
                <DraggableBlock id="payment_title" data={data} onChange={onChange}><p style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '0.9rem' }}>Pay via UPI</p></DraggableBlock>
                <DraggableBlock id="payment_qr" data={data} onChange={onChange}><QRCodeSVG value={upiUri} size={80} /></DraggableBlock>
                <DraggableBlock id="payment_upiId" data={data} onChange={onChange}><p style={{ fontSize: '0.8rem', marginTop: '5px' }}>{data.upiId}</p></DraggableBlock>
              </div>
            )}
          </div>
        </DraggableBlock>
        <DraggableBlock id="totals" data={data} onChange={onChange} style={{ width: '40%' }}>
          <div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '5px 10px', textAlign: 'right' }}><DraggableBlock id="totals_subLabel" data={data} onChange={onChange}><span>Subtotal:</span></DraggableBlock></td>
                  <td style={{ padding: '5px 10px', textAlign: 'right' }}><DraggableBlock id="totals_subVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{subtotal.toFixed(2)}</span></DraggableBlock></td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 10px', textAlign: 'right' }}><DraggableBlock id="totals_igstLabel" data={data} onChange={onChange}><span>IGST:</span></DraggableBlock></td>
                  <td style={{ padding: '5px 10px', textAlign: 'right' }}><DraggableBlock id="totals_igstVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{igst.toFixed(2)}</span></DraggableBlock></td>
                </tr>
                <tr style={{ borderTop: '2px solid #000', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  <td style={{ padding: '10px', textAlign: 'right' }}><DraggableBlock id="totals_grandLabel" data={data} onChange={onChange}><span>Total:</span></DraggableBlock></td>
                  <td style={{ padding: '10px', textAlign: 'right' }}><DraggableBlock id="totals_grandVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{grandTotal.toFixed(2)}</span></DraggableBlock></td>
                </tr>
              </tbody>
            </table>
          </div>
        </DraggableBlock>
      </div>
      
      <DraggableBlock id="footerNote" data={data} onChange={onChange}>
        <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '0.8rem', color: '#666', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          This is an electronically generated document, no signature is required.
        </div>
      </DraggableBlock>
    </div>
  );
};
