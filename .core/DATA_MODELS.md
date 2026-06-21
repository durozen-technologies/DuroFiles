# DuroFiles Data Models

## Frontend Data Structures (Local Storage)

The frontend application relies on a strictly typed `InvoiceData` structure persisted in the browser via `localStorage`.

### `InvoiceData` Interface
Located in `frontend/src/types/invoice.ts`.

```typescript
export interface InvoiceData {
  id: string; // Unique UUID for dashboard tracking
  templateId: 'modern' | 'classic' | 'creative'; 
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

## Backend Database Schema (PostgreSQL)

The backend utilizes SQLAlchemy ORM models connected to a PostgreSQL database to manage persistent storage across sessions.

### Current Models
Located in `backend/models.py`.

*(Currently initialized with a blank slate `Base` schema, ready for future data models like Users, Remote Invoices, or heavy computation job tracking).*

```python
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

# Add your database models here
```
