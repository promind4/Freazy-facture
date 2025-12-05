export type Language = 'fr' | 'en' | 'es' | 'it' | 'de' | 'pt';

export interface Translation {
    [key: string]: string | { [key: string]: string };
    invoiceType: {
        invoice: string;
        quote: string;
        proforma: string;
        credit_note: string;
        receipt: string;
    };
    invoice: string;
    quote: string;
    proforma: string;
    credit_note: string;
    receipt: string;
    date: string;
    dueDate: string;
    quoteValidity: string;
    billedTo: string;
    quoteBilledTo: string;
    receivedFrom: string;
    paymentDate: string;
    description: string;
    qty: string;
    unitPrice: string;
    total: string;
    subtotal: string;
    vat: string;
    totalDue: string;
    quoteTotal: string;
    creditAmount: string;
    amountPaid: string;
    paymentInfo: string;
    legalMentions: string;
    footer: string;
    signature: string;
    number: string;
    creditNoteNumber: string;
    defaultIssuerName: string;
    defaultItemDescription: string;
    settingsTitle: string;
    language: string;
    documentType: string;
    detailsTitle: string;
    fullAddress: string;
    itemsTitle: string;
    totalsTitle: string;
    legalTitle: string;
    signatureTitle: string;
    signatureSize: string;
    add: string;
    vatRate: string;
    vatEnabled: string;
    paymentInfoPlaceholder: string;
    legalMentionsPlaceholder: string;
    clientNamePlaceholder: string;
    clientAddressPlaceholder: string;
    issuerNamePlaceholder: string;
    issuerAddressPlaceholder: string;
    siretPlaceholder: string;
    emailPlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    show: string;
    logoPlaceholder: string;
    columnSettings: string;
    columnSettingsDesc: string;
    labelQty: string;
    labelUnitPrice: string;
    headerSubtitle: string;
    headerSecure: string;
    headerDataPrivacy: string;
    sponsorTitle: string;
    sponsorText: string;
    sponsorBadge: string;
    downloadToast: string;
    generating: string;
    downloadPdf: string;
    // Demo/Placeholder data for PDF preview
    demoIssuerName: string;
    demoIssuerAddress: string;
    demoIssuerSiret: string;
    demoIssuerEmail: string;
    demoIssuerPhone: string;
    demoClientName: string;
    demoClientAddress: string;
    demoClientEmail: string;
    demoPaymentInfo: string;
    demoLegalMentions: string;
    // Signature module
    signatureDraw: string;
    signatureImport: string;
    signatureClear: string;
    signatureValidate: string;
    signaturePlaceholder: string;
    // New Mandatory Fields
    vatNumber: string;
    deliveryAddress: string;
    deliveryAddressToggle: string;
    noDiscount: string;
    retentionReminder: string;
    // Hardcoded strings to internationalize
    issuerTitle: string;
    clientTitle: string;
    showEmailOnInvoice: string;
    siretOptional: string;
    paymentTerms: string;
    currency: string;
    accentColor: string;
    // Legal compliance - Art. 293 B
    vatNotApplicable: string;
    // Tooltips for required fields
    tooltipInvoiceNumber: string;
    tooltipDate: string;
    tooltipIssuerName: string;
    tooltipIssuerSiret: string;
    tooltipClientName: string;
    // Legal templates
    legalTemplateTitle: string;
    legalTemplateDescription: string;
    legalTemplateFreelance: string;
    legalTemplateCompany: string;
    legalTemplateSimple: string;
    // Email validation
    emailInvalid: string;
    // Status
    status: {
        draft: string;
        sent: string;
        paid: string;
        late: string;
    };
    stats: {
        revenue: string;
        pending: string;
    };
    // New keys for features and history
    feature_free: string;
    feature_local: string;
    feature_fast: string;
    feature_save: string;
    history_title: string;
    history_empty: string;
    history_tooltip: string;
    // UI Buttons & Actions
    newInvoice: string;
    save: string;
    load: string;
    // Toast messages
    toastDraftRestored: string;
    toastInvoiceLoaded: string;
    toastNewInvoice: string;
    toastInvoiceSaved: string;
    toastSavedDescription: string;
    // Section titles
    generalInfo: string;
    // Payment terms
    paymentOnReceipt: string;
    paymentDays: string;
    selectOption: string;
    // Tooltips
    tooltipGeneralInfo: string;
    tooltipIssuerInfo: string;
    tooltipClientInfo: string;
    tooltipOptionsInfo: string;
    // EI mention
    eiReminder: string;
    addEI: string;
    // Affiliation
    needProAccount: string;
    affiliationDescription: string;
    seeOffer: string;
    // Toggles
    showPaymentInfoToggle: string;
    showLegalMentionsToggle: string;
    // Down payment
    downPaymentInvoice: string;
    // Header
    headerTagline: string;
    helpCenter: string;
    securityBadge: string;
    // Footer
    footerReassurance: string;
    footerHelpCenter: string;
    footerLegalMentions: string;
    footerPrivacyPolicy: string;
    footerTerms: string;
    footerCopyright: string;
    // History drawer
    historyDescription: string;
    historyTip: string;
    historyGenerateTip: string;
    historyConfirmReplace: string;
    exportCSVTooltip: string;
    exportJSONTooltip: string;
    importTooltip: string;
    deleteAllTooltip: string;
}

