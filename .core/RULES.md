# Rules & Best Practices

When contributing to this project, adhere to the following guidelines to maintain stability and aesthetic consistency.

## 1. Do Not Break Print Styling
The primary output of this application is a PDF. 
- **Rule:** Any new UI elements added to the `InvoicePreview` MUST be tested with `window.print()`.
- **Rule:** Use `.print-hidden` to hide buttons, inputs, or interactive elements that should not appear on the final PDF.
- **Rule:** Ensure elements inside `.a4-paper` do not exceed 210mm in width.

## 2. Framework Conventions
- **Rule:** Stick to the Next.js **App Router** (`src/app`). Do not use the legacy `pages` directory.
- **Rule:** Server-Side Rendering (SSR) is active by default. If your component uses browser APIs (`window`, `localStorage`, `FileReader`), it MUST have `"use client"` at the top.
- **Rule:** Do not attempt to access `localStorage` during the initial render phase. Use a mounted state (`isMounted`) and `useEffect` to hydrate data to prevent Next.js hydration mismatch errors.

## 3. Styling Guidelines
- **Rule:** Do not install Tailwind CSS or other utility-first frameworks. 
- **Rule:** Maintain the premium purple theme (`#6a48a9`) and the clean, modern aesthetic defined in `globals.css`.

## 4. File Structure
- **Rule:** All reusable UI pieces should go in `src/components/`.
- **Rule:** All type definitions must go in `src/types/`. Do not declare types inline inside component files unless they are component props.
