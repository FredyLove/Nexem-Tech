import { createContext, useContext, useState, type ReactNode } from "react";

type Lang = "EN" | "FR";

const dict = {
  EN: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.govSolutions": "Government Solutions",
    "nav.smartHome": "Home Automation & Smart Homes",
    "nav.smartCards": "Smart Cards",
    "nav.cyber": "Cybersecurity",
    "nav.realisations": "Realisations",
    "nav.aboutContact": "About & Contact",
    "nav.solutions": "Solutions",
    "nav.government": "Government",
    "nav.industries": "Industries",
    "nav.why": "Why Nexem",
    "nav.contact": "Contact",
    "nav.cta": "Consultation",

    "hero.badge": "Powering Africa's Digital Future",
    "hero.desc":
      "Smart Infrastructure · Digital Identity · Cybersecurity · Innovation. We empower governments, enterprises and institutions through intelligent, secure and innovative technologies tailored to Africa's future.",
    "hero.cta1": "Explore Solutions",
    "hero.cta2": "Schedule Consultation",
    "hero.stat.projects": "Projects",
    "hero.stat.clients": "Clients",
    "hero.stat.solutions": "Solutions",
    "hero.stat.years": "Years",

    "partners.title": "Technologies we deploy & integrate",

    "sol.eyebrow": "Our Solutions",
    "sol.title.a": "Enterprise-grade technology,",
    "sol.title.b": "built for Africa",
    "sol.desc":
      "A complete portfolio of intelligent solutions designed for governments, institutions and ambitious enterprises. Click any solution to learn more.",
    "sol.learnMore": "Learn more",
    "sol.close": "Close",

    "gov.eyebrow": "Government Solutions",
    "gov.title.a": "National-scale platforms for",
    "gov.title.b": "public institutions",
    "gov.desc":
      "From citizen identification to e-government portals — Nexem delivers sovereign, secure and scalable digital programs.",
    "gov.badge.title": "Government-grade",
    "gov.badge.sub": "ISO-aligned · Sovereign hosting · Local expertise",

    "ind.eyebrow": "Industries We Serve",
    "ind.title.a": "Trusted across the",
    "ind.title.b": "continent's key sectors",
    "ind.desc": "Tap on a sector to see how Nexem supports it.",
    "ind.close": "Close",

    "real.eyebrow": "Realisations",
    "real.title.a": "Real-world programs",
    "real.title.b": "deployed at scale",
    "real.desc": "A glimpse of the platforms we've built and operate for institutions.",
    "real.visit": "Visit website",
    "real.cj.title": "Carte Jaune Numérique — Cameroon",
    "real.cj.desc":
      "National digital vaccination certificate platform for the Ministry of Public Health: NFC smart cards, QR verification, citizen enrollment and cryptographically signed credentials recognized internationally.",
    "real.cj.tag1": "Government Platform",
    "real.cj.tag2": "NFC · QR",
    "real.cj.tag3": "National Scale",

    "why.eyebrow": "Why Choose Nexem",
    "why.title.a": "Built to deliver",
    "why.title.b": "national-scale programs",
    "why.desc":
      "A partner trusted by institutions and enterprises to ship complex technology projects on time, on budget, and at the highest security standards.",

    "contact.eyebrow": "Contact",
    "contact.title.a": "Let's build Africa's",
    "contact.title.b": "digital future",
    "contact.title.c": "together",
    "contact.desc":
      "Tell us about your project — a member of our team will reach out within one business day.",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.hq": "Headquarters",
    "contact.hq.value": "Cameroon · Serving Africa",
    "contact.f.name": "Full name",
    "contact.f.org": "Organization",
    "contact.f.country": "Country",
    "contact.f.email": "Email",
    "contact.f.phone": "Phone",
    "contact.f.service": "Service needed",
    "contact.f.message": "Message",
    "contact.f.send": "Send request",
    "contact.f.placeholder": "Briefly describe your project...",

    "footer.tag": "Smart Solutions · Digital Innovation · Secure Technologies.",
    "footer.solutions": "Solutions",
    "footer.company": "Company",
    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
    "footer.slogan": "Powering Africa's Digital Future",
  },
  FR: {
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.govSolutions": "Solutions Gouvernementales",
    "nav.smartHome": "Domotique & Smart Homes",
    "nav.smartCards": "Cartes Intelligentes",
    "nav.cyber": "Cybersécurité",
    "nav.realisations": "Réalisations",
    "nav.aboutContact": "À propos & Contact",
    "nav.solutions": "Solutions",
    "nav.government": "Gouvernement",
    "nav.industries": "Industries",
    "nav.why": "Pourquoi Nexem",
    "nav.contact": "Contact",
    "nav.cta": "Consultation",

    "hero.badge": "Au service de l'avenir numérique de l'Afrique",
    "hero.desc":
      "Infrastructures intelligentes · Identité numérique · Cybersécurité · Innovation. Nous accompagnons gouvernements, entreprises et institutions grâce à des technologies intelligentes, sécurisées et innovantes adaptées à l'Afrique de demain.",
    "hero.cta1": "Explorer les solutions",
    "hero.cta2": "Prendre rendez-vous",
    "hero.stat.projects": "Projets",
    "hero.stat.clients": "Clients",
    "hero.stat.solutions": "Solutions",
    "hero.stat.years": "Années",

    "partners.title": "Technologies déployées & intégrées",

    "sol.eyebrow": "Nos solutions",
    "sol.title.a": "Des technologies d'entreprise,",
    "sol.title.b": "pensées pour l'Afrique",
    "sol.desc":
      "Un portefeuille complet de solutions intelligentes conçues pour les gouvernements, institutions et entreprises ambitieuses. Cliquez sur une solution pour en savoir plus.",
    "sol.learnMore": "En savoir plus",
    "sol.close": "Fermer",

    "gov.eyebrow": "Solutions gouvernementales",
    "gov.title.a": "Des plateformes à l'échelle nationale pour",
    "gov.title.b": "les institutions publiques",
    "gov.desc":
      "De l'identification des citoyens aux portails e-gouvernement — Nexem livre des programmes numériques souverains, sécurisés et évolutifs.",
    "gov.badge.title": "Qualité gouvernementale",
    "gov.badge.sub": "Conforme ISO · Hébergement souverain · Expertise locale",

    "ind.eyebrow": "Secteurs servis",
    "ind.title.a": "La confiance des",
    "ind.title.b": "secteurs clés du continent",
    "ind.desc": "Cliquez sur un secteur pour voir comment Nexem l'accompagne.",
    "ind.close": "Fermer",

    "real.eyebrow": "Réalisations",
    "real.title.a": "Des programmes concrets",
    "real.title.b": "déployés à grande échelle",
    "real.desc": "Un aperçu des plateformes que nous concevons et opérons pour les institutions.",
    "real.visit": "Visiter le site",
    "real.cj.title": "Carte Jaune Numérique — Cameroun",
    "real.cj.desc":
      "Plateforme nationale de certificat de vaccination numérique pour le Ministère de la Santé Publique : cartes NFC, vérification QR, enrôlement citoyen et certificats signés cryptographiquement reconnus à l'international.",
    "real.cj.tag1": "Plateforme gouvernementale",
    "real.cj.tag2": "NFC · QR",
    "real.cj.tag3": "Échelle nationale",

    "why.eyebrow": "Pourquoi choisir Nexem",
    "why.title.a": "Conçu pour livrer",
    "why.title.b": "des programmes d'envergure nationale",
    "why.desc":
      "Un partenaire de confiance pour livrer des projets technologiques complexes, dans les délais, dans le budget et au plus haut niveau de sécurité.",

    "contact.eyebrow": "Contact",
    "contact.title.a": "Construisons",
    "contact.title.b": "l'avenir numérique",
    "contact.title.c": "de l'Afrique",
    "contact.desc":
      "Parlez-nous de votre projet — un membre de notre équipe vous répondra sous un jour ouvré.",
    "contact.phone": "Téléphone",
    "contact.email": "E-mail",
    "contact.hq": "Siège",
    "contact.hq.value": "Cameroun · Au service de l'Afrique",
    "contact.f.name": "Nom complet",
    "contact.f.org": "Organisation",
    "contact.f.country": "Pays",
    "contact.f.email": "E-mail",
    "contact.f.phone": "Téléphone",
    "contact.f.service": "Service souhaité",
    "contact.f.message": "Message",
    "contact.f.send": "Envoyer la demande",
    "contact.f.placeholder": "Décrivez brièvement votre projet...",

    "footer.tag": "Solutions intelligentes · Innovation numérique · Technologies sécurisées.",
    "footer.solutions": "Solutions",
    "footer.company": "Entreprise",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés.",
    "footer.slogan": "Au service de l'avenir numérique de l'Afrique",
  },
} as const;

type Key = keyof (typeof dict)["EN"];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string };
const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("EN");
  const t = (k: Key) => (dict[lang] as Record<string, string>)[k] ?? k;
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
