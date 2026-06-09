import cartejauneImg from "@/assets/cartejaune-preview.png";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./Solutions";
import { useLang } from "./LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Realisations() {
  const { t, lang } = useLang();
  const [sectionRef, sectionInView] = useScrollReveal<HTMLDivElement>();
  return (
    <section id="realisations" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute -top-32 right-0 h-[400px] w-[600px] rounded-full bg-gold/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("real.eyebrow")}
          title={
            <>
              {t("real.title.a")} <span className="text-gradient-gold">{t("real.title.b")}</span>
            </>
          }
          desc={t("real.desc")}
        />

        <div ref={sectionRef} className={`mt-14 grid lg:grid-cols-2 gap-8 items-center ${sectionInView ? "revealed" : ""}`}>
          <a
            href="https://www.cartejaune.cm"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal-scale group relative block rounded-3xl overflow-hidden border border-border bg-card/40 shadow-card hover:border-gold/60 hover:shadow-glow transition-all duration-300 ease-out"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={cartejauneImg}
                alt="Carte Jaune Numérique — Cameroun"
                loading="lazy"
                className="h-full w-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] text-gold">
                <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
                {lang === "FR" ? "En production" : "Live"}
              </div>
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-background/80 backdrop-blur text-xs font-medium border border-border opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                www.cartejaune.cm <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </a>

          <div className="reveal-fade-right" style={{ transitionDelay: "150ms" }}>
            <div className="flex flex-wrap gap-2 mb-4">
              {[t("real.cj.tag1"), t("real.cj.tag2"), t("real.cj.tag3")].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-[0.18em] px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl leading-tight">
              {t("real.cj.title")}
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("real.cj.desc")}</p>
            <a
              href="https://www.cartejaune.cm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-gold-foreground font-medium shadow-card hover:shadow-glow transition-all duration-300 ease-out"
            >
              {t("real.visit")} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
