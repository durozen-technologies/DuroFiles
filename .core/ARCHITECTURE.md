# DuroFiles Architecture

## High-Level Overview
DuroFiles is a full-stack web application designed to generate, manage, and export professional PDF invoices, with a modular architecture prepared for future advanced file operations. It separates the frontend and backend into dedicated subdirectories.

The frontend is a client-side Next.js web application using React state for real-time previewing and relying on browser `localStorage` for invoice data persistence (ensuring privacy).

The backend is a high-performance Python FastAPI server connected to a PostgreSQL database, built to handle heavy processing tasks and persistent data models outside of the browser context.

## Directory Structure
```
DuroFiles/
├── frontend/              # Next.js Application
│   ├── src/
│   │   ├── app/           # Next.js App Router (Dashboard, Invoices)
│   │   ├── components/    # Reusable React components & Templates
│   │   ├── types/         # TypeScript interfaces
│   │   └── utils/         # localStorage CRUD operations
│   └── ...
├── backend/               # FastAPI Application
│   ├── main.py            # API entry point & Routing
│   ├── database.py        # PostgreSQL Connection Engine & Session
│   ├── models.py          # SQLAlchemy ORM Models
│   ├── .env               # Database credentials (PostgreSQL)
│   └── requirements.txt   # Python Dependencies
└── .core/                 # Project documentation and rules
```

## Key Architectural Decisions

1. **Strict Frontend/Backend Separation:**
   The project is split into `/frontend` (Node/React) and `/backend` (Python/FastAPI) to ensure clear separation of concerns, allowing the backend to scale independently and run computationally heavy Python libraries if needed.

2. **Client-Side Rendering (CSR) for Invoices:**
   The frontend invoice generator heavily relies on `"use client"` directives to manipulate browser state and handle window printing natively via strict `@media print` CSS rules.

3. **FastAPI & PostgreSQL Backend:**
   The backend uses FastAPI for rapid endpoint development and SQLAlchemy as an ORM connected to PostgreSQL (`psycopg2-binary`). The `.env` file enforces a strict PostgreSQL connection string, ensuring production-grade database capabilities.

4. **Template Engine Pattern:**
   `InvoicePreview.tsx` acts as a wrapper/router to dynamically render different design templates (`TemplateModern`, `TemplateClassic`, etc.) without cluttering the main component.
