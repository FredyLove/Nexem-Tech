import { Fragment, useState } from "react";
import {
  Landmark,
  HeartPulse,
  GraduationCap,
  Banknote,
  Factory,
  Building2,
  Home,
  TrafficCone,
  Plane,
  Zap,
  Sparkles,
  X,
} from "lucide-react";
import { SectionHeader } from "./Solutions";
import { useLang } from "./LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const en = [
  {
    label: "Government",
    detail: "Citizen ID, e-government portals, sovereign databases and inter-ministerial networks.",
  },
  {
    label: "Healthcare",
    detail: "Patient records, smart health cards, hospital infrastructure and secure medical data.",
  },
  {
    label: "Education",
    detail: "Student enrollment platforms, smart campus access, e-learning and academic ID cards.",
  },
  {
    label: "Banking & Finance",
    detail:
      "Secure infrastructure, identity verification, NFC payment cards and fraud-resistant systems.",
  },
  {
    label: "Industry",
    detail: "Industrial IoT, plant monitoring, access control and operational cybersecurity.",
  },
  {
    label: "Enterprises",
    detail: "Employee badges, business apps, networks and full digital transformation programs.",
  },
  {
    label: "Real Estate",
    detail: "Smart homes, connected locks, video surveillance and centralized building management.",
  },
  {
    label: "Smart Cities",
    detail: "Urban dashboards, intelligent lighting, mobility and unified citizen services.",
  },
  {
    label: "Transport & Logistics",
    detail: "Fleet tracking, RFID/NFC asset tagging, ports and airport access control.",
  },
  {
    label: "Energy",
    detail: "Smart metering, remote monitoring and protection of critical energy infrastructure.",
  },
];
const fr = [
  {
    label: "Gouvernement",
    detail:
      "Identité citoyenne, portails e-gouvernement, bases de données souveraines et réseaux interministériels.",
  },
  {
    label: "Santé",
    detail:
      "Dossiers patients, cartes santé intelligentes, infrastructure hospitalière et données médicales sécurisées.",
  },
  {
    label: "Éducation",
    detail:
      "Plateformes d'enrôlement, accès campus, e-learning et cartes étudiantes intelligentes.",
  },
  {
    label: "Banque & Finance",
    detail:
      "Infrastructure sécurisée, vérification d'identité, cartes NFC et systèmes anti-fraude.",
  },
  {
    label: "Industrie",
    detail:
      "IoT industriel, supervision d'usine, contrôle d'accès et cybersécurité opérationnelle.",
  },
  {
    label: "Entreprises",
    detail:
      "Badges employés, applications métier, réseaux et programmes complets de transformation digitale.",
  },
  {
    label: "Immobilier",
    detail:
      "Maisons intelligentes, serrures connectées, vidéosurveillance et gestion centralisée des bâtiments.",
  },
  {
    label: "Smart Cities",
    detail:
      "Tableaux de bord urbains, éclairage intelligent, mobilité et services citoyens unifiés.",
  },
  {
    label: "Transport & Logistique",
    detail: "Suivi de flotte, marquage RFID/NFC, contrôle d'accès ports et aéroports.",
  },
  {
    label: "Énergie",
    detail:
      "Comptage intelligent, supervision à distance et protection des infrastructures critiques.",
  },
];
const icons = [
  Landmark,
  HeartPulse,
  GraduationCap,
  Banknote,
  Factory,
  Building2,
  Home,
  TrafficCone,
  Plane,
  Zap,
];

export function Industries() {
  const { lang, t } = useLang();
  const items = lang === "FR" ? fr : en;
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [gridRef, gridInView] = useScrollReveal<HTMLDivElement>();

  const detail = (i: number) => (
    <div className="col-span-2 sm:col-span-3 lg:col-span-5 rounded-3xl border border-accent/30 bg-gradient-to-br from-card/90 to-card/30 backdrop-blur p-5 sm:p-8 animate-fade-up relative shadow-card">
      <button
        onClick={() => setActive(null)}
        aria-label={t("ind.close")}
        className="absolute top-3 right-3 h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-accent/60 transition"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-2xl bg-accent/20 flex items-center justify-center shrink-0">
          {(() => {
            const I = icons[i];
            return <I className="h-6 w-6 text-accent" />;
          })()}
        </div>
        <div className="pr-8">
          <h3 className="font-display font-semibold text-lg sm:text-xl">{items[i].label}</h3>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {items[i].detail}
          </p>
          <a
            href="#contact"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:gap-2 transition-all"
          >
            {lang === "FR" ? "Discuter de votre projet" : "Discuss your project"} →
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="industries" className="relative py-20 sm:py-36">
      <svg
        className="absolute -top-px left-0 w-full h-12 text-background"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0 30 Q 300 60 600 30 T 1200 30 V0 H0 Z" fill="currentColor" />
      </svg>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("ind.eyebrow")}
          title={
            <>
              {t("ind.title.a")} <span className="text-gradient-primary">{t("ind.title.b")}</span>
            </>
          }
          desc={t("ind.desc")}
        />
        <div ref={gridRef} className={`mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 ${gridInView ? "revealed" : ""}`}>
          {items.map((item, i) => {
            const Icon = icons[i];
            const isActive = active === i;
            const hiddenOnMobile = !showAll && i >= 6;
            return (
              <Fragment key={item.label}>
                <button
                  onClick={() => setActive(isActive ? null : i)}
                  className={`reveal-child group rounded-2xl border p-4 sm:p-6 flex flex-col items-center text-center transition-all duration-300 ease-out ${isActive ? "border-accent bg-accent/10 -translate-y-1 shadow-glow" : "border-white/10 bg-card/40 hover:border-accent/60 hover:-translate-y-2 hover:shadow-card"} ${hiddenOnMobile ? "hidden sm:flex" : ""}`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div
                    className={`h-11 w-11 sm:h-14 sm:w-14 rounded-full flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300 ease-out ${isActive ? "bg-accent/30 scale-110" : "bg-gradient-primary/30 group-hover:scale-110"}`}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                  </div>
                  <div className="font-medium text-xs sm:text-sm tracking-wide">{item.label}</div>
                  <div className="mt-1 sm:mt-2 text-[10px] uppercase tracking-[0.18em] text-accent/80 opacity-70">
                    {isActive ? "—" : "+"}
                  </div>
                </button>
                {isActive && detail(i)}
              </Fragment>
            );
          })}
          <div className="hidden sm:flex rounded-2xl border border-dashed border-white/15 p-6 flex-col items-center justify-center text-center text-muted-foreground">
            <Sparkles className="h-5 w-5 text-accent mb-2" />
            <div className="text-sm font-medium">
              {lang === "FR" ? "et plus encore…" : "and more…"}
            </div>
          </div>
        </div>

        <div className="mt-6 sm:hidden flex justify-center">
          <button
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium hover:border-accent/60 transition"
          >
            {showAll
              ? lang === "FR"
                ? "Voir moins"
                : "Show less"
              : lang === "FR"
                ? `Voir les ${items.length - 6} autres`
                : `Show ${items.length - 6} more`}
          </button>
        </div>
      </div>
    </section>
  );
}
