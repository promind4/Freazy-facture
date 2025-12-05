export interface Issuer {
    name: string;
    address: string;
    email?: string;
    phone?: string;
    siret: string;
    website?: string;
    vatNumber?: string;
    logo?: string;
}

export interface Client {
    name: string;
    address: string;
    email?: string;
    vatNumber?: string;
    siret?: string;
}

export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
}

export interface Invoice {
    id: string;
    number: string;
    date: string; // ISO Date
    dueDate?: string; // ISO Date
    issuer: Issuer;
    client: Client;
    items: LineItem[];
    currency: string;
    vatEnabled: boolean;
    vatRate: number;
    paymentInfo?: string;
    legalMentions?: string;
    color?: string;
    type: 'invoice' | 'quote' | 'proforma' | 'credit_note' | 'receipt';
    status?: 'draft' | 'sent' | 'paid' | 'late';
    language: 'fr' | 'en' | 'es' | 'it' | 'de' | 'pt';
    signature?: string;
    signatureScale?: number;
    // Visibility Flags
    showIssuerName?: boolean;
    showIssuerEmail?: boolean;
    showIssuerPhone?: boolean;
    showClientEmail?: boolean;
    showPaymentInfo?: boolean;
    showLegalMentions?: boolean;
    showDueDate?: boolean;
    notes?: string;
    paymentTerms?: number; // Days
    quantityLabel?: string;
    unitPriceLabel?: string;
    deliveryAddress?: string;
}

export const DEFAULT_VAT_RATE = 20;
export const DEFAULT_CURRENCY = "EUR";
