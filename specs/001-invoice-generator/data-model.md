# Data Model: Freelance Invoice Generator

## Entities

### Invoice
The root object representing the document.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `id` | `string` | Unique ID (UUID or generated) | Required |
| `number` | `string` | Invoice number (e.g., 2023-001) | Required |
| `date` | `string` | Issue date (ISO 8601) | Required |
| `dueDate` | `string` | Payment due date (ISO 8601) | Optional |
| `issuer` | `Issuer` | The freelancer issuing the invoice | Required |
| `client` | `Client` | The client receiving the invoice | Required |
| `items` | `LineItem[]` | List of services/products | Min 1 item |
| `currency` | `string` | Currency code (e.g., EUR) | Default "EUR" |
| `vatEnabled` | `boolean` | Whether VAT is applicable | Required |
| `vatRate` | `number` | VAT percentage (e.g., 20) | Required if enabled |
| `notes` | `string` | Additional notes/terms | Optional |

### Issuer
The user (freelancer). **Persisted in LocalStorage.**

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `name` | `string` | Full name or Company name | Required |
| `address` | `string` | Physical address | Required |
| `email` | `string` | Contact email | Optional |
| `phone` | `string` | Contact phone | Optional |
| `siret` | `string` | SIRET number (France) | Required |
| `website` | `string` | Website URL | Optional |
| `logo` | `string` | Base64 image or URL | Optional |

### Client
The customer.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `name` | `string` | Client name | Required |
| `address` | `string` | Client address | Required |
| `email` | `string` | Client email | Optional |
| `vatNumber` | `string` | Intra-community VAT number | Optional |

### LineItem
A single row in the invoice.

| Field | Type | Description | Validation |
|-------|------|-------------|------------|
| `description` | `string` | Service/Product description | Required |
| `quantity` | `number` | Quantity/Hours | Min 0 |
| `unitPrice` | `number` | Price per unit | Min 0 |
| `total` | `number` | Calculated (qty * price) | Read-only |

## State Management

- **Form State**: Managed by `react-hook-form`.
- **Persistence**: `Issuer` object is saved to `localStorage` key `invoice_issuer_profile` on every change (debounced).
- **Calculations**: Derived state.
  - `subtotal` = sum(item.total)
  - `vatAmount` = subtotal * (vatRate / 100) [if enabled]
  - `total` = subtotal + vatAmount
