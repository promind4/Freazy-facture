import { useState, useEffect, useCallback, useRef } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    // Track if component is mounted
    const isMounted = useRef(false);

    // Get from local storage then
    // parse stored json or if none return initialValue
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (typeof window === "undefined") {
                return initialValue;
            }
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // Set mounted flag
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = useCallback((value: T | ((val: T) => T)) => {
        try {
            setStoredValue((prev) => {
                // Allow value to be a function so we have same API as useState
                const valueToStore = value instanceof Function ? value(prev) : value;

                // Save to local storage
                if (typeof window !== "undefined") {
                    try {
                        window.localStorage.setItem(key, JSON.stringify(valueToStore));
                        // Dispatch a custom event so other components in the same tab are notified
                        // Use setTimeout to defer the event to avoid triggering setState during render
                        setTimeout(() => {
                            window.dispatchEvent(new Event("local-storage"));
                        }, 0);
                    } catch (storageError) {
                        // Handle QuotaExceededError specifically
                        if (storageError instanceof DOMException &&
                            (storageError.name === 'QuotaExceededError' ||
                                storageError.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
                            console.error('localStorage quota exceeded. Consider clearing old data.');
                            // Show user-friendly error message via custom event
                            if (typeof window !== "undefined" && window.document) {
                                const event = new CustomEvent('storage-quota-exceeded', {
                                    detail: {
                                        key,
                                        message: 'Espace de stockage local plein. Veuillez supprimer d\'anciens documents de l\'historique.'
                                    }
                                });
                                window.dispatchEvent(event);
                            }
                        } else {
                            console.error('Error saving to localStorage:', storageError);
                        }
                        throw storageError; // Re-throw to prevent silent failures
                    }
                }

                return valueToStore;
            });
        } catch (error) {
            console.log(error);
        }
    }, [key]);

    useEffect(() => {
        const handleStorageChange = () => {
            // Only update if component is mounted to avoid setState during render
            if (typeof window !== "undefined" && isMounted.current) {
                try {
                    const item = window.localStorage.getItem(key);
                    setStoredValue(item ? JSON.parse(item) : initialValue);
                } catch (error) {
                    console.log(error);
                }
            }
        }

        // Listen for changes from other tabs
        window.addEventListener('storage', handleStorageChange);
        // Listen for changes from the same tab
        window.addEventListener('local-storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage', handleStorageChange);
        };
    }, [key, initialValue]);

    return [storedValue, setValue];
}

