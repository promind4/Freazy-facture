import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eraser, Upload, PenTool, Image as ImageIcon, Trash2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { i18n, type Language } from "@/lib/i18n";

interface SignatureInputProps {
    value?: string;
    onChange: (value: string) => void;
    language?: Language;
    scale?: number;
    onScaleChange?: (scale: number) => void;
}

export function SignatureInput({ value, onChange, language = 'fr', scale = 100, onScaleChange }: SignatureInputProps) {
    const sigCanvas = useRef<SignatureCanvas>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const t = i18n[language];

    // Fix Canvas Offset (Parallax)
    useEffect(() => {
        const resizeCanvas = () => {
            if (containerRef.current && sigCanvas.current) {
                const canvas = sigCanvas.current.getCanvas();
                const container = containerRef.current;

                // Match canvas internal dimensions to its display dimensions
                // This fixes the offset/parallax issue
                const ratio = Math.max(window.devicePixelRatio || 1, 1);
                canvas.width = container.offsetWidth * ratio;
                canvas.height = container.offsetHeight * ratio;

                // Scale context to ensure drawing looks correct on high DPI screens
                const ctx = canvas.getContext("2d");
                if (ctx) ctx.scale(ratio, ratio);

                // Clear after resize as content is lost
                sigCanvas.current.clear();
                setIsSigning(false);
            }
        };

        // Initial resize
        resizeCanvas();

        // Resize on window change
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);

    const handleClear = () => {
        sigCanvas.current?.clear();
        setIsSigning(false);
        // We don't clear the parent state immediately on clear, only on "Validate" or explicit delete
    };

    const handleBegin = () => {
        setIsSigning(true);
    };

    const handleValidate = () => {
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            // Use getCanvas() directly to avoid trimming issues with high-DPI scaling
            const dataUrl = sigCanvas.current.getCanvas().toDataURL("image/png");
            console.log("Validating signature, length:", dataUrl.length);
            onChange(dataUrl);
            toast.success(t.signatureValidate + " ✔");
        } else {
            toast.error(language === 'fr' ? "Veuillez dessiner une signature avant de valider." : "Please draw a signature before validating.");
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    };

    const processFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error(language === 'fr' ? "Format non supporté. Utilisez PNG, JPG ou GIF." : "Unsupported format. Use PNG, JPG or GIF.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error(language === 'fr' ? "Fichier trop volumineux (Max 5MB)." : "File too large (Max 5MB).");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            onChange(reader.result as string);
            toast.success(t.signatureImport + " ✔");
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">{t.signatureTitle}</Label>
                {value && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 h-8"
                        onClick={() => {
                            onChange("");
                            sigCanvas.current?.clear();
                            setIsSigning(false);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                            toast.info(language === 'fr' ? "Signature supprimée" : "Signature removed");
                        }}
                    >
                        <Trash2 className="h-4 w-4 mr-2" /> {language === 'fr' ? 'Supprimer' : 'Delete'}
                    </Button>
                )}
            </div>

            <Tabs defaultValue="draw" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="draw">
                        <PenTool className="h-4 w-4 mr-2" /> {t.signatureDraw}
                    </TabsTrigger>
                    <TabsTrigger value="upload">
                        <Upload className="h-4 w-4 mr-2" /> {t.signatureImport}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="draw" className="space-y-4">
                    <div
                        ref={containerRef}
                        className="border-2 border-dashed border-gray-300 rounded-lg bg-white overflow-hidden relative h-40 w-full"
                    >
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            minWidth={1.5}
                            maxWidth={3.5}
                            canvasProps={{
                                className: "w-full h-full cursor-crosshair",
                                style: { touchAction: "none" }
                                // Width and height are handled by the resize effect
                            }}
                            onBegin={handleBegin}
                        />
                        {!isSigning && !value && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                                <span className="text-2xl font-handwriting text-gray-400">{t.signaturePlaceholder}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <Button type="button" variant="secondary" size="sm" onClick={handleClear}>
                            <Eraser className="h-4 w-4 mr-2" /> {t.signatureClear}
                        </Button>

                        <Button type="button" onClick={handleValidate} className="bg-green-600 hover:bg-green-700 text-white">
                            <Check className="h-4 w-4 mr-2" /> {t.signatureValidate}
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="upload">
                    <div
                        className={cn(
                            "flex flex-col items-center justify-center w-full h-40 px-4 transition bg-white border-2 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none",
                            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                        )}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {value ? (
                            <img src={value} alt="Signature" className="h-full object-contain" />
                        ) : (
                            <div className="flex flex-col items-center space-y-2 text-gray-500">
                                <ImageIcon className="h-8 w-8" />
                                <span className="font-medium text-sm">
                                    {isDragging ? (language === 'fr' ? "Déposez l'image ici" : "Drop image here") : (language === 'fr' ? "Cliquez ou glissez une image" : "Click or drag an image")}
                                </span>
                                <span className="text-xs text-gray-400">PNG, JPG, GIF (Max 5MB)</span>
                            </div>
                        )}
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </div>
                </TabsContent>
            </Tabs>

            {/* Scale Slider */}
            {value && onScaleChange && (
                <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between text-sm">
                        <Label>{language === 'fr' ? "Taille de la signature" : "Signature Size"}</Label>
                        <span className="text-muted-foreground">{scale}%</span>
                    </div>
                    <input
                        type="range"
                        min="50"
                        max="150"
                        step="5"
                        value={scale}
                        onChange={(e) => onScaleChange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            )}
        </div>
    );
}
