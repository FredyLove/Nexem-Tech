import { Building2, IdCard, FileCheck2, Database, Network, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./Solutions";
import { useLang } from "./LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const en = [
  {
    icon: IdCard,
    title: "National Digital Identity",
    desc: "Citizen enrollment, biometric capture and secure ID card issuance at national scale.",
  },
  {
    icon: Database,
    title: "Administrative Databases",
    desc: "Unified, traceable registries powering ministries, agencies and territorial offices.",
  },
  {
    icon: FileCheck2,
    title: "E-Government Portals",
    desc: "Modern citizen portals with digital certificates and electronic signatures.",
  },
  {
    icon: Network,
    title: "Inter-ministerial Network",
    desc: "Secure interconnection of public institutions with end-to-end encryption.",
  },
  {
    icon: ShieldCheck,
    title: "Sovereign Cybersecurity",
    desc: "Sovereign-grade protection, SOC monitoring and incident response.",
  },
  {
    icon: Building2,
    title: "Smart City Platforms",
    desc: "Urban dashboards, mobility, public lighting and citizen services unified.",
  },
];
const fr = [
  "Identité numérique nationale|Enrôlement citoyen, capture biométrique et émission sécurisée de cartes d'identité à grande échelle.",
  "Bases de données administratives|Registres unifiés et traçables pour ministères, agences et services territoriaux.",
  "Portails e-gouvernement|Portails citoyens modernes avec certificats numériques et signatures électroniques.",
  "Réseau interministériel|Interconnexion sécurisée des institutions publiques avec chiffrement de bout en bout.",
  "Cybersécurité souveraine|Protection souveraine, supervision SOC et réponse à incidents.",
  "Plateformes Smart City|Tableaux de bord urbains, mobilité, éclairage public et services citoyens unifiés.",
];

export function Government() {
  const { lang, t } = useLang();
  const items = en.map((it, i) =>
    lang === "FR" ? { ...it, title: fr[i].split("|")[0], desc: fr[i].split("|")[1] } : it,
  );
  const [leftRef, leftInView] = useScrollReveal<HTMLDivElement>();
  const [gridRef, gridInView] = useScrollReveal<HTMLDivElement>();

  return (
    <section id="government" className="relative py-20 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-primary/10 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div ref={leftRef} className={`lg:col-span-5 lg:sticky lg:top-32 ${leftInView ? "revealed" : ""}`}>
            <SectionHeader
              eyebrow={t("gov.eyebrow")}
              title={
                <>
                  {t("gov.title.a")} <span className="text-gradient-gold">{t("gov.title.b")}</span>
                </>
              }
              desc={t("gov.desc")}
            />
            <div className="mt-8 inline-flex items-center gap-3 glass rounded-2xl px-4 py-3">
              <ShieldCheck className="h-5 w-5 text-success" />
              <div className="text-sm">
                <div className="font-semibold">{t("gov.badge.title")}</div>
                <div className="text-xs text-muted-foreground">{t("gov.badge.sub")}</div>
              </div>
            </div>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-card hover:shadow-glow transition-all duration-300 ease-out"
            >
              {lang === "FR"
                ? "Explorer les projets gouvernementaux"
                : "Explore government projects"}{" "}
              →
            </a>
          </div>

          <div ref={gridRef} className={`lg:col-span-7 grid sm:grid-cols-2 gap-5 ${gridInView ? "revealed" : ""}`}>
            {items.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="reveal-child relative rounded-3xl border border-border bg-card/60 backdrop-blur p-6 ring-1 ring-white/5 hover:border-gold/40 hover:-translate-y-1 transition-all duration-300 ease-out shadow-card"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="absolute top-3 right-3 text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30">
                  {i % 2 === 0
                    ? lang === "FR"
                      ? "Échelle nationale"
                      : "National Scale"
                    : lang === "FR"
                      ? "Souverain"
                      : "Sovereign"}
                </span>
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-gold/80 to-gold/20 p-2.5 mb-4">
                  <Icon className="h-full w-full text-gold-foreground" />
                </div>
                <h3 className="font-display font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
