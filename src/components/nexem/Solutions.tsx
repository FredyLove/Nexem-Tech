import { Fragment, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Code2,
  Workflow,
  CreditCard,
  Fingerprint,
  Home,
  ShieldCheck,
  Video,
  Network,
  Server,
  X,
  Check,
} from "lucide-react";
import { useLang } from "./LanguageContext";

type SolutionItem = {
  icon: typeof Code2;
  title: string;
  desc: string;
  color: string;
  details: { intro: string; bullets: string[] };
};

const solutionsEN: SolutionItem[] = [
  {
    icon: Code2,
    title: "Web & Mobile Development",
    desc: "Government portals, enterprise apps, enrollment platforms and custom business software.",
    color: "from-primary/30 to-primary/0",
    details: {
      intro:
        "End-to-end design and development of robust web and mobile applications, from architecture to deployment.",
      bullets: [
        "Government & citizen portals",
        "Native iOS & Android apps",
        "Enrollment & biometric capture platforms",
        "Custom ERP, CRM and business software",
        "Secure APIs and integrations",
      ],
    },
  },
  {
    icon: Workflow,
    title: "Digital Transformation",
    desc: "Process digitization, EDM, electronic signatures and public service modernization.",
    color: "from-accent/30 to-accent/0",
    details: {
      intro: "Modernize your processes with end-to-end digital workflows and paperless operations.",
      bullets: [
        "Electronic document management (EDM)",
        "Digital signatures & legal validity",
        "Automated approval workflows",
        "Public service modernization",
        "Change management & training",
      ],
    },
  },
  {
    icon: CreditCard,
    title: "Smart Identification",
    desc: "NFC & RFID cards, national IDs, employee, student and healthcare card systems.",
    color: "from-gold/30 to-gold/0",
    details: {
      intro:
        "Complete smart card ecosystems — from chip personalization to issuance and lifecycle management.",
      bullets: [
        "NFC & RFID contactless cards",
        "National ID & biometric cards",
        "Employee & student badges",
        "Health insurance & patient cards",
        "PVC card printing & encoding hardware",
        "Secure key management and personalization bureau",
      ],
    },
  },
  {
    icon: Fingerprint,
    title: "Access Control",
    desc: "Biometric, NFC and visitor systems with smart turnstiles and electronic locks.",
    color: "from-primary/30 to-accent/0",
    details: {
      intro:
        "Multi-factor physical access control for sensitive sites, enterprises and public buildings.",
      bullets: [
        "Fingerprint, face & iris biometrics",
        "NFC / RFID badge readers",
        "Smart turnstiles & gates",
        "Electronic locks & smart door controllers",
        "Visitor management & temporary credentials",
        "Centralized supervision & audit logs",
      ],
    },
  },
  {
    icon: Home,
    title: "Smart Home & IoT",
    desc: "Home automation, smart lighting, connected locks and energy management ecosystems.",
    color: "from-accent/30 to-gold/0",
    details: {
      intro:
        "Connected ecosystems for residential and commercial buildings, controlled from a single app.",
      bullets: [
        "Lighting, climate & blinds automation",
        "Connected locks & video doorbells",
        "Energy monitoring & smart metering",
        "Voice & mobile app control",
        "Scenarios & geofenced automations",
      ],
    },
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    desc: "Security audits, data protection, encryption and 24/7 monitoring solutions.",
    color: "from-gold/30 to-primary/0",
    details: {
      intro:
        "Defensive security programs aligned with international standards and sovereign requirements.",
      bullets: [
        "Security audits & pentesting",
        "ISO 27001 / NIST alignment",
        "Data encryption at rest & in transit",
        "24/7 SOC monitoring & incident response",
        "Identity & access management (IAM)",
        "Awareness & training programs",
      ],
    },
  },
  {
    icon: Video,
    title: "Video Surveillance",
    desc: "IP cameras, CCTV, intrusion detection and remote monitoring platforms.",
    color: "from-primary/30 to-gold/0",
    details: {
      intro: "High-definition surveillance with intelligent analytics and remote operation.",
      bullets: [
        "IP cameras & PTZ systems",
        "AI analytics (motion, plate, intrusion)",
        "NVR / VMS storage solutions",
        "Mobile & web monitoring apps",
        "Integration with access control",
      ],
    },
  },
  {
    icon: Network,
    title: "IT Infrastructure",
    desc: "Enterprise networks, fiber optics, professional Wi-Fi and cloud solutions.",
    color: "from-accent/30 to-primary/0",
    details: {
      intro: "Reliable, secure and scalable network and cloud foundations for any organization.",
      bullets: [
        "Structured cabling & fiber optics",
        "Enterprise Wi-Fi & mesh networks",
        "Routers, switches & firewalls",
        "Private, hybrid & sovereign cloud",
        "Backup, DR and high availability",
      ],
    },
  },
  {
    icon: Server,
    title: "Technology Equipment",
    desc: "Servers, PVC card printers, NFC readers, network and surveillance hardware.",
    color: "from-gold/30 to-accent/0",
    details: {
      intro: "Sourcing, deployment and maintenance of certified professional hardware.",
      bullets: [
        "Servers, storage & racks",
        "PVC card printers & encoders",
        "NFC / RFID readers & terminals",
        "Network & surveillance equipment",
        "Warranty, SLA and on-site support",
      ],
    },
  },
];

