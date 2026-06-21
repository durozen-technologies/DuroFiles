# DuroFiles Future TODOs

## Completed
- [x] Next.js App Router initialization
- [x] Real-time A4 PDF Preview & Print-to-PDF CSS rules
- [x] Multi-page routing (`/dashboard`, `/invoice/[id]`)
- [x] Local Storage integration for saving multiple invoices
- [x] Multi-template Engine (Modern, Classic, Creative)
- [x] Structural Refactor: Split into `/frontend` and `/backend`
- [x] Setup FastAPI Backend & PostgreSQL SQLAlchemy Database
- [x] Push codebase to remote GitHub repository

## Future Enhancements
- [ ] **Remote Invoice Storage:** Migrate invoice data storage from browser `localStorage` to the PostgreSQL backend to allow multi-device sync and user accounts.
- [ ] **Send via Email:** Add a backend API endpoint to generate the PDF server-side and email it directly to the client from the dashboard.
- [ ] **Currency Selector:** Add a dropdown in the `General Info` section to switch the default currency symbol from `₹` to `$`, `€`, `£`, etc.
- [ ] **Custom Tax Labels:** Allow users to rename "GST" to "VAT" or "Sales Tax" depending on their country's legal requirements.
