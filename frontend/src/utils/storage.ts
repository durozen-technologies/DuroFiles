import type { InvoiceData } from '../types/invoice';
import localforage from 'localforage';

const STORAGE_KEY = 'invoices_db';

export const getAllInvoices = async (): Promise<InvoiceData[]> => {
  if (typeof window === 'undefined') return [];
  try {
    const data = await localforage.getItem<InvoiceData[]>(STORAGE_KEY);
    return data || [];
  } catch (e) {
    return [];
  }
};

export const getInvoice = async (id: string): Promise<InvoiceData | undefined> => {
  const invoices = await getAllInvoices();
  return invoices.find(inv => inv.id === id);
};

export const saveInvoice = async (invoice: InvoiceData): Promise<void> => {
  if (typeof window === 'undefined') return;
  const invoices = await getAllInvoices();
  const index = invoices.findIndex(inv => inv.id === invoice.id);
  
  if (index >= 0) {
    invoices[index] = invoice;
  } else {
    invoices.push(invoice);
  }
  
  await localforage.setItem(STORAGE_KEY, invoices);
};

export const deleteInvoice = async (id: string): Promise<void> => {
  if (typeof window === 'undefined') return;
  const invoices = await getAllInvoices();
  const filtered = invoices.filter(inv => inv.id !== id);
  await localforage.setItem(STORAGE_KEY, filtered);
};
