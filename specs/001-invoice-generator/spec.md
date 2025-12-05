# Feature Specification: Freelance Invoice Generator (Micro-SaaS)

**Feature Branch**: `001-invoice-generator`
**Created**: 2025-11-28
**Status**: Draft
**Input**: User description: "Création d'un Générateur de Facture Freelance (Projet Micro-SaaS)..."

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
-->

### User Story 1 - Instant Invoice Generation (Priority: P1)

As a freelance user, I want to generate a professional PDF invoice immediately upon visiting the site, without creating an account, so that I can get paid quickly with zero friction.

**Why this priority**: This is the core value proposition ("Zero Friction").

**Independent Test**: Can be tested by visiting the page, filling out the form, and clicking "Download PDF".

**Acceptance Scenarios**:

1.  **Given** I am on the homepage, **When** I fill in the invoice details (issuer, client, items), **Then** the PDF preview on the right should update in real-time.
2.  **Given** I have completed the form, **When** I click "Download", **Then** a valid, vector-based PDF file should be downloaded to my device.
3.  **Given** I am a returning user, **When** I revisit the site, **Then** my issuer details (Name, SIRET, Address) should be pre-filled from LocalStorage.

---

### User Story 2 - Real-time Preview & Split Interface (Priority: P1)

As a user, I want to see exactly what my invoice looks like while I am typing, so that I can correct mistakes immediately and feel confident in the result.

**Why this priority**: Essential for the "Zero Friction" UX.

**Independent Test**: Verify that keystrokes in the form immediately reflect in the PDF preview pane.

**Acceptance Scenarios**:

1.  **Given** the split-screen layout, **When** I type in the "Client Name" field on the left, **Then** the "Client Name" text in the PDF preview on the right should update instantly.
2.  **Given** I add a new line item, **When** I enter the price, **Then** the subtotal and total in the preview should recalculate and update immediately.

---

### User Story 3 - VAT & Legal Compliance (Priority: P2)

As a freelancer (potentially auto-entrepreneur), I need to be able to toggle VAT on or off, so that my invoice is legally compliant with my tax status.

**Why this priority**: Critical for legal validity of the generated documents.

**Independent Test**: Toggle VAT option and verify calculations and labels in the PDF.

**Acceptance Scenarios**:

1.  **Given** I am an auto-entrepreneur, **When** I select "TVA non applicable", **Then** the VAT column should disappear or show 0%, and the legal mention "TVA non applicable, art. 293 B du CGI" (or similar) should appear.
2.  **Given** I charge VAT, **When** I enable VAT and set the rate (e.g., 20%), **Then** the tax amount should be calculated correctly and added to the total.

---

### Edge Cases

- **LocalStorage cleared**: If the user clears their browser cache, the form should reset to empty state without errors.
- **Large text inputs**: If a user enters a very long description, the PDF layout should handle wrapping correctly without breaking the design.
- **Mobile view**: On small screens, the split view might need to stack (Form top, Preview bottom or hidden behind a tab), but the core functionality must remain accessible.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a split-screen interface (Form Left, Preview Right).
- **FR-002**: System MUST generate PDFs entirely client-side using `@react-pdf/renderer`.
- **FR-003**: System MUST NOT use `jspdf` or `html2canvas` (PDF must have selectable text).
- **FR-004**: System MUST persist issuer details (Name, Address, SIRET) to `LocalStorage` automatically.
- **FR-005**: System MUST calculate subtotals, VAT amounts, and grand totals automatically.
- **FR-006**: System MUST provide a toggle for VAT (Enabled/Disabled) and a configurable percentage field.
- **FR-007**: System MUST include a placeholder area in the "Success" view (post-download) for future affiliation links.
- **FR-008**: System MUST be built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui.

### Key Entities

- **Invoice**: The core document containing Issuer, Client, Line Items, and Totals.
- **Issuer**: The user generating the invoice (persisted locally).
- **Line Item**: Description, Quantity, Unit Price, Total.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can generate and download a valid PDF invoice in under 30 seconds.
- **SC-002**: PDF generation is instant (real-time preview updates < 100ms).
- **SC-003**: 100% of generated PDFs have selectable text (vector-based).
- **SC-004**: Issuer details are successfully restored from LocalStorage on page reload.
