import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { SplitScreen } from "@/components/layout/SplitScreen";
import { InvoiceForm } from "@/components/invoice/InvoiceForm";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import { SEOContent } from "@/components/layout/SEOContent";
import { Toaster } from "@/components/ui/sonner";
import { type Invoice, DEFAULT_CURRENCY, DEFAULT_VAT_RATE } from "@/lib/types";
import type { LandingPageContent } from "@/data/landing-pages";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { PDFDocument } from "@/components/invoice/PDFDocument";
import { toast } from "sonner";
import { useInvoiceHistory } from "@/hooks/use-invoice-history";
import { useSmartData } from "@/hooks/use-smart-data";

interface InvoicePageProps {
    content: LandingPageContent;
}

export function InvoicePage({ content }: InvoicePageProps) {
    const [invoice, setInvoice] = useState<Invoice>({
        id: "init",
        number: "",
        date: "",
        issuer: { name: "", address: "", siret: "" },
        client: { name: "", address: "" },
        items: [],
        currency: DEFAULT_CURRENCY,
        vatEnabled: true,
        vatRate: DEFAULT_VAT_RATE,
        type: 'invoice',
        language: 'fr',
    });

    const { saveToHistory } = useInvoiceHistory();
    const { addClient, addItem } = useSmartData();

    const handleDownload = async () => {
        // Save to history
        saveToHistory(invoice);

        // Save smart data
        if (invoice.client.name) {
            addClient({
                name: invoice.client.name,
                address: invoice.client.address,
                email: invoice.client.email,
                vatNumber: invoice.client.vatNumber,
                siret: invoice.client.siret
            });
        }
        invoice.items.forEach(item => {
            if (item.description) {
                addItem({
                    description: item.description,
                    unitPrice: item.unitPrice
                });
            }
        });

        try {
            const blob = await pdf(<PDFDocument invoice={invoice} />).toBlob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `facture-${invoice.number || 'brouillon'}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success("PDF téléchargé avec succès");
        } catch (error) {
            console.error("Erreur lors de la génération du PDF:", error);
            toast.error("Erreur lors de la génération du PDF");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Helmet>
                <title>{content.metaTitle}</title>
                <meta name="description" content={content.metaDescription} />
                <link rel="canonical" href={`https://freazy.fr${content.slug === '/' ? '' : content.slug}`} />
            </Helmet>



            <main className="flex-1 flex flex-col">
                <SplitScreen
                    left={
                        <div className="space-y-6 pb-10">
                            <InvoiceForm onUpdate={setInvoice} />
                        </div>
                    }
                    right={
                        <div className="h-full w-full flex flex-col relative">
                            <div className="mb-4 text-sm text-muted-foreground text-center md:text-left flex items-center justify-between">
                                <span>Aperçu en temps réel</span>
                            </div>
                            <InvoicePreview invoice={invoice} />

                            {/* Responsive Download Button */}
                            {/* Mobile: Sticky Bottom Bar */}
                            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
                                <Button
                                    size="lg"
                                    className="w-full bg-violet-600 hover:bg-violet-700 text-white shadow-sm h-12 text-lg font-semibold"
                                    onClick={handleDownload}
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    Télécharger PDF
                                </Button>
                            </div>

                            {/* Desktop: Floating Ghost Button */}
                            <div className="hidden md:block fixed bottom-8 right-8 z-50">
                                <Button
                                    size="lg"
                                    className="
                                        h-12 rounded-full px-6 
                                        bg-white/80 backdrop-blur-sm 
                                        border border-violet-600/20 
                                        text-violet-600 
                                        shadow-lg shadow-violet-600/10 
                                        hover:bg-violet-600 hover:text-white hover:scale-105
                                        transition-all duration-300
                                    "
                                    onClick={handleDownload}
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    Télécharger PDF
                                </Button>
                            </div>
                        </div>
                    }
                />

                {/* SEO Content Section (Below the fold) */}
                <div className="bg-gray-50 border-t border-gray-200 pb-24 md:pb-0">
                    <SEOContent content={content} key={content.slug} />
                </div>
            </main>

            <Toaster />
        </div>
    );
}
