import { logo } from "@/data/navigationData";
import Image from "next/image";

export const Logo = () => (
  <a href={logo.href} className="font-display text-lg sm:text-xl lg:text-2xl font-bold appatex-text-gradient">
    {/* {logo.text} */}
    <Image src="/logo.png" alt="Logo" width={500} height={500} className="w-[100px] h-[100px] lg:w-[150px] lg:h-[150px]"/>
  </a>
);
