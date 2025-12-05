import { useRef } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2, FileText, ArrowRight, Sparkles, Download, Upload, FileSpreadsheet } from "lucide-react";
import { type Invoice } from "@/lib/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useInvoiceHistory } from "@/hooks/use-invoice-history";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { i18n, type Language } from "@/lib/i18n";
import { CheckCircle2, Clock, Send, FileEdit } from "lucide-react";

interface HistoryDrawerProps {
    onLoadInvoice: (invoice: Invoice) => void;
    language: Language;
}

export function HistoryDrawer({ onLoadInvoice, language }: HistoryDrawerProps) {
    const { history, deleteFromHistory, clearHistory, updateStatus, getStats, exportData, importData, exportCSV } = useInvoiceHistory();
    const stats = getStats();
    const t = i18n[language];
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'paid': return "bg-green-500 hover:bg-green-600";
            case 'sent': return "bg-blue-500 hover:bg-blue-600";
            case 'late': return "bg-red-500 hover:bg-red-600";
            default: return "bg-gray-500 hover:bg-gray-600";
        }
    };

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case 'paid': return <CheckCircle2 className="h-3 w-3 mr-1" />;
            case 'sent': return <Send className="h-3 w-3 mr-1" />;
            case 'late': return <Clock className="h-3 w-3 mr-1" />;
            default: return <FileEdit className="h-3 w-3 mr-1" />;
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="fixed left-0 top-1/3 z-40 flex items-center">
                    <Button
                        type="button"
                        variant="default"
                        className="h-auto py-4 px-1 rounded-l-none rounded-r-lg shadow-lg bg-primary text-primary-foreground hover:translate-x-1 transition-transform duration-200 flex flex-col gap-2"
                        title={t.history_tooltip}
                    >
                        <History className="h-5 w-5" />
                        <span className="text-xs font-bold tracking-widest" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                            {t.history_title}
                        </span>
                    </Button>
                </div>
            </SheetTrigger>
            <SheetContent side="left" className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>
                        {t.history_title}
                    </SheetTitle>
                    <div className="flex flex-wrap gap-2 my-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={exportCSV}
                            className="border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800"
                            title={t.exportCSVTooltip}
                        >
                            <FileSpreadsheet className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">CSV</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={exportData}
                            title={t.exportJSONTooltip}
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                        <input
                            type="file"
                            accept=".json"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    if (window.confirm(t.historyConfirmReplace)) {
                                        importData(file);
                                    }
                                    // Reset input
                                    e.target.value = '';
                                }
                            }}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            title={t.importTooltip}
                        >
                            <Upload className="h-4 w-4" />
                        </Button>
                        {history.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearHistory} className="text-red-500 hover:text-red-600" title={t.deleteAllTooltip}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                    <SheetDescription>
                        {t.historyDescription}
                    </SheetDescription>
                </SheetHeader>

                {history.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-100 flex flex-col justify-between h-28">
                            <div className="text-sm text-green-600 font-medium flex justify-between items-start min-h-[2.5rem]">
                                <span>{t.stats.revenue}</span>
                                <span className="text-xs opacity-70 whitespace-nowrap ml-1 mt-0.5">(HT)</span>
                            </div>
                            <div className="text-2xl font-bold text-green-700">{stats.revenue.toFixed(2)} €</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100 flex flex-col justify-between h-28">
                            <div className="text-sm text-orange-600 font-medium flex justify-between items-start min-h-[2.5rem]">
                                <span>{t.stats.pending}</span>
                                <span className="text-xs opacity-70 whitespace-nowrap ml-1 mt-0.5">(TTC)</span>
                            </div>
                            <div className="text-2xl font-bold text-orange-700">{stats.pending.toFixed(2)} €</div>
                        </div>
                    </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground px-1">
                    <Sparkles className="h-3 w-3 text-yellow-500" />
                    <span>{t.historyTip}</span>
                </div>

                <ScrollArea className="h-[calc(100vh-280px)] mt-2 pr-4">
                    {history.length === 0 ? (
                        <div className="text-center text-muted-foreground py-10">
                            <History className="h-10 w-10 mx-auto mb-4 opacity-20" />
                            <p>{t.history_empty}</p>
                            <p className="text-sm">{t.historyGenerateTip}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((invoice, index) => (
                                <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors relative group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="font-semibold flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-blue-500" />
                                                {invoice.type === 'quote' ? t.invoiceType?.quote || 'Devis' : t.invoiceType?.invoice || 'Facture'} {invoice.number}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {format(new Date(invoice.date), "d MMMM yyyy", { locale: fr })}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <DropdownMenu modal={false}>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                                                        <Badge
                                                            className={`cursor-pointer ${getStatusColor(invoice.status || 'draft')}`}
                                                        >
                                                            {getStatusIcon(invoice.status || 'draft')}
                                                            {t.status[invoice.status || 'draft']}
                                                        </Badge>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => updateStatus(index, 'draft')}>
                                                        <FileEdit className="h-4 w-4 mr-2" /> {t.status.draft}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(index, 'sent')}>
                                                        <Send className="h-4 w-4 mr-2" /> {t.status.sent}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(index, 'paid')}>
                                                        <CheckCircle2 className="h-4 w-4 mr-2" /> {t.status.paid}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => updateStatus(index, 'late')}>
                                                        <Clock className="h-4 w-4 mr-2" /> {t.status.late}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteFromHistory(index);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <div className="truncate max-w-[200px]">
                                            <span className="font-medium">{invoice.client.name}</span>
                                        </div>
                                        <div className="font-bold">
                                            {/* Calculate total roughly for display */}
                                            {(() => {
                                                const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
                                                const total = subtotal + (invoice.vatEnabled ? subtotal * (invoice.vatRate / 100) : 0);
                                                return `${total.toFixed(2)} ${invoice.currency === 'USD' ? '$' : invoice.currency === 'GBP' ? '£' : '€'}`;
                                            })()}
                                        </div>
                                    </div>

                                    <SheetClose asChild>
                                        <Button
                                            variant="secondary"
                                            className="w-full mt-3"
                                            onClick={() => onLoadInvoice(invoice)}
                                        >
                                            {t.load} <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </SheetClose>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
