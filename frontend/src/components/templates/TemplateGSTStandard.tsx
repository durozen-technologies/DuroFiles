import React from 'react';

import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';
import { EditableLabel } from '../EditableLabel';
import { EditableValue } from '../EditableValue';
import { EditableImage } from '../EditableImage';

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
  const upiUri = `upi://pay?pa=${data.upiId}&pn=${encodeURIComponent(data.billedBy.name)}&am=${grandTotal.toFixed(2)}&cu=INR`;

  return (
    <div className="a4-paper template-gst-standard" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <DraggableBlock id="header_left" data={data} onChange={onChange}>
          <div>
            {!data.hiddenFields?.includes('logo') && (
              <EditableImage src={data.logoUrl || ''} onChange={(v) => onChange?.({ ...data, logoUrl: v })} style={{ maxHeight: '80px', maxWidth: '200px', objectFit: 'contain', marginBottom: '16px' }} />
            )}
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '4px' }}><EditableValue value={data.billedBy.name} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, name: v } })} placeholder="Your Company Name" /></div>
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#555' }}><EditableValue isTextArea value={data.billedBy.address} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, address: v } })} placeholder="Your Address" /></div>
            {data.billedBy.gstin && !data.hiddenFields?.includes('gstin') && <div style={{ fontSize: '0.85rem', color: '#555', marginTop: '4px' }}><strong>GSTIN:</strong> <EditableValue value={data.billedBy.gstin} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, gstin: v } })} placeholder="GSTIN" /></div>}
            {data.billedBy.pan && <div style={{ fontSize: '0.85rem', color: '#555' }}><strong>PAN:</strong> <EditableValue value={data.billedBy.pan} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, pan: v } })} placeholder="PAN" /></div>}
          </div>
        </DraggableBlock>

        <DraggableBlock id="header_right" data={data} onChange={onChange}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2rem', color: '#333', letterSpacing: '2px', marginBottom: '16px' }}><EditableLabel id="lbl_invoice" defaultText="Invoice" data={data} onChange={onChange} /></div>
            {!data.hiddenFields?.includes('invoiceNo') && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: '#555' }}>Invoice#</span>
                <strong style={{ minWidth: '100px', textAlign: 'left' }}><EditableValue value={data.invoiceNumber} onChange={(v) => onChange?.({ ...data, invoiceNumber: v })} placeholder="INV-001" /></strong>
              </div>
            )}
            {!data.hiddenFields?.includes('invoiceDate') && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ color: '#555' }}>Invoice Date</span>
                <strong style={{ minWidth: '100px', textAlign: 'left' }}><EditableValue value={data.date} onChange={(v) => onChange?.({ ...data, date: v })} placeholder="Date" /></strong>
              </div>
            )}
            {!data.hiddenFields?.includes('dueDate') && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', fontSize: '0.85rem' }}>
                <span style={{ color: '#555' }}>Due Date</span>
                <strong style={{ minWidth: '100px', textAlign: 'left' }}><EditableValue value={data.dueDate} onChange={(v) => onChange?.({ ...data, dueDate: v })} placeholder="Due Date" /></strong>
              </div>
            )}
          </div>
        </DraggableBlock>
      </div>

      {/* Bill To & Place of Supply */}
      <div style={{ marginBottom: '30px' }}>
        <DraggableBlock id="bill_to" data={data} onChange={onChange}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Bill To:</div>
            <div style={{ fontWeight: 'bold', fontSize: '0.95rem' }}><EditableValue value={data.billedTo.name} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, name: v } })} placeholder="Client Name" /></div>
            {data.billedTo.gstin && !data.hiddenFields?.includes('customerGst') && <div style={{ fontSize: '0.85rem', color: '#555' }}><strong>GSTIN:</strong> <EditableValue value={data.billedTo.gstin} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, gstin: v } })} placeholder="GSTIN" /></div>}
            <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.85rem', color: '#555', marginTop: '2px' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, address: v } })} placeholder="Client Address" /></div>
          </div>
        </DraggableBlock>

        {data.countryOfSupply && !data.hiddenFields?.includes('placeOfSupply') && (
          <DraggableBlock id="place_of_supply" data={data} onChange={onChange}>
            <div style={{ fontSize: '0.85rem' }}>
              <strong>Place Of Supply:</strong> <EditableValue value={data.countryOfSupply} onChange={(v) => onChange?.({ ...data, countryOfSupply: v })} placeholder="Country" />
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
              {!data.hiddenFields?.includes('hsn') && <th style={{ padding: '10px', textAlign: 'center' }}>HSN/SAC</th>}
              <th style={{ padding: '10px', textAlign: 'center' }}><EditableLabel id="lbl_col_qty" defaultText="Qty" data={data} onChange={onChange} /></th>
              <th style={{ padding: '10px', textAlign: 'right' }}><EditableLabel id="lbl_col_rate" defaultText="Rate" data={data} onChange={onChange} /></th>
              {isIGST ? (
                <th style={{ padding: '10px', textAlign: 'right' }}><EditableLabel id="lbl_col_igst" defaultText="IGST" data={data} onChange={onChange} /></th>
              ) : (
                <>
                  <th style={{ padding: '10px', textAlign: 'right' }}><EditableLabel id="lbl_col_sgst" defaultText="SGST" data={data} onChange={onChange} /></th>
                  <th style={{ padding: '10px', textAlign: 'right' }}><EditableLabel id="lbl_col_cgst" defaultText="CGST" data={data} onChange={onChange} /></th>
                </>
              )}
              <th style={{ padding: '10px', textAlign: 'right' }}>Cess</th>
              <th style={{ padding: '10px', textAlign: 'right' }}><EditableLabel id="lbl_col_amt" defaultText="Amount" data={data} onChange={onChange} /></th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
              <tr>
                <td colSpan={isIGST ? 8 : 9} style={{ textAlign: 'center', color: '#9ca3af', padding: '30px' }}>
                  <div style={{ marginBottom: '10px' }}>No items added yet</div>
                  {onChange && (
                    <button
                      className="print-hidden"
                      onClick={() => onChange({ ...data, items: [{ id: Math.random().toString(), description: '', hsn: '', gstRate: 18, quantity: 1, rate: 0 }] })}
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
              const taxAmount = amount * ((item.gstRate || 0) / 100);

              return (
                <tr key={item.id || index} style={{ borderBottom: '1px solid #eee', fontSize: '0.8rem' }} className="invoice-row-group">
                  <td style={{ padding: '12px 10px', verticalAlign: 'top' }}>
                    {onChange && (
                      <button className="delete-item-btn print-hidden" onClick={() => { const newItems = [...data.items]; newItems.splice(index, 1); onChange({ ...data, items: newItems }); }} style={{ marginRight: '4px' }}>×</button>
                    )}
                    {index + 1}
                  </td>
                  <td style={{ padding: '12px 10px', verticalAlign: 'top' }}>
                    <div style={{ fontWeight: 'bold', color: '#333' }}><EditableValue value={item.description} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, description: v }; onChange?.({ ...data, items: newItems }) }} placeholder="Item Name" /></div>
                  </td>
                  {!data.hiddenFields?.includes('hsn') && (
                    <td style={{ padding: '12px 10px', textAlign: 'center', verticalAlign: 'top' }}><EditableValue value={item.hsn} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, hsn: v }; onChange?.({ ...data, items: newItems }) }} placeholder="HSN" /></td>
                  )}
                  <td style={{ padding: '12px 10px', textAlign: 'center', verticalAlign: 'top' }}><EditableValue value={item.quantity.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, quantity: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}><EditableValue value={item.rate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, rate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>

                  {isIGST ? (
                    <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>
                      {taxAmount.toFixed(2)}<br />
                      <span style={{ fontSize: '0.7rem', color: '#777' }}><EditableValue value={item.gstRate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, gstRate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" />%</span>
                    </td>
                  ) : (
                    <>
                      <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>
                        {(taxAmount / 2).toFixed(2)}<br />
                        <span style={{ fontSize: '0.7rem', color: '#777' }}>{cgstSgstRateStr(item.gstRate)}</span>
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>
                        {(taxAmount / 2).toFixed(2)}<br />
                        <span style={{ fontSize: '0.7rem', color: '#777' }}>{cgstSgstRateStr(item.gstRate)}</span>
                      </td>
                    </>
                  )}

                  <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}>0.00</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right', verticalAlign: 'top' }}><EditableValue value={amount.toFixed(2)} onChange={(v) => { const newItems = [...data.items]; const newAmt = parseFloat(v) || 0; newItems[index] = { ...item, rate: item.quantity > 0 ? newAmt / item.quantity : newAmt }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                </tr>
              );
            })}
            {data.items.length > 0 && onChange && (
              <tr className="print-hidden">
                <td colSpan={data.hiddenFields?.includes('hsn') ? (isIGST ? 7 : 8) : (isIGST ? 8 : 9)} style={{ textAlign: 'center', padding: '10px' }}>
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

      {/* Totals Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div style={{ flex: 1, paddingRight: '40px' }}>
          {/* UPI Section */}
          {(!data.hiddenFields?.includes('qrCode') || !data.hiddenFields?.includes('upiId')) && (
            <DraggableBlock id="payment_upi" data={data} onChange={onChange}>
              <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ border: '1px solid #ddd', padding: '8px', borderRadius: '4px' }}>
                  <EditableImage src={data.qrCodeUrl || ''} onChange={(src) => onChange?.({...data, qrCodeUrl: src})} fallbackText="Upload QR" style={{ width: '80px', height: '80px', margin: '0 auto' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#555', fontWeight: 'bold' }}><EditableLabel id="lbl_scanToPay" defaultText="Scan to Pay via UPI" data={data} onChange={onChange} /></div>
                  <div style={{ fontSize: '0.8rem', color: '#333', marginTop: '4px' }}>UPI ID: <EditableValue value={data.upiId} onChange={(v) => onChange?.({ ...data, upiId: v })} placeholder="example@upi" /></div>
                </div>
              </div>
            </DraggableBlock>
          )}

          {/* Bank Details Section */}
          {!data.hiddenFields?.includes('bankDetails') && (
            <DraggableBlock id="bank_details_section" data={data} onChange={onChange}>
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '8px', fontWeight: 'bold' }}><EditableLabel id="lbl_bank_details" defaultText="Bank Details" data={data} onChange={onChange} /></div>
                <div style={{ fontSize: '0.8rem', color: '#333' }}>
                  <div style={{ marginBottom: '4px' }}><strong><EditableLabel id="lbl_bank_name" defaultText="Bank Name:" data={data} onChange={onChange} /></strong> <EditableValue value={data.paymentDetails?.bankName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, bankName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Bank Name" /></div>
                  <div style={{ marginBottom: '4px' }}><strong><EditableLabel id="lbl_acc_no" defaultText="Account No:" data={data} onChange={onChange} /></strong> <EditableValue value={data.paymentDetails?.accountNumber} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, accountNumber: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Account Number" /></div>
                  <div style={{ marginBottom: '4px' }}><strong><EditableLabel id="lbl_ifsc" defaultText="IFSC Code:" data={data} onChange={onChange} /></strong> <EditableValue value={data.paymentDetails?.ifsc} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, ifsc: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="IFSC Code" /></div>
                  <div style={{ marginBottom: '4px' }}><strong><EditableLabel id="lbl_branch" defaultText="Branch Name:" data={data} onChange={onChange} /></strong> <EditableValue value={data.paymentDetails?.branchName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, branchName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Branch Name" /></div>
                </div>
              </div>
            </DraggableBlock>
          )}
        </div>
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
        {!data.hiddenFields?.includes('notes') && data.notes && (
          <DraggableBlock id="notes_section" data={data} onChange={onChange}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Notes</div>
              <div style={{ fontSize: '0.8rem', color: '#333', whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.notes} onChange={(v) => onChange?.({ ...data, notes: v })} placeholder="Enter notes here..." /></div>
            </div>
          </DraggableBlock>
        )}

        {!data.hiddenFields?.includes('terms') && data.terms && (
          <DraggableBlock id="terms_section" data={data} onChange={onChange}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '4px' }}>Terms & Conditions</div>
              <div style={{ fontSize: '0.8rem', color: '#333', whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.terms} onChange={(v) => onChange?.({ ...data, terms: v })} placeholder="Enter your terms and conditions here..." /></div>
            </div>
          </DraggableBlock>
        )}
      </div>

      {!data.hiddenFields?.includes('signature') && (
        <div style={{ textAlign: 'center', marginTop: '60px', padding: '20px 0', borderTop: '1px solid #eee', fontSize: '0.75rem', color: '#777' }}>
          Crafted with ease using <strong>DuroFiles</strong>
        </div>
      )}
    </div>
  );
};
