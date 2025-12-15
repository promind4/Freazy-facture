import { ShieldCheck } from "lucide-react";
import { AboutModal } from "../modals/AboutModal";
import { i18n, type Language } from "@/lib/i18n";
import { useState, useEffect } from "react";

export function Header() {
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
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-white/70 backdrop-blur-md transition-all">
            <div className="w-full flex h-16 items-center justify-between px-6 sm:px-8">
                {/* Left Zone: Logo & Identity */}
                <div className="flex items-center gap-3">
                    {/* Text Group */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold tracking-tight text-primary leading-none">
                            Freazy
                        </span>
                        <span className="hidden sm:inline-block text-xs font-medium text-muted-foreground">
                            {t.headerTagline}
                        </span>
                    </div>
                </div>

                {/* Right Zone: Reassurance Badge */}
                <div className="flex items-center gap-2 md:gap-4">
                    <AboutModal />
                    <a href="/aide" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        {t.helpCenter}
                    </a>
                    <div className="flex items-center gap-1.5 md:gap-2 rounded-full bg-emerald-50/80 px-2 md:px-3 py-1.5 text-emerald-700 ring-1 ring-emerald-100/50 backdrop-blur-sm">
                        <ShieldCheck className="h-4 w-4 flex-shrink-0" />
                        <span className="text-xs font-semibold whitespace-nowrap">{t.securityBadge}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
