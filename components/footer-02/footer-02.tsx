import { Separator } from "@/components/ui/separator";
import { socialMedia } from "@/data/footerData";
import { contactData } from "@/data/contactData";
import {
  Linkedin,
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Logo } from "../navbar-04/logo";
interface FooterLink {
  title: string;
  href: string;
  isContact?: boolean;
  icon?: LucideIcon;
}

const footerSections: { title: string; links: FooterLink[] }[] = [
  {
    title: "Company",
    links: [
      {
        title: "About Us",
        href: "/about",
      },
      {
        title: "Our Services",
        href: "/services",
      },
      {
        title: "Contact Us",
        href: "/contact",
      },
      {
        title: "Admin Panel",
        href: "/admin",
      },
    ],
  },
  {
    title: "Products",
    links: [
      {
        title: "Men's Wear",
        href: "/products",
      },
      {
        title: "Women's Wear",
        href: "/products",
      },
      {
        title: "Kids' Wear",
        href: "/products",
      },
    ],
  },
  {
    title: "Contact Info",
    links: [
      {
        title: contactData.address,
        href: "#",
        isContact: true,
        icon: MapPin,
      },
      {
        title: contactData.phone,
        href: `tel:${contactData.phone}`,
        isContact: true,
        icon: Phone,
      },
      {
        title: contactData.phone2,
        href: `tel:${contactData.phone2}`,
        isContact: true,
        icon: Phone,
      },
      {
        title: contactData.whatsapp,
        href: `https://wa.me/${contactData.whatsapp.replace(/[^0-9]/g, '')}`,
        isContact: true,
        icon: MessageSquare,
      },
      {
        title: contactData.email,
        href: `mailto:${contactData.email}`,
        isContact: true,
        icon: Mail,
      },
    ],
  },
];

const Footer02Page = () => {
  return (
    <footer className="bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-10 px-6 xl:px-0">
          <div className="col-span-full lg:w-4/6 lg:col-span-2">
              {/* Logo */}
            {/* <div className="text-2xl font-display font-bold appatex-text-gradient">
              APPATEX
            </div> */}
            <Logo />

            <p className="mt-4 body-text-black-muted">
              Professional garments sourcing with 15+ years of expertise. From concept to delivery, we orchestrate excellence across 12+ countries.
              </p>
            </div>

            {footerSections.map(({ title, links }) => (
              <div className="w-full" key={title}>
              <h6 className="font-semibold body-text-black">{title}</h6>
                <ul className="mt-6  space-y-4">
                  {links.map((link) => {
                    const { title, href, isContact, icon } = link;
                    const IconComponent = icon;
                    return (
                      <li key={title}>
                        {href.startsWith('http') ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="body-text-black-muted hover:body-text-black transition-colors duration-200 flex items-start gap-2"
                          >
                            {isContact && IconComponent && (
                              <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={isContact ? "text-sm" : ""}>{title}</span>
                          </a>
                        ) : (
                          <Link
                            href={href}
                            className="body-text-black-muted hover:body-text-black transition-colors duration-200 flex items-start gap-2"
                          >
                            {isContact && IconComponent && (
                              <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            )}
                            <span className={isContact ? "text-sm" : ""}>{title}</span>
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <Separator />
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            {/* Copyright */}
          <span className="body-text-black-muted">
              &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:body-text-black transition-colors duration-200">
              APPATEX
              </Link>
              . All rights reserved.
            </span>

          <div className="flex items-center gap-5">
            {socialMedia.map(({ name, icon, href }) => {
              const IconComponent = icon === 'Linkedin' ? Linkedin : 
                                  icon === 'Facebook' ? Facebook : 
                                  icon === 'Instagram' ? Instagram : null;
              
              if (!IconComponent) return null;
              
              return (
                <Link 
                  key={name}
                  href={href} 
                  target="_blank"
                  className="body-text-black-muted hover:body-text-black transition-colors duration-200"
                  aria-label={name}
                >
                  <IconComponent className="h-5 w-5" />
              </Link>
              );
            })}
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer02Page;
