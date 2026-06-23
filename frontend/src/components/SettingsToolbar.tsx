import React, { useState } from 'react';
import type { InvoiceData } from '../../types/invoice';
import { useEditor } from '../contexts/EditorContext';
import { Eye, EyeOff, Layers } from 'lucide-react';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export const SettingsToolbar: React.FC<Props> = ({ data, onChange }) => {
  const { isDragMode, setIsDragMode } = useEditor();
  const [showVisibilityMenu, setShowVisibilityMenu] = useState(false);

  const toggleVisibility = (group: string) => {
    const current = data.hiddenFields || [];
    const newFields = current.includes(group) ? current.filter(f => f !== group) : [...current, group];
    onChange({ ...data, hiddenFields: newFields });
  };

  const isHidden = (group: string) => data.hiddenFields?.includes(group);

  return (
    <div className="settings-toolbar" style={{
      position: 'fixed',
      top: '90px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'white',
      padding: '12px 24px',
      borderRadius: '30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      display: 'flex',
      gap: '20px',
      zIndex: 1000,
      border: '1px solid var(--border-color)',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: 'center',
      width: 'max-content',
      maxWidth: '90vw'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button 
          onClick={() => setIsDragMode(!isDragMode)}
          style={{ 
            padding: '6px 12px', 
            borderRadius: '20px', 
            border: `1px solid ${isDragMode ? 'var(--primary-color)' : 'var(--border-color)'}`, 
            backgroundColor: isDragMode ? 'var(--primary-color)' : 'transparent',
            color: isDragMode ? 'white' : 'var(--text-main)',
            fontSize: '0.875rem', 
            cursor: 'pointer',
            fontWeight: 500,
            transition: 'all 0.2s'
          }}
        >
          {isDragMode ? 'Disable Drag Position' : 'Enable Drag Position'}
        </button>
      </div>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>Template:</label>
        <select 
          value={data.templateId || 'modern'} 
          onChange={e => onChange({...data, templateId: e.target.value as any})}
          style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none' }}
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
      
      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>Currency:</label>
        <select 
          value={data.currency || '₹'} 
          onChange={e => onChange({...data, currency: e.target.value})}
          style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none' }}
        >
          <option value="₹">₹ (INR)</option>
          <option value="$">$ (USD)</option>
          <option value="€">€ (EUR)</option>
          <option value="£">£ (GBP)</option>
        </select>
      </div>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-main)' }}>Tax:</label>
        <select 
          value={data.taxSettings?.type || 'IGST'} 
          onChange={e => onChange({
            ...data, 
            taxSettings: { ...data.taxSettings, type: e.target.value as any, inclusive: data.taxSettings?.inclusive || false }
          })}
          style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.875rem', outline: 'none' }}
        >
          <option value="IGST">IGST</option>
          <option value="CGST_SGST">CGST+SGST</option>
        </select>
      </div>

      <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }}></div>

      {/* Visibility Settings Menu */}
      <div style={{ position: 'relative' }}>
        <button 
          onClick={() => setShowVisibilityMenu(!showVisibilityMenu)}
          style={{ 
            padding: '6px 12px', 
            borderRadius: '20px', 
            border: '1px solid var(--border-color)', 
            backgroundColor: 'transparent',
            color: 'var(--text-main)',
            fontSize: '0.875rem', 
            cursor: 'pointer',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Layers size={14} /> Visibility
        </button>

        {showVisibilityMenu && (
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            backgroundColor: 'white',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            minWidth: '180px',
            zIndex: 1001
          }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Hide / Show Sections</div>
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
            ].map(section => (
              <button
                key={section.id}
                onClick={() => toggleVisibility(section.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  backgroundColor: isHidden(section.id) ? '#f8fafc' : 'transparent',
                  color: isHidden(section.id) ? '#94a3b8' : '#334155',
                  transition: 'background 0.2s',
                  textAlign: 'left'
                }}
              >
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{section.label}</span>
                {isHidden(section.id) ? <EyeOff size={16} /> : <Eye size={16} color="#3b82f6" />}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
