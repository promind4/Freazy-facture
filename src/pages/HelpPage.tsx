import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, HelpCircle, Scale, Globe, CreditCard, type LucideIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { HELP_CONTENT } from "@/data/help-content";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


const iconMap: Record<string, LucideIcon> = {
    Globe,
    CreditCard,
    Scale,
    BookOpen,
    HelpCircle
};

export function HelpPage() {
    const [searchParams] = useSearchParams();
    const [accordionValue, setAccordionValue] = useState<string>("");

    // Get the open param as a string to use as a dependency
    const openParam = searchParams.get("open");

    useEffect(() => {
        if (openParam) {
            setAccordionValue(openParam);

            // Longer timeout to ensure accordion animation completes
            setTimeout(() => {
                const element = document.getElementById(openParam);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
            }, 500);
        }
    }, [openParam]);

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl space-y-12">

            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900">Centre d'Aide & Ressources</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Base de connaissances experte pour les freelances et auto-entrepreneurs.
                </p>
                <Button asChild variant="outline" className="mt-4">
                    <Link to="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour au générateur
                    </Link>
                </Button>
            </div>

            {/* Dynamic Content Sections */}
            {HELP_CONTENT.map((category) => {
                const Icon = iconMap[category.icon] || HelpCircle;

                return (
                    <section key={category.id} className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-3 rounded-lg ${category.color}`}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            {category.articles.map((article, index) => (
                                <Card key={index} className="h-full hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-lg leading-tight">{article.question}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-sm text-gray-600 space-y-2">
                                        <p dangerouslySetInnerHTML={{ __html: article.answer }} />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                );
            })}

            {/* Section C: Informations Légales */}
            <section id="legal-section" className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
                        <Scale className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Informations Légales</h2>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                            value={accordionValue}
                            onValueChange={setAccordionValue}
                        >

                            <AccordionItem value="privacy" id="privacy">
                                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                                    Politique de Confidentialité & RGPD
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 space-y-4">
                                    <p>
                                        <strong>1. Collecte des données :</strong> Le site Freazy est conçu selon le principe du 'Privacy First'. Nous ne collectons aucune donnée personnelle sur nos serveurs. Tout est traité localement dans votre navigateur.
                                    </p>
                                    <p>
                                        <strong>2. Cookies :</strong> Nous n'utilisons aucun cookie publicitaire. Le LocalStorage est utilisé uniquement pour sauvegarder vos brouillons sur votre appareil.
                                    </p>
                                    <p>
                                        <strong>3. Vos droits :</strong> Puisque nous ne stockons rien, vous avez le contrôle total. Pour supprimer vos données, videz simplement le cache de votre navigateur.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="mentions" id="mentions">
                                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                                    Mentions Légales
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 space-y-2">
                                    <p><strong>Éditeur :</strong> Studio Freazy</p>
                                    <p><strong>Contact :</strong>promind303@gmail.com</p>
                                    <p><strong>Hébergement :</strong> Vercel Inc., 340 S Lemon Ave #4133 Walnut, CA 91789, USA.</p>
                                    <p><strong>Propriété :</strong> Tous droits réservés. Reproduction interdite sans autorisation.</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="terms" id="terms">
                                <AccordionTrigger className="text-lg font-semibold text-gray-900">
                                    Conditions Générales d'Utilisation
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 space-y-4">
                                    <p>
                                        <strong>1. Objet :</strong> Freazy est un outil gratuit de génération de PDF fourni 'tel quel'.
                                    </p>
                                    <p>
                                        <strong>2. Responsabilité :</strong> L'utilisateur est seul responsable de l'exactitude des documents créés. Freazy ne pourra être tenu responsable des pertes de données locales ou des erreurs fiscales.
                                    </p>
                                    <p>
                                        <strong>3. Gratuité :</strong> Le service est libre d'accès et sans garantie de disponibilité.
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                        </Accordion>
                    </CardContent>
                </Card>
            </section>

            <div className="flex justify-center pt-8">
                <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Link to="/">
                        Créer ma première facture maintenant
                    </Link>
                </Button>
            </div>
        </div>
    );
}
