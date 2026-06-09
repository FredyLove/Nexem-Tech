import logo from "@/assets/nexem-logo.png";
import icon from "@/assets/nexem-icon.png";
import { cn } from "@/lib/utils";

type NexemLogoProps = {
  variant?: "icon" | "hero";
  iconClassName?: string;
  className?: string;
  alt?: string;
  priority?: boolean;
};

export function NexemLogo({
  variant = "icon",
  iconClassName,
  className,
  alt = "Nexem Technologies",
  priority = false,
}: NexemLogoProps) {
  const src = variant === "hero" ? logo : icon;

  return (
    <img
      src={src}
      alt={alt}
      draggable={false}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={cn("block h-full w-full object-contain object-center", iconClassName, className)}
    />
  );
}

type NexemBrandProps = {
  size?: "nav" | "footer";
  className?: string;
};

export function NexemBrand({ size = "nav", className }: NexemBrandProps) {
  const isNav = size === "nav";

  return (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      <div
        className={cn(
          "relative bg-white shadow-card ring-1 ring-white/30 group-hover:shadow-glow-cyan transition-all duration-300",
          isNav ? "h-11 w-11 rounded-2xl p-1" : "h-16 w-16 rounded-[20px] p-1.5"
        )}
      >
        <NexemLogo variant="hero" className="h-full w-full object-contain" />
        {isNav && (
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-success animate-pulse-glow ring-2 ring-background" />
        )}
      </div>
      <div className="leading-tight">
        <div className={cn("font-display font-bold tracking-wide", isNav ? "text-sm" : "text-xl")}>NEXEM</div>
        <div className={cn("text-gold tracking-[0.2em] -mt-0.5", isNav ? "text-[10px]" : "text-[13px]")}>TECHNOLOGIES</div>
      </div>
    </div>
  );
}
