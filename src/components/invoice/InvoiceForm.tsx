import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Issuer } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Invoice, DEFAULT_CURRENCY, DEFAULT_VAT_RATE } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useEffect, useRef, useState } from "react";
import { Plus, Trash2, Settings, Globe, Coins, Copy, Info, RotateCcw, ChevronDown, Building2, User, Package, FileText, PenTool, Save, HelpCircle } from "lucide-react";
import { addDays } from "date-fns";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { HistoryDrawer } from "./HistoryDrawer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useInvoiceHistory } from "@/hooks/use-invoice-history";
import { SignatureInput } from "./SignatureInput";
import { i18n, type Language } from "@/lib/i18n";
import { useSmartData } from "@/hooks/use-smart-data";
import { Autocomplete } from "@/components/ui/autocomplete";
import { AFFILIATION } from "@/config/affiliation";


const COLORS = [
    "#000000", // Black
    "#2563eb", // Blue
    "#dc2626", // Red
    "#16a34a", // Green
    "#d97706", // Amber
    "#7c3aed", // Violet
];

// Schema validation
const invoiceSchema = z.object({
    number: z.string().min(1, "Required"),
    date: z.string().min(1, "Required"),
    dueDate: z.string().optional(),
    issuer: z.object({
        name: z.string().min(1, "Required"),
        address: z.string().min(1, "Required"),
        siret: z.string().min(1, "Required"),
        phone: z.string().optional(),
        email: z.string()
            .optional()
            .refine(
                (email) => !email || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email),
                { message: "Invalid email address" }
            ),
        logo: z.string().optional(),
        vatNumber: z.string().optional(),
    }),
    client: z.object({
        name: z.string().min(1, "Required"),
        address: z.string().min(1, "Required"),
        email: z.string()
            .optional()
            .refine(
                (email) => !email || /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email),
                { message: "Invalid email address" }
            ),
        siret: z.string().optional(),
        vatNumber: z.string().optional(),
    }),
    items: z.array(
        z.object({
            description: z.string().min(1, "Required"),
            quantity: z.union([z.number(), z.string()]),
            unitPrice: z.union([z.number(), z.string()]),
        })
    ).min(1, "Add at least one item"),
    vatEnabled: z.boolean(),
    vatRate: z.union([z.number(), z.string()]),
    paymentInfo: z.string().optional(),
    legalMentions: z.string().optional(),
    color: z.string().optional(),
    type: z.enum(['invoice', 'quote', 'proforma', 'credit_note', 'receipt']),
    language: z.enum(['fr', 'en', 'es', 'it', 'de', 'pt']),
    currency: z.string(),
    signature: z.string().optional(),
    signatureScale: z.number().optional(),
    notes: z.string().optional(),
    paymentTerms: z.string().optional(),
    quantityLabel: z.string().optional(),
    unitPriceLabel: z.string().optional(),
    showIssuerName: z.boolean().optional(),
    showIssuerEmail: z.boolean().optional(),
    showIssuerPhone: z.boolean().optional(),
    showClientEmail: z.boolean().optional(),
    showPaymentInfo: z.boolean().optional(),
    showLegalMentions: z.boolean().optional(),
    showDueDate: z.boolean().optional(),
    deliveryAddress: z.string().optional(),
});

interface InvoiceFormProps {
    onUpdate?: (invoice: Invoice) => void;
}

