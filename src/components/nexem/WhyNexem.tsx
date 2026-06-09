import { SectionHeader } from "./Solutions";
import {
  ShieldCheck,
  Landmark,
  PackageCheck,
  Globe2,
  Layers,
  Headphones,
  Sparkles,
} from "lucide-react";
import { useLang } from "./LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const en = [
  ["100%", "Secure Solutions", "Encryption, audits and sovereign-grade controls by default."],
  ["Gov", "Government-Ready", "Built for ministries, agencies and national programs."],
  ["E2E", "End-to-End Delivery", "From strategy and design to deployment and operations."],
  ["Local", "Global Standards", "African expertise meeting international best practices."],
  ["∞", "Scalable Infrastructure", "From pilot to nationwide rollout without re-architecture."],
  ["24/7", "Continuous Support", "Monitoring, SLAs and a dedicated technical team."],
];
const fr = [
  [
    "100%",
    "Solutions sécurisées",
    "Chiffrement, audits et contrôles de niveau souverain par défaut.",
  ],
  [
    "Gov",
    "Prêt pour le gouvernement",
    "Conçu pour les ministères, agences et programmes nationaux.",
  ],
  ["E2E", "Livraison de bout en bout", "De la stratégie au déploiement et aux opérations."],
  ["Local", "Standards mondiaux", "Expertise africaine, meilleures pratiques internationales."],
  ["∞", "Infrastructure évolutive", "Du pilote au déploiement national sans ré-architecture."],
  ["24/7", "Support continu", "Supervision, SLA et équipe technique dédiée."],
];
const icons = [ShieldCheck, Landmark, PackageCheck, Globe2, Layers, Headphones];

const TRUSTED = [
  "Ministère du Numérique",
  "ANTIC",
  "CAMTEL",
  "CRTV",
  "BEAC",
  "Orange CM",
  "MTN Cameroon",
  "Cameroon Gov",
];

export function WhyNexem() {
  const { lang, t } = useLang();
  const rows = lang === "FR" ? fr : en;
  const [gridRef, gridInView] = useScrollReveal<HTMLDivElement>();
  return (
    <section id="why" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.55_0.22_260_/_0.1),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("why.eyebrow")}
          title={
            <>
              {t("why.title.a")} <span className="text-gradient-gold">{t("why.title.b")}</span>
            </>
          }
          desc={t("why.desc")}
        />

        <div ref={gridRef} className={`mt-14 grid sm:grid-cols-2 lg:grid-cols-3 rounded-3xl overflow-hidden border border-border ${gridInView ? "revealed" : ""}`}>
          {rows.map(([stat, label, desc], i) => {
            const Icon = icons[i];
            const isLastCol = (i + 1) % 3 === 0;
            const isLastRow = i >= rows.length - 3;
            return (
              <div
                key={label}
                className={`reveal-child relative bg-white/[0.02] p-8 hover:bg-gradient-to-br hover:from-accent/5 hover:to-transparent transition-all duration-300 ease-out ${!isLastCol ? "lg:border-r border-border" : ""} ${!isLastRow ? "border-b border-border" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Icon className="h-6 w-6 text-accent mb-6" />
                <div className="font-display text-5xl font-black bg-gradient-to-r from-accent to-gold bg-clip-text text-transparent">
                  {stat}
                </div>
                <div className="mt-2 font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  {label}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            );
          })}
        </div>

        {/* Trusted by marquee */}
        <div className="mt-12 overflow-hidden">
          <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            {lang === "FR" ? "Approuvé par" : "Trusted by"}
          </p>
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <div className="flex gap-12 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
              {[...TRUSTED, ...TRUSTED].map((n, i) => (
                <span key={i} className="text-sm font-medium text-muted-foreground/70">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
