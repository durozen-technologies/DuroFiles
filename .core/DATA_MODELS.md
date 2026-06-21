# DuroFiles (InvoiceWebApp) Data Models

## Core Data Structures

The application relies on a strictly typed `InvoiceData` structure to ensure the form and preview stay perfectly synced. Data is persisted in the browser via `localStorage`.

### `InvoiceData` Interface
Located in `src/types/invoice.ts`.

```typescript
export interface InvoiceData {
  id: string; // Unique UUID for dashboard tracking
  templateId: 'modern' | 'classic' | 'creative'; // Controls which template renders the invoice
  invoiceNumber: string;
  date: string;
  dueDate: string;
  countryOfSupply?: string;
  logoUrl?: string;
  billedBy: {
    name: string;
    address: string;
    gstin: string;
    pan: string;
    phone: string;
    email: string;
  };
  billedTo: {
    name: string;
    address: string;
    gstin: string;
    pan: string;
  };
  items: LineItem[];
  upiId?: string; // Used to generate the payment QR code
}
```

### `LineItem` Interface
Represents a single row in the invoice table.

```typescript
export interface LineItem {
  id: string;
  description: string;
  hsn: string;
  gstRate: number; // Percentage (e.g., 18)
  quantity: number;
  rate: number;
}
```

## Local Storage Persistence
Data is saved under the `invoices_db` key in `localStorage` as an array of `InvoiceData` objects. 
Helper functions are located in `src/utils/storage.ts`:
- `getAllInvoices()`: Returns `InvoiceData[]`
- `getInvoice(id)`: Returns specific `InvoiceData`
- `saveInvoice(data)`: Upserts an invoice.
- `deleteInvoice(id)`: Removes an invoice from storage.
