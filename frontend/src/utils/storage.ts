import type { InvoiceData } from '../types/invoice';

const STORAGE_KEY = 'invoices_db';


export const getAllInvoices = (): InvoiceData[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

export const getInvoice = (id: string): InvoiceData | undefined => {
  const invoices = getAllInvoices();
  return invoices.find(inv => inv.id === id);
};

export const saveInvoice = (invoice: InvoiceData): void => {
  if (typeof window === 'undefined') return;
  const invoices = getAllInvoices();
  const index = invoices.findIndex(inv => inv.id === invoice.id);
  
  if (index >= 0) {
    invoices[index] = invoice;
  } else {
    invoices.push(invoice);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
};

export const deleteInvoice = (id: string): void => {
  if (typeof window === 'undefined') return;
  const invoices = getAllInvoices();
  const filtered = invoices.filter(inv => inv.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
