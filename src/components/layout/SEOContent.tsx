import { ChevronDown, ArrowUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LandingPageContent } from "@/data/landing-pages";
import { ShareButtons } from "./ShareButtons";

interface SEOContentProps {
    content?: LandingPageContent;
}

export const SEOContent = ({ content }: SEOContentProps) => {
    // Fallback to default content if not provided (though it should always be provided via routing)
    if (!content) return null;

    return (
        <section className="max-w-4xl mx-auto px-4 py-12 space-y-16 text-gray-700">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 leading-tight">
                {content.title}
            </h1>

            {/* Guide Section */}
            <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">
                    {content.summary}
                </p>
                <h2 className="text-3xl font-bold text-gray-900">{content.guide.title}</h2>
                <p
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: content.guide.intro }}
                />
                <div className="grid md:grid-cols-3 gap-8 mt-8">
                    {content.guide.steps.map((step, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="text-4xl font-bold text-blue-600 mb-4">{step.number}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Comparison Section (Static - Relevant for all pages) */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Pourquoi utiliser Freazy plutôt qu'Excel ?</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="py-4 px-4 font-semibold">Fonctionnalité</th>
                                <th className="py-4 px-4 font-bold text-blue-600">Freazy</th>
                                <th className="py-4 px-4 text-gray-500">Excel / Word</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-100">
                                <td className="py-4 px-4">Calculs automatiques (TVA, Totaux)</td>
                                <td className="py-4 px-4 text-green-600 font-medium">✅ Automatique</td>
                                <td className="py-4 px-4 text-red-500">❌ Manuel (risques d'erreurs)</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-4 px-4">Mentions légales obligatoires</td>
                                <td className="py-4 px-4 text-green-600 font-medium">✅ Toujours à jour</td>
                                <td className="py-4 px-4 text-red-500">❌ À vérifier soi-même</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-4 px-4">Design professionnel</td>
                                <td className="py-4 px-4 text-green-600 font-medium">✅ Immédiat</td>
                                <td className="py-4 px-4 text-red-500">❌ Difficile à mettre en page</td>
                            </tr>
                            <tr className="border-b border-gray-100">
                                <td className="py-4 px-4">Confidentialité des données</td>
                                <td className="py-4 px-4 text-green-600 font-medium">✅ 100% Local (Navigateur)</td>
                                <td className="py-4 px-4 text-gray-500">⚠️ Local (mais pas de backup auto)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Target Audience Section */}
            {content.targetAudience && (
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-gray-900">{content.targetAudience.title}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.targetAudience.categories.map((category, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="font-bold text-lg text-primary mb-4 min-h-[3rem] flex items-center">{category.name}</h3>
                                <ul className="space-y-2">
                                    {category.items.map((item, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-gray-600">
                                            <Check className="h-4 w-4 text-green-500 mr-2 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FAQ Section */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Questions Fréquentes</h2>
                <div className="space-y-4">
                    {content.faq.map((item, index) => (
                        <details key={index} className="group bg-white rounded-lg border border-gray-200 p-4 [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-medium text-gray-900">
                                <h3 className="text-lg">{item.question}</h3>
                                <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                            </summary>
                            <p
                                className="mt-4 leading-relaxed text-gray-700"
                                dangerouslySetInnerHTML={{ __html: item.answer }}
                            />
                        </details>
                    ))}
                </div>
            </div>

            <ShareButtons url={`https://freazy.fr${content.slug}`} title={content.title} />

            {/* Closing CTA */}
            <div className="flex justify-center pt-8 pb-12">
                <Button
                    size="lg"
                    className="text-lg px-8 py-6 h-auto shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Créer ma première facture maintenant
                    <ArrowUp className="ml-2 h-5 w-5" />
                </Button>
            </div>
        </section>
    );
};
