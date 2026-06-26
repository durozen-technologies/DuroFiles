"use client";
import { useState, useEffect, useRef } from 'react';

import { useRouter, useParams } from 'next/navigation';
import { SettingsToolbar } from '../../../components/SettingsToolbar';
import { InvoicePreview } from '../../../components/InvoicePreview';
import type { InvoiceData } from '../../../types/invoice';
import { getInvoice, saveInvoice } from '../../../utils/storage';
import { EditorProvider } from '../../../contexts/EditorContext';

function ScaleToFit({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | string>('auto');

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current || !contentRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const targetWidth = 794; // Target A4 width in pixels
      
      if (containerWidth < targetWidth) {
        const newScale = containerWidth / targetWidth;
        setScale(newScale);
        
        const a4Element = contentRef.current.querySelector('.a4-paper') as HTMLElement;
        const actualHeight = a4Element ? a4Element.offsetHeight : contentRef.current.offsetHeight;
        setHeight(actualHeight * newScale);
      } else {
        setScale(1);
        setHeight('auto');
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const a4Element = contentRef.current?.querySelector('.a4-paper');
    if (a4Element) {
      resizeObserver.observe(a4Element);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div 
      ref={containerRef} 
      className="scale-to-fit-container"
      style={{ 
        width: '100%', 
        height: height, 
        overflow: 'hidden', 
        position: 'relative',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div 
        ref={contentRef} 
        className="scale-to-fit-content"
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          width: '794px',
          flexShrink: 0
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function InvoiceEditor() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const inv = await getInvoice(id);
      if (inv) {
        setData(inv);
      } else {
        router.push('/');
      }
    };
    loadData();
  }, [id, router]);

  useEffect(() => {
    const handleReset = () => {
      setData(prev => prev ? { ...prev, layoutPositions: {} } : null);
    };
    window.addEventListener('reset-layout', handleReset);
    return () => window.removeEventListener('reset-layout', handleReset as EventListener);
  }, []);

  useEffect(() => {
    if (data) {
      saveInvoice(data);
    }
  }, [data]);

  if (!data) return null;

  return (
    <EditorProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--editor-bg)' }}>
        <SettingsToolbar data={data} onChange={setData} />
        {/* Dot-grid canvas background */}
        <div
          className="preview-container"
          style={{
            flex: 1,
            padding: '32px 16px',
            backgroundImage:
              'radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        >
          <ScaleToFit>
            <InvoicePreview data={data} onChange={setData} />
          </ScaleToFit>
        </div>
      </div>
    </EditorProvider>
  );
}
