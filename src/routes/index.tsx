import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/nexem/Navbar";
import { Hero } from "@/components/nexem/Hero";
import { Partners } from "@/components/nexem/Partners";
import { Solutions } from "@/components/nexem/Solutions";
import { Government } from "@/components/nexem/Government";
import { Industries } from "@/components/nexem/Industries";
import { WhyNexem } from "@/components/nexem/WhyNexem";
import { Contact } from "@/components/nexem/Contact";
import { Footer } from "@/components/nexem/Footer";
import { ScrollToTop } from "@/components/nexem/ScrollToTop";
import { Realisations } from "@/components/nexem/Realisations";
import { LanguageProvider } from "@/components/nexem/LanguageContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexem Technologies — Powering Africa's Digital Future" },
      {
        name: "description",
        content:
          "Nexem Technologies delivers smart identification, cybersecurity, digital transformation and IoT solutions for governments and enterprises across Africa.",
      },
      { property: "og:title", content: "Nexem Technologies — Powering Africa's Digital Future" },
      {
        property: "og:description",
        content: "Smart Infrastructure · Digital Identity · Cybersecurity · Innovation for Africa.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Partners />
          <Solutions />
          <Government />
          <Industries />
          <Realisations />
          <WhyNexem />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </LanguageProvider>
  );
}
