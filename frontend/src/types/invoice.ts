export interface LineItem {
  id: string;
  description: string;
  hsn: string;
  gstRate: number;
  quantity: number;
  rate: number;
  discount?: number;
}

export interface InvoiceData {
  id: string;
  templateId: 'modern' | 'classic' | 'creative' | 'tech' | 'gst_standard';
  invoiceNumber: string;
  date: string;
  dueDate: string;
  countryOfSupply: string;
  currency?: string;
  logoUrl?: string;
  billedBy: {
    name: string;
    address: string;
    gstin: string;
    pan: string;
    email: string;
    phone: string;
    website?: string;
  };
  billedTo: {
    name: string;
    address: string;
    gstin: string;
    pan: string;
    email?: string;
    phone?: string;
  };
  items: LineItem[];
  taxSettings?: {
    type: 'IGST' | 'CGST_SGST';
    inclusive: boolean;
  };
  paymentDetails: {
    bankName?: string;
    accountNumber?: string;
    ifsc?: string;
    upiId: string;
    paymentTerms?: string;
  };
  notes?: string;
  terms?: string;
  signatureUrl?: string;
  layoutPositions?: Record<string, { x: number; y: number }>;
}
