'use client';

import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useQuote } from "@/contexts/QuoteContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const Navbar04Page = () => {
  const { getQuoteCount } = useQuote();
  const quoteCount = getQuoteCount();

  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background/95 backdrop-blur-sm border border-border max-w-screen-xl mx-auto rounded-full z-50">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
                      {/* Quote Counter */}
                      
                        <Link href='/quote'>
                          <Button className="rounded-full appatex-gradient">
                            {quoteCount > 0 ? <ShoppingCart className="h-4 w-4 mr-2" /> : ''}
                            {quoteCount > 0 ? "Quote List" : "Get Quote"}
                           {quoteCount > 0 && <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                              {quoteCount}
                            </span>}
                          </Button>
                        </Link>
                    

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
