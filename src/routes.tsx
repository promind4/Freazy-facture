import type { RouteRecord } from "vite-react-ssg";
import { Layout } from "./Layout";
import { InvoicePage } from "@/pages/InvoicePage";
import { HelpPage } from "@/pages/HelpPage";
import { LANDING_PAGES } from "@/data/landing-pages";

export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <InvoicePage content={LANDING_PAGES["home"]} /> },
      { path: "facture-auto-entrepreneur", element: <InvoicePage content={LANDING_PAGES["auto-entrepreneur"]} /> },
      { path: "facture-freelance", element: <InvoicePage content={LANDING_PAGES["freelance"]} /> },
      { path: "modele-facture", element: <InvoicePage content={LANDING_PAGES["modele"]} /> },
      { path: "faire-un-devis-gratuit", element: <InvoicePage content={LANDING_PAGES["devis"]} /> },
      { path: "facture-sans-tva", element: <InvoicePage content={LANDING_PAGES["sans-tva"]} /> },
      { path: "facture-association", element: <InvoicePage content={LANDING_PAGES["association"]} /> },
      { path: "facture-en-anglais", element: <InvoicePage content={LANDING_PAGES["anglais"]} /> },
      { path: "facture-pro-forma", element: <InvoicePage content={LANDING_PAGES["pro-forma"]} /> },
      { path: "aide", element: <HelpPage /> },
      { path: "*", element: <InvoicePage content={LANDING_PAGES["home"]} /> },
    ],
  },
];
