'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import Link from "next/link";

export const NavigationSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full h-8 w-8 sm:h-9 sm:w-9 p-0">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" onItemClick={() => setOpen(false)} />
        <div className="w-full flex items-center justify-center">
      <Link className="w-full" href="/quote">
            <Button onClick={() => setOpen(false)} variant="primary" size="lg" className="w-full mt-6 block md:hidden appatex-gradient">
              Get Quote
            </Button>
          </Link>
      </div>
      </SheetContent>
    </Sheet>
  );
};
