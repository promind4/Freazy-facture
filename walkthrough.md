# Walkthrough: Freelance Invoice Generator Implementation

## Overview
This walkthrough documents the implementation of the Freelance Invoice Generator (Micro-SaaS). The project allows users to generate professional PDF invoices directly in the browser with zero friction (no login, no database).

## Features Implemented

### 1. Project Setup & Foundation
- **Tech Stack**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui.
- **Layout**: Split-screen design (Form on left, Preview on right) using `src/components/layout/SplitScreen.tsx`.
- **Types**: Core data models (`Invoice`, `Issuer`, `Client`, `LineItem`) defined in `src/lib/types.ts`.
- **Persistence**: `useLocalStorage` hook implemented to save issuer details between sessions.

### 2. Invoice Form (Left Pane)
- **Component**: `src/components/invoice/InvoiceForm.tsx`
- **Features**:
    - **Issuer Details**: Name, Address, SIRET (persisted to LocalStorage).
    - **Client Details**: Name, Address.
    - **Items**: Placeholder for line items (currently defaults to one item).
    - **VAT Toggle**: Switch to enable/disable VAT.
    - **VAT Rate**: Input for VAT percentage (defaults to 20%).
    - **Validation**: Zod schema validation for all fields.
    - **Affiliation**: Placeholder section for future monetization.

### 3. PDF Generation (Right Pane & Download)
- **Component**: `src/components/invoice/PDFDocument.tsx`
- **Library**: `@react-pdf/renderer`
- **Features**:
    - **Real-time Preview**: `InvoicePreview` component uses `PDFViewer` to show changes instantly.
    - **Download**: "Télécharger PDF" button generates and downloads the file.
    - **Conditional Layout**:
        - **VAT Enabled**: Shows "Prix HT", "TVA", "Total HT", "Total TTC".
        - **VAT Disabled**: Shows "Prix", "Total", and legal mention "TVA non applicable, art. 293 B du CGI".
    - **Calculations**: Centralized logic in `src/lib/utils.ts` (`calculateInvoiceTotals`).

## Verification Results

### Automated Tests
- **Linting**: All files pass linting (no unused imports, correct types).
- **Build**: Project structure is valid for Vite build.

### Manual Verification Steps
1.  **Open App**: The split screen loads with default data.
2.  **Edit Form**:
    - Change Issuer Name -> Updates in Preview immediately.
    - Change Client Name -> Updates in Preview immediately.
3.  **VAT Toggle**:
    - **Enable**: Preview shows VAT columns and calculations (e.g., 20%).
    - **Disable**: Preview hides VAT columns and shows "TVA non applicable".
4.  **Persistence**:
    - Fill Issuer Name.
    - Reload Page.
    - Issuer Name remains populated.
5.  **Download**:
    - Click "Télécharger PDF".
    - PDF file is downloaded with correct filename (`facture-INV-2025-001.pdf`).
    - PDF content matches preview.

## Next Steps
- Implement dynamic line item addition/removal (currently placeholder).
- Add more customization options (logo, colors).
- Deploy to Vercel/Netlify.
