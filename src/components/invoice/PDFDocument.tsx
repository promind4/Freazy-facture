import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";
import type { Invoice } from "@/lib/types";
import { format, type Locale } from "date-fns";
import { fr, enUS, es, it, de, pt } from "date-fns/locale";
import { i18n, type Language } from "@/lib/i18n";
import { roundTo2Decimals } from "@/lib/utils";

Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica.ttf' },
        { src: 'https://cdn.jsdelivr.net/npm/@canvas-fonts/helvetica@1.0.4/Helvetica-Bold.ttf', fontWeight: 'bold' }
    ]
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 24,
        fontFamily: 'Helvetica',
        fontSize: 10,
        color: "#333333",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    logoContainer: {
        width: 100,
        height: 50,
        marginBottom: 10,
    },
    logo: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    },
    issuerDetails: {
        flexDirection: "column",
        gap: 2,
    },
    invoiceMeta: {
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 2,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textTransform: "uppercase",
    },
    clientSection: {
        marginTop: 10,
        marginBottom: 20,
        padding: 12,
        backgroundColor: "#f9fafb",
        borderRadius: 4,
    },
    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#6b7280",
        marginBottom: 5,
        textTransform: "uppercase",
    },
    table: {
        flexDirection: "column",
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e7eb",
        paddingBottom: 4,
        marginBottom: 4,
        fontWeight: "bold",
        color: "#6b7280",
        fontSize: 9,
        textTransform: "uppercase",
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    colDesc: { flex: 3 },
    colQty: { flex: 1, textAlign: "center" },
    colPrice: { flex: 1, textAlign: "right" },
    colTotal: { flex: 1, textAlign: "right" },

    totalsSection: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    totalsContainer: {
        width: 200,
        gap: 5,
    },
    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 2,
    },
    totalRowFinal: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
        backgroundColor: "#f9fafb",
        borderRadius: 4,
        marginTop: 5,
        fontWeight: "bold",
        fontSize: 12,
    },
    footerContainer: {
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        fontSize: 8,
        color: "#6b7280",
    },
    bold: { fontWeight: "bold" },
});

const currencySymbols: Record<string, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£"
};

const locales: Record<string, Locale> = {
    fr, en: enUS, es, it, de, pt
};

interface PDFDocumentProps {
    invoice: Invoice;
}

