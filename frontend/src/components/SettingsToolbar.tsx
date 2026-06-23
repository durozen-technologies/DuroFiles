import React, { useState, useEffect, useRef } from 'react';
import type { InvoiceData } from '../../types/invoice';
import { useEditor } from '../contexts/EditorContext';
import { Eye, EyeOff, Layers, Settings } from 'lucide-react';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export const SettingsToolbar: React.FC<Props> = ({ data, onChange }) => {
  const { isDragMode, setIsDragMode } = useEditor();
  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

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
      position: 'fixed',
      top: '90px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
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
      }}>

        {/* Template Selector - OUTSIDE Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px' }}>
          <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>Template:</label>
          <select
            value={data.templateId || 'modern'}
            onChange={e => onChange({ ...data, templateId: e.target.value as any })}
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              fontSize: '0.875rem',
              outline: 'none',
              backgroundColor: '#f8fafc',
              cursor: 'pointer'
            }}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="creative">Creative</option>
            <option value="tech">Tech</option>
            <option value="gst_standard">GST Standard</option>
            <option value="amazon_style">Amazon</option>
            <option value="instagram_style">Instagram</option>
          </select>
        </div>

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