const solutionsFR: Pick<SolutionItem, "title" | "desc" | "details">[] = [
  {
    title: "Développement Web & Mobile",
    desc: "Portails gouvernementaux, applications d'entreprise, plateformes d'enrôlement et logiciels métier sur mesure.",
    details: {
      intro:
        "Conception et développement de bout en bout d'applications web et mobiles robustes, de l'architecture au déploiement.",
      bullets: [
        "Portails gouvernementaux & citoyens",
        "Applications natives iOS & Android",
        "Plateformes d'enrôlement et capture biométrique",
        "ERP, CRM et logiciels métier sur mesure",
        "APIs sécurisées et intégrations",
      ],
    },
  },
  {
    title: "Transformation digitale",
    desc: "Numérisation des processus, GED, signatures électroniques et modernisation des services publics.",
    details: {
      intro:
        "Modernisez vos processus avec des flux numériques de bout en bout et des opérations sans papier.",
      bullets: [
        "Gestion électronique de documents (GED)",
        "Signatures électroniques à valeur légale",
        "Workflows d'approbation automatisés",
        "Modernisation des services publics",
        "Conduite du changement & formation",
      ],
    },
  },
  {
    title: "Identification intelligente",
    desc: "Cartes NFC & RFID, identités nationales, cartes employé, étudiant et santé.",
    details: {
      intro:
        "Écosystèmes complets de cartes intelligentes — de la personnalisation du chip à l'émission et la gestion du cycle de vie.",
      bullets: [
        "Cartes sans contact NFC & RFID",
        "Cartes d'identité nationales & biométriques",
        "Badges employés & étudiants",
        "Cartes santé & assurance maladie",
        "Imprimantes de cartes PVC et encodage",
        "Gestion sécurisée des clés et bureau de personnalisation",
      ],
    },
  },
  {
    title: "Contrôle d'accès",
    desc: "Systèmes biométriques, NFC et gestion des visiteurs avec tourniquets et serrures électroniques.",
    details: {
      intro:
        "Contrôle d'accès physique multi-facteurs pour sites sensibles, entreprises et bâtiments publics.",
      bullets: [
        "Biométrie empreinte, visage & iris",
        "Lecteurs de badges NFC / RFID",
        "Tourniquets et portails intelligents",
        "Serrures électroniques et contrôleurs de portes",
        "Gestion des visiteurs & accès temporaires",
        "Supervision centralisée et journaux d'audit",
      ],
    },
  },
  {
    title: "Smart Home & IoT",
    desc: "Domotique, éclairage intelligent, serrures connectées et gestion de l'énergie.",
    details: {
      intro:
        "Écosystèmes connectés pour bâtiments résidentiels et tertiaires, pilotés depuis une seule application.",
      bullets: [
        "Automatisation éclairage, climat & volets",
        "Serrures connectées & visiophones",
        "Supervision énergie & comptage intelligent",
        "Pilotage voix & application mobile",
        "Scénarios et automatisations géolocalisées",
      ],
    },
  },
  {
    title: "Cybersécurité",
    desc: "Audits, protection des données, chiffrement et supervision 24/7.",
    details: {
      intro:
        "Programmes de sécurité défensive alignés sur les standards internationaux et exigences souveraines.",
      bullets: [
        "Audits de sécurité & pentests",
        "Alignement ISO 27001 / NIST",
        "Chiffrement des données au repos et en transit",
        "Supervision SOC 24/7 et réponse à incidents",
        "Gestion des identités & accès (IAM)",
        "Programmes de sensibilisation & formation",
      ],
    },
  },
  {
    title: "Vidéosurveillance",
    desc: "Caméras IP, CCTV, détection d'intrusion et supervision à distance.",
    details: {
      intro: "Surveillance haute définition avec analytique intelligente et opération à distance.",
      bullets: [
        "Caméras IP & systèmes PTZ",
        "Analytique IA (mouvement, plaque, intrusion)",
        "Stockage NVR / VMS",
        "Applications mobiles et web de supervision",
        "Intégration avec le contrôle d'accès",
      ],
    },
  },
  {
    title: "Infrastructure IT",
    desc: "Réseaux d'entreprise, fibre optique, Wi-Fi professionnel et solutions cloud.",
    details: {
      intro:
        "Fondations réseau et cloud fiables, sécurisées et évolutives pour toute organisation.",
      bullets: [
        "Câblage structuré & fibre optique",
        "Wi-Fi entreprise & réseaux maillés",
        "Routeurs, switchs & pare-feux",
        "Cloud privé, hybride & souverain",
        "Sauvegarde, PRA et haute disponibilité",
      ],
    },
  },
  {
    title: "Équipements technologiques",
    desc: "Serveurs, imprimantes de cartes PVC, lecteurs NFC, équipements réseau et surveillance.",
    details: {
      intro: "Sourcing, déploiement et maintenance de matériel professionnel certifié.",
      bullets: [
        "Serveurs, stockage & baies",
        "Imprimantes de cartes PVC & encodeurs",
        "Lecteurs et terminaux NFC / RFID",
        "Équipements réseau et surveillance",
        "Garantie, SLA et support sur site",
      ],
    },
  },
];