export function PDFDocument({ invoice }: PDFDocumentProps) {
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
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        {invoice.issuer.logo ? (
                            <View style={styles.logoContainer}>
                                <Image src={invoice.issuer.logo} style={styles.logo} />
                            </View>
                        ) : null}
                        <View style={styles.issuerDetails}>
                            {invoice.showIssuerName !== false && (
                                <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 4 }}>
                                    {invoice.issuer.name || t.demoIssuerName}
                                </Text>
                            )}
                            <Text>{invoice.issuer.address || t.demoIssuerAddress}</Text>
                            {invoice.showIssuerEmail !== false && (
                                <Text>{invoice.issuer.email || t.demoIssuerEmail}</Text>
                            )}
                            {invoice.showIssuerPhone !== false && (
                                <Text>{invoice.issuer.phone || t.demoIssuerPhone}</Text>
                            )}
                            <Text>SIRET: {invoice.issuer.siret || t.demoIssuerSiret}</Text>
                            {invoice.issuer.vatNumber && <Text>{t.vatNumber}: {invoice.issuer.vatNumber}</Text>}
                        </View>
                    </View>
                    <View style={styles.invoiceMeta}>
                        <Text style={[styles.title, invoice.type === 'credit_note' ? { color: '#dc2626' } : { color: invoice.color || "#000000" }]}>
                            {getTitle(invoice.type)}
                        </Text>
                        <Text style={{ fontSize: 12 }}>{invoice.type === 'credit_note' ? (lang === 'fr' ? "Avoir N°" : "Credit Note No") : "N°"} {invoice.number}</Text>
                        <Text>{labels.date as string}: {formatDate(invoice.date)}</Text>
                        {invoice.showDueDate !== false && invoice.dueDate ? <Text>{labels.dueDate as string}: {formatDate(invoice.dueDate)}</Text> : null}
                    </View>
                </View>

                {/* Client */}
                <View style={styles.clientSection}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 20 }}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.sectionTitle, { marginBottom: 4 }]}>{labels.billedTo as string}</Text>
                            <View>
                                <Text style={[styles.bold, { fontSize: 12, marginBottom: 2 }]}>{invoice.client.name || t.demoClientName}</Text>
                                <Text style={{ marginBottom: 2 }}>{invoice.client.address || t.demoClientAddress}</Text>
                                {(invoice.showClientEmail !== false) && (invoice.client.email || t.demoClientEmail) && <Text style={{ marginBottom: 2 }}>{invoice.client.email || t.demoClientEmail}</Text>}
                                {invoice.client.siret && <Text style={{ marginBottom: 2 }}>SIRET: {invoice.client.siret}</Text>}
                                {invoice.client.vatNumber && <Text>{t.vatNumber}: {invoice.client.vatNumber}</Text>}
                            </View>
                        </View>
                        {invoice.deliveryAddress && (
                            <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: '#e5e7eb', paddingLeft: 20 }}>
                                <Text style={[styles.sectionTitle, { marginBottom: 4 }]}>{t.deliveryAddress}</Text>
                                <Text>{invoice.deliveryAddress}</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Items Table */}
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.colDesc}>{labels.description as string}</Text>
                        <Text style={styles.colQty}>{invoice.quantityLabel || labels.qty as string}</Text>
                        <Text style={styles.colPrice}>{invoice.unitPriceLabel || labels.unitPrice as string}</Text>
                        <Text style={styles.colTotal}>{labels.total as string}</Text>
                    </View>
                    {invoice.items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.colDesc}>{item.description}</Text>
                            <Text style={styles.colQty}>{item.quantity}</Text>
                            <Text style={styles.colPrice}>{item.unitPrice.toFixed(2)} {currencySymbol}</Text>
                            <Text style={styles.colTotal}>{(item.quantity * item.unitPrice).toFixed(2)} {currencySymbol}</Text>
                        </View>
                    ))}
                </View>

                {/* Footer Group - Kept together */}
                <View wrap={false}>
                    {/* Totals */}
                    <View style={styles.totalsSection}>
                        <View style={styles.totalsContainer}>
                            <View style={styles.totalRow}>
                                <Text>{labels.subtotal as string}</Text>
                                <Text>{subtotal.toFixed(2)} {currencySymbol}</Text>
                            </View>
                            {invoice.vatEnabled && (
                                <View style={styles.totalRow}>
                                    <Text>{labels.vat as string} ({invoice.vatRate}%)</Text>
                                    <Text>{vatAmount.toFixed(2)} {currencySymbol}</Text>
                                </View>
                            )}
                            <View style={styles.totalRowFinal}>
                                <Text>{labels.total as string}</Text>
                                <Text style={{ fontSize: 14 }}>{total.toFixed(2)} {currencySymbol}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Signature Section */}
                    {invoice.signature ? (
                        <View style={{ marginTop: 20, alignItems: 'flex-end' }}>
                            <View style={{ width: 250, alignItems: 'center' }}>
                                <Text style={{ fontSize: 10, color: '#6b7280', marginBottom: 4 }}>{t.signature as string}</Text>
                                <View style={{ paddingBottom: 2 }}>
                                    <Image
                                        src={invoice.signature}
                                        style={{
                                            width: 250 * ((invoice.signatureScale || 100) / 100),
                                            height: 100 * ((invoice.signatureScale || 100) / 100),
                                            objectFit: 'contain'
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    ) : null}
                </View>

                {/* Footer - Absolute Bottom */}
                <View style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                    <View style={styles.footerContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
                            {/* Left Column: Payment Info */}
                            <View style={{ flex: 1 }}>
                                {(invoice.showPaymentInfo !== false) && (
                                    <View>
                                        <Text style={[styles.bold, { marginBottom: 2 }]}>{t.paymentInfo as string}</Text>
                                        <Text>{invoice.paymentInfo || t.demoPaymentInfo}</Text>
                                    </View>
                                )}
                            </View>

                            {/* Right Column: Legal Mentions */}
                            <View style={{ flex: 1, alignItems: 'flex-end', textAlign: 'right' }}>
                                {(invoice.showLegalMentions !== false) && (
                                    <View>
                                        <Text style={[styles.bold, { marginBottom: 2 }]}>{t.legalMentions as string}</Text>
                                        <Text>{invoice.legalMentions || t.demoLegalMentions}</Text>
                                        <Text style={{ marginTop: 4, fontStyle: 'italic' }}>{t.noDiscount}</Text>
                                        {!invoice.vatEnabled && (
                                            <Text style={{ marginTop: 4, fontWeight: 'bold' }}>{t.vatNotApplicable}</Text>
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
}
