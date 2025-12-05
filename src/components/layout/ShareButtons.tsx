import { Button } from "@/components/ui/button";
import { Check, Copy, Linkedin, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ShareButtonsProps {
    url?: string;
    title?: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    // Use current window location if url is not provided
    const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const shareTitle = title || "Freazy - Le générateur de facture gratuit pour freelance";

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        toast.success("Lien copié !");
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            color: "hover:text-[#0077b5]"
        },
        {
            name: "X (Twitter)",
            icon: () => (
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
            color: "hover:text-black"
        },
        {
            name: "Facebook",
            icon: Facebook,
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            color: "hover:text-[#4267B2]"
        }
    ];

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100 my-8">
            <div className="text-center sm:text-left">
                <h3 className="font-semibold text-gray-900">Cet outil vous a aidé ?</h3>
                <p className="text-sm text-gray-500">Partagez-le avec d'autres freelances !</p>
            </div>

            <div className="flex items-center gap-2">
                {shareLinks.map((link) => (
                    <Button
                        key={link.name}
                        variant="outline"
                        size="icon"
                        className={`rounded-full transition-colors ${link.color}`}
                        onClick={() => window.open(link.href, '_blank', 'width=600,height=400')}
                        title={`Partager sur ${link.name}`}
                    >
                        <link.icon className="w-4 h-4" />
                    </Button>
                ))}

                <div className="w-px h-8 bg-gray-200 mx-2 hidden sm:block" />

                <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full"
                    onClick={handleCopy}
                >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copié" : "Copier le lien"}
                </Button>
            </div>
        </div>
    );
}
