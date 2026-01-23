import { logo } from "@/data/navigationData";
import Image from "next/image";

export const Logo = () => (
  <a href={logo.href} >
    {/* {logo.text} */}
    <Image src="/logo.png" alt="Logo" width={500} height={200} className="w-[170px] h-[100px] lg:h-[100px]"/>
  </a>
);
