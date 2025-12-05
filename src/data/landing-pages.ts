export interface LandingPageContent {
    slug: string;
    title: string; // H1
    metaTitle: string;
    metaDescription: string;
    summary: string; // New SEO summary paragraph
    guide: {
        title: string;
        intro: string;
        steps: {
            number: string;
            title: string;
            description: string;
        }[];
    };
    faq: {
        question: string;
        answer: string;
    }[];
    targetAudience?: {
        title: string;
        categories: {
            name: string;
            items: string[];
        }[];
    };
}

export const LANDING_PAGES: Record<string, LandingPageContent> = {
    'home': {
        slug: '/',
        title: "Logiciel de Facturation Gratuit pour Auto-Entrepreneur & Freelance",
        metaTitle: "Freazy - Le générateur de facture gratuit pour freelance",
        metaDescription: "Créez vos factures et devis en PDF en 30 secondes. Outil 100% gratuit, sécurisé et sans inscription. Conforme 2025. Commencez maintenant !",
        summary: "Freazy est la solution de facturation en ligne préférée des indépendants. Notre outil gratuit remplace avantageusement Excel en automatisant tous les calculs et en garantissant des documents conformes aux dernières normes françaises. Aucune inscription n'est requise : vos données restent stockées en toute sécurité sur votre propre appareil.",
        targetAudience: {
            title: "Idéal pour tous les statuts et métiers",
            categories: [
                { name: "Les Créatifs", items: ["Graphistes", "Développeurs Web", "Rédacteurs", "Photographes"] },
                { name: "Les Services", items: ["Consultants", "Coachs", "Formateurs", "VTC"] },
                { name: "Le Bâtiment", items: ["Artisans", "Électriciens", "Plombiers (Rénovation)"] },
                { name: "Les Structures", items: ["Associations", "SCI", "Micro-entreprises"] }
            ]
        },
        guide: {
            title: "Comment faire une facture gratuite en ligne ?",
            intro: "Freazy est l'outil le plus simple pour générer des factures professionnelles sans inscription. Besoin de chiffrer une mission avant de facturer ? Commencez par créer un <a href=\"/faire-un-devis-gratuit\" class=\"text-blue-600 hover:underline\">Devis Gratuit</a>. Voici comment créer votre première facture en moins de 2 minutes :",
            steps: [
                { number: "1", title: "Remplissez vos infos", description: "Indiquez vos coordonnées (SIRET, Adresse) et celles de votre client. Tout est sauvegardé localement sur votre appareil." },
                { number: "2", title: "Ajoutez vos prestations", description: "Détaillez vos services ou produits. Le calcul de la TVA et des totaux se fait automatiquement." },
                { number: "3", title: "Téléchargez le PDF", description: "Cliquez sur \"Télécharger\" pour obtenir une facture PDF propre, légale et prête à être envoyée." }
            ]
        },
        faq: [
            { question: "Est-ce vraiment 100% gratuit ?", answer: "Oui, totalement. Freazy est un logiciel de facturation gratuit sans version 'Premium' cachée ni abonnement mensuel. Vous pouvez éditer un nombre illimité de factures et devis sans filigrane ni frais." },
            { question: "Mes données sont-elles privées ?", answer: "Absolument. Nous avons adopté une architecture 'Privacy First' : contrairement aux logiciels en ligne classiques, nous ne stockons aucune donnée client sur nos serveurs. Tout est enregistré localement dans votre navigateur (LocalStorage), garantissant une confidentialité totale pour votre activité freelance." },
            { question: "Les factures sont-elles valables légalement ?", answer: "Oui. Nos modèles PDF sont conformes aux normes françaises 2025. Ils intègrent automatiquement toutes les mentions obligatoires (SIRET, Numéro séquentiel, Dates, TVA intracommunautaire) et les mentions spécifiques pour les auto-entrepreneurs (Art. 293 B du CGI) ou les pénalités de retard." },
            { question: "Quelles mentions sont obligatoires sur une facture freelance ?", answer: "Pour être valide, une facture doit mentionner : la date d'émission, le numéro de la facture, l'identité complète de l'émetteur (vous) et du client, le détail des prestations (HT), le taux de TVA applicable, et le montant total TTC. Freazy génère ces champs automatiquement pour éviter tout oubli juridique." },
            { question: "Comment faire une facture sans TVA (Auto-entrepreneur) ?", answer: "Si vous bénéficiez de la franchise en base de TVA (statut micro-entrepreneur), vous ne devez pas facturer la TVA. Sur Freazy, désactivez simplement l'option 'Activer la TVA'. La mention légale obligatoire 'TVA non applicable, art. 293 B du CGI' s'ajoutera automatiquement au pied de page de votre document." }
        ]
    },
    'auto-entrepreneur': {
        slug: '/facture-auto-entrepreneur',
        title: "Freazy : Facture Auto-Entrepreneur",
        metaTitle: "Facture Auto-Entrepreneur Gratuite - Freazy",
        metaDescription: "Créez vos factures auto-entrepreneur en 30 secondes. Modèle conforme URSSAF, mention TVA non applicable, 100% gratuit. Téléchargement immédiat.",
        summary: "Ce générateur est spécialement conçu pour répondre aux obligations strictes du régime micro-social. Il intègre nativement la gestion de la franchise en base de TVA et les mentions légales spécifiques aux auto-entrepreneurs, vous évitant ainsi tout risque d'erreur administrative lors de vos déclarations URSSAF.",
        guide: {
            title: "Comment facturer en tant qu'auto-entrepreneur ?",
            intro: "En micro-entreprise, la facturation doit respecter des règles strictes. Freazy s'occupe de tout pour vous :",
            steps: [
                { number: "1", title: "Saisissez votre SIRET", description: "Votre numéro SIRET est obligatoire. Freazy l'affiche clairement sur le document final." },
                { number: "2", title: "Gérez la franchise de TVA", description: "Si vous n'êtes pas assujetti, Freazy ajoute automatiquement la mention 'TVA non applicable, art. 293 B du CGI'." },
                { number: "3", title: "Exportez pour l'URSSAF", description: "Téléchargez votre facture PDF pour vos clients et gardez une trace pour votre déclaration URSSAF." }
            ]
        },
        faq: [
            { question: "La mention 'TVA non applicable' est-elle automatique ?", answer: "Oui, il vous suffit de désactiver l'option TVA dans le formulaire pour que la mention légale 'Article 293 B du CGI' apparaisse automatiquement. Pour plus de détails sur la franchise en base, consultez notre guide sur la <a href=\"/facture-sans-tva\" class=\"text-blue-600 hover:underline\">Facture sans TVA</a>." },
            { question: "Puis-je utiliser ce modèle pour ma déclaration URSSAF ?", answer: "Oui, les factures générées par Freazy sont conformes et servent de justificatif pour votre chiffre d'affaires déclaré à l'URSSAF." },
            { question: "Est-ce adapté aux artisans et commerçants ?", answer: "Tout à fait. Que vous soyez freelance, artisan ou commerçant en auto-entreprise, le modèle s'adapte à votre activité." }
        ]
    },
    'freelance': {
        slug: '/facture-freelance',
        title: "Freazy : Facture Freelance & Indépendant",
        metaTitle: "Facture Freelance Gratuite - Freazy",
        metaDescription: "Le meilleur outil de facturation pour freelances. Simple, rapide et gratuit. Sans inscription ni abonnement. Gagnez du temps dès maintenant !",
        summary: "Optimisez votre temps de gestion avec un outil pensé par et pour les freelances. Freazy vous permet d'émettre des documents à l'aspect ultra-professionnel en quelques secondes, renforçant ainsi votre crédibilité auprès de vos clients tout en simplifiant votre comptabilité quotidienne.",
        guide: {
            title: "Gagnez du temps sur votre facturation freelance",
            intro: "En tant que freelance, chaque minute compte. Ne perdez plus de temps sur Excel :",
            steps: [
                { number: "1", title: "Image de marque pro", description: "Envoyez des factures propres et professionnelles qui renforcent votre crédibilité auprès de vos clients." },
                { number: "2", title: "Zéro erreur de calcul", description: "Fini les erreurs de formules Excel. Freazy calcule les totaux et la TVA sans faute." },
                { number: "3", title: "Dupliquez en un clic", description: "Pour les clients récurrents, reprenez votre dernière facture, changez la date et envoyez. C'est fait." }
            ]
        },
        faq: [
            { question: "Puis-je ajouter mon logo de freelance ?", answer: "Oui, vous pouvez importer votre logo directement sur la facture pour personnaliser votre document." },
            { question: "Comment gérer les acomptes ?", answer: "Vous pouvez créer une facture d'acompte en indiquant clairement 'Acompte' dans la description et le montant correspondant." },
            { question: "Est-ce compatible avec Malt ou Upwork ?", answer: "Oui, vous pouvez utiliser Freazy pour générer vos propres factures en complément ou remplacement de celles des plateformes si besoin." }
        ]
    },
    'modele': {
        slug: '/modele-facture',
        title: "Freazy : Modèle de Facture Gratuit",
        metaTitle: "Modèle de Facture Gratuit à Télécharger - Freazy",
        metaDescription: "Besoin d'un modèle de facture ? Utilisez notre générateur gratuit pour créer des PDF professionnels instantanément. Sans filigrane. Téléchargez !",
        summary: "Oubliez les modèles Word ou Excel complexes et souvent obsolètes. Notre générateur dynamique crée pour vous un modèle de facture PDF parfait, toujours à jour des dernières mentions légales, et personnalisable à l'infini selon vos besoins spécifiques.",
        guide: {
            title: "Pourquoi utiliser notre modèle de facture en ligne ?",
            intro: "Télécharger un modèle Word ou Excel est souvent source de problèmes (mise en page cassée, calculs faux).",
            steps: [
                { number: "1", title: "Plus fiable qu'Excel", description: "Notre modèle web garantit une mise en page parfaite, quel que soit le contenu." },
                { number: "2", title: "Toujours à jour", description: "Les mentions légales changent ? Notre modèle est mis à jour automatiquement, contrairement à un vieux fichier Word." },
                { number: "3", title: "PDF Sécurisé", description: "Générez un fichier PDF non modifiable, format standard pour les échanges commerciaux." }
            ]
        },
        faq: [
            { question: "Le modèle est-il gratuit ?", answer: "Oui, l'utilisation du générateur et le téléchargement du modèle PDF sont 100% gratuits." },
            { question: "Puis-je modifier le modèle ?", answer: "Vous pouvez personnaliser tout le contenu (couleurs, textes, logo) avant de générer le PDF." },
            { question: "Est-ce compatible Mac et PC ?", answer: "Oui, Freazy fonctionne directement dans votre navigateur (Chrome, Safari, Firefox), sur n'importe quel ordinateur." }
        ]
    },
    'devis': {
        slug: '/faire-un-devis-gratuit',
        title: "Freazy : Faire un Devis Gratuit",
        metaTitle: "Faire un Devis Gratuit en Ligne - Freazy",
        metaDescription: "Créez des devis professionnels gratuits en quelques clics. Transformez-les ensuite en factures. Sans inscription. Commencez votre devis ici.",
        summary: "Le devis est la première étape clé d'une relation commerciale réussie. Freazy vous permet de chiffrer vos prestations avec précision et clarté. Une fois validé par votre client, transformez votre devis en facture définitive en un seul clic, sans avoir à tout ressaisir.",
        guide: {
            title: "Comment créer un devis professionnel ?",
            intro: "Avant de facturer, sécurisez votre mission avec un devis clair. Avec Freazy, c'est aussi simple qu'une facture :",
            steps: [
                { number: "1", title: "Sélectionnez 'Devis'", description: "Dans le menu 'Type de document', choisissez 'Devis'. Le titre et les mentions s'adaptent automatiquement." },
                { number: "2", title: "Chiffrez votre prestation", description: "Détaillez vos tarifs et conditions. Le client saura exactement ce qu'il paye." },
                { number: "3", title: "Transformez en facture", description: "Une fois le devis validé, changez simplement le type en 'Facture' pour vous faire payer." }
            ]
        },
        faq: [
            { question: "Quelle est la différence entre un devis et une facture ?", answer: "Le devis est une offre de prix qui engage le prestataire une fois signé par le client. La facture est la demande de paiement une fois la prestation réalisée." },
            { question: "Un devis est-il obligatoire ?", answer: "Il est obligatoire pour les prestations de services > 1500€, les travaux, et fortement recommandé pour sécuriser toute relation commerciale." },
            { question: "Comment transformer mon devis en facture ?", answer: "Sur Freazy, c'est instantané : ouvrez votre devis, changez le type de document en 'Facture', mettez à jour la date, et c'est prêt. Une fois validé, utilisez notre <a href=\"/facture-freelance\" class=\"text-blue-600 hover:underline\">générateur de facture freelance</a> pour convertir votre devis." }
        ]
    },
    'sans-tva': {
        slug: '/facture-sans-tva',
        title: "Freazy : Facture Sans TVA",
        metaTitle: "Facture Sans TVA (Article 293 B du CGI) - Freazy",
        metaDescription: "Générateur de facture sans TVA pour micro-entrepreneurs. Mention Article 293 B du CGI automatique. Gratuit. Conforme loi 2025.",
        summary: "La gestion de la TVA est souvent un casse-tête pour les micro-entrepreneurs. Notre outil simplifie ce processus en appliquant automatiquement les règles de la franchise en base. Il insère les mentions légales obligatoires (Article 293 B du CGI) dès que nécessaire, garantissant la conformité de vos documents.",
        guide: {
            title: "Facturer sans TVA en toute légalité",
            intro: "Pour les micro-entrepreneurs en franchise en base, la TVA ne doit pas apparaître. Freazy sécurise vos documents :",
            steps: [
                { number: "1", title: "Désactivez la TVA", description: "Un simple bouton permet de passer en mode 'Sans TVA'. Les colonnes de taxes disparaissent." },
                { number: "2", title: "Mention Légale Auto", description: "L'outil ajoute automatiquement la phrase obligatoire : 'TVA non applicable, art. 293 B du CGI'." },
                { number: "3", title: "Conformité Totale", description: "Vous êtes sûr d'émettre un document conforme aux exigences de l'administration fiscale." }
            ]
        },
        faq: [
            { question: "Quand dois-je facturer la TVA ?", answer: "Vous devez facturer la TVA si vous dépassez les seuils de chiffre d'affaires de la micro-entreprise (environ 36k€ pour les services, 91k€ pour la vente)." },
            { question: "Où apparaît la mention Article 293 B ?", answer: "Freazy l'insère automatiquement en bas de la facture, dans la section des totaux, dès que la TVA est désactivée." },
            { question: "Puis-je récupérer la TVA avec cet outil ?", answer: "Non, si vous facturez sans TVA (franchise en base), vous ne pouvez pas non plus la récupérer sur vos achats." }
        ]
    },
    'association': {
        slug: '/facture-association',
        title: "Freazy : Facture pour Association",
        metaTitle: "Facture pour Association Gratuite - Freazy",
        metaDescription: "Outil de facturation gratuit pour associations. Simple, sans frais cachés, idéal pour les bénévoles et trésoriers. Essayez sans inscription !",
        summary: "Les associations loi 1901 ont besoin d'outils simples et gratuits pour gérer leurs finances. Freazy est parfaitement adapté aux bénévoles et trésoriers : pas de logiciel comptable complexe, juste un générateur efficace pour émettre des factures de cotisations, de sponsoring ou de ventes diverses.",
        guide: {
            title: "Gérer la facturation d'une association simplement",
            intro: "Les associations ont aussi besoin de facturer (cotisations, ventes, prestations). Freazy est l'outil idéal pour les bénévoles :",
            steps: [
                { number: "1", title: "100% Gratuit", description: "Pas de frais d'abonnement qui pèsent sur le budget de l'asso. C'est vraiment gratuit." },
                { number: "2", title: "Pas de comptable requis", description: "L'interface est si simple que n'importe quel bénévole peut émettre une facture correcte en quelques minutes." },
                { number: "3", title: "Archivage local", description: "Gardez les traces de vos factures sur l'ordinateur de l'association sans dépendre d'un cloud payant." }
            ]
        },
        faq: [
            { question: "Une association peut-elle émettre une facture ?", answer: "Oui, une association peut tout à fait émettre des factures pour ses activités économiques (vente de produits, prestations, sponsoring)." },
            { question: "L'outil est-il gratuit pour les associations ?", answer: "Oui, Freazy est gratuit pour tous, y compris les associations, les clubs sportifs et les ONG." },
            { question: "Faut-il un SIRET pour une association ?", answer: "Oui, dès lors qu'une association émet des factures ou emploie du personnel, elle doit avoir un numéro SIRET." }
        ]
    },
    'anglais': {
        slug: '/facture-en-anglais',
        title: "Freazy : Facture en Anglais",
        metaTitle: "Facture en Anglais Gratuite (Invoice) - Freazy",
        metaDescription: "Générez des factures en anglais (ou espagnol, allemand, italien) gratuitement. Gestion des devises et traduction instantanée. Export facile.",
        summary: "Développez votre activité à l'international sans barrière linguistique. Freazy traduit instantanément vos factures en anglais, espagnol, italien ou allemand et gère les principales devises mondiales. C'est l'outil idéal pour les freelances travaillant avec des clients étrangers.",
        guide: {
            title: "Facturez vos clients internationaux",
            intro: "Le monde est votre marché. Freazy brise la barrière de la langue pour vos factures export :",
            steps: [
                { number: "1", title: "Changez la langue", description: "Passez l'interface en Anglais, Espagnol, Allemand, Italien ou Portugais en un clic." },
                { number: "2", title: "Adaptez la devise", description: "Sélectionnez Dollars ($), Livres (£) ou autre. Les formats monétaires s'adaptent." },
                { number: "3", title: "Mentions Export", description: "Ajoutez facilement les mentions spécifiques pour l'export (TVA intracommunautaire, etc.)." }
            ]
        },
        faq: [
            { question: "Puis-je facturer en Dollars ?", answer: "Oui, vous pouvez choisir n'importe quelle devise (USD, GBP, CHF...) dans les paramètres de la facture." },
            { question: "Le document est-il traduit automatiquement ?", answer: "Oui, tous les champs fixes (Date, Total, Description...) sont traduits instantanément dans la langue choisie." },
            { question: "Quelles sont les mentions pour l'export ?", answer: "Pour l'UE, le numéro de TVA intracommunautaire est crucial. Hors UE, les règles varient, mais une facture claire en anglais est la base. Idéal aussi pour vos <a href=\"/facture-pro-forma\" class=\"text-blue-600 hover:underline\">factures pro-forma</a> à l'export." }
        ]
    },
    'pro-forma': {
        slug: '/facture-pro-forma',
        title: "Freazy : Facture Pro-Forma",
        metaTitle: "Modèle Facture Pro-Forma Gratuit - Freazy",
        metaDescription: "Créez une facture Pro-Forma en quelques secondes. Idéal pour les douanes ou les demandes de paiement anticipé. Sans valeur comptable.",
        summary: "Besoin d'un justificatif pour les douanes ou pour une demande de paiement anticipé ? La facture Pro-Forma est le document qu'il vous faut. Freazy vous permet d'éditer ce document commercial spécifique en quelques clics, en le distinguant clairement d'une facture comptable définitive.",
        guide: {
            title: "À quoi sert une facture Pro-Forma ?",
            intro: "Ce document commercial est particulier. Il ressemble à une facture mais n'en est pas une comptablement :",
            steps: [
                { number: "1", title: "Pour la Douane", description: "Indispensable pour expédier des marchandises hors UE afin de déclarer la valeur en douane." },
                { number: "2", title: "Pour le Paiement", description: "Souvent demandée pour débloquer un crédit ou un paiement anticipé avant l'émission de la facture finale." },
                { number: "3", title: "Sans valeur comptable", description: "Elle ne s'intègre pas dans votre comptabilité et ne doit pas être payée directement (attendre la facture définitive)." }
            ]
        },
        faq: [
            { question: "C'est quoi une facture Pro-Forma ?", answer: "C'est une facture 'pour la forme'. C'est un devis présenté sous la forme d'une facture, souvent utilisé pour les formalités administratives." },
            { question: "Est-ce que ça compte dans le chiffre d'affaires ?", answer: "Non, absolument pas. Seule la facture définitive numérotée compte dans votre CA et votre déclaration de TVA." },
            { question: "Comment faire une Pro-Forma sur Freazy ?", answer: "Sélectionnez simplement 'Facture Pro-Forma' dans le menu déroulant 'Type de document'. Le titre s'adaptera automatiquement." }
        ]
    }
};
