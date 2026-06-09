import { ArrowRight, Calendar, ShieldCheck, Cpu, Globe2, CreditCard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageContext";
import { NexemLogo } from "./NexemLogo";

const ROTATING = ["Smart Infrastructure", "Digital Identity", "Cybersecurity", "Innovation"];

function useCounter(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

export function Hero() {
  const { t } = useLang();
  const [rot, setRot] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const i = setInterval(() => setRot((r) => (r + 1) % ROTATING.length), 2200);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), {
      threshold: 0.2,
    });
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={onMove}
      className="relative pt-28 pb-20 sm:pt-40 sm:pb-36 overflow-hidden bg-hero noise"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="noise-overlay" />
      <div
        className="absolute inset-0 pointer-events-none transition-[background] duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, oklch(0.55 0.22 260 / 0.25), transparent 60%)`,
        }}
      />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 animate-fade-up relative z-10">
            <div className="inline-flex items-center gap-2 glass px-3 py-1.5 rounded-full text-xs text-muted-foreground mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
              {t("hero.badge")}
            </div>

            <h1 className="font-display font-bold text-[2.5rem] xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl leading-[1] tracking-tighter break-words">
              <span className="text-shine">NEXEM</span>
              <br />
              <span className="text-gradient-gold drop-shadow-[0_0_30px_rgba(255,184,0,0.25)] block">
                TECHNOLOGIES
              </span>
            </h1>

            <div className="mt-6 h-7 overflow-hidden text-lg sm:text-xl font-medium text-accent">
              <div
                className="transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${rot * 1.75}rem)` }}
              >
                {ROTATING.map((w) => (
                  <div key={w} className="h-7 leading-7">
                    · {w}
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-xl">
              {t("hero.desc")}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#solutions"
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-glow-cyan hover:ring-2 hover:ring-white/20 transition-all duration-300 ease-out"
              >
                {t("hero.cta1")}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass font-medium hover:border-accent/60 hover:ring-2 hover:ring-white/10 transition-all duration-300 ease-out"
              >
                <Calendar className="h-4 w-4 text-accent" />
                {t("hero.cta2")}
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <Stat n={500} suffix="+" label={t("hero.stat.projects")} start={inView} />
              <Stat n={50} suffix="+" label={t("hero.stat.clients")} start={inView} />
              <Stat n={20} suffix="+" label={t("hero.stat.solutions")} start={inView} />
              <Stat n={10} suffix="+" label={t("hero.stat.years")} start={inView} />
            </dl>
          </div>

          <div className="lg:col-span-5 relative h-[380px] sm:h-[520px] lg:h-[620px] z-0">
            <HeroOrb />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  n,
  suffix,
  label,
  start,
}: {
  n: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const v = useCounter(n, start);
  return (
    <div>
      <dt className="text-2xl sm:text-3xl font-display font-bold text-gradient">
        {v}
        {suffix}
      </dt>
      <dd className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{label}</dd>
    </div>
  );
}

function HeroOrb() {
  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="absolute h-[360px] w-[360px] lg:h-[480px] lg:w-[480px] xl:h-[600px] xl:w-[600px] animate-spin-slow" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="oklch(0.52 0.24 258 / 0.40)"
            strokeWidth="0.4"
            strokeDasharray="2 3"
          />
        </svg>
        <svg
          className="absolute h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px] animate-spin-slow"
          style={{ animationDirection: "reverse", animationDuration: "20s" }}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="oklch(0.70 0.16 230 / 0.45)"
            strokeWidth="0.4"
            strokeDasharray="1 2"
          />
        </svg>
        <svg
          className="absolute h-[240px] w-[240px] lg:h-[320px] lg:w-[320px] xl:h-[400px] xl:w-[400px] animate-spin-slow"
          style={{ animationDuration: "15s" }}
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="oklch(0.80 0.14 82 / 0.50)"
            strokeWidth="0.4"
            strokeDasharray="3 4"
          />
        </svg>
      </div>

      <button
        type="button"
        onClick={() => document.getElementById("solutions")?.scrollIntoView({ behavior: "smooth" })}
        className="relative h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center animate-ring-pulse group cursor-pointer hover:scale-[1.03] hover:shadow-glow-cyan active:scale-[0.96] transition-all duration-500 ease-out"
      >
        <div className="absolute inset-1.5 flex items-center justify-center rounded-full bg-blue-50 shadow-[inset_0_0_50px_rgba(37,99,235,0.15)] overflow-hidden transition-all duration-500 group-hover:inset-0 group-active:inset-2">
          <NexemLogo
            variant="hero"
            priority
            className="relative h-full w-full object-contain scale-[1.25] animate-float-tilt mix-blend-multiply brightness-105 contrast-125 transition-all duration-500 group-hover:scale-[1.35] group-active:scale-[1.1]"
          />
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-blue-200/20 to-transparent group-hover:via-blue-300/30 transition-colors duration-500" />
        </div>
        <div
          className="absolute -inset-1 rounded-full border border-accent/40 animate-spin-slow"
          style={{ animationDuration: "25s" }}
        />
        <div
          className="absolute -inset-3 rounded-full border border-gold/30 animate-spin-slow group-hover:border-gold/60 transition-colors duration-500"
          style={{ animationDirection: "reverse", animationDuration: "32s" }}
        />
      </button>

      <FloatingChip
        className="top-4 left-2"
        icon={<ShieldCheck className="h-4 w-4 text-success" />}
        title="Cybersecurity"
        sub="Zero-trust"
      />
      <FloatingChip
        className="top-24 right-0"
        icon={<CreditCard className="h-4 w-4 text-gold" />}
        title="Smart Cards"
        sub="NFC · RFID"
      />
      <FloatingChip
        className="bottom-10 left-0"
        icon={<Cpu className="h-4 w-4 text-accent" />}
        title="IoT"
        sub="Smart City"
      />
      <FloatingChip
        className="bottom-4 right-6"
        icon={<Globe2 className="h-4 w-4 text-primary" />}
        title="E-Gov"
        sub="National"
      />

      <div
        className="absolute h-3 w-3 rounded-full bg-accent shadow-glow-cyan"
        style={{ animation: "orbit 12s linear infinite", ["--orbit-r" as never]: "210px" }}
      />
      <div
        className="absolute h-2 w-2 rounded-full bg-gold"
        style={{ animation: "orbit 9s linear infinite", ["--orbit-r" as never]: "160px" }}
      />
    </div>
  );
}

function FloatingChip({
  className = "",
  icon,
  title,
  sub,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
}) {
  return (
    <div
      className={`absolute rounded-2xl px-3 py-2 flex items-center gap-2 animate-float bg-white/5 backdrop-blur-xl border border-white/10 shadow-card ${className}`}
    >
      <div className="h-8 w-8 rounded-xl bg-background/60 flex items-center justify-center">
        {icon}
      </div>
      <div className="leading-tight pr-1">
        <div className="text-xs font-semibold">{title}</div>
        <div className="text-[10px] text-muted-foreground">{sub}</div>
      </div>
    </div>
  );
}
