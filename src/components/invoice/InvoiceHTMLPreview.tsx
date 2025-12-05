import { type Invoice } from "@/lib/types";
import { format, type Locale } from "date-fns";
import { fr, enUS, es, it, de, pt } from "date-fns/locale";
import { i18n, type Language } from "@/lib/i18n";
import { roundTo2Decimals } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/animated-number";

const currencySymbols: Record<string, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£"
};

const locales: Record<string, Locale> = {
    fr, en: enUS, es, it, de, pt
};

interface InvoiceHTMLPreviewProps {
    invoice: Invoice;
}

export function InvoiceHTMLPreview({ invoice }: InvoiceHTMLPreviewProps) {
    // Calculate with proper rounding at each step
    const lineItemTotals = invoice.items.map(item =>
        roundTo2Decimals(item.quantity * item.unitPrice)
    );
    const subtotal = roundTo2Decimals(
        lineItemTotals.reduce((acc, lineTotal) => acc + lineTotal, 0)
    );
    const vatAmount = invoice.vatEnabled
        ? roundTo2Decimals(subtotal * (invoice.vatRate / 100))
        : 0;
    const total = roundTo2Decimals(subtotal + vatAmount);

    const lang = (invoice.language || 'fr') as Language;
    const t = i18n[lang];
    const currencySymbol = currencySymbols[invoice.currency] || invoice.currency || "€";
    const dateLocale = locales[lang] || fr;

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        try {
            return format(new Date(dateString), "dd MMM yyyy", { locale: dateLocale });
        } catch {
            return dateString;
        }
    };

    const formatCurrency = (amount: number) => {
        return `${amount.toFixed(2)} ${currencySymbol}`;
    };

    const getLabels = (type: Invoice['type'], language: Language) => {
        const defaults = i18n[language];

        switch (type) {
            case 'quote':
                return {
                    ...defaults,
                    billedTo: defaults.quoteBilledTo as string,
                    dueDate: defaults.quoteValidity as string,
                    totalDue: defaults.quoteTotal as string,
                };
            case 'credit_note':
                return {
                    ...defaults,
                    number: defaults.creditNoteNumber as string,
                    totalDue: defaults.creditAmount as string,
                };
            case 'receipt':
                return {
                    ...defaults,
                    billedTo: defaults.receivedFrom as string,
                    dueDate: defaults.paymentDate as string,
                    totalDue: defaults.amountPaid as string,
                };
            default:
                return defaults;
        }
    };

    const labels = getLabels(invoice.type, lang);

    const getTitle = (type: Invoice['type']) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (i18n[lang].invoiceType as any)[type] || i18n[lang].invoiceType.invoice;
    };

    return (
        <div className="w-full bg-white p-8 shadow-lg text-sm min-h-[297mm] flex flex-col" id="invoice-preview">
            <div className="flex-1">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        {invoice.issuer.logo && (
                            <div className="mb-4">
                                <img
                                    src={invoice.issuer.logo}
                                    alt="Logo"
                                    className="h-20 w-auto object-contain"
                                />
                            </div>
                        )}
                        <div className="text-gray-600">
                            {invoice.showIssuerName !== false && (
                                <h2 className="font-bold text-gray-900 text-lg mb-1">{invoice.issuer.name || t.demoIssuerName}</h2>
                            )}
                            <p className="whitespace-pre-wrap">{invoice.issuer.address || t.demoIssuerAddress}</p>
                            {invoice.showIssuerEmail !== false && (
                                <p>{invoice.issuer.email || t.demoIssuerEmail}</p>
                            )}
                            {invoice.showIssuerPhone !== false && (
                                <p>{invoice.issuer.phone || t.demoIssuerPhone}</p>
                            )}
                            <p>SIRET: {invoice.issuer.siret || t.demoIssuerSiret}</p>
                            {invoice.issuer.vatNumber && <p>{t.vatNumber}: {invoice.issuer.vatNumber}</p>}
                        </div>
                    </div>
                    <div className="text-right">
                        <h1 className={`text-3xl font-bold mb-2`} style={{ color: invoice.color }}>
                            {getTitle(invoice.type)}
                        </h1>
                        <p className="text-gray-600 font-medium">
                            {invoice.type === 'credit_note' ? (lang === 'fr' ? "Avoir N°" : "Credit Note No") : "N°"} {invoice.number}
                        </p>
                        <p>{labels.date as string}: {formatDate(invoice.date)}</p>
                        {invoice.showDueDate !== false && invoice.dueDate && (
                            <p>{labels.dueDate as string}: {formatDate(invoice.dueDate)}</p>
                        )}
                    </div>
                </div>

                {/* Client */}
                <div className="mt-3 mb-8 p-3 bg-gray-50 rounded">
                    <div className="flex justify-between items-start gap-8">
                        <div className="flex-1">
                            <h3 className="text-gray-500 uppercase tracking-wider text-xs font-semibold mb-2">{labels.billedTo as string}</h3>
                            <div className="text-gray-900">
                                <p className="font-bold text-lg">{invoice.client.name || t.demoClientName}</p>
                                <p className="whitespace-pre-wrap">{invoice.client.address || t.demoClientAddress}</p>
                                {(invoice.showClientEmail !== false) && (invoice.client.email || t.demoClientEmail) && <p>{invoice.client.email || t.demoClientEmail}</p>}
                                {invoice.client.siret && <p>SIRET: {invoice.client.siret}</p>}
                                {invoice.client.vatNumber && <p>{t.vatNumber}: {invoice.client.vatNumber}</p>}
                            </div>
                        </div>
                        {invoice.deliveryAddress && (
                            <div className="flex-1 border-l border-gray-200 pl-8">
                                <h3 className="text-gray-500 uppercase tracking-wider text-xs font-semibold mb-2">{t.deliveryAddress}</h3>
                                <p className="whitespace-pre-wrap text-gray-900">{invoice.deliveryAddress}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Items */}
                <table className="w-full mb-8">
                    <thead>
                        <tr className="border-b-2 border-gray-100">
                            <th className="text-left py-3 font-semibold text-gray-600">{t.description}</th>
                            <th className="text-right py-3 font-semibold text-gray-600 w-24">{invoice.quantityLabel}</th>
                            <th className="text-right py-3 font-semibold text-gray-600 w-32">{invoice.unitPriceLabel}</th>
                            <th className="text-right py-3 font-semibold text-gray-600 w-32">{t.total}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {invoice.items.map((item) => (
                            <tr key={item.id}>
                                <td className="py-3 text-gray-900">{item.description}</td>
                                <td className="text-right py-3 text-gray-600">{item.quantity}</td>
                                <td className="text-right py-3 text-gray-600">{formatCurrency(item.unitPrice)}</td>
                                <td className="text-right py-3 font-medium text-gray-900">
                                    {formatCurrency(item.quantity * item.unitPrice)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-12">
                    <div className="w-64 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>{t.subtotal}</span>
                            <span className="font-medium text-gray-900">
                                <AnimatedNumber
                                    value={subtotal}
                                    currency
                                    locale={lang === 'en' ? 'en-US' : 'fr-FR'}
                                    currencyCode={invoice.currency}
                                />
                            </span>
                        </div>
                        {invoice.vatEnabled && (
                            <div className="flex justify-between text-gray-600">
                                <span>{t.vat} ({invoice.vatRate}%)</span>
                                <span className="font-medium text-gray-900">
                                    <AnimatedNumber
                                        value={vatAmount}
                                        currency
                                        locale={lang === 'en' ? 'en-US' : 'fr-FR'}
                                        currencyCode={invoice.currency}
                                    />
                                </span>
                            </div>
                        )}
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-2 bg-gray-50 p-2 rounded -mx-2">
                            <span className="font-bold text-gray-900 text-lg">{t.total}</span>
                            <span className="font-bold text-gray-900 text-xl" style={{ color: invoice.color }}>
                                <AnimatedNumber
                                    value={total}
                                    currency
                                    locale={lang === 'en' ? 'en-US' : 'fr-FR'}
                                    currencyCode={invoice.currency}
                                />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Signature */}
                {invoice.signature && (
                    <div className="mt-8 flex justify-end">
                        <div className="w-64 flex flex-col items-center">
                            <p className="text-xs text-gray-400 mb-2">{t.signature}</p>
                            <img
                                src={invoice.signature}
                                alt="Signature"
                                style={{
                                    height: 60 * (invoice.signatureScale ? invoice.signatureScale / 100 : 1),
                                    width: 'auto'
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 pt-8 text-xs text-gray-900 mt-auto">
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Column: Payment Info */}
                    <div>
                        {invoice.showPaymentInfo !== false && (
                            <div className="mb-4">
                                <h4 className="font-bold text-black mb-1">{t.paymentInfo}</h4>
                                <p className="whitespace-pre-wrap">{invoice.paymentInfo || t.demoPaymentInfo}</p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Legal Mentions */}
                    <div className="text-right">
                        {invoice.showLegalMentions !== false && (
                            <div>
                                <h4 className="font-bold text-black mb-1">{t.legalMentions}</h4>
                                <p className="whitespace-pre-wrap">{invoice.legalMentions || t.demoLegalMentions}</p>
                                <p className="mt-2 italic">{t.noDiscount}</p>
                                {!invoice.vatEnabled && (
                                    <p className="mt-2 font-bold">{t.vatNotApplicable}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
