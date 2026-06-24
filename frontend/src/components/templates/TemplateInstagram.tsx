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

export const TemplateInstagram: React.FC<Props> = ({ data, onChange }) => {
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
    <div className="a4-paper template-instagram" style={{ fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#333', lineHeight: 1.4, backgroundColor: '#fff', padding: '30px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
        <DraggableBlock id="ig_header_left" data={data} onChange={onChange}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            {!data.hiddenFields?.includes('logo') && (
              <DraggableBlock id="header_logo" data={data} onChange={onChange}>
                <EditableImage
                  src={data.logoUrl || ''}
                  onChange={(src) => onChange?.({ ...data, logoUrl: src })}
                  fallbackText="Upload Logo"
                  style={{ width: '100px', height: '50px', marginBottom: '10px' }}
                />
              </DraggableBlock>
            )}

            <h1 style={{ fontSize: '12px', margin: '0', textTransform: 'uppercase', letterSpacing: '2px', color: '#000' }}>Invoice</h1>
          </div>
        </DraggableBlock>

        <DraggableBlock id="ig_header_right" data={data} onChange={onChange}>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '22px', margin: '0 0 5px 0', color: '#000' }}><EditableValue value={data.billedBy.name} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, name: v } })} placeholder="Your Company Name" /></h2>
            {showGst && <p style={{ margin: '2px 0' }}><strong>GSTIN <EditableValue value={data.billedBy.gstin} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, gstin: v } })} placeholder="GSTIN" /></strong></p>}
            <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.billedBy.address} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, address: v } })} placeholder="Your Address" /></p>
            <p style={{ margin: '2px 0' }}>
              {data.billedBy.phone && <><strong>Mobile</strong> <EditableValue value={data.billedBy.phone} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, phone: v } })} placeholder="Phone" /> &nbsp;</>}
              {data.billedBy.email && <><strong>Email</strong> <EditableValue value={data.billedBy.email} onChange={(v) => onChange?.({ ...data, billedBy: { ...data.billedBy, email: v } })} placeholder="Email" /></>}
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
              <p style={{ margin: '2px 0' }}><strong><EditableValue value={data.billedTo.name} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, name: v } })} placeholder="Client Name" /></strong></p>
              {data.billedTo.phone && <p style={{ margin: '2px 0' }}>Ph: {data.billedTo.phone}</p>}
              <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, address: v } })} placeholder="Client Address" /></p>
            </div>
          </DraggableBlock>

          <DraggableBlock id="ig_ship_to" data={data} onChange={onChange}>
            <div style={{ marginTop: '15px' }}>
              <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '2px' }}>Ship to:</div>
              <p style={{ margin: '2px 0', whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.billedTo.address} onChange={(v) => onChange?.({ ...data, billedTo: { ...data.billedTo, address: v } })} placeholder="Client Address" /></p>
            </div>
          </DraggableBlock>
        </div>

        <div style={{ width: '50%' }}>
          <DraggableBlock id="ig_info_grid" data={data} onChange={onChange}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '5px', textAlign: 'right' }}>
              {!data.hiddenFields?.includes('invoiceNo') && (
                <>
                  <span style={{ color: '#555', paddingRight: '10px' }}>Invoice #:</span>
                  <span style={{ fontWeight: 'bold' }}><EditableValue value={data.invoiceNumber} onChange={(v) => onChange?.({ ...data, invoiceNumber: v })} placeholder="INV-001" /></span>
                </>
              )}

              {!data.hiddenFields?.includes('invoiceDate') && (
                <>
                  <span style={{ color: '#555', paddingRight: '10px' }}>Invoice Date:</span>
                  <span style={{ fontWeight: 'bold' }}><EditableValue value={data.date} onChange={(v) => onChange?.({ ...data, date: v })} placeholder="Date" /></span>
                </>
              )}

              {!data.hiddenFields?.includes('dueDate') && (
                <>
                  <span style={{ color: '#555', paddingRight: '10px' }}>Due Date:</span>
                  <span style={{ fontWeight: 'bold' }}><EditableValue value={data.dueDate} onChange={(v) => onChange?.({ ...data, dueDate: v })} placeholder="Due Date" /></span>
                </>
              )}

              {data.countryOfSupply && !data.hiddenFields?.includes('placeOfSupply') && (
                <>
                  <span style={{ color: '#555', paddingRight: '10px' }}>Place of Supply:</span>
                  <span style={{ fontWeight: 'bold' }}><EditableValue value={data.countryOfSupply} onChange={(v) => onChange?.({ ...data, countryOfSupply: v })} placeholder="Country" /></span>
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
              <th style={{ padding: '8px', verticalAlign: 'top', backgroundColor: '#e40097', color: '#fff', fontWeight: 'bold', textAlign: 'left' }}><EditableLabel id="lbl_col_item" defaultText="Description" data={data} onChange={onChange} /></th>
              <th style={{ padding: '8px', verticalAlign: 'top', backgroundColor: '#e40097', color: '#fff', fontWeight: 'bold', textAlign: 'right' }}>HSN/SAC</th>
              <th style={{ padding: '8px', verticalAlign: 'top', backgroundColor: '#e40097', color: '#fff', fontWeight: 'bold', textAlign: 'right' }}><EditableLabel id="lbl_col_amt" defaultText="Amount" data={data} onChange={onChange} /></th>
            </tr>
          </thead>
          <tbody>
            {data.items.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: '#9ca3af', padding: '30px' }}>
                  <div style={{ marginBottom: '10px' }}>No items added yet</div>
                  {onChange && (
                    <button
                      className="print-hidden"
                      onClick={() => onChange({ ...data, items: [{ id: Math.random().toString(), description: '', hsn: '', gstRate: 18, quantity: 1, rate: 0 }] })}
                      style={{ padding: '8px 16px', backgroundColor: '#e40097', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      + Add Item
                    </button>
                  )}
                </td>
              </tr>
            )}
            {data.items.map((item, index) => {
              const amount = item.quantity * item.rate;
              return (
                <tr key={item.id || index} className="invoice-row-group" style={{ position: "relative" }}>
                  <td style={{ padding: '8px', verticalAlign: 'top', borderBottom: '1px solid #eee', textAlign: 'left' }}>
                    {onChange && (
                      <button className="delete-item-btn print-hidden" onClick={() => { const newItems = [...data.items]; newItems.splice(index, 1); onChange({ ...data, items: newItems }); }} style={{ marginRight: '4px' }}>×</button>
                    )}
                    {index + 1}
                  </td>
                  <td style={{ padding: '8px', verticalAlign: 'top', borderBottom: '1px solid #eee', textAlign: 'left' }}>
                    <strong><EditableValue value={item.description} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, description: v }; onChange?.({ ...data, items: newItems }) }} placeholder="Item Name" /></strong>
                    {item.quantity !== 1 && (
                      <div style={{ color: '#555', fontSize: '10px', marginTop: '5px', lineHeight: 1.5 }}>
                        Rate: {data.currency || '₹'}<EditableValue value={item.rate.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, rate: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /> x Qty: <EditableValue value={item.quantity.toString()} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, quantity: parseFloat(v) || 0 }; onChange?.({ ...data, items: newItems }) }} placeholder="0" />
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '8px', verticalAlign: 'top', borderBottom: '1px solid #eee', textAlign: 'right' }}><EditableValue value={item.hsn} onChange={(v) => { const newItems = [...data.items]; newItems[index] = { ...item, hsn: v }; onChange?.({ ...data, items: newItems }) }} placeholder="-" /></td>
                  <td style={{ padding: '8px', verticalAlign: 'top', borderBottom: '1px solid #eee', textAlign: 'right' }}><EditableValue value={amount.toFixed(2)} onChange={(v) => { const newItems = [...data.items]; const newAmt = parseFloat(v) || 0; newItems[index] = { ...item, rate: item.quantity > 0 ? newAmt / item.quantity : newAmt }; onChange?.({ ...data, items: newItems }) }} placeholder="0" /></td>
                </tr>
              );
            })}
            {data.items.length > 0 && onChange && (
              <tr className="print-hidden">
                <td colSpan={4} style={{ textAlign: 'center', padding: '10px' }}>
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
      <DraggableBlock id="ig_totals" data={data} onChange={onChange}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
          <table style={{ width: '300px', border: 'none' }}>
            <tbody>
              <tr>
                <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>Amount</td>
                <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>{data.currency || '₹'}{subtotal.toFixed(2)}</td>
              </tr>
              {showGst && (
                isIGST ? (
                  <tr>
                    <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>IGST</td>
                    <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>{data.currency || '₹'}{totalTax.toFixed(2)}</td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>CGST</td>
                      <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>{data.currency || '₹'}{(totalTax / 2).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '3px 8px', border: 'none', color: '#000', fontWeight: 'bold' }}>SGST</td>
                      <td style={{ padding: '3px 8px', border: 'none', color: '#000', textAlign: 'right' }}>{data.currency || '₹'}{(totalTax / 2).toFixed(2)}</td>
                    </tr>
                  </>
                )
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
        <DraggableBlock id="ig_footer_2" data={data} onChange={onChange}>
          <div>
            {!data.hiddenFields?.includes('bankDetails') && (
              <>
                <strong>Bank Details:</strong><br /><br />
                <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '60px', color: '#555' }}>Bank:</span> <strong><EditableValue value={data.paymentDetails?.bankName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, bankName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Bank Name" /></strong></p>
                <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '60px', color: '#555' }}>A/C No:</span> <strong><EditableValue value={data.paymentDetails?.accountNumber} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, accountNumber: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Account Number" /></strong></p>
                <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '60px', color: '#555' }}>IFSC:</span> <strong><EditableValue value={data.paymentDetails?.ifsc} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, ifsc: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="IFSC Code" /></strong></p>
                <p style={{ margin: '3px 0', display: 'flex' }}><span style={{ width: '60px', color: '#555' }}>Branch:</span> <strong><EditableValue value={data.paymentDetails?.branchName} onChange={(v) => onChange?.({ ...data, paymentDetails: { ...data.paymentDetails, branchName: v, upiId: data.paymentDetails?.upiId || '' } })} placeholder="Branch Name" /></strong></p>
              </>
            )}
          </div>
        </DraggableBlock>
        {!data.hiddenFields?.includes('signature') && (
          <DraggableBlock id="ig_signature" data={data} onChange={onChange}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
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
        )}
      </div>

      {/* Terms */}
      <div style={{ fontSize: '9px', color: '#555' }}>
        {!data.hiddenFields?.includes('notes') && data.notes && (
          <DraggableBlock id="ig_terms_notes" data={data} onChange={onChange}>
            <p style={{ margin: '0 0 10px 0' }}><strong>Notes:</strong><br /><EditableValue isTextArea value={data.notes} onChange={(v) => onChange?.({ ...data, notes: v })} placeholder="Notes" /></p>
          </DraggableBlock>
        )}
        {!data.hiddenFields?.includes('terms') && data.terms && (
          <DraggableBlock id="ig_terms_cond" data={data} onChange={onChange}>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>Terms and Conditions:</h4>
              <div style={{ whiteSpace: 'pre-wrap' }}><EditableValue isTextArea value={data.terms} onChange={(v) => onChange?.({ ...data, terms: v })} placeholder="Enter your terms and conditions here..." /></div>
            </div>
          </DraggableBlock>
        )}
      </div>

    </div>
  );
};
