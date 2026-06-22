import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';
import { numberToWords } from '../../utils/numberToWords';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const TemplateInstagram: React.FC<Props> = ({ data, onChange }) => {
  const isIGST = data.taxSettings?.type === 'IGST';

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  };

  const calculateTotalIGST = () => {
    return data.items.reduce((sum, item) => {
      const amount = item.quantity * item.rate;
      return sum + (amount * ((item.gstRate || 0) / 100));
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const totalTax = calculateTotalIGST();
  const grandTotal = subtotal + totalTax;

  const upiUri = `upi://pay?pa=${data.upiId}&pn=${encodeURIComponent(data.billedBy.name)}&am=${grandTotal.toFixed(2)}&cu=INR`;

  const totalItems = data.items.length;
  const totalQty = data.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="a4-paper template-instagram" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#333', lineHeight: 1.4, backgroundColor: '#fff', padding: '30px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <DraggableBlock id="ig_header_left" data={data} onChange={onChange}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Company Logo" style={{ maxWidth: '160px', maxHeight: '45px', objectFit: 'contain', marginBottom: '10px', borderRadius: '4px' }} />
            ) : (
              <div style={{ width: '160px', height: '45px', backgroundColor: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#888', border: '1px dashed #ccc', marginBottom: '10px', borderRadius: '4px' }}>Logo</div>
            )}
            <h1 style={{ fontSize: '12px', margin: '0', textTransform: 'uppercase', letterSpacing: '2px', color: '#000' }}>Tax Invoice</h1>
          </div>
        </DraggableBlock>
        
        <DraggableBlock id="ig_header_right" data={data} onChange={onChange}>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '22px', margin: '0 0 5px 0', color: '#000' }}>{data.billedBy.name || 'Your Company'}</h2>
            {data.billedBy.gstin && <p style={{ margin: '2px 0' }}><strong>GSTIN {data.billedBy.gstin}</strong></p>}
            <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}>{data.billedBy.address || 'Company Address'}</p>
            <p style={{ margin: '2px 0' }}>
              {data.billedBy.phone && <><strong>Mobile</strong> {data.billedBy.phone} &nbsp;</>}
              {data.billedBy.email && <><strong>Email</strong> {data.billedBy.email}</>}
            </p>
          </div>
        </DraggableBlock>
      </div>

      {/* Info Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ width: '50%' }}>
          <DraggableBlock id="ig_bill_to" data={data} onChange={onChange}>
            <div>
              <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '2px' }}>Bill To:</div>
              <p style={{ margin: '2px 0' }}><strong>{data.billedTo.name || 'Client Name'}</strong></p>
              {data.billedTo.gstin && <p style={{ margin: '2px 0' }}><strong>GSTIN: {data.billedTo.gstin}</strong></p>}
              {data.billedTo.phone && <p style={{ margin: '2px 0' }}>Ph: {data.billedTo.phone}</p>}
              <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}>{data.billedTo.address || 'Client Address'}</p>
            </div>
          </DraggableBlock>
          
          <DraggableBlock id="ig_ship_to" data={data} onChange={onChange}>
            <div style={{ marginTop: '15px' }}>
              <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '2px' }}>Ship to:</div>
              <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}>{data.billedTo.address || 'Client Address'}</p>
            </div>
          </DraggableBlock>
        </div>
        
        <div style={{ width: '50%' }}>
          <DraggableBlock id="ig_info_grid" data={data} onChange={onChange}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '5px', textAlign: 'right' }}>
              <span style={{ color: '#555', paddingRight: '10px' }}>Invoice #:</span>
              <span style={{ fontWeight: 'bold' }}>{data.invoiceNumber || 'INV-1'}</span>
              
              <span style={{ color: '#555', paddingRight: '10px' }}>Invoice Date:</span>
              <span style={{ fontWeight: 'bold' }}>{data.date}</span>
              
              <span style={{ color: '#555', paddingRight: '10px' }}>Due Date:</span>
              <span style={{ fontWeight: 'bold' }}>{data.dueDate}</span>
              
              {data.countryOfSupply && (
                <>
                  <span style={{ color: '#555', paddingRight: '10px' }}>Place of Supply:</span>
                  <span style={{ fontWeight: 'bold' }}>{data.countryOfSupply}</span>
                </>
              )}
            </div>
          </DraggableBlock>
        </div>
      </div>

      {/* Table */}
      <DraggableBlock id="ig_table" data={data} onChange={onChange}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', verticalAlign: 'top', backgroundColor: '#e40097', color: '#fff', fontWeight: 'bold', textAlign: 'left' }}>#</th>
              <th style={{ padding: '8px', verticalAlign: 'top', backgroundColor: '#e40097', color: '#fff', fontWeight: 'bold', textAlign: 'left' }}>Description</th>
              <th style={{ padding: '8px', verticalAlign: 'top', backgroundColor: '#e40097', color: '#fff', fontWeight: 'bold', textAlign: 'right' }}>HSN/SAC</th>
              <th style={{ padding: '8px', verticalAlign: 'top', backgroundColor: '#e40097', color: '#fff', fontWeight: 'bold', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
               <tr>
                 <td colSpan={4} style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>No items added yet</td>
               </tr>
            )}
            {data.items.map((item, index) => {
              const amount = item.quantity * item.rate;
              return (
                <tr key={item.id || index}>
                  <td style={{ padding: '8px', verticalAlign: 'top', borderBottom: '1px solid #eee', textAlign: 'left' }}>{index + 1}</td>
                  <td style={{ padding: '8px', verticalAlign: 'top', borderBottom: '1px solid #eee', textAlign: 'left' }}>
                      <strong>{item.description || 'Item Name'}</strong>
                      {item.quantity !== 1 && (
                        <div style={{ color: '#555', fontSize: '10px', marginTop: '5px', lineHeight: 1.5 }}>
                          Rate: {data.currency || '₹'}{item.rate.toFixed(2)} x Qty: {item.quantity}
                        </div>
                      )}
                  </td>
                  <td style={{ padding: '8px', verticalAlign: 'top', borderBottom: '1px solid #eee', textAlign: 'right' }}>{item.hsn || '-'}</td>
                  <td style={{ padding: '8px', verticalAlign: 'top', borderBottom: '1px solid #eee', textAlign: 'right' }}>{amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DraggableBlock>

      {/* Totals Section */}
      <DraggableBlock id="ig_totals" data={data} onChange={onChange}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
          <table style={{ width: '300px', border: 'none' }}>
            <tbody>
              <tr>
                <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>Taxable Amount</td>
                <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>{data.currency || '₹'}{subtotal.toFixed(2)}</td>
              </tr>
              {isIGST ? (
                <tr>
                  <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>IGST</td>
                  <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>{data.currency || '₹'}{totalTax.toFixed(2)}</td>
                </tr>
              ) : (
                <>
                  <tr>
                    <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>CGST</td>
                    <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>{data.currency || '₹'}{(totalTax/2).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>SGST</td>
                    <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>{data.currency || '₹'}{(totalTax/2).toFixed(2)}</td>
                  </tr>
                </>
              )}
              <tr>
                <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>Round Off</td>
                <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>0.00</td>
              </tr>
              <tr>
                <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold', fontSize: '14px', borderTop: '1px solid #ccc' }}>Total</td>
                <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right', fontWeight: 'bold', fontSize: '14px', borderTop: '1px solid #ccc' }}>{data.currency || '₹'}{grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DraggableBlock>

      {/* Summary Row */}
      <DraggableBlock id="ig_summary_row" data={data} onChange={onChange}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#555', marginTop: '10px', marginBottom: '10px', padding: '5px 0', borderTop: '1px solid #e40097', borderBottom: '1px solid #e40097' }}>
            <div>Total Items / Qty : {totalItems} / {totalQty.toFixed(3)}</div>
            <div>Total amount (in words): {data.currency === '₹' ? 'INR' : data.currency} {numberToWords(Math.floor(grandTotal))} {data.currency === '₹' ? 'Rupees' : ''} Only.</div>
        </div>
      </DraggableBlock>

      {/* Payment Summary */}
      <DraggableBlock id="ig_payment_summary" data={data} onChange={onChange}>
        <div style={{ textAlign: 'right', marginBottom: '30px', lineHeight: 1.6 }}>
            <div style={{ fontWeight: 'bold' }}>Amount Payable: &nbsp;&nbsp;&nbsp; {data.currency || '₹'} {grandTotal.toFixed(2)}</div>
        </div>
      </DraggableBlock>

      {/* Footer Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <DraggableBlock id="ig_footer_1" data={data} onChange={onChange}>
            <div>
                {data.upiId && (
                  <>
                    <strong>Pay using UPI:</strong><br/><br/>
                    <div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QRCodeSVG value={upiUri} size={90} />
                    </div>
                  </>
                )}
            </div>
          </DraggableBlock>
          <DraggableBlock id="ig_footer_2" data={data} onChange={onChange}>
            <div>
                {(data.paymentDetails?.bankName || data.paymentDetails?.accountNumber) && (
                  <>
                    <strong>Bank Details:</strong><br/><br/>
                    {data.paymentDetails.bankName && <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '80px', color: '#555' }}>Bank:</span> <strong>{data.paymentDetails.bankName}</strong></p>}
                    {data.paymentDetails.accountNumber && <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '80px', color: '#555' }}>Account #:</span> <strong>{data.paymentDetails.accountNumber}</strong></p>}
                    {data.paymentDetails.ifsc && <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '80px', color: '#555' }}>IFSC:</span> <strong>{data.paymentDetails.ifsc}</strong></p>}
                  </>
                )}
            </div>
          </DraggableBlock>
          <DraggableBlock id="ig_footer_3" data={data} onChange={onChange}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '10px' }}>For {data.billedBy.name || 'Company'}</div>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f0f0f0', border: '1px dashed #ccc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '10px', margin: '10px 0' }}>Stamp</div>
            </div>
          </DraggableBlock>
      </div>

      {/* Terms */}
      <div style={{ fontSize: '9px', color: '#555' }}>
          <DraggableBlock id="ig_terms_notes" data={data} onChange={onChange}>
            <p style={{ margin: '0 0 10px 0' }}><strong>Notes:</strong><br/>{data.notes || 'Thank you for the Business'}</p>
          </DraggableBlock>
          {data.terms && (
            <DraggableBlock id="ig_terms_cond" data={data} onChange={onChange}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Terms and Conditions:</h4>
                <div style={{ whiteSpace: 'pre-wrap' }}>{data.terms}</div>
              </div>
            </DraggableBlock>
          )}
      </div>

    </div>
  );
};
