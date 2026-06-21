# DuroFiles (InvoiceWebApp) Architecture

## High-Level Overview
DuroFiles is a client-side Next.js web application designed to generate, manage, and export professional PDF invoices. It uses React state for real-time previewing and relies on browser `localStorage` for data persistence, ensuring maximum privacy and eliminating the need for a backend database.

## Directory Structure
```
src/
├── app/
│   ├── layout.tsx         # Global layout (Header, Footer, CSS imports)
│   ├── page.tsx           # Landing Page (iLovePDF-style design)
│   ├── dashboard/page.tsx # Invoice Management Dashboard
│   ├── invoice/[id]/page.tsx # Dynamic Route for the Invoice Editor
│   └── globals.css        # Global styles and A4 Print specifics
├── components/
│   ├── Header.tsx         # Context-aware global navigation bar
│   ├── Footer.tsx         # Global footer
│   ├── InvoiceForm.tsx    # Left-side editor controls
│   ├── InvoicePreview.tsx # Right-side live preview wrapper
│   └── templates/         # Individual design templates
│       ├── TemplateModern.tsx
│       ├── TemplateClassic.tsx
│       └── TemplateCreative.tsx
├── types/
│   └── invoice.ts         # TypeScript interfaces
└── utils/
    └── storage.ts         # localStorage CRUD operations
```

## Key Architectural Decisions

1. **Client-Side Rendering (CSR):**
   The entire application heavily relies on `"use client"` directives since it manipulates browser state, handles window printing, and accesses `localStorage`. 

2. **Template Engine Pattern:**
   The `InvoicePreview.tsx` acts as a wrapper/router. It reads `data.templateId` and dynamically renders `TemplateModern`, `TemplateClassic`, or `TemplateCreative`. This allows for limitless future designs without cluttering a single file.

3. **Print-to-PDF CSS:**
   PDF generation is handled natively via the browser's `window.print()` API. This is powered by strict CSS `@media print` rules in `globals.css`. Elements with the `.print-hidden` class (like the sidebar, navbar, and buttons) are stripped away, and the `.a4-paper` class is forced to scale perfectly to the physical boundaries of an A4 sheet.

4. **Context-Aware Global Layout:**
   `layout.tsx` wraps the entire app in a flexbox container with a global `<Header />` and `<Footer />`. The `Header` uses `next/navigation` (`usePathname()`) to conditionally display links based on whether the user is on the Landing Page, Dashboard, or inside the Editor.