export function Solutions() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [gridRef, gridInView] = useScrollReveal<HTMLDivElement>();

  const items: SolutionItem[] = solutionsEN.map((s, i) => {
    if (lang === "FR") {
      const fr = solutionsFR[i];
      return { ...s, title: fr.title, desc: fr.desc, details: fr.details };
    }
    return s;
  });

  const renderDetail = (i: number) => (
    <div className="col-span-1 sm:col-span-2 lg:col-span-3 rounded-3xl border border-accent/30 bg-gradient-to-br from-card/90 to-card/40 backdrop-blur p-5 sm:p-8 shadow-card relative animate-fade-up">
      <button
        onClick={() => setActive(null)}
        aria-label={t("sol.close")}
        className="absolute top-4 right-4 h-9 w-9 rounded-full border border-border flex items-center justify-center hover:border-accent/60 transition"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="grid md:grid-cols-12 gap-6 sm:gap-8 items-start">
        <div className="md:col-span-4 flex flex-col items-start gap-3 sm:gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/40 to-primary/20 p-px">
            <div className="h-full w-full rounded-2xl bg-background/60 flex items-center justify-center">
              {(() => {
                const I = items[i].icon;
                return <I className="h-6 w-6 text-accent" />;
              })()}
            </div>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl">{items[i].title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{items[i].details.intro}</p>
          <a
            href="#contact"
            className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-primary text-primary-foreground text-sm font-medium shadow-glow hover:shadow-glow-cyan transition"
          >
            {lang === "FR" ? "Demander un devis" : "Request a quote"} →
          </a>
        </div>
        <div className="md:col-span-8">
          <div className="text-xs uppercase tracking-[0.22em] text-accent mb-3 sm:mb-4">
            {lang === "FR" ? "Ce que nous livrons" : "What we deliver"}
          </div>
          <ul className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
            {items[i].details.bullets.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-background/40 p-3"
              >
                <div className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent" />
                </div>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <section id="solutions" className="relative py-20 sm:py-36">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20 [background-image:radial-gradient(circle,oklch(1_0_0_/_0.15)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t("sol.eyebrow")}
          title={
            <>
              {t("sol.title.a")} <span className="text-gradient-primary">{t("sol.title.b")}</span>
            </>
          }
          desc={t("sol.desc")}
        />

        <div ref={gridRef} className={`mt-10 sm:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 stagger ${gridInView ? "revealed" : ""}`}>
          {items.map((item, i) => {
            const { icon: Icon, title, desc, color } = item;
            const isActive = active === i;
            const hiddenOnMobile = !showAll && i >= 4;
            return (
              <Fragment key={title}>
                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : i)}
                  className={`reveal-child group relative text-left overflow-hidden rounded-3xl border bg-gradient-to-br from-card/80 to-card/20 backdrop-blur-sm p-5 sm:p-6 transition-all duration-300 ease-out shadow-card ${isActive ? "border-accent ring-2 ring-accent/30 sm:scale-[1.02]" : "border-border hover:border-accent/60 hover:scale-[1.02]"} ${hiddenOnMobile ? "hidden sm:block" : ""}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${color} blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <div className="relative">
                    <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-accent/40 to-primary/20 p-px mb-4 sm:mb-5">
                      <div className="h-full w-full rounded-2xl bg-background/60 flex items-center justify-center shadow-inner">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-base sm:text-lg">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    <div
                      className={`mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent transition-all duration-300 ease-out ${isActive ? "opacity-100" : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"}`}
                    >
                      {isActive ? t("sol.close") : t("sol.learnMore")} →
                    </div>
                  </div>
                </button>
                {isActive && renderDetail(i)}
              </Fragment>
            );
          })}
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
                ? `Voir les ${items.length - 4} autres`
                : `Show ${items.length - 4} more`}
          </button>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
}) {
  const [ref, inView] = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`max-w-3xl section-reveal ${inView ? "revealed" : ""}`}>
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent reveal-fade-up">
        <span className="h-px w-8 bg-accent section-header-line" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight reveal-fade-up" style={{ transitionDelay: "100ms" }}>
        {title}
      </h2>
      {desc && <p className="mt-4 text-muted-foreground sm:text-lg reveal-fade-up" style={{ transitionDelay: "200ms" }}>{desc}</p>}
    </div>
  );
}