export const i18n: Record<Language, Translation> = {
    fr: {
        invoice: "FACTURE",
        quote: "DEVIS",
        proforma: "FACTURE PRO-FORMA",
        credit_note: "AVOIR",
        receipt: "REÇU DE PAIEMENT",
        date: "Date",
        dueDate: "Date d'échéance",
        quoteValidity: "Validité du devis",
        billedTo: "Facturé à",
        quoteBilledTo: "Adressé à",
        receivedFrom: "Reçu de",
        paymentDate: "Date de paiement",
        description: "DESCRIPTION",
        qty: "QTÉ",
        unitPrice: "PRIX UNIT.",
        total: "Total TTC",
        subtotal: "Total HT",
        vat: "TVA",
        totalDue: "TOTAL À PAYER",
        quoteTotal: "Total du devis",
        creditAmount: "Montant de l'avoir",
        amountPaid: "Montant réglé",
        paymentInfo: "Informations de paiement",
        legalMentions: "Mentions légales",
        footer: "Généré gratuitement avec Freazy",
        signature: "Signature :",
        number: "N°",
        creditNoteNumber: "Avoir N°",
        defaultIssuerName: "Mon Entreprise",
        defaultItemDescription: "Prestation",
        settingsTitle: "Paramètres & Langue",
        language: "Langue",
        documentType: "Type de document",
        detailsTitle: "Détails du document",
        fullAddress: "Adresse complète",
        itemsTitle: "Articles & Prestations",
        totalsTitle: "Totaux & TVA",
        legalTitle: "Mentions Légales & Paiement",
        signatureTitle: "Signature",
        signatureSize: "Taille de la signature",
        add: "Ajouter",
        vatRate: "Taux de TVA (%)",
        vatEnabled: "Activer la TVA",
        paymentInfoPlaceholder: "IBAN, BIC, Paypal...",
        legalMentionsPlaceholder: "Conditions de paiement, pénalités...",
        clientNamePlaceholder: "Nom du client",
        clientAddressPlaceholder: "Adresse du client",
        issuerNamePlaceholder: "Nom de votre entreprise",
        issuerAddressPlaceholder: "Adresse de votre entreprise",
        siretPlaceholder: "Numéro SIRET / SIREN",
        emailPlaceholder: "Email (optionnel)",
        phone: "Téléphone",
        phonePlaceholder: "01 23 45 67 89",
        show: "Afficher",
        logoPlaceholder: "Cliquez ou glissez votre logo ici",
        columnSettings: "Paramètres des colonnes",
        columnSettingsDesc: "Personnalisez les titres des colonnes du tableau.",
        labelQty: "Label Quantité",
        labelUnitPrice: "Label Prix Unitaire",
        invoiceType: {
            invoice: "Facture",
            quote: "Devis",
            proforma: "Facture Pro-forma",
            credit_note: "Avoir (Note de Crédit)",
            receipt: "Reçu"
        },
        headerSubtitle: "L'outil de facturation ultra-rapide pour freelances. Gratuit & Sans inscription.",
        headerSecure: "100% Privé & Sécurisé.",
        headerDataPrivacy: "Vos données restent dans votre navigateur.",
        sponsorTitle: "Vous êtes freelance ?",
        sponsorText: "Découvrez les meilleurs outils pour gérer votre activité (Banque, Assurance, Compta).",
        sponsorBadge: "Espace Sponsor (À venir)",
        downloadToast: "Document téléchargé et sauvegardé !",
        generating: "Génération...",
        downloadPdf: "Télécharger PDF",
        demoIssuerName: "Mon Entreprise",
        demoIssuerAddress: "123 Rue de la Paix, 75000 Paris",
        demoIssuerSiret: "123 456 789 00012",
        demoIssuerEmail: "contact@monentreprise.com",
        demoIssuerPhone: "01 23 45 67 89",
        demoClientName: "Client VIP",
        demoClientAddress: "456 Avenue des Champs-Élysées, 75008 Paris",
        demoClientEmail: "client@vip.com",
        demoPaymentInfo: "IBAN: FR76 1234 5678 9101 1121 3\nBIC: PARIFR76",
        demoLegalMentions: "Pénalités de retard : 3 fois le taux d'intérêt légal.\nIndemnité forfaitaire pour frais de recouvrement : 40€.",
        signatureDraw: "Dessiner",
        signatureImport: "Importer",
        signatureClear: "Effacer",
        signatureValidate: "Valider la signature",
        signaturePlaceholder: "Signez ici",
        vatNumber: "N° TVA Intracommunautaire",
        deliveryAddress: "Adresse de livraison",
        deliveryAddressToggle: "Adresse de livraison différente ?",
        noDiscount: "Pas d'escompte pour paiement anticipé.",
        retentionReminder: "Rappel : Pensez à conserver vos factures pendant 10 ans.",
        issuerTitle: "Émetteur (Vous)",
        clientTitle: "Client",
        showEmailOnInvoice: "Afficher l'email sur la facture",
        siretOptional: "SIRET / SIREN (Optionnel)",
        paymentTerms: "Délai de paiement",
        currency: "Devise",
        accentColor: "Couleur d'accent",
        vatNotApplicable: "TVA non applicable, art. 293 B du CGI",
        tooltipInvoiceNumber: "Numéro unique obligatoire pour identifier votre document",
        tooltipDate: "Date d'émission du document",
        tooltipIssuerName: "Votre raison sociale ou nom complet",
        tooltipIssuerSiret: "Numéro SIRET à 14 chiffres obligatoire pour les professionnels français",
        tooltipClientName: "Nom complet du client ou raison sociale de l'entreprise",
        legalTemplateTitle: "Modèles de mentions légales",
        legalTemplateDescription: "Choisissez un modèle pré-rempli selon votre statut",
        legalTemplateFreelance: "Micro-entrepreneur : Pénalités de retard : 3 fois le taux d'intérêt légal.\nIndemnité forfaitaire pour frais de recouvrement : 40€.\nEn cas de retard de paiement, pénalités exigibles sans qu'un rappel soit nécessaire.",
        legalTemplateCompany: "Société (SARL/SAS) : Conditions de paiement : 30 jours fin de mois.\nPénalités de retard : selon taux BCE + 10 points.\nIndemnité forfaitaire pour frais de recouvrement : 40€.\nEscompte pour paiement anticipé : aucun.",
        legalTemplateSimple: "Pénalités de retard : 3 fois le taux d'intérêt légal.\nIndemnité forfaitaire : 40€.",
        emailInvalid: "Adresse email invalide",
        status: {
            draft: "Brouillon",
            sent: "Envoyée",
            paid: "Payée",
            late: "En retard"
        },
        stats: {
            revenue: "Chiffre d'affaires",
            pending: "En attente"
        },
        feature_free: "100% Gratuit",
        feature_local: "Sécurisé et illimité",
        feature_fast: "Ultra Rapide",
        feature_save: "Historique & Sauvegardes",
        history_title: "HISTORIQUE",
        history_empty: "Aucun historique pour le moment.",
        history_tooltip: "Historique & Sauvegardes",
        // UI Buttons & Actions
        newInvoice: "Nouvelle Facture",
        save: "Sauvegarder",
        load: "Charger",
        // Toast messages
        toastDraftRestored: "Brouillon restauré",
        toastInvoiceLoaded: "Facture chargée depuis l'historique",
        toastNewInvoice: "Nouvelle facture créée",
        toastInvoiceSaved: "Facture sauvegardée !",
        toastSavedDescription: "Votre brouillon est sécurisé dans votre navigateur.",
        // Section titles
        generalInfo: "Informations Générales",
        // Payment terms
        paymentOnReceipt: "À réception",
        paymentDays: "jours",
        selectOption: "Sélectionner",
        // Tooltips
        tooltipGeneralInfo: "💡 Utilisez une numérotation chronologique unique (ex: FAC-2024-001). C'est obligatoire légalement et facilite votre comptabilité.",
        tooltipIssuerInfo: "💡 Vos infos sont sauvegardées automatiquement. Le SIRET est obligatoire en France. Si vous êtes auto-entrepreneur, c'est votre numéro à 14 chiffres.",
        tooltipClientInfo: "💡 Pour le B2B, le numéro de TVA intracommunautaire est important si vous travaillez avec des entreprises européennes. L'adresse complète est obligatoire.",
        tooltipOptionsInfo: "💡 Auto-entrepreneur ? Désactivez la TVA et ajoutez \"TVA non applicable, art. 293 B du CGI\". N'oubliez pas votre IBAN pour les paiements.",
        // EI mention
        eiReminder: "Entrepreneur Individuel ? La mention \"EI\" est obligatoire.",
        addEI: "Ajouter (EI)",
        // Affiliation
        needProAccount: "Besoin d'un compte pro ?",
        affiliationDescription: "Séparez vos revenus pros/persos avec Qonto. 1 mois offert.",
        seeOffer: "Voir l'offre",
        // Toggles
        showPaymentInfoToggle: "Afficher les infos de paiement",
        showLegalMentionsToggle: "Afficher les mentions légales",
        // Down payment
        downPaymentInvoice: "Facture d'acompte",
        // Header
        headerTagline: "Le générateur de facture gratuit pour freelance",
        helpCenter: "Centre d'aide",
        securityBadge: "100% Privé & Sécurisé",
        // Footer
        footerReassurance: "Aucun compte requis. Aucune donnée collectée. Généré localement.",
        footerHelpCenter: "Centre d'aide & Ressources",
        footerLegalMentions: "Mentions Légales",
        footerPrivacyPolicy: "Politique de Confidentialité",
        footerTerms: "CGU",
        footerCopyright: "© 2025 Freazy",
        // History drawer
        historyDescription: "Vos documents générés sont sauvegardés ici pendant 1 mois (dans votre navigateur).",
        historyTip: "Astuce : Cliquez sur le bouton de statut (ex: Brouillon) pour le modifier.",
        historyGenerateTip: "Générez un PDF pour le voir apparaître ici.",
        historyConfirmReplace: "Attention : Cette action va remplacer tout votre historique actuel par celui du fichier. Continuer ?",
        exportCSVTooltip: "Exporter en CSV (Excel)",
        exportJSONTooltip: "Sauvegarder les données (JSON)",
        importTooltip: "Restaurer une sauvegarde",
        deleteAllTooltip: "Tout effacer"
    },
    en: {
        invoice: "INVOICE",
        quote: "QUOTE",
        proforma: "PRO-FORMA INVOICE",
        credit_note: "CREDIT NOTE",
        receipt: "PAYMENT RECEIPT",
        date: "Date",
        dueDate: "Due Date",
        quoteValidity: "Valid until",
        billedTo: "Billed to",
        quoteBilledTo: "To",
        receivedFrom: "Received from",
        paymentDate: "Payment Date",
        description: "DESCRIPTION",
        qty: "QTY",
        unitPrice: "UNIT PRICE",
        total: "Total Due",
        subtotal: "Subtotal",
        vat: "VAT",
        totalDue: "TOTAL DUE",
        quoteTotal: "Quote Total",
        creditAmount: "Credit Amount",
        amountPaid: "Amount Paid",
        paymentInfo: "Payment Info",
        legalMentions: "Legal Mentions",
        footer: "Generated for free with Freazy",
        signature: "Signature:",
        number: "No",
        creditNoteNumber: "Credit Note No",
        defaultIssuerName: "My Company",
        defaultItemDescription: "Service",
        settingsTitle: "Settings & Language",
        language: "Language",
        documentType: "Document Type",
        detailsTitle: "Document Details",
        fullAddress: "Full Address",
        itemsTitle: "Items & Services",
        totalsTitle: "Totals & VAT",
        legalTitle: "Legal & Payment",
        signatureTitle: "Signature",
        signatureSize: "Signature Size",
        add: "Add",
        vatRate: "VAT Rate (%)",
        vatEnabled: "Enable VAT",
        paymentInfoPlaceholder: "IBAN, BIC, Paypal...",
        legalMentionsPlaceholder: "Payment terms, penalties...",
        clientNamePlaceholder: "Client Name",
        clientAddressPlaceholder: "Client Address",
        issuerNamePlaceholder: "Your Company Name",
        issuerAddressPlaceholder: "Your Company Address",
        siretPlaceholder: "Tax ID / Registration No",
        emailPlaceholder: "Email (optional)",
        phone: "Phone",
        phonePlaceholder: "+1 234 567 890",
        show: "Show",
        logoPlaceholder: "Click or drag your logo here",
        columnSettings: "Column Settings",
        columnSettingsDesc: "Customize table column headers.",
        labelQty: "Quantity Label",
        labelUnitPrice: "Unit Price Label",
        invoiceType: {
            invoice: "Invoice",
            quote: "Quote",
            proforma: "Pro-forma Invoice",
            credit_note: "Credit Note",
            receipt: "Receipt"
        },
        headerSubtitle: "The ultra-fast invoicing tool for freelancers. Free & No registration.",
        headerSecure: "100% Private & Secure.",
        headerDataPrivacy: "Your data stays in your browser.",
        sponsorTitle: "Are you a freelancer?",
        sponsorText: "Discover the best tools to manage your business (Banking, Insurance, Accounting).",
        sponsorBadge: "Sponsor Space (Coming Soon)",
        downloadToast: "Document downloaded and saved!",
        generating: "Generating...",
        downloadPdf: "Download PDF",
        demoIssuerName: "My Company",
        demoIssuerAddress: "123 Peace Street, London W1A 1AA",
        demoIssuerSiret: "GB123456789",
        demoIssuerEmail: "contact@mycompany.com",
        demoIssuerPhone: "+1 234 567 890",
        demoClientName: "VIP Client",
        demoClientAddress: "456 Main Avenue, London SW1A 1AA",
        demoClientEmail: "client@vip.com",
        demoPaymentInfo: "IBAN: GB76 1234 5678 9101 1121 3\nBIC: BANKGB76",
        demoLegalMentions: "Late payment penalties: 3 times the legal interest rate.\nFlat-rate recovery fee: £40.",
        signatureDraw: "Draw",
        signatureImport: "Upload",
        signatureClear: "Clear",
        signatureValidate: "Apply Signature",
        signaturePlaceholder: "Sign here",
        vatNumber: "VAT Number",
        deliveryAddress: "Delivery Address",
        deliveryAddressToggle: "Different delivery address?",
        noDiscount: "No discount for early payment.",
        retentionReminder: "Reminder: Remember to keep your invoices for 10 years.",
        issuerTitle: "Issuer (You)",
        clientTitle: "Client",
        showEmailOnInvoice: "Show email on invoice",
        siretOptional: "Tax ID / Registration No (Optional)",
        paymentTerms: "Payment Terms",
        currency: "Currency",
        accentColor: "Accent Color",
        vatNotApplicable: "VAT not applicable, art. 293 B of the CGI",
        tooltipInvoiceNumber: "Unique number required to identify your document",
        tooltipDate: "Document issue date",
        tooltipIssuerName: "Your company name or full name",
        tooltipIssuerSiret: "Tax ID or registration number (required for businesses)",
        tooltipClientName: "Client full name or company name",
        legalTemplateTitle: "Legal mentions templates",
        legalTemplateDescription: "Choose a pre-filled template according to your status",
        legalTemplateFreelance: "Freelancer: Late payment penalties: 3 times the legal interest rate.\nFlat-rate collection fee: £40.\nIn case of late payment, penalties are payable without a reminder being necessary.",
        legalTemplateCompany: "Company (LLC): Payment terms: 30 days end of month.\nLate payment penalties: ECB rate + 10 points.\nFlat-rate collection fee: £40.\nNo discount for early payment.",
        legalTemplateSimple: "Late payment penalties: 3 times the legal interest rate.\nFlat-rate fee: £40.",
        emailInvalid: "Invalid email address",
        status: {
            draft: "Draft",
            sent: "Sent",
            paid: "Paid",
            late: "Late"
        },
        stats: {
            revenue: "Revenue",
            pending: "Pending"
        },
        feature_free: "100% Free",
        feature_local: "Secure & Unlimited",
        feature_fast: "Ultra Fast",
        feature_save: "History & Backups",
        history_title: "HISTORY",
        history_empty: "No history yet.",
        history_tooltip: "History & Backups",
        // UI Buttons & Actions
        newInvoice: "New Invoice",
        save: "Save",
        load: "Load",
        // Toast messages
        toastDraftRestored: "Draft restored",
        toastInvoiceLoaded: "Invoice loaded from history",
        toastNewInvoice: "New invoice created",
        toastInvoiceSaved: "Invoice saved!",
        toastSavedDescription: "Your draft is secured in your browser.",
        // Section titles
        generalInfo: "General Information",
        // Payment terms
        paymentOnReceipt: "On receipt",
        paymentDays: "days",
        selectOption: "Select",
        // Tooltips
        tooltipGeneralInfo: "💡 Use a unique chronological number (e.g. INV-2024-001). This is legally required and helps your accounting.",
        tooltipIssuerInfo: "💡 Your info is saved automatically. The tax ID is required for businesses. For freelancers, this is your registration number.",
        tooltipClientInfo: "💡 For B2B, the VAT number is important when working with European companies. The full address is mandatory.",
        tooltipOptionsInfo: "💡 Small business? Disable VAT and add the appropriate exemption notice. Don't forget your IBAN for payments.",
        // EI mention
        eiReminder: "Sole proprietor? The \"SP\" mention may be required.",
        addEI: "Add (SP)",
        // Affiliation
        needProAccount: "Need a business account?",
        affiliationDescription: "Separate your business and personal income. 1 month free.",
        seeOffer: "See offer",
        // Toggles
        showPaymentInfoToggle: "Show payment info",
        showLegalMentionsToggle: "Show legal mentions",
        // Down payment
        downPaymentInvoice: "Down Payment Invoice",
        // Header
        headerTagline: "The free invoice generator for freelancers",
        helpCenter: "Help Center",
        securityBadge: "100% Private & Secure",
        // Footer
        footerReassurance: "No account required. No data collected. Generated locally.",
        footerHelpCenter: "Help Center & Resources",
        footerLegalMentions: "Legal Notices",
        footerPrivacyPolicy: "Privacy Policy",
        footerTerms: "Terms of Use",
        footerCopyright: "© 2025 Freazy",
        // History drawer
        historyDescription: "Your generated documents are saved here for 1 month (in your browser).",
        historyTip: "Tip: Click on the status button (e.g. Draft) to change it.",
        historyGenerateTip: "Generate a PDF to see it appear here.",
        historyConfirmReplace: "Warning: This action will replace your entire history with the file. Continue?",
        exportCSVTooltip: "Export as CSV (Excel)",
        exportJSONTooltip: "Save data (JSON)",
        importTooltip: "Restore a backup",
        deleteAllTooltip: "Delete all"
    },
    es: {
        invoice: "FACTURA",
        quote: "PRESUPUESTO",
        proforma: "FACTURA PROFORMA",
        credit_note: "FACTURA DE ABONO",
        receipt: "RECIBO DE PAGO",
        date: "Fecha",
        dueDate: "Fecha de vencimiento",
        quoteValidity: "Válido hasta",
        billedTo: "Facturado a",
        quoteBilledTo: "Dirigido a",
        receivedFrom: "Recibido de",
        paymentDate: "Fecha de pago",
        description: "DESCRIPCIÓN",
        qty: "CANT.",
        unitPrice: "PRECIO UNIT.",
        total: "Total a Pagar",
        subtotal: "Base Imponible",
        vat: "IVA",
        totalDue: "TOTAL A PAGAR",
        quoteTotal: "Total del presupuesto",
        creditAmount: "Importe del abono",
        amountPaid: "Importe pagado",
        paymentInfo: "Información de pago",
        legalMentions: "Menciones legales",
        footer: "Generado gratis con Freazy",
        signature: "Firma:",
        number: "Nº",
        creditNoteNumber: "Abono Nº",
        defaultIssuerName: "Mi Empresa",
        defaultItemDescription: "Servicio",
        settingsTitle: "Configuración e Idioma",
        language: "Idioma",
        documentType: "Tipo de documento",
        detailsTitle: "Detalles del documento",
        fullAddress: "Dirección completa",
        itemsTitle: "Artículos y Servicios",
        totalsTitle: "Totales e IVA",
        legalTitle: "Legal y Pago",
        signatureTitle: "Firma",
        signatureSize: "Tamaño de la firma",
        add: "Añadir",
        vatRate: "Tasa de IVA (%)",
        vatEnabled: "Habilitar IVA",
        paymentInfoPlaceholder: "IBAN, BIC, Paypal...",
        legalMentionsPlaceholder: "Condiciones de pago, penalizaciones...",
        clientNamePlaceholder: "Nombre del cliente",
        clientAddressPlaceholder: "Dirección del cliente",
        issuerNamePlaceholder: "Nombre de su empresa",
        issuerAddressPlaceholder: "Dirección de su empresa",
        siretPlaceholder: "NIF / CIF",
        emailPlaceholder: "Email (opcional)",
        phone: "Teléfono",
        phonePlaceholder: "+34 912 345 678",
        show: "Mostrar",
        logoPlaceholder: "Haga clic o arrastre su logotipo aquí",
        columnSettings: "Configuración de columnas",
        columnSettingsDesc: "Personalice los encabezados de las columnas.",
        labelQty: "Etiqueta Cantidad",
        labelUnitPrice: "Etiqueta Precio Unitario",
        invoiceType: {
            invoice: "Factura",
            quote: "Presupuesto",
            proforma: "Factura Proforma",
            credit_note: "Factura de Abono",
            receipt: "Recibo"
        },
        headerSubtitle: "La herramienta de facturación ultrarrápida para autónomos. Gratis y sin registro.",
        headerSecure: "100% Privado y Seguro.",
        headerDataPrivacy: "Sus datos permanecen en su navegador.",
        sponsorTitle: "¿Eres autónomo?",
        sponsorText: "Descubre las mejores herramientas para gestionar tu negocio (Banca, Seguros, Contabilidad).",
        sponsorBadge: "Espacio Patrocinador (Próximamente)",
        downloadToast: "¡Documento descargado y guardado!",
        generating: "Generando...",
        downloadPdf: "Descargar PDF",
        demoIssuerName: "Mi Empresa",
        demoIssuerAddress: "Calle de la Paz 123, 28001 Madrid",
        demoIssuerSiret: "B12345678",
        demoIssuerEmail: "contacto@miempresa.com",
        demoIssuerPhone: "+34 912 345 678",
        demoClientName: "Cliente VIP",
        demoClientAddress: "Avenida Principal 456, 28002 Madrid",
        demoClientEmail: "cliente@vip.com",
        demoPaymentInfo: "IBAN: ES76 1234 5678 9101 1121 3\nBIC: BANKES76",
        demoLegalMentions: "Penalizaciones por retraso: 3 veces la tasa de interés legal.\nIndemnización forfaitaria por gastos de cobro: 40€.",
        signatureDraw: "Dibujar",
        signatureImport: "Importar",
        signatureClear: "Limpiar",
        signatureValidate: "Aplicar firma",
        signaturePlaceholder: "Firme aquí",
        vatNumber: "Nº IVA Intracomunitario",
        deliveryAddress: "Dirección de entrega",
        deliveryAddressToggle: "¿Dirección de entrega diferente?",
        noDiscount: "Sin descuento por pago anticipado.",
        retentionReminder: "Recordatorio: Recuerde conservar sus facturas durante 10 años.",
        issuerTitle: "Emisor (Usted)",
        clientTitle: "Cliente",
        showEmailOnInvoice: "Mostrar email en la factura",
        siretOptional: "NIF / CIF (Opcional)",
        paymentTerms: "Plazo de pago",
        currency: "Moneda",
        accentColor: "Color de acento",
        vatNotApplicable: "IVA no aplicable, art. 293 B del CGI",
        tooltipInvoiceNumber: "Número único requerido para identificar su documento",
        tooltipDate: "Fecha de emisión del documento",
        tooltipIssuerName: "Nombre de su empresa o nombre completo",
        tooltipIssuerSiret: "NIF o número de registro (obligatorio para empresas)",
        tooltipClientName: "Nombre completo del cliente o razón social",
        legalTemplateTitle: "Modelos de menciones legales",
        legalTemplateDescription: "Elija una plantilla preconfigurada según su estado",
        legalTemplateFreelance: "Autónomo: Penalizaciones por retraso: 3 veces la tasa de interés legal.\nIndemnización forfataria por gastos de cobro: 40€.\nEn caso de retraso en el pago, las penalizaciones son exigibles sin necesidad de recordatorio.",
        legalTemplateCompany: "Empresa (SL): Condiciones de pago: 30 días fin de mes.\nPenalizaciones por retraso: según tipo BCE + 10 puntos.\nIndemnización forfataria: 40€.\nSin descuento por pago anticipado.",
        legalTemplateSimple: "Penalizaciones por retraso: 3 veces la tasa de interés legal.\nIndemnización forfataria: 40€.",
        emailInvalid: "Dirección de correo electrónico no válida",
        status: {
            draft: "Borrador",
            sent: "Enviada",
            paid: "Pagada",
            late: "Vencida"
        },
        stats: {
            revenue: "Ingresos",
            pending: "Pendiente"
        },
        feature_free: "100% Gratis",
        feature_local: "Seguro e Ilimitado",
        feature_fast: "Ultra Rápido",
        feature_save: "Historial y Copias",
        history_title: "HISTORIAL",
        history_empty: "No hay historial todavía.",
        history_tooltip: "Historial y Copias de Seguridad",
        // UI Buttons & Actions
        newInvoice: "Nueva Factura",
        save: "Guardar",
        load: "Cargar",
        // Toast messages
        toastDraftRestored: "Borrador restaurado",
        toastInvoiceLoaded: "Factura cargada desde el historial",
        toastNewInvoice: "Nueva factura creada",
        toastInvoiceSaved: "¡Factura guardada!",
        toastSavedDescription: "Su borrador está seguro en su navegador.",
        // Section titles
        generalInfo: "Información General",
        // Payment terms
        paymentOnReceipt: "Al recibo",
        paymentDays: "días",
        selectOption: "Seleccionar",
        // Tooltips
        tooltipGeneralInfo: "💡 Use una numeración cronológica única (ej: FAC-2024-001). Es obligatorio legalmente y facilita su contabilidad.",
        tooltipIssuerInfo: "💡 Sus datos se guardan automáticamente. El NIF es obligatorio. Si es autónomo, es su número de identificación fiscal.",
        tooltipClientInfo: "💡 Para B2B, el número de IVA intracomunitario es importante si trabaja con empresas europeas. La dirección completa es obligatoria.",
        tooltipOptionsInfo: "💡 ¿Autónomo? Desactive el IVA y añada la mención de exención correspondiente. No olvide su IBAN para los pagos.",
        // EI mention
        eiReminder: "¿Empresario Individual? La mención puede ser obligatoria.",
        addEI: "Añadir mención",
        // Affiliation
        needProAccount: "¿Necesita una cuenta profesional?",
        affiliationDescription: "Separe sus ingresos profesionales y personales. 1 mes gratis.",
        seeOffer: "Ver oferta",
        // Toggles
        showPaymentInfoToggle: "Mostrar info de pago",
        showLegalMentionsToggle: "Mostrar menciones legales",
        // Down payment
        downPaymentInvoice: "Factura de anticipo",
        // Header
        headerTagline: "El generador de facturas gratuito para autónomos",
        helpCenter: "Centro de ayuda",
        securityBadge: "100% Privado y Seguro",
        // Footer
        footerReassurance: "Sin cuenta. Sin datos recopilados. Generado localmente.",
        footerHelpCenter: "Centro de ayuda y Recursos",
        footerLegalMentions: "Aviso Legal",
        footerPrivacyPolicy: "Política de Privacidad",
        footerTerms: "Términos de Uso",
        footerCopyright: "© 2025 Freazy",
        // History drawer
        historyDescription: "Sus documentos generados se guardan aquí durante 1 mes (en su navegador).",
        historyTip: "Consejo: Haga clic en el botón de estado (ej: Borrador) para cambiarlo.",
        historyGenerateTip: "Genere un PDF para verlo aparecer aquí.",
        historyConfirmReplace: "Atención: Esta acción reemplazará todo su historial por el del archivo. ¿Continuar?",
        exportCSVTooltip: "Exportar como CSV (Excel)",
        exportJSONTooltip: "Guardar datos (JSON)",
        importTooltip: "Restaurar copia de seguridad",
        deleteAllTooltip: "Borrar todo"
    },
    it: {
        invoice: "FATTURA",
        quote: "PREVENTIVO",
        proforma: "FATTURA PROFORMA",
        credit_note: "NOTA DI CREDITO",
        receipt: "RICEVUTA DI PAGAMENTO",
        date: "Data",
        dueDate: "Scadenza",
        quoteValidity: "Valido fino al",
        billedTo: "Fatturato a",
        quoteBilledTo: "Intestato a",
        receivedFrom: "Ricevuto da",
        paymentDate: "Data di pagamento",
        description: "DESCRIZIONE",
        qty: "Q.TÀ",
        unitPrice: "PREZZO UNIT.",
        total: "Totale",
        subtotal: "Imponibile",
        vat: "IVA",
        totalDue: "TOTALE DA PAGARE",
        quoteTotal: "Totale preventivo",
        creditAmount: "Importo nota di credito",
        amountPaid: "Importo pagato",
        paymentInfo: "Dati di pagamento",
        legalMentions: "Note legali",
        footer: "Generato gratuitamente con Freazy",
        signature: "Firma:",
        number: "N.",
        creditNoteNumber: "Nota di credito N.",
        defaultIssuerName: "La mia azienda",
        defaultItemDescription: "Servizio",
        settingsTitle: "Impostazioni e Lingua",
        language: "Lingua",
        documentType: "Tipo di documento",
        detailsTitle: "Dettagli del documento",
        fullAddress: "Indirizzo completo",
        itemsTitle: "Articoli e Servizi",
        totalsTitle: "Totali e IVA",
        legalTitle: "Legale e Pagamento",
        signatureTitle: "Firma",
        signatureSize: "Dimensione firma",
        add: "Aggiungi",
        vatRate: "Aliquota IVA (%)",
        vatEnabled: "Abilita IVA",
        paymentInfoPlaceholder: "IBAN, BIC, Paypal...",
        legalMentionsPlaceholder: "Termini di pagamento...",
        clientNamePlaceholder: "Nome del cliente",
        clientAddressPlaceholder: "Indirizzo del cliente",
        issuerNamePlaceholder: "Nome della tua azienda",
        issuerAddressPlaceholder: "Indirizzo della tua azienda",
        siretPlaceholder: "P.IVA / Codice Fiscale",
        emailPlaceholder: "Email (opzionale)",
        phone: "Telefono",
        phonePlaceholder: "+39 06 1234 5678",
        show: "Mostra",
        logoPlaceholder: "Clicca o trascina il tuo logo qui",
        columnSettings: "Impostazioni colonne",
        columnSettingsDesc: "Personalizza le intestazioni delle colonne.",
        labelQty: "Etichetta Quantità",
        labelUnitPrice: "Etichetta Prezzo Unitario",
        invoiceType: {
            invoice: "Fattura",
            quote: "Preventivo",
            proforma: "Fattura Proforma",
            credit_note: "Nota di Credito",
            receipt: "Ricevuta"
        },
        headerSubtitle: "Lo strumento di fatturazione ultraveloce per freelance. Gratuito e senza registrazione.",
        headerSecure: "100% Privato e Sicuro.",
        headerDataPrivacy: "I tuoi dati rimangono nel tuo browser.",
        sponsorTitle: "Sei un freelance?",
        sponsorText: "Scopri i migliori strumenti per gestire la tua attività (Banca, Assicurazione, Contabilità).",
        sponsorBadge: "Spazio Sponsor (In arrivo)",
        downloadToast: "Documento scaricato e salvato!",
        generating: "Generazione...",
        downloadPdf: "Scarica PDF",
        demoIssuerName: "La Mia Azienda",
        demoIssuerAddress: "Via della Pace 123, 00100 Roma",
        demoIssuerSiret: "12345678901",
        demoIssuerEmail: "contatto@miaazienda.it",
        demoIssuerPhone: "+39 06 1234 5678",
        demoClientName: "Cliente VIP",
        demoClientAddress: "Viale Principale 456, 00100 Roma",
        demoClientEmail: "cliente@vip.it",
        demoPaymentInfo: "IBAN: IT76 1234 5678 9101 1121 3\nBIC: BANKIT76",
        demoLegalMentions: "Penalità per ritardo: 3 volte il tasso di interesse legale.\nIndennità forfettaria per spese di recupero: 40€.",
        signatureDraw: "Disegnare",
        signatureImport: "Importare",
        signatureClear: "Cancellare",
        signatureValidate: "Applica firma",
        signaturePlaceholder: "Firma qui",
        vatNumber: "Partita IVA",
        deliveryAddress: "Indirizzo di consegna",
        deliveryAddressToggle: "Indirizzo di consegna diverso?",
        noDiscount: "Nessuno sconto per pagamento anticipato.",
        retentionReminder: "Promemoria: Ricorda di conservare le fatture per 10 anni.",
        issuerTitle: "Emittente (Tu)",
        clientTitle: "Cliente",
        showEmailOnInvoice: "Mostra email sulla fattura",
        siretOptional: "P.IVA / Codice Fiscale (Opzionale)",
        paymentTerms: "Termini di pagamento",
        currency: "Valuta",
        accentColor: "Colore di accento",
        vatNotApplicable: "IVA non applicabile, art. 293 B del CGI",
        tooltipInvoiceNumber: "Numero univoco richiesto per identificare il documento",
        tooltipDate: "Data di emissione del documento",
        tooltipIssuerName: "Nome della tua azienda o nome completo",
        tooltipIssuerSiret: "Partita IVA o numero di registrazione (obbligatorio per le imprese)",
        tooltipClientName: "Nome completo del cliente o ragione sociale",
        legalTemplateTitle: "Modelli di note legali",
        legalTemplateDescription: "Scegli un modello precompilato secondo il tuo stato",
        legalTemplateFreelance: "Freelancer: Penalità per ritardo: 3 volte il tasso di interesse legale.\nIndennità forfettaria per spese di recupero: 40€.\nIn caso di ritardo nel pagamento, le penalità sono esigibili senza che sia necessario un sollecito.",
        legalTemplateCompany: "Società (SRL): Condizioni di pagamento: 30 giorni fine mese.\nPenalità per ritardo: secondo tasso BCE + 10 punti.\nIndennità forfettaria: 40€.\nNessuno sconto per pagamento anticipato.",
        legalTemplateSimple: "Penalità per ritardo: 3 volte il tasso di interesse legale.\nIndennità forfettaria: 40€.",
        emailInvalid: "Indirizzo email non valido",
        status: {
            draft: "Bozza",
            sent: "Inviata",
            paid: "Pagata",
            late: "In ritardo"
        },
        stats: {
            revenue: "Fatturato",
            pending: "In attesa"
        },
        feature_free: "100% Gratuito",
        feature_local: "Sicuro e Illimitato",
        feature_fast: "Ultra Veloce",
        feature_save: "Cronologia e Backup",
        history_title: "CRONOLOGIA",
        history_empty: "Nessuna cronologia.",
        history_tooltip: "Cronologia e Backup",
        // UI Buttons & Actions
        newInvoice: "Nuova Fattura",
        save: "Salva",
        load: "Carica",
        // Toast messages
        toastDraftRestored: "Bozza ripristinata",
        toastInvoiceLoaded: "Fattura caricata dalla cronologia",
        toastNewInvoice: "Nuova fattura creata",
        toastInvoiceSaved: "Fattura salvata!",
        toastSavedDescription: "La bozza è protetta nel browser.",
        // Section titles
        generalInfo: "Informazioni Generali",
        // Payment terms
        paymentOnReceipt: "Alla ricezione",
        paymentDays: "giorni",
        selectOption: "Seleziona",
        // Tooltips
        tooltipGeneralInfo: "💡 Usa una numerazione cronologica unica (es: FAT-2024-001). È obbligatorio per legge e facilita la contabilità.",
        tooltipIssuerInfo: "💡 I tuoi dati vengono salvati automaticamente. La P.IVA è obbligatoria. Se sei freelance, è il tuo codice fiscale.",
        tooltipClientInfo: "💡 Per B2B, la partita IVA è importante se lavori con aziende europee. L'indirizzo completo è obbligatorio.",
        tooltipOptionsInfo: "💡 Piccola impresa? Disattiva l'IVA e aggiungi la menzione di esenzione. Non dimenticare l'IBAN per i pagamenti.",
        // EI mention
        eiReminder: "Ditta Individuale? La menzione potrebbe essere obbligatoria.",
        addEI: "Aggiungi menzione",
        // Affiliation
        needProAccount: "Hai bisogno di un conto business?",
        affiliationDescription: "Separa i tuoi redditi professionali e personali. 1 mese gratis.",
        seeOffer: "Vedi offerta",
        // Toggles
        showPaymentInfoToggle: "Mostra info pagamento",
        showLegalMentionsToggle: "Mostra note legali",
        // Down payment
        downPaymentInvoice: "Fattura di acconto",
        // Header
        headerTagline: "Il generatore di fatture gratuito per freelance",
        helpCenter: "Centro assistenza",
        securityBadge: "100% Privato e Sicuro",
        // Footer
        footerReassurance: "Nessun account. Nessun dato raccolto. Generato localmente.",
        footerHelpCenter: "Centro assistenza e Risorse",
        footerLegalMentions: "Note Legali",
        footerPrivacyPolicy: "Informativa Privacy",
        footerTerms: "Termini di Utilizzo",
        footerCopyright: "© 2025 Freazy",
        // History drawer
        historyDescription: "I documenti generati vengono salvati qui per 1 mese (nel browser).",
        historyTip: "Consiglio: Clicca sul pulsante di stato (es: Bozza) per modificarlo.",
        historyGenerateTip: "Genera un PDF per vederlo apparire qui.",
        historyConfirmReplace: "Attenzione: Questa azione sostituirà tutta la cronologia con quella del file. Continuare?",
        exportCSVTooltip: "Esporta come CSV (Excel)",
        exportJSONTooltip: "Salva dati (JSON)",
        importTooltip: "Ripristina backup",
        deleteAllTooltip: "Elimina tutto"
    },
    de: {
        invoice: "RECHNUNG",
        quote: "ANGEBOT",
        proforma: "PROFORMA-RECHNUNG",
        credit_note: "GUTSCHRIFT",
        receipt: "ZAHLUNGSBELEG",
        date: "Datum",
        dueDate: "Fälligkeitsdatum",
        quoteValidity: "Gültig bis",
        billedTo: "Rechnungsadresse",
        quoteBilledTo: "Empfänger",
        receivedFrom: "Erhalten von",
        paymentDate: "Zahlungsdatum",
        description: "BESCHREIBUNG",
        qty: "MENGE",
        unitPrice: "EINZELPREIS",
        total: "Gesamtbetrag",
        subtotal: "Nettobetrag",
        vat: "MwSt.",
        totalDue: "GESAMTBETRAG",
        quoteTotal: "Gesamtbetrag",
        creditAmount: "Gutschriftsbetrag",
        amountPaid: "Gezahlter Betrag",
        paymentInfo: "Zahlungsinformationen",
        legalMentions: "Rechtliche Hinweise",
        footer: "Kostenlos erstellt mit Freazy",
        signature: "Unterschrift:",
        number: "Nr.",
        creditNoteNumber: "Gutschrift Nr.",
        defaultIssuerName: "Mein Unternehmen",
        defaultItemDescription: "Dienstleistung",
        settingsTitle: "Einstellungen & Sprache",
        language: "Sprache",
        documentType: "Dokumententyp",
        detailsTitle: "Dokumentendetails",
        fullAddress: "Vollständige Adresse",
        itemsTitle: "Artikel & Dienstleistungen",
        totalsTitle: "Summen & MwSt.",
        legalTitle: "Rechtliches & Zahlung",
        signatureTitle: "Unterschrift",
        signatureSize: "Unterschriftsgröße",
        add: "Hinzufügen",
        vatRate: "MwSt.-Satz (%)",
        vatEnabled: "MwSt. aktivieren",
        paymentInfoPlaceholder: "IBAN, BIC, Paypal...",
        legalMentionsPlaceholder: "Zahlungsbedingungen...",
        clientNamePlaceholder: "Kundenname",
        clientAddressPlaceholder: "Kundenadresse",
        issuerNamePlaceholder: "Ihr Firmenname",
        issuerAddressPlaceholder: "Ihre Firmenadresse",
        siretPlaceholder: "Steuernummer / USt-IdNr.",
        emailPlaceholder: "E-Mail (optional)",
        phone: "Telefon",
        phonePlaceholder: "+49 30 12345678",
        show: "Anzeigen",
        logoPlaceholder: "Klicken oder ziehen Sie Ihr Logo hierher",
        columnSettings: "Spalteneinstellungen",
        columnSettingsDesc: "Passen Sie die Spaltenüberschriften an.",
        labelQty: "Beschriftung Menge",
        labelUnitPrice: "Beschriftung Einzelpreis",
        invoiceType: {
            invoice: "Rechnung",
            quote: "Angebot",
            proforma: "Proforma-Rechnung",
            credit_note: "Gutschrift",
            receipt: "Zahlungsbeleg"
        },
        headerSubtitle: "Das ultraschnelle Rechnungstool für Freelancer. Kostenlos & Ohne Anmeldung.",
        headerSecure: "100% Privat & Sicher.",
        headerDataPrivacy: "Ihre Daten bleiben in Ihrem Browser.",
        sponsorTitle: "Sind Sie Freelancer?",
        sponsorText: "Entdecken Sie die besten Tools für Ihr Business (Bank, Versicherung, Buchhaltung).",
        sponsorBadge: "Sponsorenbereich (Demnächst)",
        downloadToast: "Dokument heruntergeladen und gespeichert!",
        generating: "Generieren...",
        downloadPdf: "PDF Herunterladen",
        demoIssuerName: "Mein Unternehmen",
        demoIssuerAddress: "Friedensstraße 123, 10115 Berlin",
        demoIssuerSiret: "DE123456789",
        demoIssuerEmail: "kontakt@meinefirma.de",
        demoIssuerPhone: "+49 30 12345678",
        demoClientName: "VIP Kunde",
        demoClientAddress: "Hauptallee 456, 10115 Berlin",
        demoClientEmail: "kunde@vip.de",
        demoPaymentInfo: "IBAN: DE76 1234 5678 9101 1121 3\nBIC: BANKDE76",
        demoLegalMentions: "Verzugszinsen: 3-facher gesetzlicher Zinssatz.\nPauschale Mahngebühr: 40€.",
        signatureDraw: "Zeichnen",
        signatureImport: "Hochladen",
        signatureClear: "Löschen",
        signatureValidate: "Unterschrift übernehmen",
        signaturePlaceholder: "Hier unterschreiben",
        vatNumber: "USt-IdNr.",
        deliveryAddress: "Lieferadresse",
        deliveryAddressToggle: "Abweichende Lieferadresse?",
        noDiscount: "Kein Skonto bei vorzeitiger Zahlung.",
        retentionReminder: "Erinnerung: Denken Sie daran, Ihre Rechnungen 10 Jahre lang aufzubewahren.",
        issuerTitle: "Aussteller (Sie)",
        clientTitle: "Kunde",
        showEmailOnInvoice: "E-Mail auf Rechnung anzeigen",
        siretOptional: "Steuernummer / USt-IdNr. (Optional)",
        paymentTerms: "Zahlungsbedingungen",
        currency: "Währung",
        accentColor: "Akzentfarbe",
        vatNotApplicable: "USt. nicht anwendbar, Art. 293 B des CGI",
        tooltipInvoiceNumber: "Eindeutige Nummer zur Identifizierung Ihres Dokuments erforderlich",
        tooltipDate: "Ausstellungsdatum des Dokuments",
        tooltipIssuerName: "Ihr Firmenname oder vollständiger Name",
        tooltipIssuerSiret: "Steuernummer oder Registrierungsnummer (erforderlich für Unternehmen)",
        tooltipClientName: "Vollständiger Name des Kunden oder Firmenname",
        legalTemplateTitle: "Vorlagen für rechtliche Hinweise",
        legalTemplateDescription: "Wählen Sie eine vorgefüllte Vorlage entsprechend Ihrem Status",
        legalTemplateFreelance: "Freiberufler: Verzugszinsen: 3-facher gesetzlicher Zinssatz.\nPauschale Mahngebühr: 40€.\nBei Zahlungsverzug werden Strafen ohne Mahnung fällig.",
        legalTemplateCompany: "Unternehmen (GmbH): Zahlungsbedingungen: 30 Tage Ende des Monats.\nVerzugszinsen: gemäß EZB-Satz + 10 Punkte.\nPauschale Mahngebühr: 40€.\nKein Skonto bei vorzeitiger Zahlung.",
        legalTemplateSimple: "Verzugszinsen: 3-facher gesetzlicher Zinssatz.\nPauschalgebühr: 40€.",
        emailInvalid: "Ungültige E-Mail-Adresse",
        status: {
            draft: "Entwurf",
            sent: "Gesendet",
            paid: "Bezahlt",
            late: "Überfällig"
        },
        stats: {
            revenue: "Umsatz (Monat)",
            pending: "Ausstehend"
        },
        feature_free: "100% Kostenlos",
        feature_local: "Sicher & Unbegrenzt",
        feature_fast: "Ultra Schnell",
        feature_save: "Verlauf & Backups",
        history_title: "VERLAUF",
        history_empty: "Noch kein Verlauf.",
        history_tooltip: "Verlauf & Backups",
        // UI Buttons & Actions
        newInvoice: "Neue Rechnung",
        save: "Speichern",
        load: "Laden",
        // Toast messages
        toastDraftRestored: "Entwurf wiederhergestellt",
        toastInvoiceLoaded: "Rechnung aus Verlauf geladen",
        toastNewInvoice: "Neue Rechnung erstellt",
        toastInvoiceSaved: "Rechnung gespeichert!",
        toastSavedDescription: "Ihr Entwurf ist sicher in Ihrem Browser.",
        // Section titles
        generalInfo: "Allgemeine Informationen",
        // Payment terms
        paymentOnReceipt: "Bei Erhalt",
        paymentDays: "Tage",
        selectOption: "Auswählen",
        // Tooltips
        tooltipGeneralInfo: "💡 Verwenden Sie eine eindeutige chronologische Nummer (z.B. RE-2024-001). Dies ist gesetzlich vorgeschrieben und erleichtert Ihre Buchhaltung.",
        tooltipIssuerInfo: "💡 Ihre Daten werden automatisch gespeichert. Die Steuernummer ist für Unternehmen erforderlich.",
        tooltipClientInfo: "💡 Für B2B ist die USt-IdNr. wichtig bei Geschäften mit europäischen Unternehmen. Die vollständige Adresse ist Pflicht.",
        tooltipOptionsInfo: "💡 Kleinunternehmer? Deaktivieren Sie die MwSt. und fügen Sie den entsprechenden Hinweis hinzu. Vergessen Sie nicht Ihre IBAN.",
        // EI mention
        eiReminder: "Einzelunternehmer? Der Hinweis kann erforderlich sein.",
        addEI: "Hinweis hinzufügen",
        // Affiliation
        needProAccount: "Brauchen Sie ein Geschäftskonto?",
        affiliationDescription: "Trennen Sie geschäftliche und private Einnahmen. 1 Monat kostenlos.",
        seeOffer: "Angebot ansehen",
        // Toggles
        showPaymentInfoToggle: "Zahlungsinfo anzeigen",
        showLegalMentionsToggle: "Rechtliche Hinweise anzeigen",
        // Down payment
        downPaymentInvoice: "Anzahlungsrechnung",
        // Header
        headerTagline: "Der kostenlose Rechnungsgenerator für Freelancer",
        helpCenter: "Hilfe-Center",
        securityBadge: "100% Privat & Sicher",
        // Footer
        footerReassurance: "Kein Konto nötig. Keine Daten gesammelt. Lokal generiert.",
        footerHelpCenter: "Hilfe-Center & Ressourcen",
        footerLegalMentions: "Impressum",
        footerPrivacyPolicy: "Datenschutz",
        footerTerms: "Nutzungsbedingungen",
        footerCopyright: "© 2025 Freazy",
        // History drawer
        historyDescription: "Ihre erstellten Dokumente werden hier 1 Monat gespeichert (im Browser).",
        historyTip: "Tipp: Klicken Sie auf den Status-Button (z.B. Entwurf), um ihn zu ändern.",
        historyGenerateTip: "Erstellen Sie ein PDF, um es hier anzuzeigen.",
        historyConfirmReplace: "Achtung: Diese Aktion ersetzt Ihren gesamten Verlauf durch die Datei. Fortfahren?",
        exportCSVTooltip: "Als CSV exportieren (Excel)",
        exportJSONTooltip: "Daten speichern (JSON)",
        importTooltip: "Backup wiederherstellen",
        deleteAllTooltip: "Alles löschen"
    },
    pt: {
        invoice: "FATURA",
        quote: "ORÇAMENTO",
        proforma: "FATURA PRÓ-FORMA",
        credit_note: "NOTA DE CRÉDITO",
        receipt: "RECIBO DE PAGAMENTO",
        date: "Data",
        dueDate: "Data de vencimento",
        quoteValidity: "Válido até",
        billedTo: "Faturado a",
        quoteBilledTo: "Exmo.(s) Sr.(s)",
        receivedFrom: "Recebido de",
        paymentDate: "Data de pagamento",
        description: "DESCRIÇÃO",
        qty: "QTD",
        unitPrice: "PREÇO UNIT.",
        total: "Total a Pagar",
        subtotal: "Subtotal",
        vat: "IVA",
        totalDue: "TOTAL A PAGAR",
        quoteTotal: "Total do orçamento",
        creditAmount: "Valor da nota de crédito",
        amountPaid: "Valor pago",
        paymentInfo: "Informações de pagamento",
        legalMentions: "Menções legais",
        footer: "Gerado gratuitamente com Free Facture",
        signature: "Assinatura:",
        number: "Nº",
        creditNoteNumber: "Nota de crédito Nº",
        defaultIssuerName: "Minha Empresa",
        defaultItemDescription: "Serviço",
        settingsTitle: "Configurações e Idioma",
        language: "Idioma",
        documentType: "Tipo de documento",
        detailsTitle: "Detalhes do documento",
        fullAddress: "Endereço completo",
        itemsTitle: "Itens e Serviços",
        totalsTitle: "Totais e IVA",
        legalTitle: "Legal e Pagamento",
        signatureTitle: "Assinatura",
        signatureSize: "Tamanho da assinatura",
        add: "Adicionar",
        vatRate: "Taxa de IVA (%)",
        vatEnabled: "Ativar IVA",
        paymentInfoPlaceholder: "IBAN, BIC, Paypal...",
        legalMentionsPlaceholder: "Condições de pagamento...",
        clientNamePlaceholder: "Nome do cliente",
        clientAddressPlaceholder: "Endereço do cliente",
        issuerNamePlaceholder: "Nome da sua empresa",
        issuerAddressPlaceholder: "Endereço da sua empresa",
        siretPlaceholder: "NIF / Matrícula",
        emailPlaceholder: "Email (opcional)",
        phone: "Telefone",
        phonePlaceholder: "+351 21 123 4567",
        show: "Mostrar",
        logoPlaceholder: "Clique ou arraste seu logotipo aqui",
        columnSettings: "Configurações de colunas",
        columnSettingsDesc: "Personalize os cabeçalhos das colunas.",
        labelQty: "Rótulo Quantidade",
        labelUnitPrice: "Rótulo Preço Unitário",
        invoiceType: {
            invoice: "Fatura",
            quote: "Orçamento",
            proforma: "Fatura Pró-forma",
            credit_note: "Nota de Crédito",
            receipt: "Recibo"
        },
        headerSubtitle: "A ferramenta de faturação ultrarrápida para freelancers. Grátis e sem registo.",
        headerSecure: "100% Privado e Seguro.",
        headerDataPrivacy: "Os seus dados permanecem no seu navegador.",
        sponsorTitle: "É freelancer?",
        sponsorText: "Descubra as melhores ferramentas para gerir o seu negócio (Banca, Seguros, Contabilidade).",
        sponsorBadge: "Espaço Patrocinador (Em breve)",
        downloadToast: "Documento descarregado e guardado!",
        generating: "A gerar...",
        downloadPdf: "Descarregar PDF",
        demoIssuerName: "Minha Empresa",
        demoIssuerAddress: "Rua da Paz 123, 1000-001 Lisboa",
        demoIssuerSiret: "PT123456789",
        demoIssuerEmail: "contacto@minhaempresa.pt",
        demoIssuerPhone: "+351 21 123 4567",
        demoClientName: "Cliente VIP",
        demoClientAddress: "Avenida Principal 456, 1000-002 Lisboa",
        demoClientEmail: "cliente@vip.pt",
        demoPaymentInfo: "IBAN: PT76 1234 5678 9101 1121 3\nBIC: BANKPT76",
        demoLegalMentions: "Penalidades por atraso: 3 vezes a taxa de juro legal.\nIndemnização forfetária por despesas de cobrança: 40€.",
        signatureDraw: "Desenhar",
        signatureImport: "Importar",
        signatureClear: "Limpar",
        signatureValidate: "Aplicar assinatura",
        signaturePlaceholder: "Assine aqui",
        vatNumber: "NIF / IVA",
        deliveryAddress: "Endereço de entrega",
        deliveryAddressToggle: "Endereço de entrega diferente?",
        noDiscount: "Sem desconto para pagamento antecipado.",
        retentionReminder: "Lembrete: Lembre-se de guardar as suas faturas durante 10 anos.",
        issuerTitle: "Emitente (Você)",
        clientTitle: "Cliente",
        showEmailOnInvoice: "Mostrar email na fatura",
        siretOptional: "NIF / Matrícula (Opcional)",
        paymentTerms: "Prazo de pagamento",
        currency: "Moeda",
        accentColor: "Cor de destaque",
        vatNotApplicable: "IVA não aplicável, art. 293 B do CGI",
        tooltipInvoiceNumber: "Número único necessário para identificar o seu documento",
        tooltipDate: "Data de emissão do documento",
        tooltipIssuerName: "Nome da sua empresa ou nome completo",
        tooltipIssuerSiret: "NIF ou número de registo (obrigatório para empresas)",
        tooltipClientName: "Nome completo do cliente ou razão social",
        legalTemplateTitle: "Modelos de menções legais",
        legalTemplateDescription: "Escolha um modelo pré-preenchido de acordo com o seu estatuto",
        legalTemplateFreelance: "Trabalhador independente: Penalidades por atraso: 3 vezes a taxa de juros legal.\nIndemnização forfetária por despesas de cobrança: 40€.\nEm caso de atraso de pagamento, as penalidades são exigíveis sem necessidade de lembrete.",
        legalTemplateCompany: "Empresa (Lda): Condições de pagamento: 30 dias fim do mês.\nPenalidades por atraso: de acordo com taxa BCE + 10 pontos.\nIndemnização forfetária: 40€.\nSem desconto para pagamento antecipado.",
        legalTemplateSimple: "Penalidades por atraso: 3 vezes a taxa de juros legal.\nIndemnização forfetária: 40€.",
        emailInvalid: "Endereço de email inválido",
        status: {
            draft: "Rascunho",
            sent: "Enviada",
            paid: "Paga",
            late: "Em atraso"
        },
        stats: {
            revenue: "Faturamento (Mês)",
            pending: "Pendente"
        },
        feature_free: "100% Grátis",
        feature_local: "Seguro e Ilimitado",
        feature_fast: "Ultra Rápido",
        feature_save: "Histórico e Backups",
        history_title: "HISTÓRICO",
        history_empty: "Sem histórico ainda.",
        history_tooltip: "Histórico e Backups",
        // UI Buttons & Actions
        newInvoice: "Nova Fatura",
        save: "Salvar",
        load: "Carregar",
        // Toast messages
        toastDraftRestored: "Rascunho restaurado",
        toastInvoiceLoaded: "Fatura carregada do histórico",
        toastNewInvoice: "Nova fatura criada",
        toastInvoiceSaved: "Fatura salva!",
        toastSavedDescription: "Seu rascunho está seguro no navegador.",
        // Section titles
        generalInfo: "Informações Gerais",
        // Payment terms
        paymentOnReceipt: "No recebimento",
        paymentDays: "dias",
        selectOption: "Selecionar",
        // Tooltips
        tooltipGeneralInfo: "💡 Use uma numeração cronológica única (ex: FAT-2024-001). É obrigatório por lei e facilita a contabilidade.",
        tooltipIssuerInfo: "💡 Seus dados são salvos automaticamente. O NIF é obrigatório. Se é freelancer, é o seu número de contribuinte.",
        tooltipClientInfo: "💡 Para B2B, o NIF é importante ao trabalhar com empresas europeias. O endereço completo é obrigatório.",
        tooltipOptionsInfo: "💡 Pequena empresa? Desative o IVA e adicione a menção de isenção. Não se esqueça do IBAN para pagamentos.",
        // EI mention
        eiReminder: "Empresário Individual? A menção pode ser obrigatória.",
        addEI: "Adicionar menção",
        // Affiliation
        needProAccount: "Precisa de uma conta empresarial?",
        affiliationDescription: "Separe os rendimentos profissionais e pessoais. 1 mês grátis.",
        seeOffer: "Ver oferta",
        // Toggles
        showPaymentInfoToggle: "Mostrar info de pagamento",
        showLegalMentionsToggle: "Mostrar menções legais",
        // Down payment
        downPaymentInvoice: "Fatura de adiantamento",
        // Header
        headerTagline: "O gerador de faturas gratuito para freelancers",
        helpCenter: "Centro de ajuda",
        securityBadge: "100% Privado e Seguro",
        // Footer
        footerReassurance: "Sem conta. Sem dados coletados. Gerado localmente.",
        footerHelpCenter: "Centro de ajuda e Recursos",
        footerLegalMentions: "Aviso Legal",
        footerPrivacyPolicy: "Política de Privacidade",
        footerTerms: "Termos de Uso",
        footerCopyright: "© 2025 Freazy",
        // History drawer
        historyDescription: "Os documentos gerados são guardados aqui durante 1 mês (no navegador).",
        historyTip: "Dica: Clique no botão de estado (ex: Rascunho) para alterá-lo.",
        historyGenerateTip: "Gere um PDF para vê-lo aparecer aqui.",
        historyConfirmReplace: "Atenção: Esta ação substituirá todo o histórico pelo do arquivo. Continuar?",
        exportCSVTooltip: "Exportar como CSV (Excel)",
        exportJSONTooltip: "Guardar dados (JSON)",
        importTooltip: "Restaurar backup",
        deleteAllTooltip: "Apagar tudo"
    }
};
