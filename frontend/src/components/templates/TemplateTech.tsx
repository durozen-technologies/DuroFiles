import React from 'react';
import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const TemplateTech: React.FC<Props> = ({ data, onChange }) => {
  const calculateTotal = () => {
    return data.items.reduce((sum, item) => {
      const amount = item.quantity * item.rate;
      const igst = amount * (item.gstRate / 100);
      return sum + amount + igst;
    }, 0);
  };

  const calculateSubTotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

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
            <DraggableBlock id="billedBy_name" data={data} onChange={onChange}><h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 4px 0' }}>{data.billedBy.name}</h2></DraggableBlock>
            <DraggableBlock id="billedBy_emailTop" data={data} onChange={onChange}><p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9 }}>{data.billedBy.email}</p></DraggableBlock>
          </div>
        </DraggableBlock>
        <DraggableBlock id="billedBy" data={data} onChange={onChange} style={{ flex: 1, display: 'flex' }}>
          <div style={{ flex: 1, backgroundColor: '#8b7a8a', padding: '10mm 15mm', display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '0.8rem', lineHeight: 1.5 }}>
            <DraggableBlock id="billedBy_email" data={data} onChange={onChange}><p style={{ margin: 0 }}>{data.billedBy.email}</p></DraggableBlock>
            <DraggableBlock id="billedBy_address" data={data} onChange={onChange}><p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{data.billedBy.address}</p></DraggableBlock>
            <DraggableBlock id="billedBy_phone" data={data} onChange={onChange}><p style={{ margin: 0 }}>{data.billedBy.phone}</p></DraggableBlock>
            <DraggableBlock id="billedBy_gstin" data={data} onChange={onChange}><p style={{ margin: 0 }}>GSTIN: {data.billedBy.gstin} | PAN: {data.billedBy.pan}</p></DraggableBlock>
          </div>
        </DraggableBlock>
      </div>

      {/* Main Content Container (brings it above the absolute stripes) */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <DraggableBlock id="header" data={data} onChange={onChange}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              {data.logoUrl && (
                <DraggableBlock id="header_logo" data={data} onChange={onChange}><img src={data.logoUrl} alt="Logo" style={{ maxHeight: '60px', objectFit: 'contain', marginBottom: '20px' }} /></DraggableBlock>
              )}
            </div>
            <div style={{ textAlign: 'right' }}>
              <DraggableBlock id="header_title" data={data} onChange={onChange}><h1 style={{ fontSize: '3.5rem', fontWeight: 600, color: '#1f584f', margin: '0 0 20px 0', letterSpacing: '2px' }}>INVOICE</h1></DraggableBlock>
            </div>
          </div>
        </DraggableBlock>

        {/* Info Blocks */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <DraggableBlock id="billedTo" data={data} onChange={onChange}>
            <div>
              <DraggableBlock id="billedTo_title" data={data} onChange={onChange}><h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#111' }}>ISSUED TO:</h3></DraggableBlock>
              <DraggableBlock id="billedTo_name" data={data} onChange={onChange}><p style={{ fontWeight: 600, margin: '0 0 4px 0', color: '#111' }}>{data.billedTo.name}</p></DraggableBlock>
              <DraggableBlock id="billedTo_address" data={data} onChange={onChange}><p style={{ margin: '0 0 4px 0', color: '#444', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>{data.billedTo.address}</p></DraggableBlock>
              {data.billedTo.gstin && <DraggableBlock id="billedTo_gstin" data={data} onChange={onChange}><p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}>GSTIN: {data.billedTo.gstin}</p></DraggableBlock>}
              {data.billedTo.pan && <DraggableBlock id="billedTo_pan" data={data} onChange={onChange}><p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}>PAN: {data.billedTo.pan}</p></DraggableBlock>}
            </div>
          </DraggableBlock>

          <DraggableBlock id="details" data={data} onChange={onChange}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gap: '8px 16px', fontSize: '0.9rem' }}>
                <DraggableBlock id="details_invNoLabel" data={data} onChange={onChange}><div style={{ color: '#666', fontWeight: 600 }}>INVOICE NO:</div></DraggableBlock>
                <DraggableBlock id="details_invNoVal" data={data} onChange={onChange}><div style={{ color: '#444' }}>{data.invoiceNumber}</div></DraggableBlock>
                
                <DraggableBlock id="details_dateLabel" data={data} onChange={onChange}><div style={{ color: '#666', fontWeight: 600 }}>DATE ISSUED:</div></DraggableBlock>
                <DraggableBlock id="details_dateVal" data={data} onChange={onChange}><div style={{ color: '#444' }}>{data.date}</div></DraggableBlock>
                
                <DraggableBlock id="details_dueLabel" data={data} onChange={onChange}><div style={{ color: '#666', fontWeight: 600 }}>DUE DATE:</div></DraggableBlock>
                <DraggableBlock id="details_dueVal" data={data} onChange={onChange}><div style={{ color: '#444' }}>{data.dueDate}</div></DraggableBlock>
              </div>
            </div>
          </DraggableBlock>
        </div>

        {/* Table */}
        <DraggableBlock id="table" data={data} onChange={onChange}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#e2ccd8' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#111', fontWeight: 700, fontSize: '0.95rem' }}>Description</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', color: '#111', fontWeight: 700, fontSize: '0.95rem' }}>Price</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#111', fontWeight: 700, fontSize: '0.95rem' }}>QTY</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', color: '#111', fontWeight: 700, fontSize: '0.95rem' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => {
                const amount = item.quantity * item.rate;
                return (
                  <tr key={index} style={{ borderBottom: '1px solid #eaeaea' }}>
                    <td style={{ padding: '12px 16px', color: '#333', fontSize: '0.95rem' }}>{item.description}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#333', fontSize: '0.95rem' }}>{data.currency || '₹'}{item.rate.toFixed(2)}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: '#333', fontSize: '0.95rem' }}>{item.quantity}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: '#333', fontSize: '0.95rem' }}>{data.currency || '₹'}{amount.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DraggableBlock>

        {/* Totals Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Side: Payment Info & Terms */}
          <DraggableBlock id="payment" data={data} onChange={onChange} style={{ width: '50%' }}>
            <div>
              {data.upiId && (
                <div style={{ marginBottom: '20px' }}>
                  <DraggableBlock id="payment_title" data={data} onChange={onChange}><h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '0 0 8px 0', color: '#111' }}>Payment Method:</h4></DraggableBlock>
                  <DraggableBlock id="payment_method" data={data} onChange={onChange}><p style={{ margin: '0 0 4px 0', color: '#444', fontSize: '0.9rem' }}>UPI Transfer</p></DraggableBlock>
                  <DraggableBlock id="payment_upiId" data={data} onChange={onChange}><p style={{ margin: 0, color: '#444', fontSize: '0.9rem' }}>UPI ID: {data.upiId}</p></DraggableBlock>
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
                <DraggableBlock id="totals_subVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{calculateSubTotal().toFixed(2)}</span></DraggableBlock>
              </div>
              
              {data.items.map((item, index) => {
                if (item.gstRate > 0) {
                  const igst = (item.quantity * item.rate) * (item.gstRate / 100);
                  return (
                    <div key={`tax-${index}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 16px', color: '#333', fontSize: '0.95rem' }}>
                      <DraggableBlock id={`totals_igstLabel_${index}`} data={data} onChange={onChange}><span>Tax (GST {item.gstRate}%)</span></DraggableBlock>
                      <DraggableBlock id={`totals_igstVal_${index}`} data={data} onChange={onChange}><span>{data.currency || '₹'}{igst.toFixed(2)}</span></DraggableBlock>
                    </div>
                  );
                }
                return null;
              })}

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: '#e2ccd8', marginTop: '8px', fontWeight: 700, color: '#111', fontSize: '1.1rem' }}>
                <DraggableBlock id="totals_grandLabel" data={data} onChange={onChange}><span>Grand Total</span></DraggableBlock>
                <DraggableBlock id="totals_grandVal" data={data} onChange={onChange}><span>{data.currency || '₹'}{calculateTotal().toFixed(2)}</span></DraggableBlock>
              </div>
            </div>
          </DraggableBlock>
        </div>
      </div>
    </div>
  );
};
