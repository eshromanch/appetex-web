import { logo } from "@/data/navigationData";

export const Logo = () => (
  <a href={logo.href} className="font-display text-2xl font-bold appatex-text-gradient">
    {logo.text}
  </a>
);
