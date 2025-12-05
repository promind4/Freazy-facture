import { useLocalStorage } from "@/hooks/use-local-storage";
import { type Invoice } from "@/lib/types";
import { toast } from "sonner";

const HISTORY_DURATION_DAYS = 30;

export function useInvoiceHistory() {
    const [history, setHistory] = useLocalStorage<Invoice[]>("invoice_history", []);

    // Clean up expired items on mount
    // We use a simple check to avoid infinite loops or heavy processing on every render
    // Ideally this should be in a useEffect, but since useLocalStorage might not trigger it immediately
    // we can do it when saving or just rely on the fact that we filter when saving.
    // For robustness, let's filter when saving new items.

    const saveToHistory = (invoice: Invoice) => {
        setHistory((prev) => {
            // Create a copy to avoid mutation
            const newHistory = [invoice, ...prev];

            // Filter out items older than 30 days
            const now = new Date();
            const limitDate = new Date(now.setDate(now.getDate() - HISTORY_DURATION_DAYS));

            return newHistory.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= limitDate;
            });
        });
    };

    const deleteFromHistory = (index: number) => {
        setHistory((prev) => prev.filter((_, i) => i !== index));
        toast.success("Document supprimé de l'historique");
    };

    const clearHistory = () => {
        setHistory([]);
        toast.success("Historique effacé");
    };

    const updateStatus = (index: number, status: Invoice['status']) => {
        setHistory((prev) => {
            const newHistory = [...prev];
            if (newHistory[index]) {
                newHistory[index] = { ...newHistory[index], status };
            }
            return newHistory;
        });
    };

    const getStats = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const thisMonthInvoices = history.filter(inv => {
            const date = new Date(inv.date);
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        });

        const revenue = thisMonthInvoices
            .filter(inv => inv.status === 'paid')
            .reduce((acc, inv) => {
                const subtotal = inv.items.reduce((sum, item) => {
                    const quantity = typeof item.quantity === 'string' ? parseFloat(item.quantity) : item.quantity;
                    const unitPrice = typeof item.unitPrice === 'string' ? parseFloat(item.unitPrice) : item.unitPrice;
                    return sum + (quantity * unitPrice);
                }, 0);
                // Revenue is HT (Hors Taxe)
                return acc + subtotal;
            }, 0);

        const pending = history
            .filter(inv => inv.status === 'sent' || inv.status === 'late')
            .reduce((acc, inv) => {
                const subtotal = inv.items.reduce((sum, item) => {
                    const quantity = typeof item.quantity === 'string' ? parseFloat(item.quantity) : item.quantity;
                    const unitPrice = typeof item.unitPrice === 'string' ? parseFloat(item.unitPrice) : item.unitPrice;
                    return sum + (quantity * unitPrice);
                }, 0);
                // Pending is TTC (Total with VAT)
                const total = subtotal + (inv.vatEnabled ? subtotal * (inv.vatRate / 100) : 0);
                return acc + total;
            }, 0);

        return { revenue, pending };
    };

    const exportData = () => {
        const dataStr = JSON.stringify(history, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `free-facture-backup-${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        toast.success("Sauvegarde téléchargée !");
    };

    const importData = (file: File) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);

                // Basic validation: check if it's an array and has at least one item with 'id' or 'number'
                if (!Array.isArray(json)) {
                    throw new Error("Format invalide : doit être une liste de factures.");
                }

                // We could do deeper validation here using Zod if needed, but for now let's trust the structure roughly
                setHistory(json);
                toast.success("Historique restauré avec succès !");
            } catch (error) {
                console.error("Import error:", error);
                toast.error("Erreur lors de l'import : fichier invalide.");
            }
        };
        reader.readAsText(file);
    };

    const exportCSV = () => {
        // Define headers
        const headers = [
            "Type de document",
            "Numéro",
            "Date d'émission",
            "Date d'échéance",
            "Client",
            "SIRET Client",
            "Total HT",
            "TVA",
            "Total TTC",
            "Statut"
        ];

        // Helper to escape CSV fields
        const escape = (field: string | number | undefined) => {
            if (field === undefined || field === null) return '';
            const stringField = String(field);
            if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
                return `"${stringField.replace(/"/g, '""')}"`;
            }
            return stringField;
        };

        // Generate rows
        const rows = history.map(invoice => {
            // Calculate amounts
            const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
            const vatAmount = invoice.vatEnabled ? subtotal * (invoice.vatRate / 100) : 0;
            const total = subtotal + vatAmount;

            // Format dates
            const formatDate = (dateStr: string | undefined) => {
                if (!dateStr) return '';
                const date = new Date(dateStr);
                return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
            };

            return [
                escape(invoice.type === 'quote' ? 'Devis' : 'Facture'),
                escape(invoice.number),
                escape(formatDate(invoice.date)),
                escape(formatDate(invoice.dueDate)),
                escape(invoice.client.name),
                escape(invoice.client.siret || ''), // Assuming siret might be added to client type later, or custom field
                subtotal.toFixed(2), // Raw number for Excel
                vatAmount.toFixed(2), // Raw number for Excel
                total.toFixed(2),    // Raw number for Excel
                escape(invoice.status || 'draft')
            ].join(',');
        });

        // Combine headers and rows
        const csvContent = [headers.join(','), ...rows].join('\n');

        // Add BOM for Excel compatibility
        const bom = '\uFEFF';
        const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `export_compta_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast.success("Export CSV téléchargé !");
    };

    return {
        history,
        saveToHistory,
        deleteFromHistory,
        clearHistory,
        updateStatus,
        getStats,
        exportData,
        importData,
        exportCSV
    };
}
