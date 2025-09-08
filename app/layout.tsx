import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Navbar04Page from "@/components/navbar-04/navbar-04";
import Footer02Page from "@/components/footer-02/footer-02";
import FloatingWhatsApp from "@/components/floating-whatsapp/floating-whatsapp";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "APPATEX - Professional Garments Sourcing",
  description: "With 14+ years of textile expertise and 500+ satisfied clients across 25+ countries, APPATEX transforms your sourcing vision into premium reality. From concept to delivery, we orchestrate excellence.",
  keywords: "garments sourcing, textile manufacturing, quality assurance, global sourcing, fashion industry, apparel production",
  authors: [{ name: "APPATEX" }],
  openGraph: {
    title: "APPATEX - Professional Garments Sourcing",
    description: "Transform your sourcing vision into premium reality with 14+ years of textile expertise.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lora.variable} antialiased`}
      >
        <Navbar04Page />
        {children}
        <Footer02Page />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
