import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { navigationItems } from "@/data/navigationData";
import Link from "next/link";
import { Button } from "../ui";

interface NavMenuProps extends NavigationMenuProps {
  onItemClick?: () => void;
}

export const NavMenu = ({ onItemClick, ...props }: NavMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      {navigationItems.map((item) => (
        <NavigationMenuItem key={item.name}>
          <NavigationMenuLink asChild>
            <Link 
              href={item.href} 
              className="body-text-black hover:body-text-primary transition-colors duration-200"
              onClick={onItemClick}
            >
              {item.name}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
