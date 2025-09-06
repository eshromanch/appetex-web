import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "card";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "max-w-4xl",
  md: "max-w-6xl", 
  lg: "max-w-7xl",
  xl: "max-w-[1400px]",
};

const backgroundClasses = {
  default: "bg-background",
  muted: "bg-muted",
  card: "bg-card",
};

const paddingClasses = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-20",
  xl: "py-20 md:py-24",
};

export function SectionContainer({
  children,
  className,
  size = "lg",
  background = "default",
  padding = "md",
}: SectionContainerProps) {
  return (
    <section className={cn(backgroundClasses[background], paddingClasses[padding])}>
      <div className={cn("mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>
        {children}
      </div>
    </section>
  );
}
