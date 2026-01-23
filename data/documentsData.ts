import { FileText, Award, Building2, Briefcase, Scale, Shield, Landmark } from 'lucide-react';

export interface Document {
  title: string;
  filename: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

export const documents: Document[] = [
  {
    title: "Company Registration",
    filename: "Appatex -Registration .pdf",
    description: "Official company registration certificate",
    icon: Building2,
    category: "Legal"
  },
  {
    title: "TIN Certificate",
    filename: "Appatex -TIN.pdf",
    description: "Tax Identification Number certificate",
    icon: FileText,
    category: "Tax"
  },
  {
    title: "Bank Certificate",
    filename: "Bank Certificate 1.pdf",
    description: "Banking credentials and verification",
    icon: Landmark,
    category: "Financial"
  },
  {
    title: "BGBA Membership",
    filename: "BGBA CERTIFICATE .pdf",
    description: "Bangladesh Garments Buying House Association membership",
    icon: Award,
    category: "Membership"
  },
  {
    title: "BIN Certification",
    filename: "BIN Certification.PDF",
    description: "Business Identification Number certificate",
    icon: Shield,
    category: "Legal"
  },
  {
    title: "ERC Certificate",
    filename: "ERC-APPATEX.pdf",
    description: "Export Registration Certificate",
    icon: Briefcase,
    category: "Export"
  },
  {
    title: "Trade License",
    filename: "Trade license - Correction .pdf",
    description: "Official trade license document",
    icon: Scale,
    category: "Legal"
  }
];
