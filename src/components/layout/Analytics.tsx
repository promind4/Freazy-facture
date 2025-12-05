import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export function Analytics() {
    const location = useLocation();
    const GA_ID = import.meta.env.VITE_GA_ID;

    useEffect(() => {
        if (!GA_ID) return;

        // Initialize GA4 if not already done
        if (!window.gtag) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', GA_ID);
        }
    }, [GA_ID]);

    // Track page views on route change
    useEffect(() => {
        if (!GA_ID || !window.gtag) return;

        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: location.pathname,
        });
    }, [location, GA_ID]);

    return null;
}
