import { Shield, Globe, Clock, Users, Award } from 'lucide-react';

export const heroContent = {
  badge: "Professional Garments Sourcing",
  title: "Transform Your Sourcing Vision Into Premium Reality",
  subtitle: "APPATEX delivers exceptional garments sourcing solutions with uncompromising quality. From concept to delivery, we orchestrate excellence that elevates your brand.",
  primaryButton: {
    text: "Get Quote",
    href: "#contact"
  },
  secondaryButton: {
    text: "View Services",
    href: "#services"
  },
  benefits: [
    {
      icon: Shield,
      title: "Quality Excellence",
      description: "Rigorous quality control processes ensure every product meets international standards"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Extensive network of trusted manufacturers across Asia for reliable sourcing"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support and transparent communication"
    }
  ]
};

export const statistics = [
  { value: '14+', label: 'Years Experience', icon: Clock },
  { value: '500+', label: 'Happy Clients', icon: Users },
  { value: '25+', label: 'Countries Served', icon: Globe },
  { value: '50+', label: 'Team Members', icon: Award },
];