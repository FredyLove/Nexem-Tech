import { Linkedin, Twitter, Github, ArrowRight } from "lucide-react";
import { useLang } from "./LanguageContext";
import { NexemBrand } from "./NexemLogo";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Footer() {
  const { t, lang } = useLang();
  const [ref, inView] = useScrollReveal<HTMLDivElement>();
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div ref={ref} className={`mx-auto max-w-7xl px-4 sm:px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-5 gap-10 stagger ${inView ? "revealed" : ""}`}>
        <div className="lg:col-span-2 reveal-child">
          <NexemBrand size="footer" />
          <p className="mt-5 text-sm text-muted-foreground max-w-sm">{t("footer.tag")}</p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex items-center gap-2 max-w-sm"
          >
            <input
              type="email"
              placeholder={lang === "FR" ? "Votre e-mail" : "Your email"}
              className="flex-1 rounded-full bg-white/5 border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 ease-out"
            />
            <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow hover:shadow-glow-cyan transition-all duration-300 ease-out">
              {lang === "FR" ? "S'abonner" : "Subscribe"}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="mt-6 flex items-center gap-2">
            {[Linkedin, Twitter, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/60 transition-all duration-300 ease-out"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title={t("footer.solutions")}
          items={["Smart Cards", "Cybersecurity", "Smart Home & IoT", "IT Infrastructure"]}
        />
        <FooterCol
          title={t("footer.company")}
          items={["About", "Government", "Projects", "Careers"]}
        />
        <FooterCol
          title={t("footer.contact")}
          items={["+237 683 229 975", "contact@nexemtechnologies.com", "Cameroon · Africa"]}
        />
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Nexem Technologies. {t("footer.rights")} ·{" "}
            {lang === "FR" ? "Mis à jour" : "Updated"}{" "}
            {new Date().toLocaleDateString(lang === "FR" ? "fr-FR" : "en-GB", {
              month: "short",
              year: "numeric",
            })}
          </p>
          <p>{t("footer.slogan")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="reveal-child">
      <div className="text-xs uppercase tracking-[0.2em] text-foreground">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li
            key={i}
            className="hover:text-accent hover:translate-x-1 transition-all duration-300 ease-out cursor-pointer"
          >
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
