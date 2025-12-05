import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { InvoicePage } from "@/pages/InvoicePage";
import { LANDING_PAGES } from "@/data/landing-pages";
import { Analytics } from "@/components/layout/Analytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HelpPage } from "@/pages/HelpPage";
import { useEffect } from "react";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnimatedRoutes() {
  return (
    <Routes>
      {/* Main Home Page */}
      <Route path="/" element={<InvoicePage content={LANDING_PAGES['home']} />} />

      {/* SEO Landing Pages - Phase 4 & 5 */}
      <Route path="/facture-auto-entrepreneur" element={<InvoicePage content={LANDING_PAGES['auto-entrepreneur']} />} />
      <Route path="/facture-freelance" element={<InvoicePage content={LANDING_PAGES['freelance']} />} />
      <Route path="/modele-facture" element={<InvoicePage content={LANDING_PAGES['modele']} />} />

      {/* New Landing Pages - Phase 5 Extended */}
      <Route path="/faire-un-devis-gratuit" element={<InvoicePage content={LANDING_PAGES['devis']} />} />
      <Route path="/facture-sans-tva" element={<InvoicePage content={LANDING_PAGES['sans-tva']} />} />
      <Route path="/facture-association" element={<InvoicePage content={LANDING_PAGES['association']} />} />
      <Route path="/facture-en-anglais" element={<InvoicePage content={LANDING_PAGES['anglais']} />} />
      <Route path="/facture-pro-forma" element={<InvoicePage content={LANDING_PAGES['pro-forma']} />} />

      {/* Help Page - Phase 18 */}
      <Route path="/aide" element={<HelpPage />} />

      {/* Fallback for 404 */}
      <Route path="*" element={<InvoicePage content={LANDING_PAGES['home']} />} />
    </Routes>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Analytics />

        <Header />

        <main className="pt-20 min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
          <AnimatedRoutes />
        </main>

        <Footer />

      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
