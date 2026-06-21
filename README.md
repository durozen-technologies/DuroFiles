# DuroFiles

DuroFiles is a comprehensive full-stack web application designed for generating, managing, and exporting professional PDF invoices. It features a modern, real-time A4 preview interface and a scalable architecture.

## 🏗️ Architecture

The project is split into two dedicated environments to ensure a clear separation of concerns:

- **/frontend** - A robust **Next.js** web application built with React, Tailwind CSS, and TypeScript. It utilizes Client-Side Rendering (CSR) and Browser `localStorage` to securely manage invoice data and handle native print-to-PDF generation.
- **/backend** - A high-performance **FastAPI (Python)** server connected to a **PostgreSQL** database via SQLAlchemy. This backend provides a scalable foundation for advanced file operations, user accounts, and remote data synchronization.

## 🚀 Getting Started

### 1. Start the Frontend
The frontend is a standard Next.js application.
```bash
cd frontend
npm install
npm run dev
```
Navigate to `http://localhost:3000` to access the application.

### 2. Start the Backend
The backend requires a local PostgreSQL server.
```bash
cd backend

# Create a virtual environment
python -m venv venv
.\venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt

# Configure your database
# Create a .env file in the backend/ directory with:
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/durofiles

# Run the FastAPI server
uvicorn main:app --port 8000
```
Navigate to `http://localhost:8000/docs` to view the API documentation.

## ✨ Features

- **Multi-Template Engine:** Instantly switch between Modern, Classic, and Creative invoice designs.
- **Real-Time A4 Preview:** See exactly what your PDF will look like before you export it.
- **Perfect PDF Generation:** Robust `@media print` CSS rules ensure your invoices are generated perfectly without any cutoffs or scrollbars.
- **Local Storage Persistence:** Create, edit, and manage multiple invoices from a unified dashboard safely in your browser.
- **Enterprise-Ready Backend:** A pristine FastAPI and PostgreSQL architecture ready for cloud deployment.
