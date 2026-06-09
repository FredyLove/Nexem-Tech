import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLang } from "./LanguageContext";
import { NexemBrand } from "./NexemLogo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [govOpen, setGovOpen] = useState(false);
  const [mobileGovOpen, setMobileGovOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links: { href: string; label: string }[] = [
    { href: "#top", label: t("nav.home") },
    { href: "#solutions", label: t("nav.services") },
  ];
  const govChildren = [
    { href: "#government", label: t("nav.govSolutions") },
    { href: "#solutions", label: t("nav.smartHome") },
    { href: "#solutions", label: t("nav.smartCards") },
  ];
  const linksAfter: { href: string; label: string }[] = [
    { href: "#solutions", label: t("nav.cyber") },
    { href: "#realisations", label: t("nav.realisations") },
    { href: "#contact", label: t("nav.aboutContact") },
  ];

  return (
    <header
      id="top"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ease-out ${scrolled ? "py-2" : "py-4"}`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ease-out ${scrolled ? "backdrop-blur-2xl bg-background/70 border border-border rounded-2xl" : ""}`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-300 ease-out ${scrolled ? "h-16" : "h-20"}`}
        >
          <a href="#top" className="group transition-all duration-300 hover:opacity-95">
            <NexemBrand size="nav" />
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-all duration-300 ease-out after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setGovOpen(true)}
              onMouseLeave={() => setGovOpen(false)}
            >
              <button className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition">
                {t("nav.govSolutions")}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${govOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${govOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"}`}
              >
                <div className="w-64 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-card p-2">
                  {govChildren.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      className="block px-4 py-2.5 rounded-xl text-sm hover:bg-accent/10 hover:text-accent transition"
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {linksAfter.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-all duration-300 ease-out after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "EN" ? "FR" : "EN")}
              aria-label="Switch language"
              className="text-sm font-medium px-3 py-1.5 rounded-full border border-border hover:border-accent/60 transition-all duration-300 ease-out flex items-center gap-1.5"
            >
              <span className={lang === "EN" ? "opacity-100" : "opacity-40"}>🇬🇧</span>
              <span className="text-muted-foreground">/</span>
              <span className={lang === "FR" ? "opacity-100" : "opacity-40"}>🇫🇷</span>
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium px-5 py-2 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-glow-cyan transition-all duration-300 ease-out"
            >
              {t("nav.cta")}
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-full border border-border"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
        <div className="h-px w-full bg-border/40 overflow-hidden rounded-full">
          <div
            className="h-full bg-gradient-primary transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className="absolute inset-0 bg-background/70 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 bg-card border-l border-border p-6 transition-transform duration-300 ease-out overflow-y-auto ${open ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-display font-bold">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-border"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl text-sm font-medium hover:bg-accent/10 hover:text-accent transition"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => setMobileGovOpen((v) => !v)}
              className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium hover:bg-accent/10 hover:text-accent transition"
            >
              <span>{t("nav.govSolutions")}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${mobileGovOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileGovOpen && (
              <div className="ml-3 pl-3 border-l border-border flex flex-col">
                {govChildren.slice(1).map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-accent transition"
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            )}
            {linksAfter.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl text-sm font-medium hover:bg-accent/10 hover:text-accent transition"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-1.5 text-sm font-medium px-5 py-3 rounded-full bg-gradient-primary text-primary-foreground shadow-glow"
            >
              {t("nav.cta")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
