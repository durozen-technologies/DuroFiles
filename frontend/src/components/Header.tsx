"use client";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Printer, ArrowLeft, RefreshCw } from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  const isEditor = pathname.startsWith('/invoice/');

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

  return (
    <header className="print-hidden" style={{ padding: '0 30px', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', borderBottom: '1px solid #eaeaea', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Left: Logo or Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => router.push('/')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="DuroFiles Logo" style={{ height: '125px' }} />
          </div>
        </div>

        {isEditor && (
          <>
            <div style={{ width: '1px', height: '24px', background: '#cbd5e1' }} />
            <button 
              onClick={() => router.push('/templates')}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          </>
        )}
      </div>

      {/* Center: Global Navigation */}
      {!isEditor && (
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center', fontWeight: 500, fontSize: '0.95rem', color: '#475569' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => router.push('/')}>Home</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => router.push('/templates')}>Templates</span>
        </nav>
      )}

      {/* Right: Auth / CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {isEditor && (
          <>
            <button 
              onClick={handleResetLayout} 
              style={{ background: 'none', color: '#64748b', border: '1px solid #cbd5e1', padding: '8px 16px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
            >
              <RefreshCw size={14} /> Reset Layout
            </button>
            <button 
              onClick={handleDownloadPDF} 
              className="btn"
              style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}
            >
              <Printer size={18} /> Download PDF
            </button>
          </>
        )}
      </div>
    </header>
  );
};
