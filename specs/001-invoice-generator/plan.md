# Implementation Plan: Freelance Invoice Generator

**Branch**: `001-invoice-generator` | **Date**: 2025-11-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-invoice-generator/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build a client-side only Freelance Invoice Generator using React, Vite, and @react-pdf/renderer. The app will feature a split-screen interface with real-time PDF preview, persist user data via LocalStorage, and support VAT toggling. The goal is "Zero Friction" invoice generation.

## Technical Context

**Language/Version**: TypeScript 5.x
**Primary Dependencies**: 
- React 18+
- Vite 5+
- @react-pdf/renderer (PDF generation)
- Tailwind CSS (Styling)
- shadcn/ui (UI Components)
- react-hook-form (Form management)
- zod (Validation)
- lucide-react (Icons)
**Storage**: LocalStorage (Browser)
**Testing**: Vitest (Unit/Integration)
**Target Platform**: Modern Web Browsers
**Project Type**: Single Page Application (SPA)
**Performance Goals**: Instant preview updates (<100ms), fast load time
**Constraints**: No backend, client-side only, strict privacy (data stays in browser)
**Scale/Scope**: Single page, focused functionality

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Core Principles**: N/A (Template constitution)
- **Gates**: None defined in current constitution.

## Project Structure

### Documentation (this feature)

```text
specs/001-invoice-generator/
├── plan.md              # This file
├── research.md          # Tech stack confirmation
├── data-model.md        # Internal data structures
├── quickstart.md        # Dev setup guide
├── contracts/           # N/A (No backend API)
└── tasks.md             # Implementation tasks
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── invoice/         # Feature specific components
│   │   ├── InvoiceForm.tsx
│   │   ├── InvoicePreview.tsx
│   │   └── PDFDocument.tsx
│   └── layout/
│       └── SplitScreen.tsx
├── lib/
│   ├── utils.ts
│   ├── types.ts         # Invoice, Issuer, Client types
│   └── constants.ts     # Default values, VAT rates
├── hooks/
│   └── use-local-storage.ts
├── App.tsx
└── main.tsx
```

**Structure Decision**: Standard React + Vite structure with feature-based component organization.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | | |
