import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';
import { numberToWords } from '../../utils/numberToWords';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const TemplateAmazon: React.FC<Props> = ({ data, onChange }) => {
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
    <div className="a4-paper template-amazon" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#333', lineHeight: 1.4, backgroundColor: '#fff', padding: '30px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <DraggableBlock id="amazon_header_left" data={data} onChange={onChange}>
          <div>
            <h1 style={{ color: '#004b91', fontSize: '16px', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Tax Invoice</h1>
            <h2 style={{ fontSize: '20px', margin: '0 0 5px 0', color: '#000' }}>{data.billedBy.name || 'Your Company'}</h2>
            {data.billedBy.gstin && <p style={{ margin: '2px 0' }}><strong>GSTIN {data.billedBy.gstin}</strong></p>}
            <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}>{data.billedBy.address || 'Company Address'}</p>
            <p style={{ margin: '2px 0' }}>
              {data.billedBy.phone && <><strong>Mobile</strong> {data.billedBy.phone} &nbsp;</>}
              {data.billedBy.email && <><strong>Email</strong> {data.billedBy.email}</>}
            </p>
          </div>
        </DraggableBlock>
        
        <DraggableBlock id="amazon_header_right" data={data} onChange={onChange}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#666', marginBottom: '5px', textTransform: 'uppercase' }}>Original for Recipient</div>
            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Company Logo" style={{ maxWidth: '150px', maxHeight: '45px', objectFit: 'contain' }} />
            ) : (
              <div style={{ width: '150px', height: '45px', backgroundColor: '#eee', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', color: '#999', border: '1px dashed #ccc' }}>Logo</div>
            )}
          </div>
        </DraggableBlock>
      </div>

      {/* Info Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <DraggableBlock id="amazon_info_1" data={data} onChange={onChange}>
          <div><p style={{ margin: '2px 0' }}><strong>Invoice #: {data.invoiceNumber || 'INV-1'}</strong></p></div>
        </DraggableBlock>
        <DraggableBlock id="amazon_info_2" data={data} onChange={onChange}>
          <div><p style={{ margin: '2px 0' }}><strong>Invoice Date: {data.date}</strong></p></div>
        </DraggableBlock>
        <DraggableBlock id="amazon_info_3" data={data} onChange={onChange}>
          <div><p style={{ margin: '2px 0' }}><strong>Due Date: {data.dueDate}</strong></p></div>
        </DraggableBlock>
        
        <DraggableBlock id="amazon_info_4" data={data} onChange={onChange}>
          <div>
            <p style={{ margin: '2px 0' }}>Customer Details:</p>
            <p style={{ margin: '2px 0' }}><strong>{data.billedTo.name || 'Client Name'}</strong></p>
            {data.billedTo.phone && <p style={{ margin: '2px 0' }}>Ph: {data.billedTo.phone}</p>}
            {data.billedTo.gstin && <p style={{ margin: '2px 0' }}>GSTIN: {data.billedTo.gstin}</p>}
          </div>
        </DraggableBlock>
        <DraggableBlock id="amazon_info_5" data={data} onChange={onChange}>
          <div>
            <p style={{ margin: '2px 0' }}>Billing address:</p>
            <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}>{data.billedTo.address || 'Client Address'}</p>
          </div>
        </DraggableBlock>
        <DraggableBlock id="amazon_info_6" data={data} onChange={onChange}>
          <div>
            <p style={{ margin: '2px 0' }}>Shipping address:</p>
            <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}>{data.billedTo.address || 'Client Address'}</p>
          </div>
        </DraggableBlock>
      </div>

      {data.countryOfSupply && (
        <DraggableBlock id="amazon_pos" data={data} onChange={onChange}>
          <div style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: '5px' }}>Place of Supply: {data.countryOfSupply}</div>
        </DraggableBlock>
      )}

      {/* Table */}
      <DraggableBlock id="amazon_table" data={data} onChange={onChange}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'left', verticalAlign: 'top' }}>#</th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'left', verticalAlign: 'top' }}>Item</th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}>Rate/ Item</th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}>Qty</th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}>Taxable Value</th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}>Tax Amount</th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}>Amount</th>
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
              const taxAmount = amount * ((item.gstRate || 0) / 100);
              const total = amount + taxAmount;
              
              return (
                <tr key={item.id || index}>
                  <td style={{ padding: '8px', textAlign: 'left', verticalAlign: 'top' }}>{index + 1}</td>
                  <td style={{ padding: '8px', textAlign: 'left', verticalAlign: 'top' }}>
                      <strong>{item.description || 'Item Name'}</strong><br/>
                      {item.hsn && (
                        <div style={{ color: '#555', fontSize: '10px', marginTop: '4px' }}>
                          HSN: {item.hsn}
                        </div>
                      )}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}>{item.rate.toFixed(2)}</td>
                  <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}>{item.quantity}</td>
                  <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}>{amount.toFixed(2)}</td>
                  <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}>{taxAmount.toFixed(2)} ({item.gstRate}%)</td>
                  <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}>{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DraggableBlock>

      {/* Totals */}
      <DraggableBlock id="amazon_totals" data={data} onChange={onChange}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '5px', marginBottom: '5px' }}>
            <div></div>
            <table style={{ width: '300px', margin: '0' }}>
                <tbody>
                  <tr>
                      <td style={{ padding: '3px 8px', textAlign: 'left' }}><strong>Taxable Amount</strong></td>
                      <td style={{ padding: '3px 8px', textAlign: 'right' }}><strong>{data.currency || '₹'}{subtotal.toFixed(2)}</strong></td>
                  </tr>
                  {isIGST ? (
                    <tr>
                        <td style={{ padding: '3px 8px', textAlign: 'left' }}><strong>IGST</strong></td>
                        <td style={{ padding: '3px 8px', textAlign: 'right' }}><strong>{data.currency || '₹'}{totalTax.toFixed(2)}</strong></td>
                    </tr>
                  ) : (
                    <>
                      <tr>
                          <td style={{ padding: '3px 8px', textAlign: 'left' }}><strong>SGST</strong></td>
                          <td style={{ padding: '3px 8px', textAlign: 'right' }}><strong>{data.currency || '₹'}{(totalTax/2).toFixed(2)}</strong></td>
                      </tr>
                      <tr>
                          <td style={{ padding: '3px 8px', textAlign: 'left' }}><strong>CGST</strong></td>
                          <td style={{ padding: '3px 8px', textAlign: 'right' }}><strong>{data.currency || '₹'}{(totalTax/2).toFixed(2)}</strong></td>
                      </tr>
                    </>
                  )}
                  <tr>
                      <td style={{ padding: '3px 8px', textAlign: 'left', fontWeight: 'bold', fontSize: '14px' }}>Total</td>
                      <td style={{ padding: '3px 8px', textAlign: 'right', fontWeight: 'bold', fontSize: '14px' }}>{data.currency || '₹'}{grandTotal.toFixed(2)}</td>
                  </tr>
                </tbody>
            </table>
        </div>
      </DraggableBlock>

      {/* Summary Row */}
      <DraggableBlock id="amazon_summary" data={data} onChange={onChange}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#555', marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '5px' }}>
            <div>Total Items / Qty : {totalItems} / {totalQty.toFixed(3)}</div>
            <div>Total amount (in words): {data.currency === '₹' ? 'INR' : data.currency} {numberToWords(Math.floor(grandTotal))} {data.currency === '₹' ? 'Rupees' : ''} Only.</div>
        </div>
      </DraggableBlock>

      <DraggableBlock id="amazon_amount_payable" data={data} onChange={onChange}>
        <div style={{ textAlign: 'right', fontWeight: 'bold', marginBottom: '30px' }}>
            Amount Payable: {data.currency || '₹'}{grandTotal.toFixed(2)}
        </div>
      </DraggableBlock>

      {/* Footer Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <DraggableBlock id="amazon_footer_1" data={data} onChange={onChange}>
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
          <DraggableBlock id="amazon_footer_2" data={data} onChange={onChange}>
            <div>
                {(data.paymentDetails?.bankName || data.paymentDetails?.accountNumber) && (
                  <>
                    <strong>Bank Details:</strong><br/><br/>
                    {data.paymentDetails.bankName && <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '80px' }}>Bank:</span> <strong>{data.paymentDetails.bankName}</strong></p>}
                    {data.paymentDetails.accountNumber && <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '80px' }}>Account #:</span> <strong>{data.paymentDetails.accountNumber}</strong></p>}
                    {data.paymentDetails.ifsc && <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '80px' }}>IFSC:</span> <strong>{data.paymentDetails.ifsc}</strong></p>}
                  </>
                )}
            </div>
          </DraggableBlock>
          <DraggableBlock id="amazon_footer_3" data={data} onChange={onChange}>
            <div style={{ textAlign: 'right' }}>
                For {data.billedBy.name || 'Company'}<br/>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f0f0f0', border: '1px dashed #ccc', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '10px', margin: '10px 0' }}>Stamp</div><br/>
                <span style={{ fontSize: '10px', color: '#555' }}>Authorized Signatory</span>
            </div>
          </DraggableBlock>
      </div>

      {/* Terms */}
      <div style={{ fontSize: '9px', color: '#555' }}>
          <DraggableBlock id="amazon_terms_notes" data={data} onChange={onChange}>
            <p style={{ margin: '0 0 10px 0' }}><strong>Notes:</strong><br/>{data.notes || 'Thank you for the Business'}</p>
          </DraggableBlock>
          {data.terms && (
            <DraggableBlock id="amazon_terms_cond" data={data} onChange={onChange}>
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
