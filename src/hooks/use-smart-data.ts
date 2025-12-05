import { useLocalStorage } from "@/hooks/use-local-storage";

export interface SavedClient {
    name: string;
    address: string;
    email?: string;
    vatNumber?: string;
    siret?: string;
}

export interface SavedItem {
    description: string;
    unitPrice: number;
}

const MAX_SAVED_ITEMS = 50;

export function useSmartData() {
    const [savedClients, setSavedClients] = useLocalStorage<SavedClient[]>("smart_clients", []);
    const [savedItems, setSavedItems] = useLocalStorage<SavedItem[]>("smart_items", []);

    const addClient = (client: SavedClient) => {
        if (!client.name) return;

        setSavedClients((prev) => {
            // Remove existing client with same name (to update it)
            const filtered = prev.filter(c => c.name.toLowerCase() !== client.name.toLowerCase());
            // Add new client at the top
            return [client, ...filtered].slice(0, MAX_SAVED_ITEMS);
        });
    };

    const addItem = (item: SavedItem) => {
        if (!item.description) return;

        setSavedItems((prev) => {
            // Remove existing item with same description
            const filtered = prev.filter(i => i.description.toLowerCase() !== item.description.toLowerCase());
            // Add new item at the top
            return [item, ...filtered].slice(0, MAX_SAVED_ITEMS);
        });
    };

    const searchClients = (query: string) => {
        if (!query) return savedClients;
        const lowerQuery = query.toLowerCase();
        return savedClients.filter(client =>
            client.name.toLowerCase().includes(lowerQuery)
        );
    };

    const searchItems = (query: string) => {
        if (!query) return savedItems;
        const lowerQuery = query.toLowerCase();
        return savedItems.filter(item =>
            item.description.toLowerCase().includes(lowerQuery)
        );
    };

    return {
        savedClients,
        savedItems,
        addClient,
        addItem,
        searchClients,
        searchItems
    };
}
