import { i18n, type Language } from "@/lib/i18n";
import { useState, useEffect } from "react";

export function Footer() {
    const [language, setLanguage] = useState<Language>('fr');

    useEffect(() => {
        // Get language from localStorage (same source as InvoiceForm)
        try {
            const draft = localStorage.getItem('freazy-invoice-draft');
            if (draft) {
                const parsed = JSON.parse(draft);
                if (parsed.language && i18n[parsed.language as Language]) {
                    setLanguage(parsed.language as Language);
                }
            }
        } catch (e) {
            // Ignore parsing errors
        }
    }, []);

    const t = i18n[language];

    return (
        <footer className="border-t bg-slate-50 py-12 mt-auto">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-6">

                {/* Line 1: Reassurance */}
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {t.footerReassurance}
                </p>

                {/* Line 2: Legal Links - Using standard anchor tags for reliable navigation */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm text-muted-foreground">
                    <a href="/aide" className="hover:text-violet-600 transition-colors">
                        {t.footerHelpCenter}
                    </a>
                    <span className="hidden md:inline">•</span>
                    <a href="/aide?open=mentions" className="hover:text-violet-600 transition-colors">
                        {t.footerLegalMentions}
                    </a>
                    <span className="hidden md:inline">•</span>
                    <a href="/aide?open=privacy" className="hover:text-violet-600 transition-colors">
                        {t.footerPrivacyPolicy}
                    </a>
                    <span className="hidden md:inline">•</span>
                    <a href="/aide?open=terms" className="hover:text-violet-600 transition-colors">
                        {t.footerTerms}
                    </a>
                </div>

                {/* Line 3: Copyright */}
                <p className="text-xs text-muted-foreground">{t.footerCopyright}</p>
            </div>
        </footer>
    );
}
