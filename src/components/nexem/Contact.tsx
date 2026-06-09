import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Loader2, BadgeCheck } from "lucide-react";
import { SectionHeader } from "./Solutions";
import { useLang } from "./LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function Contact() {
  const { t, lang } = useLang();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [leftRef, leftInView] = useScrollReveal<HTMLDivElement>();
  const [formRef, formInView] = useScrollReveal<HTMLFormElement>();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-60" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10">
          <div ref={leftRef} className={`lg:col-span-6 relative ${leftInView ? "revealed" : ""}`}>
            {/* Africa silhouette */}
            <svg
              className="absolute -left-8 -top-8 w-[420px] h-[420px] text-accent/10 pointer-events-none -z-0"
              viewBox="0 0 100 110"
              fill="currentColor"
              aria-hidden
            >
              <path d="M50 5 C60 6 70 10 74 22 C78 32 84 38 82 50 C80 60 76 66 72 74 C70 82 66 92 58 98 C50 104 42 100 38 92 C32 82 28 76 26 66 C22 56 18 46 22 36 C26 24 32 14 40 8 C44 6 47 5 50 5 Z" />
            </svg>

            <div className="relative reveal-fade-up">
              <SectionHeader
                eyebrow={t("contact.eyebrow")}
                title={
                  <>
                    {t("contact.title.a")}{" "}
                    <span className="text-gradient-primary">{t("contact.title.b")}</span>{" "}
                    {t("contact.title.c")}
                  </>
                }
                desc={t("contact.desc")}
              />
              <div className="mt-10 space-y-4 reveal-fade-up" style={{ transitionDelay: "200ms" }}>
                <ContactItem
                  icon={<Phone className="h-4 w-4" />}
                  label={t("contact.phone")}
                  value="+237 683 229 975"
                  href="tel:+237683229975"
                />
                <ContactItem
                  icon={<Mail className="h-4 w-4" />}
                  label={t("contact.email")}
                  value="contact@nexemtechnologies.com"
                  href="mailto:contact@nexemtechnologies.com"
                />
                <ContactItem
                  icon={<MapPin className="h-4 w-4" />}
                  label={t("contact.hq")}
                  value={t("contact.hq.value")}
                />
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={submit}
            className={`lg:col-span-6 glass rounded-3xl p-6 sm:p-8 shadow-card noise reveal-fade-right ${formInView ? "revealed" : ""}`}
          >
            <div className="noise-overlay rounded-3xl" />
            <div className="relative grid sm:grid-cols-2 gap-4">
              <Field label={t("contact.f.name")} placeholder="Jane Doe" />
              <Field label={t("contact.f.org")} placeholder="—" />
              <Field label={t("contact.f.country")} placeholder="Cameroon" />
              <Field label={t("contact.f.email")} type="email" placeholder="you@org.com" required />
              <Field label={t("contact.f.phone")} placeholder="+237 ..." />
              <Field label={t("contact.f.service")} placeholder="Smart Cards" />
            </div>
            <div className="relative mt-4">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                {t("contact.f.message")}
              </label>
              <textarea
                rows={4}
                placeholder={t("contact.f.placeholder")}
                className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 ease-out"
              />
            </div>
            <div className="relative mt-6 flex items-center justify-between flex-wrap gap-3">
              <button
                disabled={loading || sent}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-glow-cyan transition-all duration-300 ease-out disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : sent ? (
                  <BadgeCheck className="h-4 w-4" />
                ) : null}
                {sent ? (lang === "FR" ? "Envoyé" : "Sent") : t("contact.f.send")}
                {!loading && !sent && (
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                )}
              </button>
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                <BadgeCheck className="h-4 w-4 text-success" />
                {lang === "FR" ? "Approuvé par 50+ organisations" : "Trusted by 50+ organizations"}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      {...(href ? { href } : {})}
      className="flex items-center gap-4 glass rounded-2xl p-5 hover:border-accent/50 hover:-translate-y-0.5 transition-all duration-300 ease-out"
    >
      <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </Tag>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const float = focused || value.length > 0;
  return (
    <div className="relative pt-3">
      <label
        className={`absolute left-3 transition-all duration-300 ease-out pointer-events-none ${float ? "top-0 text-[10px] uppercase tracking-wider text-accent" : "top-6 text-sm text-muted-foreground"}`}
      >
        {label}
        {required && " *"}
      </label>
      <input
        type={type}
        placeholder={float ? placeholder : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all duration-300 ease-out"
      />
    </div>
  );
}
