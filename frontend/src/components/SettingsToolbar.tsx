import React, { useState, useEffect, useRef } from 'react';
import type { InvoiceData } from '../../types/invoice';
import { useEditor } from '../contexts/EditorContext';
import { Eye, EyeOff, Layers, Settings, Download, ArrowLeft, RefreshCw, Moon, Sun, X, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

interface Props {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

const VISIBILITY_SECTIONS = [
  { id: 'logo',          label: 'Logo' },
  { id: 'gst',           label: 'GST Tax & Number' },
  { id: 'billTo',        label: 'Bill To' },
  { id: 'shipTo',        label: 'Ship To' },
  { id: 'invoiceNo',     label: 'Invoice #' },
  { id: 'invoiceDate',   label: 'Invoice Date' },
  { id: 'dueDate',       label: 'Due Date' },
  { id: 'placeOfSupply', label: 'Place of Supply' },
  { id: 'notes',         label: 'Notes' },
  { id: 'terms',         label: 'Terms' },
  { id: 'signature',     label: 'Stamp & Signature' },
  { id: 'qrCode',        label: 'UPI QR Code' },
  { id: 'bankDetails',   label: 'Bank Details' },
];

export const SettingsToolbar: React.FC<Props> = ({ data, onChange }) => {
  const { isDragMode, setIsDragMode } = useEditor();
  const [showMenu, setShowMenu]       = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const router                        = useRouter();
  const { theme, setTheme }           = useTheme();
  const menuRef                       = useRef<HTMLDivElement>(null);

  /* ── Reset Layout ── */
  const handleResetLayout = () => {
    if (confirm('Reset all dragged elements to their default positions?')) {
      window.dispatchEvent(new CustomEvent('reset-layout'));
    }
  };

  /* ── Download PDF ── */
  const handleDownloadPDF = async () => {
    try {
      setIsDownloading(true);
      (document.activeElement as HTMLElement)?.blur();

      const element = document.querySelector('.a4-paper') as HTMLElement;
      if (!element) { window.print(); return; }

      const hiddenElements  = element.querySelectorAll('.print-hidden');
      const originalDisplays: string[] = [];
      hiddenElements.forEach((el, i) => {
        originalDisplays[i] = (el as HTMLElement).style.display;
        (el as HTMLElement).style.display = 'none';
      });

      const originalMinHeight = element.style.getPropertyValue('min-height');
      const originalHeight    = element.style.getPropertyValue('height');
      element.style.setProperty('min-height', '0px', 'important');
      element.style.setProperty('height', 'max-content', 'important');

      const scaleContainer = element.closest('.scale-to-fit-content') as HTMLElement;
      const originalTransform = scaleContainer ? scaleContainer.style.transform : '';
      if (scaleContainer) {
        scaleContainer.style.transform = 'none';
      }

      const html2canvas  = (await import('html2canvas')).default;
      const { jsPDF }    = await import('jspdf');

      const canvas       = await html2canvas(element, { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        windowWidth: 794,
        width: 794
      });

      if (scaleContainer) {
        scaleContainer.style.transform = originalTransform;
      }
      const imgData      = canvas.toDataURL('image/jpeg', 1.0);
      const pdf          = new jsPDF('p', 'mm', 'a4');
      const pdfWidth     = pdf.internal.pageSize.getWidth();
      let finalWidth     = pdfWidth;
      let finalHeight    = (canvas.height * finalWidth) / canvas.width;

      if (finalHeight > 297) {
        const ratio = 297 / finalHeight;
        finalHeight = 297;
        finalWidth  = finalWidth * ratio;
      }

      const xOffset = (pdfWidth - finalWidth) / 2;
      pdf.addImage(imgData, 'JPEG', xOffset, 0, finalWidth, finalHeight);
      pdf.save(`Invoice_${new Date().toISOString().split('T')[0]}.pdf`);

      if (originalMinHeight) element.style.setProperty('min-height', originalMinHeight); else element.style.removeProperty('min-height');
      if (originalHeight)    element.style.setProperty('height', originalHeight);    else element.style.removeProperty('height');
      hiddenElements.forEach((el, i) => { (el as HTMLElement).style.display = originalDisplays[i]; });
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  /* ── Click outside ── */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const toggleVisibility = (group: string) => {
    const current   = data.hiddenFields || [];
    const newFields = current.includes(group) ? current.filter(f => f !== group) : [...current, group];
    onChange({ ...data, hiddenFields: newFields });
  };
  const isHidden = (group: string) => data.hiddenFields?.includes(group);

  /* ─── Invoice number for header ─── */
  const invoiceLabel = data.invoiceNumber ? `Invoice ${data.invoiceNumber}` : 'Invoice Editor';

  return (
    <div className="print-hidden" ref={menuRef}>
      {/* ── Sticky Top Header Bar ── */}
      <div className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-3">

          {/* Left: Back */}
          <button
            onClick={() => router.push('/templates')}
            className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 shrink-0"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>

          {/* Center: Invoice label */}
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate hidden md:block">
            {invoiceLabel}
          </p>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Reset */}
            <button
              onClick={handleResetLayout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <RefreshCw size={14} />
              <span className="hidden md:inline">Reset</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                showMenu
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Settings size={15} />
              <span className="hidden sm:inline">Settings</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Download PDF */}
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Download size={15} className={isDownloading ? 'animate-bounce' : ''} />
              <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'Download PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Settings Panel (absolute dropdown) ── */}
      {showMenu && (
        <div
          className="fixed top-[57px] right-4 z-[200] w-72 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-2xl p-4 flex flex-col gap-4"
          style={{ animation: 'fadeIn 0.15s ease-out' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Settings</p>
            <button onClick={() => setShowMenu(false)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <X size={15} />
            </button>
          </div>

          {/* Editor Mode */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={11} /> Editor Mode
            </label>
            <button
              onClick={() => setIsDragMode(!isDragMode)}
              className={`w-full py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                isDragMode
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400'
              }`}
            >
              {isDragMode ? '✓ Drag Position Enabled' : 'Enable Drag Position'}
            </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          {/* Currency + Tax side-by-side */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Currency</label>
              <select
                value={data.currency || '₹'}
                onChange={e => onChange({ ...data, currency: e.target.value })}
                className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
                <option value="£">£ (GBP)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Tax</label>
              <select
                value={data.taxSettings?.type || 'IGST'}
                onChange={e => onChange({ ...data, taxSettings: { ...data.taxSettings, type: e.target.value as any, inclusive: data.taxSettings?.inclusive || false } })}
                className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              >
                <option value="IGST">IGST</option>
                <option value="CGST_SGST">CGST+SGST</option>
              </select>
            </div>
          </div>

          {/* GST rate */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">GST Rate (All Items)</label>
            <select
              value={data.items?.[0]?.gstRate || 0}
              onChange={e => {
                const newRate = parseFloat(e.target.value) || 0;
                onChange({ ...data, items: data.items.map(item => ({ ...item, gstRate: newRate })) });
              }}
              className="w-full px-2 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            >
              <option value="0">0% (Exempt)</option>
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
          </div>

          <div className="h-px bg-slate-100 dark:bg-slate-800" />

          {/* Visibility toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Eye size={11} /> Toggle Visibility
            </label>
            <div className="flex flex-col gap-1 max-h-[200px] overflow-y-auto pr-1">
              {VISIBILITY_SECTIONS.map(section => (
                <button
                  key={section.id}
                  onClick={() => toggleVisibility(section.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                    isHidden(section.id)
                      ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                      : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400'
                  }`}
                >
                  <span>{section.label}</span>
                  {isHidden(section.id)
                    ? <EyeOff size={13} className="text-slate-400" />
                    : <Eye size={13} className="text-blue-500" />
                  }
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      ` }} />
    </div>
  );
};
