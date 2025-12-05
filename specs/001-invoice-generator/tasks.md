# Implementation Tasks: Freelance Invoice Generator

**Feature**: `001-invoice-generator`
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)

## Dependencies

- **Phase 1 (Setup)**: Blocks all other phases
- **Phase 2 (Foundation)**: Blocks all user stories
- **Phase 3 (US1)**: Independent
- **Phase 4 (US2)**: Depends on US1 (builds on form/preview)
- **Phase 5 (US3)**: Depends on US1 (adds VAT logic)
- **Phase 6 (Polish)**: Depends on all previous phases

## Parallel Execution Examples

- **US1**: `T008` (InvoiceForm) and `T009` (InvoicePreview) can be built in parallel once `T007` (Types) is done.
- **US2**: `T013` (Real-time sync) and `T014` (PDF Layout update) can be parallelized.

## Implementation Strategy

We will follow a "Walking Skeleton" approach:
1.  **Setup**: Initialize project and tools.
2.  **Foundation**: Create shared types and layout.
3.  **US1 (MVP)**: Build the core form and PDF generation to allow downloading a basic invoice.
4.  **US2 (UX)**: Refine the real-time preview and split-screen interaction.
5.  **US3 (Compliance)**: Add VAT logic and toggle.
6.  **Polish**: Final cleanups.

---

## Phase 1: Setup
**Goal**: Initialize the project structure and install dependencies.

- [x] T001 Initialize Vite project with React and TypeScript in root `.`
- [x] T002 Install dependencies: `@react-pdf/renderer`, `lucide-react`, `react-hook-form`, `zod`, `@hookform/resolvers`
- [x] T003 Install dev dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `vitest`
- [x] T004 Initialize Tailwind CSS configuration in `tailwind.config.js` and `src/index.css`
- [x] T005 [P] Setup shadcn/ui CLI and initialize base components (Button, Input, Label, Card, Switch) in `src/components/ui/`

## Phase 2: Foundation
**Goal**: Establish core data structures and application layout.

- [x] T006 Create application layout shell in `src/App.tsx` and `src/components/layout/SplitScreen.tsx`
- [x] T007 Define core TypeScript interfaces (Invoice, Issuer, Client, LineItem) in `src/lib/types.ts` based on data-model.md
- [x] T008 Implement `useLocalStorage` hook in `src/hooks/use-local-storage.ts` for persisting Issuer profile

## Phase 3: User Story 1 - Instant Invoice Generation (MVP)
**Goal**: User can fill a form and download a valid PDF.
**Independent Test**: Fill form -> Click Download -> Verify PDF content.

- [x] T009 [US1] Create `InvoiceForm` component skeleton in `src/components/invoice/InvoiceForm.tsx` using react-hook-form
- [x] T010 [US1] Implement `PDFDocument` component in `src/components/invoice/PDFDocument.tsx` using @react-pdf/renderer
- [x] T011 [US1] Connect Form to PDF generation: Pass form data to `PDFDownloadLink` in `src/components/invoice/InvoiceForm.tsx`
- [x] T012 [US1] Add "Download PDF" button to trigger generation in `src/components/invoice/InvoiceForm.tsx`

## Phase 4: User Story 2 - Real-time Preview
**Goal**: PDF preview updates instantly as user types.
**Independent Test**: Type in form -> Verify Preview pane updates immediately.

- [x] T013 [US2] Implement `InvoicePreview` component in `src/components/invoice/InvoicePreview.tsx` using `PDFViewer` or `BlobProvider` from @react-pdf/renderer
- [x] T014 [US2] Integrate `InvoicePreview` into the right pane of `SplitScreen.tsx`
- [x] T015 [US2] Optimize re-rendering: Ensure typing in form updates preview state efficiently in `src/App.tsx` (or context)

## Phase 5: User Story 3 - VAT & Compliance
**Goal**: Support VAT toggling and auto-entrepreneur status.
**Independent Test**: Toggle VAT -> Verify calculations and legal mentions in PDF.

- [x] T016 [US3] Add VAT toggle and Rate input to `InvoiceForm.tsx`
- [x] T017 [US3] Implement VAT calculations (subtotal, vatAmount, total) in `src/lib/utils.ts` or within component logic
- [x] T018 [US3] Update `PDFDocument.tsx` to conditionally render VAT columns and legal mentions ("TVA non applicable...") based on state

## Phase 6: Polish & Cross-Cutting
**Goal**: Final UI touches and edge cases.

- [x] T019 Style the PDF to look professional (fonts, spacing, alignment) in `src/components/invoice/PDFDocument.tsx`
- [x] T020 Ensure responsive layout (stack form/preview on mobile) in `src/components/layout/SplitScreen.tsx`
- [x] T021 [Polish] Add placeholder for affiliation link (e.g., "Freelance stack" recommendations) in the export success view (or bottom of form)
- [x] T022 [Polish] Verify LocalStorage persistence for issuer data across reloads

## Phase 7: V1 Upgrade (Polished Product)
**Goal**: Add essential features for a real-world freelance invoice.

- [ ] T023 [V1] Update `Invoice` type in `src/lib/types.ts` (logo, paymentInfo, dates, legalMentions, color)
- [ ] T024 [V1] Implement Dynamic Line Items in `InvoiceForm.tsx` using `useFieldArray`
- [ ] T025 [V1] Add Logo Upload (Base64 conversion) to `InvoiceForm.tsx`
- [ ] T026 [V1] Add Payment Info, Dates, and Legal Mentions inputs to `InvoiceForm.tsx`
- [ ] T027 [V1] Add Color Picker to `InvoiceForm.tsx`
- [ ] T028 [V1] Refactor `InvoiceForm.tsx` layout (Cards/Accordions)
- [ ] T029 [V1] Update `PDFDocument.tsx` to render new fields (Logo, Payment, Dates, Legal) and apply color
- [ ] T030 [V1] Verify "VAT Exempt" logic (hide column, append legal text)
