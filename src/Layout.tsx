import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Analytics } from "@/components/layout/Analytics";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Analytics />
      <Header />
      <main className="pt-20 min-h-screen bg-background selection:bg-primary/10 selection:text-primary">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
