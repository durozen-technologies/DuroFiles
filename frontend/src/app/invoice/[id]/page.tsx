"use client";
import { useState, useEffect } from 'react';

import { useRouter, useParams } from 'next/navigation';
import { InvoiceForm } from '../../../components/InvoiceForm';
import { InvoicePreview } from '../../../components/InvoicePreview';
import type { InvoiceData } from '../../../types/invoice';
import { getInvoice, saveInvoice } from '../../../utils/storage';

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
    if (data) {
      saveInvoice(data);
    }
  }, [data]);

  if (!data) return null;

  return (
    <div className="app-container" style={{ height: 'calc(100vh - 70px)' }}>
      <div className="sidebar print-hidden">
        <InvoiceForm data={data} onChange={setData} />
      </div>
      <div className="preview-container">
        <div style={{ position: 'relative', width: '210mm' }}>
          <InvoicePreview data={data} onChange={setData} />
        </div>
      </div>
    </div>
  );
}
