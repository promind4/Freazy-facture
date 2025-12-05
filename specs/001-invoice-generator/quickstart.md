# Quickstart: Freelance Invoice Generator

## Prerequisites

- Node.js 18+
- npm or pnpm

## Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Access the app at `http://localhost:5173`.

## Development Workflow

- **Components**: Located in `src/components`. Use `shadcn/ui` for base components.
- **Styling**: Tailwind CSS. Edit `src/index.css` for global styles.
- **PDF Template**: Edit `src/components/invoice/PDFDocument.tsx`. This component renders the PDF structure using `@react-pdf/renderer` primitives (`Document`, `Page`, `View`, `Text`).
- **State**: The main form state is in `src/components/invoice/InvoiceForm.tsx` (or a parent context).

## Building for Production

```bash
npm run build
```
Output will be in `dist/`.

## Key Commands

- `npm run dev`: Start dev server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint code
