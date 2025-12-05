export interface HelpCategory {
    id: string;
    title: string;
    icon: string; // Lucide icon name
    color: string; // Tailwind color class for icon background
    articles: {
        question: string;
        answer: string; // HTML allowed
    }[];
}

export const HELP_CONTENT: HelpCategory[] = [
    {
        id: 'tva-international',
        title: "TVA & International (Expert Mode)",
        icon: "Globe",
        color: "bg-blue-100 text-blue-600",
        articles: [
            {
                question: "Facturer un client étranger (UE et Hors UE)",
                answer: "Pour un client professionnel en <b>Union Européenne</b>, vous devez facturer HT (Hors Taxe) et appliquer le mécanisme d'<b>Autoliquidation</b>. Les numéros de TVA intracommunautaire (le vôtre et celui du client) sont obligatoires. N'oubliez pas de faire votre déclaration <b>DES</b> (Déclaration Européenne de Services) sur le site des douanes.<br/><br/>Pour un client <b>Hors UE</b>, la facture est également HT (article 259-1 du CGI). Aucune TVA n'est applicable."
            },
            {
                question: "Quand passer à la TVA (Seuils 2025) ?",
                answer: "Vous devenez redevable de la TVA dès le <b>1er jour du mois de dépassement</b> des seuils (environ 36 800€ pour les services, 91 900€ pour la vente).<br/>Attention : Si vous dépassez le seuil le 15 du mois, toutes les factures émises depuis le 1er du mois doivent être rectifiées pour inclure la TVA. Anticipez ce passage pour éviter de devoir refacturer vos clients."
            }
        ]
    },
    {
        id: 'paiements-litiges',
        title: "Gestion des Paiements & Litiges",
        icon: "CreditCard",
        color: "bg-emerald-100 text-emerald-600",
        articles: [
            {
                question: "Comment facturer un acompte ?",
                answer: "Un acompte ne se facture pas 'à la volée'. Vous devez émettre une <b>Facture d'Acompte</b> spécifique, avec sa propre numérotation. Lors de la facture finale (Facture de Solde), vous devrez rappeler cet acompte et le déduire du montant total à payer pour ne facturer que le reste dû."
            },
            {
                question: "Refacturation de frais vs Débours",
                answer: "La distinction est fiscale. Une <b>Refacturation de frais</b> (ex: train, hôtel) compte dans votre chiffre d'affaires et est soumise à vos cotisations sociales.<br/>Les <b>Débours</b> ne comptent pas dans votre CA, mais sont très stricts : la facture d'origine doit être libellée <b>au nom de votre client</b> (et non au vôtre) et vous devez avoir un mandat écrit."
            }
        ]
    },
    {
        id: 'obligations-legales',
        title: "Obligations Légales 2025",
        icon: "Scale",
        color: "bg-purple-100 text-purple-600",
        articles: [
            {
                question: "La mention EI est-elle obligatoire ?",
                answer: "Oui. Depuis mai 2022, la mention <b>EI</b> (ou 'Entrepreneur Individuel') doit obligatoirement apparaître juste avant ou après votre nom et prénom sur tous vos documents commerciaux (factures, devis, compte bancaire). L'oubli de cette mention peut entraîner une amende de 750€."
            },
            {
                question: "Facture électronique : Calendrier 2026",
                answer: "Pas de panique. L'obligation de <b>réception</b> des factures électroniques démarrera en septembre 2026. L'obligation d'<b>émission</b> pour les micro-entreprises n'arrivera qu'en septembre 2027. D'ici là, vos factures PDF générées par Freazy restent parfaitement valables et légales."
            }
        ]
    }
];
