import React from 'react';

import type { InvoiceData } from '../../types/invoice';
import { DraggableBlock } from '../DraggableBlock';
import { EditableLabel } from '../EditableLabel';
import { EditableValue } from '../EditableValue';
import { EditableImage } from '../EditableImage';
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

  const showGst = !data.hiddenFields?.includes('gst');

  const calculateTotalIGST = () => {
    if (!showGst) return 0;
    return data.items.reduce((sum, item) => {
      const amount = item.quantity * item.rate;
      return sum + (amount * ((item.gstRate || 0) / 100));
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const totalTax = calculateTotalIGST();
  const grandTotal = subtotal + totalTax;

  const upiUri = `upi://pay?pa=$<EditableValue value={data.upiId} onChange={(v) => onChange?.({...data, upiId: v})} placeholder="example@upi" />&pn=${encodeURIComponent(data.billedBy.name)}&am=${grandTotal.toFixed(2)}&cu=INR`;

  const totalItems = data.items.length;
  const totalQty = data.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="a4-paper template-amazon" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#333', lineHeight: 1.4, backgroundColor: '#fff', padding: '30px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <DraggableBlock id="amazon_header_left" data={data} onChange={onChange}>
          <div>
            {!data.hiddenFields?.includes('logo') && (
              <DraggableBlock id="header_logo" data={data} onChange={onChange}>
                <EditableImage
                  src={data.logoUrl || ''}
                  onChange={(src) => onChange?.({ ...data, logoUrl: src })}
                  fallbackText="Upload Logo"
                  style={{ width: '120px', height: '60px', marginBottom: '10px' }}
                />
              </DraggableBlock>
            )}
            <h1 style={{ color: '#004b91', fontSize: '16px', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>Invoice</h1>
            <h2 style={{ fontSize: '20px', margin: '0 0 5px 0', color: '#000' }}><EditableValue value={data.billedBy.name} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, name: v } })} placeholder="Your Company Name" /></h2>
            {showGst && <p style={{ margin: '2px 0' }}><strong>GSTIN <EditableValue value={data.billedBy.gstin} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, gstin: v } })} placeholder="GSTIN" /></strong></p>}
            <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.billedBy.address} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, address: v } })} placeholder="Your Address" /></p>
            <p style={{ margin: '2px 0' }}>
              {data.billedBy.phone && <><strong>Mobile</strong> <EditableValue value={data.billedBy.phone} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, phone: v } })} placeholder="Phone" /> &nbsp;</>}
              {data.billedBy.email && <><strong>Email</strong> <EditableValue value={data.billedBy.email} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, email: v } })} placeholder="Email" /></>}
            </p>
          </div>
        </DraggableBlock>

        <DraggableBlock id="amazon_header_right" data={data} onChange={onChange}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#666', marginBottom: '5px', textTransform: 'uppercase' }}></div>

          </div>
        </DraggableBlock>
      </div>

      {/* Info Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        {!data.hiddenFields?.includes('invoiceNo') && (
          <DraggableBlock id="amazon_info_1" data={data} onChange={onChange}>
            <div><p style={{ margin: '2px 0' }}><strong>Invoice #: <EditableValue value={data.invoiceNumber} onChange={(v) => onChange?.({ ...data, invoiceNumber: v })} placeholder="INV-001" /></strong></p></div>
          </DraggableBlock>
        )}
        {!data.hiddenFields?.includes('invoiceDate') && (
          <DraggableBlock id="amazon_info_2" data={data} onChange={onChange}>
            <div><p style={{ margin: '2px 0' }}><strong>Invoice Date: <EditableValue value={data.date} onChange={(v) => onChange?.({ ...data, date: v })} placeholder="Date" /></strong></p></div>
          </DraggableBlock>
        )}
        {!data.hiddenFields?.includes('dueDate') && (
          <DraggableBlock id="amazon_info_3" data={data} onChange={onChange}>
            <div><p style={{ margin: '2px 0' }}><strong>Due Date: <EditableValue value={data.dueDate} onChange={(v) => onChange?.({ ...data, dueDate: v })} placeholder="Due Date" /></strong></p></div>
          </DraggableBlock>
        )}

        <DraggableBlock id="amazon_info_4" data={data} onChange={onChange}>
          <div>
            <p style={{ margin: '2px 0' }}>Customer Details:</p>
            <p style={{ margin: '2px 0' }}><strong><EditableValue value={data.billedTo.name} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, name: v } })} placeholder="Client Name" /></strong></p>
            {data.billedTo.phone && <p style={{ margin: '2px 0' }}>Ph: {data.billedTo.phone}</p>}
          </div>
        </DraggableBlock>
        <DraggableBlock id="amazon_info_5" data={data} onChange={onChange}>
          <div>
            <p style={{ margin: '2px 0' }}>Billing address:</p>
            <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, address: v } })} placeholder="Client Address" /></p>
          </div>
        </DraggableBlock>
        <DraggableBlock id="amazon_info_6" data={data} onChange={onChange}>
          <div>
            <p style={{ margin: '2px 0' }}>Shipping address:</p>
            <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, address: v } })} placeholder="Client Address" /></p>
          </div>
        </DraggableBlock>
      </div>

      {data.countryOfSupply && !data.hiddenFields?.includes('placeOfSupply') && (
        <DraggableBlock id="amazon_pos" data={data} onChange={onChange}>
          <div style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: '5px' }}>Place of Supply: <EditableValue value={data.countryOfSupply} onChange={(v) => onChange?.({ ...data, countryOfSupply: v })} placeholder="Country" /></div>
        </DraggableBlock>
      )}

      {/* Table */}
      <DraggableBlock id="amazon_table" data={data} onChange={onChange}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '10px' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'left', verticalAlign: 'top' }}>#</th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'left', verticalAlign: 'top' }}><EditableLabel id="lbl_col_item" defaultText="Item" data={data} onChange={onChange} /></th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}>Rate/ Item</th>
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}><EditableLabel id="lbl_col_qty" defaultText="Qty" data={data} onChange={onChange} /></th>
              {showGst && <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}>Taxable Value</th>}
              {showGst && <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}>Tax Amount</th>}
              <th style={{ padding: '8px', borderTop: '1px solid #000', borderBottom: '1px solid #000', fontWeight: 'bold', textAlign: 'right', verticalAlign: 'top' }}><EditableLabel id="lbl_col_amt" defaultText="Amount" data={data} onChange={onChange} /></th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
              <tr>
                <td colSpan={showGst ? 7 : 5} style={{ textAlign: 'center', color: '#9ca3af', padding: '30px' }}>
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
              const total = amount + taxAmount;

              return (
                <tr key={item.id || index} className="invoice-row-group" style={{ position: "relative" }}>
                  <td style={{ padding: '8px', textAlign: 'left', verticalAlign: 'top' }}>
                    {onChange && (
                      <button className="delete-item-btn print-hidden" onClick={() => { const newItems = [...data.items]; newItems.splice(index, 1); onChange({ ...data, items: newItems }); }} style={{ marginRight: '4px' }}>×</button>
                    )}
                    {index + 1}
                  </td>
                  <td style={{ padding: '8px', textAlign: 'left', verticalAlign: 'top' }}>
                    <strong><EditableValue value={item.description} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, description: v }; onChange?.({ ...data, items: newItems }) }} placeholder="Item Name" /></strong><br />
                    <div style={{ color: '#555', fontSize: '10px', marginTop: '4px' }}>
                      HSN: <EditableValue value={item.hsn} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, hsn: v }; onChange?.({ ...data, items: newItems }) }} placeholder="HSN" />
                    </div>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}><EditableValue value={item.rate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, rate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                  <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}><EditableValue value={item.quantity.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, quantity: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                  {showGst && <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}><EditableValue value={amount.toFixed(2)} onChange={(v) => { const newItems = [...data.items]; const newAmt = parseFloat(v) || 0; newItems[index] = { ...item, rate: item.quantity > 0 ? newAmt / item.quantity : newAmt }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>}
                  {showGst && <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}>{taxAmount.toFixed(2)} (<EditableValue value={item.gstRate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, gstRate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" />%)</td>}
                  <td style={{ padding: '8px', textAlign: 'right', verticalAlign: 'top' }}><EditableValue value={total.toFixed(2)} onChange={(v) => { const newItems = [...data.items]; const newTotal = parseFloat(v) || 0; const newAmt = newTotal / (1 + (item.gstRate || 0) / 100); newItems[index] = { ...item, rate: item.quantity > 0 ? newAmt / item.quantity : newAmt }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                </tr>
              );
            })}
            {data.items.length > 0 && onChange && (
              <tr className="print-hidden">
                <td colSpan={showGst ? 7 : 5} style={{ textAlign: 'center', padding: '10px' }}>
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

      {/* Totals */}
      <DraggableBlock id="amazon_totals" data={data} onChange={onChange}>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '5px', marginBottom: '5px' }}>
          <div></div>
          <table style={{ width: '300px', margin: '0' }}>
            <tbody>
              <tr>
                <td style={{ padding: '3px 8px', textAlign: 'left' }}><strong>Amount</strong></td>
                <td style={{ padding: '3px 8px', textAlign: 'right' }}><strong>{data.currency || '₹'}{subtotal.toFixed(2)}</strong></td>
              </tr>
              {showGst && (
                isIGST ? (
                  <tr>
                    <td style={{ padding: '3px 8px', textAlign: 'left' }}><strong>IGST</strong></td>
                    <td style={{ padding: '3px 8px', textAlign: 'right' }}><strong>{data.currency || '₹'}{totalTax.toFixed(2)}</strong></td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td style={{ padding: '3px 8px', textAlign: 'left' }}><strong>SGST</strong></td>
                      <td style={{ padding: '3px 8px', textAlign: 'right' }}><strong>{data.currency || '₹'}{(totalTax / 2).toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                      <td style={{ padding: '3px 8px', textAlign: 'left' }}><strong>CGST</strong></td>
                      <td style={{ padding: '3px 8px', textAlign: 'right' }}><strong>{data.currency || '₹'}{(totalTax / 2).toFixed(2)}</strong></td>
                    </tr>
                  </>
                )
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
            {(!data.hiddenFields?.includes('qrCode') || !data.hiddenFields?.includes('upiId')) && (
              <>
                <strong>Pay using UPI:</strong><br /><br />
                <div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <EditableImage src={data.qrCodeUrl || ''} onChange={(src) => onChange?.({...data, qrCodeUrl: src})} fallbackText="Upload QR" style={{ width: '90px', height: '90px', margin: '0 auto' }} />
                </div>
                <div style={{ fontSize: '10px', marginTop: '4px' }}>
                  UPI ID: <EditableValue value={data.upiId} onChange={(v) => onChange?.({ ...data, upiId: v })} placeholder="example@upi" />
                </div>
              </>
            )}
          </div>
        </DraggableBlock>
        <DraggableBlock id="amazon_footer_2" data={data} onChange={onChange}>
          <div>
            {!data.hiddenFields?.includes('bankDetails') && (
              <>
                <strong>Bank Details:</strong><br /><br />
                <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '60px' }}>Bank:</span> <strong><EditableValue value={data.paymentDetails?.bankName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, bankName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Bank Name" /></strong></p>
                <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '60px' }}>A/C No:</span> <strong><EditableValue value={data.paymentDetails?.accountNumber} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, accountNumber: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Account Number" /></strong></p>
                <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '60px' }}>IFSC:</span> <strong><EditableValue value={data.paymentDetails?.ifsc} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, ifsc: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="IFSC Code" /></strong></p>
                <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '60px' }}>Branch:</span> <strong><EditableValue value={data.paymentDetails?.branchName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, branchName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Branch Name" /></strong></p>
              </>
            )}
          </div>
        </DraggableBlock>
        <DraggableBlock id="amazon_signature" data={data} onChange={onChange}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', color: '#555', marginBottom: '6px' }}>
              For <EditableValue value={data.billedBy.name} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, name: v } })} placeholder="Your Company Name" />
            </div>
            {/* Signature / Stamp rectangle */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {data.signatureUrl ? (
                <img src={data.signatureUrl} alt="Stamp / Signature" style={{ width: '140px', height: '70px', objectFit: 'contain', border: '1px solid #ccc', borderRadius: '4px', display: 'block' }} />
              ) : (
                <div style={{ width: '140px', height: '70px', border: '1px dashed #bbb', borderRadius: '4px', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '10px', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '18px' }}>🖼️</span>
                  <span>Stamp / Signature</span>
                </div>
              )}
              {onChange && (
                <label style={{ position: 'absolute', inset: 0, cursor: 'pointer', display: 'block' }} title="Upload stamp / signature image">
                  <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => onChange({ ...data, signatureUrl: ev.target?.result as string });
                    reader.readAsDataURL(file);
                  }} />
                </label>
              )}
            </div>
            <div style={{ fontSize: '10px', color: '#555', marginTop: '6px' }}>Authorized Signatory</div>
          </div>
        </DraggableBlock>
      </div>

      {/* Terms */}
      <div style={{ fontSize: '9px', color: '#555' }}>
        <DraggableBlock id="amazon_terms_notes" data={data} onChange={onChange}>
          <p style={{ margin: '0 0 10px 0' }}><strong>Notes:</strong><br /><EditableValue isTextArea value={data.notes} onChange={(v) => onChange?.({ ...data, notes: v })} placeholder="Notes" /></p>
        </DraggableBlock>
        <DraggableBlock id="amazon_terms_cond" data={data} onChange={onChange}>
          <div>
            <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Terms and Conditions:</h4>
            <div style={{ whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.terms} onChange={(v) => onChange?.({ ...data, terms: v })} placeholder="Enter your terms and conditions here..." /></div>
          </div>
        </DraggableBlock>
      </div>

    </div>
  );
};