export function InvoiceForm({ onUpdate }: InvoiceFormProps) {
    const { saveToHistory } = useInvoiceHistory();
    const { searchClients, searchItems } = useSmartData();
    const [issuerProfile, setIssuerProfile] = useLocalStorage<Issuer | null>("issuer-profile", null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [currentDraft, setCurrentDraft] = useLocalStorage<any | null>("current_draft", null);
    const [isSaving, setIsSaving] = useState(false);

    // Detect browser language
    const getBrowserLanguage = (): Language => {
        const lang = navigator.language.split('-')[0];
        return (['fr', 'en', 'es', 'it', 'de', 'pt'].includes(lang) ? lang : 'fr') as Language;
    };

    const defaultLanguage = getBrowserLanguage();

    const form = useForm<z.infer<typeof invoiceSchema>>({
        resolver: zodResolver(invoiceSchema),
        defaultValues: {
            number: "FAC-2024-001",
            date: new Date().toISOString(),
            issuer: issuerProfile ? { ...issuerProfile, phone: issuerProfile.phone || "" } : {
                name: "",
                address: "",
                siret: "",
                email: "",
                phone: "",
                logo: "",
            },
            client: {
                name: "",
                address: "",
                email: "",
            },
            items: [
                { description: "", quantity: 1, unitPrice: 0 }
            ],
            vatEnabled: true,
            vatRate: DEFAULT_VAT_RATE,
            paymentInfo: "",
            legalMentions: "",
            color: "#000000",
            type: typeof window !== 'undefined' && window.location.pathname.includes('devis') ? 'quote' : 'invoice',
            language: defaultLanguage,
            currency: "EUR",
            signature: "",
            signatureScale: 100,
            paymentTerms: "0",
            quantityLabel: i18n[defaultLanguage].qty,
            unitPriceLabel: i18n[defaultLanguage].unitPrice,
            showIssuerName: true,
            showIssuerEmail: true,
            showIssuerPhone: true,
            showClientEmail: true,
            showPaymentInfo: true,
            showLegalMentions: true,
            showDueDate: true,
            deliveryAddress: "",
        },
    });



    // Load draft on mount
    useEffect(() => {
        if (currentDraft) {
            // Only load if it's a valid draft object
            try {
                // We need to handle dates carefully
                const draft = { ...currentDraft };

                // Reset form with draft values
                // We merge with default values to ensure new fields are present
                // Also ensure all optional string fields have empty string defaults to prevent
                // "uncontrolled to controlled" warnings
                form.reset({
                    ...form.getValues(), // Keep defaults for missing fields
                    ...draft,
                    // Ensure dates are valid strings
                    date: draft.date || new Date().toISOString(),
                    dueDate: draft.dueDate || undefined,
                    paymentTerms: draft.paymentTerms?.toString() || "0",
                    // Ensure issuer fields are never undefined
                    issuer: {
                        name: draft.issuer?.name || "",
                        address: draft.issuer?.address || "",
                        siret: draft.issuer?.siret || "",
                        email: draft.issuer?.email || "",
                        phone: draft.issuer?.phone || "",
                        logo: draft.issuer?.logo || "",
                        vatNumber: draft.issuer?.vatNumber || "",
                    },
                    // Ensure client fields are never undefined
                    client: {
                        name: draft.client?.name || "",
                        address: draft.client?.address || "",
                        email: draft.client?.email || "",
                        siret: draft.client?.siret || "",
                        vatNumber: draft.client?.vatNumber || "",
                    },
                    // Ensure arrays are arrays
                    items: Array.isArray(draft.items) ? draft.items : [{ description: "", quantity: 1, unitPrice: 0 }],
                    // Ensure optional string fields have defaults
                    paymentInfo: draft.paymentInfo || "",
                    legalMentions: draft.legalMentions || "",
                    notes: draft.notes || "",
                    signature: draft.signature || "",
                    deliveryAddress: draft.deliveryAddress || "",
                    quantityLabel: draft.quantityLabel || i18n[defaultLanguage].qty,
                    unitPriceLabel: draft.unitPriceLabel || i18n[defaultLanguage].unitPrice,
                });
                toast.success(t.toastDraftRestored);
            } catch (e) {
                console.error("Failed to restore draft", e);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on mount

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    // Smart Defaults Logic
    const language = form.watch("language");
    const previousLanguageRef = useRef(defaultLanguage);

    useEffect(() => {
        const prevLang = previousLanguageRef.current;
        if (prevLang !== language) {
            const currentValues = form.getValues();
            const prevDefaults = i18n[prevLang];
            const newDefaults = i18n[language];

            if (currentValues.issuer.name === prevDefaults.defaultIssuerName) {
                form.setValue("issuer.name", newDefaults.defaultIssuerName);
            }
            if (currentValues.quantityLabel === prevDefaults.qty) {
                form.setValue("quantityLabel", newDefaults.qty);
            }
            if (currentValues.unitPriceLabel === prevDefaults.unitPrice) {
                form.setValue("unitPriceLabel", newDefaults.unitPrice);
            }

            const items = currentValues.items || [];
            items.forEach((item, index) => {
                if (item.description.startsWith(prevDefaults.defaultItemDescription)) {
                    const newDesc = item.description.replace(prevDefaults.defaultItemDescription, newDefaults.defaultItemDescription);
                    form.setValue(`items.${index}.description`, newDesc);
                }
            });

            previousLanguageRef.current = language;
        }
    }, [language, form]);

    // Auto-Due Date Calculation
    const date = form.watch("date");
    const paymentTerms = form.watch("paymentTerms");

    useEffect(() => {
        if (date && paymentTerms) {
            const days = parseInt(paymentTerms);
            if (!isNaN(days) && days >= 0) {
                const newDueDate = addDays(new Date(date), days).toISOString();
                form.setValue("dueDate", newDueDate);
            }
        }
    }, [date, paymentTerms, form]);

    // Duplicate Item
    const handleDuplicateItem = (index: number) => {
        const item = fields[index];
        append({ ...item });
    };

    const processFile = (file: File) => {
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                form.setValue("issuer.logo", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    };

    // Watch all fields to update preview and persist issuer
    useEffect(() => {
        // Initial update
        const initialValues = form.getValues();
        const initialInvoice: Invoice = {
            id: "preview",
            number: initialValues.number || "",
            date: initialValues.date || "",
            dueDate: initialValues.dueDate,
            issuer: initialValues.issuer as Issuer,
            client: initialValues.client as Invoice['client'],
            items: (initialValues.items || []).map((item, index) => ({
                id: index.toString(),
                description: item?.description || "",
                quantity: Number(item?.quantity || 0),
                unitPrice: Number(item?.unitPrice || 0)
            })),
            currency: initialValues.currency || DEFAULT_CURRENCY,
            vatEnabled: initialValues.vatEnabled ?? true,
            vatRate: Number(initialValues.vatRate || 0),
            paymentInfo: initialValues.paymentInfo,
            legalMentions: initialValues.legalMentions,
            color: initialValues.color,
            type: initialValues.type as Invoice['type'],
            language: initialValues.language as 'fr' | 'en',
            signature: initialValues.signature,
            signatureScale: initialValues.signatureScale,
            deliveryAddress: initialValues.deliveryAddress,
        };
        onUpdate?.(initialInvoice);

        const subscription = form.watch((value) => {
            const currentValues = value;

            // Sync issuer to local storage
            if (currentValues.issuer) {
                // @ts-expect-error - Issuer type mismatch with local storage
                setIssuerProfile(currentValues.issuer);
            }

            // Auto-save draft
            setIsSaving(true);
            const timeoutId = setTimeout(() => {
                setCurrentDraft(currentValues);
                setIsSaving(false);
            }, 1000); // Debounce 1s

            return () => clearTimeout(timeoutId);
        });
        return () => subscription.unsubscribe();
    }, [form, setIssuerProfile, setCurrentDraft, onUpdate]);

    const values = form.watch();
    const t = i18n[values.language as Language];

    // Construct current invoice object for PDF generation
    const currentInvoice: Invoice = {
        id: "download",
        number: values.number || "DRAFT",
        date: values.date || new Date().toISOString().split("T")[0],
        dueDate: values.dueDate,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        issuer: (values.issuer as any) || { name: "", address: "", siret: "" },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        client: (values.client as any) || { name: "", address: "" },
        items: (values.items || []).map((item, index) => ({
            id: index.toString(),
            description: item?.description || "",
            quantity: Number(item?.quantity || 0),
            unitPrice: Number(item?.unitPrice || 0)
        })),
        currency: values.currency || DEFAULT_CURRENCY,
        vatEnabled: values.vatEnabled ?? true,
        vatRate: Number(values.vatRate || 0),
        paymentInfo: values.paymentInfo,
        legalMentions: values.legalMentions,
        color: values.color,
        type: values.type as Invoice['type'],
        language: values.language as Language,
        signature: values.signature,
        signatureScale: values.signatureScale,
        quantityLabel: values.quantityLabel,
        unitPriceLabel: values.unitPriceLabel,
        showIssuerName: values.showIssuerName ?? true,
        showIssuerEmail: values.showIssuerEmail ?? true,
        showIssuerPhone: values.showIssuerPhone ?? true,
        showClientEmail: values.showClientEmail ?? true,
        showPaymentInfo: values.showPaymentInfo ?? true,
        showLegalMentions: values.showLegalMentions ?? true,
        showDueDate: values.showDueDate ?? true,
        deliveryAddress: values.deliveryAddress,
    };

    // Update parent preview immediately when values change
    useEffect(() => {
        onUpdate?.(currentInvoice);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values, onUpdate]);



    return (
        <Form {...form}>
            <form className="space-y-8 pb-20">
                {/* Reassurance Block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    <div className="flex flex-col items-center text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                            <Coins className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-xs font-semibold text-blue-900">{t.feature_free}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></svg>
                        </div>
                        <span className="text-xs font-semibold text-green-900">{t.feature_local}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-purple-50 rounded-lg border border-purple-100">
                        <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        </div>
                        <span className="text-xs font-semibold text-purple-900">{t.feature_fast}</span>
                    </div>
                    <div className="flex flex-col items-center text-center p-3 bg-amber-50 rounded-lg border border-amber-100">
                        <div className="p-2 bg-white rounded-full shadow-sm mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
                        </div>
                        <span className="text-xs font-semibold text-amber-900">
                            {isSaving ? t.generating : t.feature_save}
                        </span>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mb-4">
                    <HistoryDrawer
                        onLoadInvoice={(invoice) => {
                            // Reset form with history invoice
                            form.reset({
                                ...form.getValues(),
                                ...invoice,
                                // Ensure dates are valid strings
                                date: invoice.date || new Date().toISOString(),
                                dueDate: invoice.dueDate,
                                items: invoice.items,
                                paymentTerms: invoice.paymentTerms?.toString(),
                            });
                            toast.success(t.toastInvoiceLoaded);
                        }}
                        language={values.language as Language}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setCurrentDraft(null);
                            // Reset to defaults but keep issuer
                            const currentIssuer = form.getValues().issuer;
                            form.reset({
                                number: "FAC-2024-001",
                                date: new Date().toISOString(),
                                dueDate: undefined,
                                issuer: currentIssuer,
                                client: { name: "", address: "", email: "", siret: "", vatNumber: "" },
                                items: [{ description: "", quantity: 1, unitPrice: 0 }],
                                vatEnabled: true,
                                vatRate: 20,
                                paymentInfo: "",
                                legalMentions: "",
                                color: "#000000",
                                type: "invoice",
                                language: defaultLanguage,
                                currency: "EUR",
                                signature: "",
                                signatureScale: 100,
                                paymentTerms: "0",
                                quantityLabel: i18n[defaultLanguage].qty,
                                unitPriceLabel: i18n[defaultLanguage].unitPrice,
                                showIssuerName: true,
                                showIssuerEmail: true,
                                showIssuerPhone: true,
                                showClientEmail: true,
                                showPaymentInfo: true,
                                showLegalMentions: true,
                                showDueDate: true,
                                notes: "",
                                deliveryAddress: "",
                            });
                            toast.success(t.toastNewInvoice);
                        }}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        {t.newInvoice}
                    </Button>

                </div>

                <Accordion type="multiple" defaultValue={["general", "issuer", "client", "items", "options"]} className="space-y-4">
                    {/* 1. General */}
                    <AccordionItem value="general" className="bg-white border rounded-lg shadow-sm">
                        <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center gap-2">
                                <Settings className="h-4 w-4 text-muted-foreground" />
                                <span>{t.generalInfo}</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="max-w-xs bg-slate-800 text-white">
                                            <p className="text-xs">{t.tooltipGeneralInfo}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-4 pt-4">
                            {/* Document Type Select */}
                            <div className="flex justify-center w-full max-w-xs mx-auto">
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild>
                                                    <FormControl>
                                                        <Button variant="outline" role="combobox" className={cn("w-full justify-between", !field.value && "text-muted-foreground")}>
                                                            {field.value ? t.invoiceType[field.value as keyof typeof t.invoiceType] : t.documentType}
                                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                    <DropdownMenuItem onSelect={() => {
                                                        const value = "invoice";
                                                        field.onChange(value);
                                                        const currentNumber = form.getValues("number");
                                                        const newPrefix = "INV-";
                                                        const prefixes = ["INV-", "DEV-", "EST-", "PRO-", "CN-", "REC-"];
                                                        const foundPrefix = prefixes.find(p => currentNumber.startsWith(p));
                                                        if (foundPrefix) {
                                                            form.setValue("number", currentNumber.replace(foundPrefix, newPrefix));
                                                        } else if (!currentNumber.includes("-") && /^\d+$/.test(currentNumber)) {
                                                            form.setValue("number", `${newPrefix}${currentNumber}`);
                                                        }
                                                    }}>
                                                        {t.invoiceType.invoice}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => {
                                                        const value = "quote";
                                                        field.onChange(value);
                                                        const currentNumber = form.getValues("number");
                                                        const newPrefix = "EST-";
                                                        const prefixes = ["INV-", "DEV-", "EST-", "PRO-", "CN-", "REC-"];
                                                        const foundPrefix = prefixes.find(p => currentNumber.startsWith(p));
                                                        if (foundPrefix) {
                                                            form.setValue("number", currentNumber.replace(foundPrefix, newPrefix));
                                                        } else if (!currentNumber.includes("-") && /^\d+$/.test(currentNumber)) {
                                                            form.setValue("number", `${newPrefix}${currentNumber}`);
                                                        }
                                                    }}>
                                                        {t.invoiceType.quote}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => {
                                                        const value = "proforma";
                                                        field.onChange(value);
                                                        const currentNumber = form.getValues("number");
                                                        const newPrefix = "PRO-";
                                                        const prefixes = ["INV-", "DEV-", "EST-", "PRO-", "CN-", "REC-"];
                                                        const foundPrefix = prefixes.find(p => currentNumber.startsWith(p));
                                                        if (foundPrefix) {
                                                            form.setValue("number", currentNumber.replace(foundPrefix, newPrefix));
                                                        } else if (!currentNumber.includes("-") && /^\d+$/.test(currentNumber)) {
                                                            form.setValue("number", `${newPrefix}${currentNumber}`);
                                                        }
                                                    }}>
                                                        {t.invoiceType.proforma}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => {
                                                        const value = "credit_note";
                                                        field.onChange(value);
                                                        const currentNumber = form.getValues("number");
                                                        const newPrefix = "CN-";
                                                        const prefixes = ["INV-", "DEV-", "EST-", "PRO-", "CN-", "REC-", "AC-"];
                                                        const foundPrefix = prefixes.find(p => currentNumber.startsWith(p));
                                                        if (foundPrefix) {
                                                            form.setValue("number", currentNumber.replace(foundPrefix, newPrefix));
                                                        } else if (!currentNumber.includes("-") && /^\d+$/.test(currentNumber)) {
                                                            form.setValue("number", `${newPrefix}${currentNumber}`);
                                                        }
                                                    }}>
                                                        {t.invoiceType.credit_note}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => {
                                                        // Acompte (Down Payment) logic
                                                        // Usually treated as an invoice but with a specific label or type if supported
                                                        // For now, we'll treat it as a separate type if the schema supports it, 
                                                        // or just change the prefix and title.
                                                        // Assuming 'invoice' type but with 'AC-' prefix and maybe a note.
                                                        // But wait, if I change the type to something not in the enum, it might break.
                                                        // Let's check the Zod schema or types.
                                                        // If 'down_payment' is not a valid type, I should stick to 'invoice' but change the title/prefix.
                                                        // However, the user asked for "Presets".
                                                        // Let's add a "Facture d'acompte" option that sets type to 'invoice' but changes prefix to 'AC-'.

                                                        const value = "invoice";
                                                        field.onChange(value);
                                                        const currentNumber = form.getValues("number");
                                                        const newPrefix = "AC-";
                                                        const prefixes = ["INV-", "DEV-", "EST-", "PRO-", "CN-", "REC-", "AC-"];
                                                        const foundPrefix = prefixes.find(p => currentNumber.startsWith(p));
                                                        if (foundPrefix) {
                                                            form.setValue("number", currentNumber.replace(foundPrefix, newPrefix));
                                                        } else if (!currentNumber.includes("-") && /^\d+$/.test(currentNumber)) {
                                                            form.setValue("number", `${newPrefix}${currentNumber}`);
                                                        }
                                                        // Optionally set a default description or title if possible
                                                    }}>
                                                        Facture d'acompte
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => {
                                                        const value = "receipt";
                                                        field.onChange(value);
                                                        const currentNumber = form.getValues("number");
                                                        const newPrefix = "REC-";
                                                        const prefixes = ["INV-", "DEV-", "EST-", "PRO-", "CN-", "REC-"];
                                                        const foundPrefix = prefixes.find(p => currentNumber.startsWith(p));
                                                        if (foundPrefix) {
                                                            form.setValue("number", currentNumber.replace(foundPrefix, newPrefix));
                                                        } else if (!currentNumber.includes("-") && /^\d+$/.test(currentNumber)) {
                                                            form.setValue("number", `${newPrefix}${currentNumber}`);
                                                        }
                                                    }}>
                                                        {t.invoiceType.receipt}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name="language"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel className="flex items-center gap-2 text-xs text-gray-600"><Globe className="h-3 w-3" /> {t.language}</FormLabel>
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild>
                                                    <FormControl>
                                                        <Button variant="outline" role="combobox" className={cn("w-full justify-between h-9 text-sm", !field.value && "text-muted-foreground")}>
                                                            {field.value === 'fr' && "Français 🇫🇷"}
                                                            {field.value === 'en' && "English 🇬🇧"}
                                                            {field.value === 'es' && "Español 🇪🇸"}
                                                            {field.value === 'it' && "Italiano 🇮🇹"}
                                                            {field.value === 'de' && "Deutsch 🇩🇪"}
                                                            {field.value === 'pt' && "Português 🇵🇹"}
                                                            {!field.value && t.language}
                                                            <ChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                    <DropdownMenuItem onSelect={() => field.onChange("fr")}>Français 🇫🇷</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("en")}>English 🇬🇧</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("es")}>Español 🇪🇸</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("it")}>Italiano 🇮🇹</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("de")}>Deutsch 🇩🇪</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("pt")}>Português 🇵🇹</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="currency"
                                    render={({ field }) => (
                                        <FormItem className="space-y-1">
                                            <FormLabel className="flex items-center gap-2 text-xs text-gray-600"><Coins className="h-3 w-3" /> {t.currency}</FormLabel>
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild>
                                                    <FormControl>
                                                        <Button variant="outline" role="combobox" className={cn("w-full justify-between h-9 text-sm", !field.value && "text-muted-foreground")}>
                                                            {field.value === 'EUR' && "Euro (€)"}
                                                            {field.value === 'USD' && "Dollar ($)"}
                                                            {field.value === 'GBP' && "Livre (£)"}
                                                            {!field.value && "Devise"}
                                                            <ChevronDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                    <DropdownMenuItem onSelect={() => field.onChange("EUR")}>Euro (€)</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("USD")}>Dollar ($)</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("GBP")}>Livre (£)</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 sm:items-end">
                                <FormField
                                    control={form.control}
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col sm:col-span-2">
                                            <FormLabel className="flex items-center gap-1.5">
                                                {t.number}
                                                <span className="inline-flex" title={t.tooltipInvoiceNumber}>
                                                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input className="h-10" placeholder="INV-2025-001" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="flex items-center gap-1.5">
                                                {t.date}
                                                <span className="inline-flex" title={t.tooltipDate}>
                                                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                                </span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    className="h-10"
                                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            field.onChange(new Date(e.target.value).toISOString());
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <div className="flex items-center justify-between">
                                                <FormLabel>{values.type === 'quote' ? t.quoteValidity : t.dueDate}</FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor="show-due-date" className="text-xs text-muted-foreground font-normal">
                                                        {t.show || "Afficher"}
                                                    </Label>
                                                    <FormField
                                                        control={form.control}
                                                        name="showDueDate"
                                                        render={({ field: switchField }) => (
                                                            <Switch
                                                                id="show-due-date"
                                                                checked={switchField.value}
                                                                onCheckedChange={switchField.onChange}
                                                                className="scale-75"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    className="h-10"
                                                    value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                    disabled={!values.showDueDate}
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            field.onChange(new Date(e.target.value).toISOString());
                                                        }
                                                    }}
                                                    style={{ opacity: !values.showDueDate ? 0.5 : 1 }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="paymentTerms"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.paymentTerms}</FormLabel>
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild disabled={!values.showDueDate}>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn("w-full justify-between", !field.value && "text-muted-foreground")}
                                                            style={{ opacity: !values.showDueDate ? 0.5 : 1 }}
                                                        >
                                                            {field.value === "0" && t.paymentOnReceipt}
                                                            {field.value === "15" && `15 ${t.paymentDays}`}
                                                            {field.value === "30" && `30 ${t.paymentDays}`}
                                                            {field.value === "45" && `45 ${t.paymentDays}`}
                                                            {field.value === "60" && `60 ${t.paymentDays}`}
                                                            {!field.value && t.selectOption}
                                                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                                                    <DropdownMenuItem onSelect={() => field.onChange("0")}>{t.paymentOnReceipt}</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("15")}>15 {t.paymentDays}</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("30")}>30 {t.paymentDays}</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("45")}>45 {t.paymentDays}</DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => field.onChange("60")}>60 {t.paymentDays}</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="color"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.accentColor}</FormLabel>
                                            <div className="flex gap-2">
                                                {COLORS.map((color) => (
                                                    <div
                                                        key={color}
                                                        className={`w-8 h-8 rounded-full cursor-pointer border-2 ${field.value === color ? 'border-black' : 'border-transparent'}`}
                                                        style={{ backgroundColor: color }}
                                                        onClick={() => field.onChange(color)}
                                                    />
                                                ))}
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. Issuer */}
                    <AccordionItem value="issuer" className="bg-white border rounded-lg shadow-sm">
                        <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span>{t.issuerTitle}</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="max-w-xs bg-slate-800 text-white">
                                            <p className="text-xs">{t.tooltipIssuerInfo}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-4 pt-4">
                            <div className="flex items-center gap-4">
                                {values.issuer?.logo && (
                                    <div className="relative">
                                        <img src={values.issuer.logo} alt="Logo" className="h-16 w-16 object-contain border rounded" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                            onClick={() => {
                                                form.setValue("issuer.logo", "");
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = "";
                                                }
                                            }}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                )}
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="logo">Logo</Label>
                                    <div
                                        className={cn(
                                            "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
                                            isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary"
                                        )}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Input
                                            ref={fileInputRef}
                                            id="logo"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleLogoUpload}
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <Plus className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="text-sm text-muted-foreground">
                                                {t.logoPlaceholder}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="issuer.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center justify-between">
                                            <FormLabel>{t.issuerNamePlaceholder}</FormLabel>
                                            <div className="flex items-center gap-2">
                                                <Label htmlFor="show-issuer-name" className="text-xs text-muted-foreground font-normal">
                                                    {t.show || "Afficher"}
                                                </Label>
                                                <FormField
                                                    control={form.control}
                                                    name="showIssuerName"
                                                    render={({ field: switchField }) => (
                                                        <Switch
                                                            id="show-issuer-name"
                                                            checked={switchField.value}
                                                            onCheckedChange={switchField.onChange}
                                                            className="scale-75"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <FormControl>
                                            <Input
                                                placeholder={t.issuerNamePlaceholder}
                                                {...field}
                                                disabled={!values.showIssuerName}
                                                className={!values.showIssuerName ? "opacity-50" : ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                        {field.value && field.value.length > 3 && !/\b(EI|Entrepreneur Individuel)\b/i.test(field.value) && (
                                            <div className="flex items-center gap-2 mt-2 p-2 text-xs text-amber-700 bg-amber-50 rounded border border-amber-200">
                                                <Info className="h-4 w-4 shrink-0" />
                                                <span className="flex-1">
                                                    {t.eiReminder}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-6 text-xs bg-white border-amber-300 hover:bg-amber-100 ml-auto"
                                                    onClick={() => field.onChange(`${field.value} (EI)`)}
                                                >
                                                    {t.addEI}
                                                </Button>
                                            </div>
                                        )}
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="issuer.siret"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SIRET</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t.siretPlaceholder} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="issuer.vatNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.vatNumber}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t.vatNumber} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <FormField
                                    control={form.control}
                                    name="issuer.email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>{t.emailPlaceholder}</FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor="show-issuer-email" className="text-xs text-muted-foreground font-normal">
                                                        {t.show || "Afficher"}
                                                    </Label>
                                                    <FormField
                                                        control={form.control}
                                                        name="showIssuerEmail"
                                                        render={({ field: switchField }) => (
                                                            <Switch
                                                                id="show-issuer-email"
                                                                checked={switchField.value}
                                                                onCheckedChange={switchField.onChange}
                                                                className="scale-75"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    placeholder={t.emailPlaceholder}
                                                    {...field}
                                                    disabled={!values.showIssuerEmail}
                                                    className={!values.showIssuerEmail ? "opacity-50" : ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="issuer.phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>{t.phone || "Téléphone"}</FormLabel>
                                                <div className="flex items-center gap-2">
                                                    <Label htmlFor="show-issuer-phone" className="text-xs text-muted-foreground font-normal">
                                                        {t.show || "Afficher"}
                                                    </Label>
                                                    <FormField
                                                        control={form.control}
                                                        name="showIssuerPhone"
                                                        render={({ field: switchField }) => (
                                                            <Switch
                                                                id="show-issuer-phone"
                                                                checked={switchField.value}
                                                                onCheckedChange={switchField.onChange}
                                                                className="scale-75"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                            <FormControl>
                                                <Input
                                                    placeholder={t.phonePlaceholder || "01 23 45 67 89"}
                                                    {...field}
                                                    disabled={!values.showIssuerPhone}
                                                    className={!values.showIssuerPhone ? "opacity-50" : ""}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="issuer.address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.fullAddress}</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder={t.issuerAddressPlaceholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {AFFILIATION.bank && (
                                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 flex items-center justify-between gap-4 mt-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-indigo-100 p-2 rounded-full">
                                            <Coins className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-indigo-900 text-sm">{t.needProAccount}</h4>
                                            <p className="text-xs text-indigo-700">{t.affiliationDescription}</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200" asChild>
                                        <a href={AFFILIATION.bank} target="_blank" rel="noopener noreferrer">{t.seeOffer}</a>
                                    </Button>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3. Client */}
                    <AccordionItem value="client" className="bg-white border rounded-lg shadow-sm">
                        <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span>{t.clientTitle}</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="max-w-xs bg-slate-800 text-white">
                                            <p className="text-xs">{t.tooltipClientInfo}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-4 pt-4">
                            <FormField
                                control={form.control}
                                name="client.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.clientNamePlaceholder}</FormLabel>
                                        <FormControl>
                                            <Autocomplete
                                                value={field.value}
                                                onChange={field.onChange}
                                                items={searchClients(field.value)}
                                                placeholder={t.clientNamePlaceholder}
                                                getItemValue={(item) => item.name}
                                                renderItem={(item) => (
                                                    <div className="flex flex-col">
                                                        <span>{item.name}</span>
                                                        {item.email && <span className="text-xs text-muted-foreground">{item.email}</span>}
                                                    </div>
                                                )}
                                                onSelect={(item) => {
                                                    form.setValue("client.name", item.name);
                                                    form.setValue("client.address", item.address);
                                                    if (item.email) form.setValue("client.email", item.email);
                                                    if (item.vatNumber) form.setValue("client.vatNumber", item.vatNumber);
                                                    if (item.siret) form.setValue("client.siret", item.siret);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="client.email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.emailPlaceholder}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t.emailPlaceholder} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="showClientEmail"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-xs text-muted-foreground">
                                                    {t.showEmailOnInvoice}
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="client.siret"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.siretOptional}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t.siretPlaceholder} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="client.address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.clientAddressPlaceholder}</FormLabel>
                                        <FormControl>
                                            <Textarea rows={3} placeholder={t.clientAddressPlaceholder} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="client.vatNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t.vatNumber}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t.vatNumber} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Delivery Address Toggle */}
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="delivery-address-toggle"
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                form.setValue("deliveryAddress", "");
                                            } else {
                                                form.setValue("deliveryAddress", undefined);
                                            }
                                        }}
                                        checked={form.watch("deliveryAddress") !== undefined}
                                    />
                                    <Label htmlFor="delivery-address-toggle">{t.deliveryAddressToggle}</Label>
                                </div>

                                {(form.watch("deliveryAddress") !== undefined && form.watch("deliveryAddress") !== null) && (
                                    <FormField
                                        control={form.control}
                                        name="deliveryAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.deliveryAddress}</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        rows={3}
                                                        placeholder={t.deliveryAddress}
                                                        {...field}
                                                        value={field.value || ""}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 4. Items */}
                    <AccordionItem value="items" className="bg-white border rounded-lg shadow-sm">
                        <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center gap-2">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span>{t.itemsTitle}</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="max-w-xs bg-slate-800 text-white">
                                            <p className="text-xs">💡 Détaillez vos prestations pour plus de clarté. Cliquez sur ⚙️ pour personnaliser les intitulés des colonnes ("Jours" au lieu de "Qté" par exemple).</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-4 pt-4">
                            <div className="flex flex-row items-center justify-between mb-4">
                                <span className="text-sm text-muted-foreground hidden sm:inline-block">
                                    Gérez les articles de votre facture
                                </span>
                                <div className="flex gap-2 ml-auto">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-80">
                                            <div className="grid gap-4">
                                                <div className="space-y-2">
                                                    <h4 className="font-medium leading-none">{t.columnSettings}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {t.columnSettingsDesc}
                                                    </p>
                                                </div>
                                                <div className="grid gap-2">
                                                    <FormField
                                                        control={form.control}
                                                        name="quantityLabel"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>{t.labelQty}</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="QTÉ" {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="unitPriceLabel"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>{t.labelUnitPrice}</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="PRIX UNIT." {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })}
                                    >
                                        <Plus className="mr-2 h-4 w-4" /> {t.add}
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid gap-4 sm:grid-cols-12 items-end border p-4 rounded-lg">
                                        <div className="sm:col-span-6">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.description`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{t.description}</FormLabel>
                                                        <FormControl>
                                                            <Autocomplete
                                                                value={field.value}
                                                                onChange={field.onChange}
                                                                items={searchItems(field.value)}
                                                                placeholder={t.defaultItemDescription}
                                                                getItemValue={(item) => item.description}
                                                                renderItem={(item) => (
                                                                    <div className="flex justify-between w-full">
                                                                        <span>{item.description}</span>
                                                                        <span className="text-muted-foreground">{item.unitPrice} €</span>
                                                                    </div>
                                                                )}
                                                                onSelect={(item) => {
                                                                    form.setValue(`items.${index}.description`, item.description);
                                                                    form.setValue(`items.${index}.unitPrice`, item.unitPrice);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{values.quantityLabel || t.qty}</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    const cleanValue = value.replace(/^0+(?=\d)/, '');
                                                                    field.onChange(cleanValue === "" ? "" : cleanValue);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="sm:col-span-3">
                                            <FormField
                                                control={form.control}
                                                name={`items.${index}.unitPrice`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>{values.unitPriceLabel || t.unitPrice}</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="number"
                                                                min="0"
                                                                step="0.01"
                                                                {...field}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    const cleanValue = value.replace(/^0+(?=\d)/, '');
                                                                    field.onChange(cleanValue === "" ? "" : cleanValue);
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="sm:col-span-1 flex flex-col gap-1">
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDuplicateItem(index)}
                                                className="text-muted-foreground hover:text-primary"
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => remove(index)}
                                                disabled={fields.length === 1}
                                                className="text-muted-foreground hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 5. Options */}
                    <AccordionItem value="options" className="bg-white border rounded-lg shadow-sm">
                        <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span>Options & {t.legalTitle}</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <HelpCircle className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help" />
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="max-w-xs bg-slate-800 text-white">
                                            <p className="text-xs">{t.tooltipOptionsInfo}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-6 pt-4">
                            {/* VAT Section */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm border-b pb-2">{t.totalsTitle}</h4>
                                <FormField
                                    control={form.control}
                                    name="vatEnabled"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">{t.vatEnabled}</FormLabel>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                {values.vatEnabled && (
                                    <FormField
                                        control={form.control}
                                        name="vatRate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.vatRate}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        step="0.1"
                                                        placeholder="20"
                                                        {...field}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            const cleanValue = value.replace(/^0+(?=\d)/, '');
                                                            field.onChange(cleanValue === "" ? "" : cleanValue);
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>

                            {/* Legal Section */}
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm border-b pb-2">{t.legalTitle}</h4>
                                <FormField
                                    control={form.control}
                                    name="paymentInfo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.paymentInfo}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t.paymentInfoPlaceholder}
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center space-x-2 mb-4">
                                    <FormField
                                        control={form.control}
                                        name="showPaymentInfo"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-xs text-muted-foreground">
                                                    {t.showPaymentInfoToggle}
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="legalMentions"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t.legalMentions}</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder={t.legalMentionsPlaceholder}
                                                    className="min-h-[100px]"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center space-x-2">
                                    <FormField
                                        control={form.control}
                                        name="showLegalMentions"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal text-xs text-muted-foreground">
                                                    {t.showLegalMentionsToggle}
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 6. Signature */}
                    <AccordionItem value="signature" className="bg-white border rounded-lg shadow-sm">
                        <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center gap-2">
                                <PenTool className="h-4 w-4 text-muted-foreground" />
                                <span>{t.signatureTitle}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-4">
                            <FormField
                                control={form.control}
                                name="signature"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <SignatureInput
                                                value={field.value}
                                                onChange={field.onChange}
                                                scale={values.signatureScale}
                                                onScaleChange={(scale) => form.setValue("signatureScale", scale)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        className="bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                        onClick={() => {
                            // Manual save trigger
                            // 1. Force update local storage (handled by useEffect but good to be explicit if needed, though useEffect is reactive)
                            // 2. Save to history explicitly as a "snapshot"
                            saveToHistory(currentInvoice);
                            toast.success(t.toastInvoiceSaved, {
                                description: t.toastSavedDescription
                            });
                        }}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {t.save}
                    </Button>
                </div>
            </form >
        </Form >
    );
}
