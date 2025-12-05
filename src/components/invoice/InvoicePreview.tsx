import { InvoiceHTMLPreview } from "./InvoiceHTMLPreview";
import { type Invoice } from "@/lib/types";

interface InvoicePreviewProps {
    invoice: Invoice;
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
    return (
        <div className="w-full max-w-[210mm] min-h-[297mm] mx-auto bg-white shadow-2xl rounded-sm">
            <InvoiceHTMLPreview invoice={invoice} />
        </div>
    );
}
