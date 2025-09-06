import { 
  Search, 
  Users, 
  Package, 
  Truck, 
  Shield, 
  Clock,
  Target,
  Globe,
  CheckCircle,
  Zap,
  Award,
  Heart
} from 'lucide-react';

export const services = [
  {
    id: 'product-sourcing',
    title: 'Product Sourcing',
    description: 'Comprehensive product sourcing services across multiple categories including garments, home textiles, jute products, and leather goods.',
    icon: Search,
    features: [
      'Custom product specifications',
      'Multiple category expertise',
      'Global supplier network',
      'Quality assurance'
    ]
  },
  {
    id: 'supplier-management',
    title: 'Supplier Management',
    description: 'End-to-end supplier management including identification, evaluation, and relationship management with verified suppliers.',
    icon: Users,
    features: [
      'Supplier verification',
      'Performance monitoring',
      'Relationship management',
      'Quality audits'
    ]
  },
  {
    id: 'quality-control',
    title: 'Quality Control',
    description: 'Rigorous quality control processes including pre-production inspections, in-process checks, and final quality audits.',
    icon: Shield,
    features: [
      'Pre-production inspections',
      'In-process quality checks',
      'Final quality audits',
      'Certification compliance'
    ]
  },
  {
    id: 'logistics-coordination',
    title: 'Logistics & Shipping',
    description: 'Complete logistics coordination including shipping arrangements, customs clearance, and delivery management.',
    icon: Truck,
    features: [
      'Shipping coordination',
      'Customs clearance',
      'Delivery tracking',
      'Documentation support'
    ]
  },
  {
    id: 'sample-development',
    title: 'Sample Development',
    description: 'Professional sample development and approval processes to ensure products meet your exact specifications.',
    icon: Package,
    features: [
      'Sample coordination',
      'Design modifications',
      'Approval processes',
      'Technical specifications'
    ]
  },
  {
    id: 'consultation-services',
    title: 'Consultation Services',
    description: 'Expert consultation on sourcing strategies, market trends, and best practices for your business needs.',
    icon: Target,
    features: [
      'Sourcing strategy',
      'Market analysis',
      'Cost optimization',
      'Risk assessment'
    ]
  }
];
