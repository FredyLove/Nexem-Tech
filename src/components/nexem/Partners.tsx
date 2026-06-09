import { useLang } from "./LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const partners = [
  "Microsoft",
  "Google",
  "AWS",
  "Cisco",
  "Fortinet",
  "MikroTik",
  "Huawei",
  "Oracle",
  "IBM",
  "Vercel",
];

export function Partners() {
  const { t } = useLang();
  const row = [...partners, ...partners];
  const [ref, inView] = useScrollReveal<HTMLDivElement>();
  return (
    <section className="relative py-16 sm:py-20 bg-card/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="h-px w-12 bg-border" />
          <p className="text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">
            {t("partners.title")}
          </p>
          <span className="h-px w-12 bg-border" />
        </div>

        <div ref={ref} className={`space-y-6 reveal-fade-up ${inView ? "revealed" : ""}`}>
          <Marquee items={row} duration="35s" />
          <Marquee items={row} duration="45s" reverse />
        </div>
      </div>
    </section>
  );
}

function Marquee({
  items,
  duration,
  reverse = false,
}: {
  items: string[];
  duration: string;
  reverse?: boolean;
}) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex gap-14 whitespace-nowrap hover:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "marquee-x-reverse" : "marquee-x"} ${duration} linear infinite`,
          width: "max-content",
        }}
      >
        {items.map((p, i) => (
          <span
            key={`${p}-${i}`}
            className="font-display font-semibold text-2xl text-muted-foreground/60 hover:text-foreground hover:scale-110 transition-all duration-300"
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
