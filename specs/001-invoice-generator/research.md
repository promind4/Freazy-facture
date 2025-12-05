# Research: Freelance Invoice Generator

**Feature**: [spec.md](./spec.md)
**Status**: Complete

## Decisions

### PDF Generation Engine
- **Decision**: `@react-pdf/renderer`
- **Rationale**: Explicitly requested by user. Provides true vector-based PDFs (selectable text), React component API for building PDFs, and works client-side.
- **Alternatives Considered**: 
  - `jspdf` / `html2canvas`: Rejected (explicitly forbidden by user, produces images/rasterized text, lower quality).

### UI Framework
- **Decision**: React + Vite + Tailwind CSS + shadcn/ui
- **Rationale**: Explicitly requested. Modern, fast, type-safe, and component-based. shadcn/ui provides accessible, high-quality components out of the box.

### State Management & Persistence
- **Decision**: React State + LocalStorage
- **Rationale**: Simple requirement ("Zero Friction"). No backend needed. `react-hook-form` will handle form state, and a custom hook will sync specific fields (Issuer details) to LocalStorage.

## Unknowns & Clarifications

All technical choices were mandated by the user requirements. No significant unknowns remain.
