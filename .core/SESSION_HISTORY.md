# Session History

## Session 1: Initial Setup & Multi-Page Migration
**Date:** June 19, 2026

**Goals Achieved:**
1. Initialized the Next.js project with a single-page Invoice Generator.
2. Built the core form components and the live A4 preview panel.
3. Implemented robust CSS for perfect `window.print()` PDF generation without cutoffs.
4. Successfully migrated from a single-page app to a multi-page Dashboard web app (`/dashboard`, `invoice/[id]`).
5. Built a Template Engine with Modern, Classic, and Creative styles.
6. Completely redesigned the Landing Page (`/`) to match a clean aesthetic.
7. Created a context-aware global layout (`layout.tsx`).

---

## Session 2: Backend Architecture & Codebase Scrub
**Date:** June 21, 2026

**Goals Achieved:**
1. **Structural Refactor:** Safely separated the Next.js codebase into a dedicated `/frontend` folder and initialized a `/backend` folder.
2. **FastAPI Backend:** Built a high-performance Python FastAPI server running on port 8000 to handle future heavy computations.
3. **Database Migration:** Switched from a temporary SQLite fallback to a strict, production-ready PostgreSQL connection using SQLAlchemy and `psycopg2-binary`.
4. **Tool Experimentation (PDF-to-Word):** Temporarily built, tested, and subsequently removed a heavy PDF conversion feature (LayoutLMv3 AI, LibreOffice Headless, pdf2docx) per user request to maintain project agility.
5. **Codebase Cleanup:** Conducted a comprehensive sweep to delete all test artifacts (`uploads/`, `outputs/`, `__pycache__`, stale databases) ensuring a 100% clean repository.
6. **Git Initialization:** Created a custom `.gitignore`, committed the clean architecture, and successfully pushed the master branch to GitHub (`durozen-technologies/DuroFiles`).

---

## Session 3: Core Invoice Enhancements & Payment Integrations
**Date:** June 23, 2026

**Goals Achieved:**
1. **Settings Menu Expansion:** Added Toggle Visibility support for `UPI QR Code` and `Bank Details`.
2. **Template Expansion:** Integrated `UPI QR Code` and editable `Bank Details` components into all 7 invoice templates (Modern, Classic, Creative, Tech, GST Standard, Amazon, Instagram).
3. **Data Model Fix:** Fixed a TypeScript interface error by promoting `upiId` to the root `InvoiceData` payload structure.
4. **Layout Normalization:** Unified Flexbox and CSS Grid alignments across all invoice footers ensuring consistent padding and layout for the new components.
