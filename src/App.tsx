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

export default function App() {
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
