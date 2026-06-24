import React, { useState, useEffect, useRef } from 'react';
import type { InvoiceData } from '../../types/invoice';
import { useEditor } from '../contexts/EditorContext';
import { Eye, EyeOff, Layers, Settings, Printer, ArrowLeft, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export const SettingsToolbar: React.FC<Props> = ({ data, onChange }) => {
  const { isDragMode, setIsDragMode } = useEditor();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement>(null);

  const handleResetLayout = () => {
    if (confirm("Are you sure you want to reset all dragged elements to their default positions?")) {
      window.dispatchEvent(new CustomEvent('reset-layout'));
    }
  };

  const handleDownloadPDF = async () => {
    try {
      (document.activeElement as HTMLElement)?.blur();
      
      const element = document.querySelector('.a4-paper') as HTMLElement;
      if (!element) {
        window.print();
        return;
      }
      
      // Temporarily hide UI elements inside the paper
      const hiddenElements = element.querySelectorAll('.print-hidden');
      const originalDisplays: string[] = [];
      hiddenElements.forEach((el, index) => {
        originalDisplays[index] = (el as HTMLElement).style.display;
        (el as HTMLElement).style.display = 'none';
      });

      // Temporarily remove minHeight to prevent fractional pixel overflow causing a blank 2nd page
      const originalMinHeight = element.style.getPropertyValue('min-height');
      const originalHeight = element.style.getPropertyValue('height');
      element.style.setProperty('min-height', '0px', 'important');
      element.style.setProperty('height', 'max-content', 'important');

      // Dynamically import libraries to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(element, { scale: 2, useCORS: true, logging: false });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      let finalWidth = pdfWidth;
      let finalHeight = (canvas.height * finalWidth) / canvas.width;
      
      // Force it to fit on exactly ONE page by scaling it down if it's too tall
      if (finalHeight > 297) {
        const ratio = 297 / finalHeight;
        finalHeight = 297;
        finalWidth = finalWidth * ratio;
      }
      
      const xOffset = (pdfWidth - finalWidth) / 2;
      pdf.addImage(imgData, 'JPEG', xOffset, 0, finalWidth, finalHeight);
      pdf.save(`Invoice_${new Date().toISOString().split('T')[0]}.pdf`);

      // Restore UI elements and styles
      if (originalMinHeight) element.style.setProperty('min-height', originalMinHeight); else element.style.removeProperty('min-height');
      if (originalHeight) element.style.setProperty('height', originalHeight); else element.style.removeProperty('height');
      hiddenElements.forEach((el, index) => {
        (el as HTMLElement).style.display = originalDisplays[index];
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      window.print();
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleVisibility = (group: string) => {
    const current = data.hiddenFields || [];
    const newFields = current.includes(group) ? current.filter(f => f !== group) : [...current, group];
    onChange({ ...data, hiddenFields: newFields });
  };

  const isHidden = (group: string) => data.hiddenFields?.includes(group);

  return (
    <div className="settings-toolbar print-hidden" ref={menuRef} style={{
      position: 'relative',
      marginTop: '30px',
      marginBottom: '10px',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>

      {/* Top Toolbar Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: 'white',
        padding: '8px 12px',
        borderRadius: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid var(--border-color)',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>

        {/* Back Button */}
        <button 
          onClick={() => router.push('/templates')}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }}></div>



        {/* Settings Pill Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: showMenu ? 'var(--primary-color)' : 'transparent',
            color: showMenu ? 'white' : 'var(--text-main)',
            fontSize: '0.875rem',
            cursor: 'pointer',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <Settings size={18} /> Settings
        </button>

        <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }}></div>

        {/* Reset Layout */}
        <button 
          onClick={handleResetLayout} 
          style={{ background: 'none', color: '#64748b', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} /> Reset
        </button>

        <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-color)' }}></div>

        {/* Download PDF */}
        <button 
          onClick={handleDownloadPDF} 
          style={{ background: 'var(--primary-color)', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Printer size={16} /> Download PDF
        </button>

      </div>

      {/* Main Settings Dropdown */}
      {showMenu && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 10px)',
          backgroundColor: 'white',
          padding: '12px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          border: '1px solid var(--border-color)',
          minWidth: '240px',
          animation: 'fadeIn 0.2s ease-out'
        }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: '#64748b' }}>Editor Mode</label>
            <button
              onClick={() => setIsDragMode(!isDragMode)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: `1px solid ${isDragMode ? 'var(--primary-color)' : 'var(--border-color)'}`,
                backgroundColor: isDragMode ? 'var(--primary-color)' : '#f8fafc',
                color: isDragMode ? 'white' : 'var(--text-main)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.2s',
                width: '100%',
                textAlign: 'center'
              }}
            >
              {isDragMode ? 'Disable Drag Position' : 'Enable Drag Position'}
            </button>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '2px 0' }}></div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: '#64748b' }}>Currency</label>
              <select
                value={data.currency || '₹'}
                onChange={e => onChange({ ...data, currency: e.target.value })}
                style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.8rem', outline: 'none', backgroundColor: '#f8fafc', width: '100%' }}
              >
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: '#64748b' }}>Tax Engine</label>
              <select
                value={data.taxSettings?.type || 'IGST'}
                onChange={e => onChange({
                  ...data,
                  taxSettings: { ...data.taxSettings, type: e.target.value as any, inclusive: data.taxSettings?.inclusive || false }
                })}
                style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.8rem', outline: 'none', backgroundColor: '#f8fafc', width: '100%' }}
              >
                <option value="IGST">IGST</option>
                <option value="CGST_SGST">CGST+SGST</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: '#64748b' }}>GST %</label>
              <select
                value={data.items?.[0]?.gstRate || 0}
                onChange={e => {
                  const newRate = parseFloat(e.target.value) || 0;
                  onChange({
                    ...data,
                    items: data.items.map(item => ({ ...item, gstRate: newRate }))
                  });
                }}
                style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid var(--border-color)', fontSize: '0.8rem', outline: 'none', backgroundColor: '#f8fafc', width: '100%' }}
              >
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '2px 0' }}></div>

          {/* Visibility Menu Integrated directly into the main modal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Layers size={12} /> Toggle Visibility
            </label>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              maxHeight: '180px',
              overflowY: 'auto',
              paddingRight: '4px',
              marginRight: '-4px'
            }}>
              {[
                { id: 'logo', label: 'Logo' },
                { id: 'gst', label: 'GST Tax & Number' },
                { id: 'billTo', label: 'Bill To' },
                { id: 'shipTo', label: 'Ship To' },
                { id: 'invoiceNo', label: 'Invoice #' },
                { id: 'invoiceDate', label: 'Invoice Date' },
                { id: 'dueDate', label: 'Due Date' },
                { id: 'placeOfSupply', label: 'Place of Supply' },
                { id: 'notes', label: 'Notes' },
                { id: 'terms', label: 'Terms' },
                { id: 'signature', label: 'Stamp & Signature' },
                { id: 'qrCode', label: 'UPI QR Code' },
                { id: 'bankDetails', label: 'Bank Details' },
              ].map(section => (
                <button
                  key={section.id}
                  onClick={() => toggleVisibility(section.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    background: 'none',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer',
                    borderRadius: '6px',
                    backgroundColor: isHidden(section.id) ? '#f1f5f9' : 'white',
                    color: isHidden(section.id) ? '#94a3b8' : '#334155',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{section.label}</span>
                  {isHidden(section.id) ? <EyeOff size={14} /> : <Eye size={14} color="#3b82f6" />}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};
