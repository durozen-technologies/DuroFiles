import React from 'react';
import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';

interface Props {
  data: InvoiceData;
  onChange?: (data: InvoiceData) => void;
}

export const TemplateGSTStandard: React.FC<Props> = ({ data, onChange }) => {
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

  const cgstSgstRateStr = (rate: number) => `${rate / 2}%`;

  return (
    <div className="a4-paper template-gst-standard" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <DraggableBlock id="header_left" data={data} onChange={onChange}>
          <div>
            {data.logoUrl && (
              <img src={data.logoUrl} alt="Company Logo" style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain', marginBottom: '16px' }} />
            )}
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '4px' }}>{data.billedBy.name || 'Your Company'}</div>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#555' }}>{data.billedBy.address || 'Company Address'}</div>
            {data.billedBy.gstin && <div style={{ fontSize: '0.85rem', color: '#555', marginTop: '4px' }}><strong>GSTIN:</strong> {data.billedBy.gstin}</div>}
            {data.billedBy.pan && <div style={{ fontSize: '0.85rem', color: '#555' }}><strong>PAN:</strong> {data.billedBy.pan}</div>}
          </div>
        </DraggableBlock>
        
        <DraggableBlock id="header_right" data={data} onChange={onChange}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem', color: '#333', letterSpacing: '2px', marginBottom: '16px' }}>TAX INVOICE</div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ color: '#555' }}>Invoice#</span>
              <strong style={{ minWidth: '100px', textAlign: 'left' }}>{data.invoiceNumber || 'INV-12'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span style={{ color: '#555' }}>Invoice Date</span>
              <strong style={{ minWidth: '100px', textAlign: 'left' }}>{data.date}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', fontSize: '0.85rem' }}>
              <span style={{ color: '#555' }}>Due Date</span>
              <strong style={{ minWidth: '100px', textAlign: 'left' }}>{data.dueDate}</strong>
            </div>
          </div>
        </DraggableBlock>
      </div>

      {/* Bill To & Place of Supply */}
      <div style={{ marginBottom: '30px' }}>
        <DraggableBlock id="bill_to" data={data} onChange={onChange}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Bill To:</div>
            <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}>{data.billedTo.name || 'Client Company'}</div>
            {data.billedTo.gstin && <div style={{ fontSize: '0.85rem', color: '#555' }}><strong>GSTIN:</strong> {data.billedTo.gstin}</div>}
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#555', marginTop: '2px' }}>{data.billedTo.address || 'Client Address'}</div>
          </div>
        </DraggableBlock>

        {data.countryOfSupply && (
          <DraggableBlock id="place_of_supply" data={data} onChange={onChange}>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Place Of Supply:</strong> {data.countryOfSupply}
            </div>
          </DraggableBlock>
        )}
      </div>

      {/* Items Table */}
      <DraggableBlock id="items_table" data={data} onChange={onChange}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
          <thead>
            <tr style={{ backgroundColor: '#000', color: '#fff', fontSize: '0.75rem', textAlign: 'left' }}>
              <th style={{ padding: '10px' }}>#</th>
              <th style={{ padding: '10px' }}>Item Description</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>HSN/SAC</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Rate</th>
              {isIGST ? (
                <th style={{ padding: '10px', textAlign: 'right' }}>IGST</th>
              ) : (
                <>
                  <th style={{ padding: '10px', textAlign: 'right' }}>SGST</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>CGST</th>
                </>
              )}
              <th style={{ padding: '10px', textAlign: 'right' }}>Cess</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
               <tr>
                 <td colSpan={isIGST ? 8 : 9} style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>No items added yet</td>
               </tr>
            )}
            {data.items.map((item, index) => {
              const amount = item.quantity * item.rate;
              const taxAmount = amount * ((item.gstRate || 0) / 100);
              
              return (
                <tr key={item.id || index} style={{ borderBottom: '1px solid #eee', fontSize: '0.8rem' }}>
                  <td style={{ padding: '12px 10px', verticalAlign: 'top' }}>{index + 1}</td>
                  <td style={{ padding: '12px 10px', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>{item.description || 'Item Name'}</div>
                  </td>
                  <td style={{ padding: '12px 10px', textAlign: 'center', verticalAlign: 'top' }}>{item.hsn}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'center', verticalAlign: 'top' }}>{item.quantity}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>{item.rate.toFixed(2)}</td>
                  
                  {isIGST ? (
                    <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>
                      {taxAmount.toFixed(2)}<br/>
                      <span style={{ fontSize: '0.7rem', color: '#777' }}>{item.gstRate}%</span>
                    </td>
                  ) : (
                    <>
                      <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>
                        {(taxAmount / 2).toFixed(2)}<br/>
                        <span style={{ fontSize: '0.7rem', color: '#777' }}>{cgstSgstRateStr(item.gstRate)}</span>
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>
                        {(taxAmount / 2).toFixed(2)}<br/>
                        <span style={{ fontSize: '0.7rem', color: '#777' }}>{cgstSgstRateStr(item.gstRate)}</span>
                      </td>
                    </>
                  )}
                  
                  <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>0.00</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>{amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </DraggableBlock>

      {/* Totals Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ flex: 1 }}></div>
        <DraggableBlock id="totals_section" data={data} onChange={onChange}>
          <div style={{ width: '300px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem' }}>
              <span style={{ color: '#555' }}>Sub Total</span>
              <strong style={{ minWidth: '100px', textAlign: 'right' }}>{subtotal.toFixed(2)}</strong>
            </div>
            
            {isIGST ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem' }}>
                <span style={{ color: '#555' }}>IGST</span>
                <strong style={{ minWidth: '100px', textAlign: 'right' }}>{totalTax.toFixed(2)}</strong>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem' }}>
                  <span style={{ color: '#555' }}>SGST</span>
                  <strong style={{ minWidth: '100px', textAlign: 'right' }}>{(totalTax / 2).toFixed(2)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.85rem' }}>
                  <span style={{ color: '#555' }}>CGST</span>
                  <strong style={{ minWidth: '100px', textAlign: 'right' }}>{(totalTax / 2).toFixed(2)}</strong>
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: '0.95rem', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', marginTop: '10px' }}>
              <strong>TOTAL</strong>
              <strong style={{ minWidth: '100px', textAlign: 'right' }}>{data.currency === '₹' ? 'INR - Rs.' : data.currency} {grandTotal.toFixed(2)}</strong>
            </div>
          </div>
        </DraggableBlock>
      </div>

      {/* Footer Notes & Terms */}
      <div>
        {data.notes && (
          <DraggableBlock id="notes_section" data={data} onChange={onChange}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Notes</div>
              <div style={{ fontSize: '0.8rem', color: '#333', whiteSpace: 'pre-wrap' }}>{data.notes}</div>
            </div>
          </DraggableBlock>
        )}

        {data.terms && (
          <DraggableBlock id="terms_section" data={data} onChange={onChange}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Terms & Conditions</div>
              <div style={{ fontSize: '0.8rem', color: '#333', whiteSpace: 'pre-wrap' }}>{data.terms}</div>
            </div>
          </DraggableBlock>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '60px', padding: '20px 0', borderTop: '1px solid #eee', fontSize: '0.75rem', color: '#777' }}>
        Crafted with ease using <strong>DuroFiles</strong>
      </div>
    </div>
  );
};
