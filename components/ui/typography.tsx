import { cn } from "@/lib/utils";
import { ReactNode, ElementType } from "react";

// Heading Component
interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  gradient?: boolean;
}

const headingClasses = {
  1: "text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight",
  2: "text-3xl md:text-4xl lg:text-5xl font-display font-semibold tracking-tight",
  3: "text-2xl md:text-3xl lg:text-4xl font-display font-medium tracking-tight",
  4: "text-xl md:text-2xl lg:text-3xl font-display font-medium tracking-tight",
  5: "text-lg md:text-xl lg:text-2xl font-display font-medium tracking-tight",
  6: "text-base md:text-lg lg:text-xl font-display font-medium tracking-tight",
};

export function Heading({
  children,
  level = 2,
  className,
  as,
  gradient = false,
}: HeadingProps) {
  const Component = (as || `h${level}`) as ElementType;
  const baseClasses = headingClasses[level];
  
  return (
    <Component
      className={cn(
        baseClasses,
        gradient && "appatex-text-gradient",
        !gradient && "text-foreground",
        className
      )}
    >
      {children}
    </Component>
  );
}

// Text Component
interface TextProps {
  children: ReactNode;
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  color?: "default" | "muted" | "accent" | "gradient";
  className?: string;
  as?: "p" | "span" | "div" | "label";
  align?: "left" | "center" | "right";
}

const textSizeClasses = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const textWeightClasses = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const textColorClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-primary",
  gradient: "appatex-text-gradient",
};

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Text({
  children,
  size = "base",
  weight = "normal",
  color = "default",
  className,
  as: Component = "p",
  align = "left",
}: TextProps) {
  return (
    <Component
      className={cn(
        textSizeClasses[size],
        textWeightClasses[weight],
        textColorClasses[color],
        textAlignClasses[align],
        className
      )}
    >
      {children}
    </Component>
  );
}

// Lead Text Component (for introductions)
interface LeadTextProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export function LeadText({ children, className, align = "left" }: LeadTextProps) {
  return (
    <Text
      size="lg"
      weight="normal"
      color="muted"
      className={cn("leading-relaxed", className)}
      align={align}
    >
      {children}
    </Text>
  );
}

// Small Text Component
interface SmallTextProps {
  children: ReactNode;
  className?: string;
  color?: "default" | "muted" | "accent";
  weight?: "normal" | "medium" | "semibold";
}

export function SmallText({
  children,
  className,
  color = "muted",
  weight = "normal",
}: SmallTextProps) {
  return (
    <Text
      size="sm"
      weight={weight}
      color={color}
      className={className}
    >
      {children}
    </Text>
  );
}

// Section Title Component
interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
  gradient?: boolean;
}

export function SectionTitle({
  children,
  subtitle,
  className,
  align = "center",
  gradient = false,
}: SectionTitleProps) {
  return (
    <div className={cn("space-y-4", textAlignClasses[align], className)}>
      <Heading level={2} gradient={gradient}>
        {children}
      </Heading>
      {subtitle && (
        <LeadText align={align}>
          {subtitle}
        </LeadText>
      )}
    </div>
  );
}
