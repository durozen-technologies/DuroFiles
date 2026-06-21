import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';

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

  const upiUri = `upi://pay?pa=${data.upiId}&pn=${encodeURIComponent(data.billedBy.name)}&am=${grandTotal.toFixed(2)}&cu=INR`;

  return (
    <div className="a4-paper template-modern" id="invoice-preview">
      <DraggableBlock id="header" data={data} onChange={onChange}>
        <div className="invoice-header">
          <div>
            <DraggableBlock id="header_title" data={data} onChange={onChange}>
              <div className="invoice-title">Invoice</div>
            </DraggableBlock>
            <div className="invoice-meta-grid">
              <DraggableBlock id="meta_invNoLabel" data={data} onChange={onChange}><div className="meta-label">Invoice No</div></DraggableBlock>
              <DraggableBlock id="meta_invNoValue" data={data} onChange={onChange}><div className="meta-value">{data.invoiceNumber || 'INV-001'}</div></DraggableBlock>
              <DraggableBlock id="meta_dateLabel" data={data} onChange={onChange}><div className="meta-label">Invoice Date</div></DraggableBlock>
              <DraggableBlock id="meta_dateValue" data={data} onChange={onChange}><div className="meta-value">{data.date}</div></DraggableBlock>
              <DraggableBlock id="meta_dueDateLabel" data={data} onChange={onChange}><div className="meta-label">Due Date</div></DraggableBlock>
              <DraggableBlock id="meta_dueDateValue" data={data} onChange={onChange}><div className="meta-value">{data.dueDate}</div></DraggableBlock>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            {data.logoUrl && (
              <img src={data.logoUrl} alt="Company Logo" style={{ maxHeight: '60px', maxWidth: '200px', objectFit: 'contain' }} />
            )}
          </div>
        </div>
      </DraggableBlock>

      <div className="billed-sections">
        <DraggableBlock id="billedBy" data={data} onChange={onChange}>
          <div className="billed-box">
            <DraggableBlock id="billedBy_title" data={data} onChange={onChange}><div className="billed-title">Billed By</div></DraggableBlock>
            <DraggableBlock id="billedBy_name" data={data} onChange={onChange}><div className="invoice-text-bold">{data.billedBy.name || 'Your Company Name'}</div></DraggableBlock>
            <DraggableBlock id="billedBy_address" data={data} onChange={onChange}><div className="invoice-text" style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}>{data.billedBy.address || 'Your Address'}</div></DraggableBlock>
            {data.billedBy.phone && <DraggableBlock id="billedBy_phone" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold">Phone:</span> {data.billedBy.phone}</div></DraggableBlock>}
            {data.billedBy.email && <DraggableBlock id="billedBy_email" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold">Email:</span> {data.billedBy.email}</div></DraggableBlock>}
            {data.billedBy.gstin && <DraggableBlock id="billedBy_gstin" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold">GSTIN:</span> {data.billedBy.gstin}</div></DraggableBlock>}
            {data.billedBy.pan && <DraggableBlock id="billedBy_pan" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold">PAN:</span> {data.billedBy.pan}</div></DraggableBlock>}
          </div>
        </DraggableBlock>
        <DraggableBlock id="billedTo" data={data} onChange={onChange}>
          <div className="billed-box">
            <DraggableBlock id="billedTo_title" data={data} onChange={onChange}><div className="billed-title">Billed To</div></DraggableBlock>
            <DraggableBlock id="billedTo_name" data={data} onChange={onChange}><div className="invoice-text-bold">{data.billedTo.name || 'Client Name'}</div></DraggableBlock>
            <DraggableBlock id="billedTo_address" data={data} onChange={onChange}><div className="invoice-text" style={{ whiteSpace: 'pre-wrap', marginTop: '4px' }}>{data.billedTo.address || 'Client Address'}</div></DraggableBlock>
            {data.billedTo.gstin && <DraggableBlock id="billedTo_gstin" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold">GSTIN:</span> {data.billedTo.gstin}</div></DraggableBlock>}
            {data.billedTo.pan && <DraggableBlock id="billedTo_pan" data={data} onChange={onChange}><div className="invoice-text" style={{ marginTop: '4px' }}><span className="invoice-text-bold">PAN:</span> {data.billedTo.pan}</div></DraggableBlock>}
          </div>
        </DraggableBlock>
      </div>

      {data.countryOfSupply && (
        <div className="country-supply">
          <span className="invoice-text-bold">Country of Supply:</span> {data.countryOfSupply}
        </div>
      )}

      <DraggableBlock id="table" data={data} onChange={onChange}>
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th className="text-center" style={{ textAlign: 'center' }}>GST Rate</th>
              <th className="text-center" style={{ textAlign: 'center' }}>Qty</th>
              <th className="text-right" style={{ textAlign: 'right' }}>Rate</th>
              <th className="text-right" style={{ textAlign: 'right' }}>Amount</th>
              <th className="text-right" style={{ textAlign: 'right' }}>IGST</th>
              <th className="text-right" style={{ textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
               <tr>
                 <td colSpan={7} style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>No items added yet</td>
               </tr>
            )}
            {data.items.map((item, index) => {
              const amount = item.quantity * item.rate;
              const itemIgst = amount * (item.gstRate / 100);
              const total = amount + itemIgst;
              return (
                <tr key={item.id || index}>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <span>{index + 1}.</span>
                    <div>
                      <div className="invoice-text-main">{item.description || 'Item Name'}</div>
                      {item.hsn && <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>HSN: {item.hsn}</div>}
                    </div>
                  </td>
                  <td className="text-center" style={{ textAlign: 'center' }}>{item.gstRate}%</td>
                  <td className="text-center" style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td className="text-right" style={{ textAlign: 'right' }}>{data.currency || '₹'}{item.rate.toFixed(2)}</td>
                  <td className="text-right" style={{ textAlign: 'right' }}>{data.currency || '₹'}{amount.toFixed(2)}</td>
                  <td className="text-right" style={{ textAlign: 'right' }}>{data.currency || '₹'}{itemIgst.toFixed(2)}</td>
                  <td className="text-right" style={{ textAlign: 'right' }}>{data.currency || '₹'}{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DraggableBlock>

      <div className="invoice-bottom">
        <DraggableBlock id="payment" data={data} onChange={onChange}>
          <div className="payment-info">
            {data.upiId && (
              <>
                <DraggableBlock id="payment_title" data={data} onChange={onChange}><div className="payment-title">Scan to pay via UPI</div></DraggableBlock>
                <DraggableBlock id="payment_desc" data={data} onChange={onChange}><div className="payment-desc">Maximum of 1 lakh can<br/>be transferred via upi in a<br/>single day</div></DraggableBlock>
                <DraggableBlock id="payment_qr" data={data} onChange={onChange}>
                  <div className="qr-code-box">
                    <QRCodeSVG value={upiUri} size={90} />
                  </div>
                </DraggableBlock>
                <DraggableBlock id="payment_upiId" data={data} onChange={onChange}><div className="upi-id">{data.upiId}</div></DraggableBlock>
              </>
            )}
          </div>
        </DraggableBlock>
        <DraggableBlock id="totals" data={data} onChange={onChange}>
          <div className="invoice-totals">
            <div className="totals-row">
              <DraggableBlock id="totals_subLabel" data={data} onChange={onChange}><span>Amount</span></DraggableBlock>
              <DraggableBlock id="totals_subVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{subtotal.toFixed(2)}</span></DraggableBlock>
            </div>
            <div className="totals-row">
              <DraggableBlock id="totals_igstLabel" data={data} onChange={onChange}><span>IGST</span></DraggableBlock>
              <DraggableBlock id="totals_igstVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{igst.toFixed(2)}</span></DraggableBlock>
            </div>
            <div className="totals-row grand-total">
              <DraggableBlock id="totals_grandLabel" data={data} onChange={onChange}><span>Total (INR)</span></DraggableBlock>
              <DraggableBlock id="totals_grandVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{grandTotal.toFixed(2)}</span></DraggableBlock>
            </div>
          </div>
        </DraggableBlock>
      </div>

      <DraggableBlock id="footerNote" data={data} onChange={onChange}>
        <div className="invoice-footer-note">
          This is an electronically generated document, no signature is required.
        </div>
      </DraggableBlock>
    </div>
  );
};
