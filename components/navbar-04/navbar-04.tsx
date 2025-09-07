'use client';

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";

const Navbar04Page = () => {
  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background/95 backdrop-blur-sm border border-border max-w-screen-xl mx-auto rounded-full z-50">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Link href="/quote">
            <Button className="rounded-full appatex-gradient">
              Get Quote
            </Button>
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar04Page;
