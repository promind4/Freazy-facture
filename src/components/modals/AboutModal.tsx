import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Zap, Coffee } from "lucide-react";

export function AboutModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors min-h-[44px] px-3 py-2">
                    Pourquoi c'est gratuit ?
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                        Pourquoi Freazy est 100% gratuit ?
                    </DialogTitle>
                    <DialogDescription className="text-base pt-2">
                        Notre mission est de simplifier la vie des freelances, sans coûts cachés.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-violet-100 rounded-lg">
                            <Zap className="h-6 w-6 text-violet-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Simplicité avant tout</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Nous croyons que les outils essentiels ne devraient pas être complexes ou coûteux.
                                Freazy est né d'un besoin personnel de facturer rapidement et simplement.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                            <Shield className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Confidentialité totale</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Vos données restent sur votre appareil (Local Storage).
                                Nous ne stockons aucune facture sur nos serveurs. C'est pourquoi c'est gratuit :
                                nous n'avons pas de coûts de stockage de données !
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Coffee className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-slate-900">Soutenez le projet</h4>
                            <p className="text-slate-600 text-sm mt-1">
                                Le projet est maintenu par passion. Si vous l'aimez, partagez-le autour de vous !
                                C'est la meilleure façon de nous aider à grandir.
                            </p>
                        </div>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}
