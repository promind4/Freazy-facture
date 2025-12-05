/**
 * Script de génération du sitemap.xml
 * Lance avec: npm run build:sitemap
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://freazy.vercel.app';

// Définition des pages avec leurs priorités SEO
const pages = [
    // Accueil - priorité maximale
    { path: '/', priority: 1.0, changefreq: 'weekly' },

    // Landing Pages SEO - priorité haute
    { path: '/facture-auto-entrepreneur', priority: 0.9, changefreq: 'weekly' },
    { path: '/faire-un-devis-gratuit', priority: 0.9, changefreq: 'weekly' },
    { path: '/facture-freelance', priority: 0.9, changefreq: 'weekly' },
    { path: '/facture-sans-tva', priority: 0.9, changefreq: 'weekly' },
    { path: '/facture-association', priority: 0.9, changefreq: 'weekly' },
    { path: '/facture-en-anglais', priority: 0.9, changefreq: 'weekly' },
    { path: '/facture-pro-forma', priority: 0.9, changefreq: 'weekly' },
    { path: '/modele-facture', priority: 0.9, changefreq: 'weekly' },

    // Centre d'aide - priorité moyenne
    { path: '/aide', priority: 0.5, changefreq: 'monthly' },
];

// Génération du XML
function generateSitemap() {
    const today = new Date().toISOString().split('T')[0];

    const urlEntries = pages.map(page => `
    <url>
        <loc>${SITE_URL}${page.path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority.toFixed(1)}</priority>
    </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

    return sitemap;
}

// Écriture du fichier
const sitemapContent = generateSitemap();
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

fs.writeFileSync(outputPath, sitemapContent.trim(), 'utf-8');

console.log('✅ sitemap.xml généré avec succès !');
console.log(`📍 Chemin: ${outputPath}`);
console.log(`🌐 URL: ${SITE_URL}/sitemap.xml`);
console.log(`📄 ${pages.length} pages indexées`);
