import { 
  Search, 
  Factory, 
  ShieldCheck, 
  Truck, 
  Award, 
  Users 
} from 'lucide-react';

export const services = [
  {
    id: 'sourcing',
    title: 'Product Sourcing',
    description: 'End-to-end sourcing solutions from vendor identification to final delivery',
    icon: Search,
    features: ['Vendor identification', 'Price negotiation', 'Quality control', 'Sample development'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing Support',
    description: 'Complete manufacturing coordination and quality assurance',
    icon: Factory,
    features: ['Production planning', 'Quality monitoring', 'Timeline management', 'Cost optimization'],
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'quality',
    title: 'Quality Assurance',
    description: 'Comprehensive quality control and testing services',
    icon: ShieldCheck,
    features: ['Pre-production inspection', 'In-process quality control', 'Final inspection', 'Lab testing'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'logistics',
    title: 'Logistics & Shipping',
    description: 'Efficient logistics solutions and international shipping',
    icon: Truck,
    features: ['Freight forwarding', 'Customs clearance', 'Documentation', 'Tracking systems'],
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'consulting',
    title: 'Sourcing Consulting',
    description: 'Strategic consulting for optimal sourcing decisions',
    icon: Users,
    features: ['Market analysis', 'Supplier evaluation', 'Cost optimization', 'Risk assessment'],
    color: 'from-indigo-500 to-indigo-600'
  }
];