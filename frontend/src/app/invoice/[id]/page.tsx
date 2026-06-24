"use client";
import { useState, useEffect } from 'react';

import { useRouter, useParams } from 'next/navigation';
import { SettingsToolbar } from '../../../components/SettingsToolbar';
import { InvoicePreview } from '../../../components/InvoicePreview';
import type { InvoiceData } from '../../../types/invoice';
import { getInvoice, saveInvoice } from '../../../utils/storage';
import { EditorProvider } from '../../../contexts/EditorContext';

export default function InvoiceEditor() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const inv = getInvoice(id);
    if (inv) {
      setData(inv);
    } else {
      router.push('/');
    }
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
      <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <SettingsToolbar data={data} onChange={setData} />
        <div className="preview-container">
          <div style={{ position: 'relative', flexShrink: 0, maxWidth: '100%' }}>
            <InvoicePreview data={data} onChange={setData} />
          </div>
        </div>
      </div>
    </EditorProvider>
  );
}
