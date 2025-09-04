import { 
  Shield, 
  Clock, 
  DollarSign, 
  Users, 
  Globe, 
  Award,
  CheckCircle,
  Factory,
  Truck,
  FileText
} from 'lucide-react';

export const benefits = [
  {
    id: 'quality',
    title: 'Quality Assurance',
    description: 'Rigorous quality control processes ensure every product meets international standards',
    icon: Shield,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'speed',
    title: 'Fast Delivery',
    description: 'Efficient logistics and production planning ensure timely delivery',
    icon: Clock,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'cost',
    title: 'Competitive Pricing',
    description: 'Direct manufacturer relationships enable the best possible pricing',
    icon: DollarSign,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'experience',
    title: '14+ Years Experience',
    description: 'Deep industry knowledge and proven track record',
    icon: Award,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'network',
    title: 'Global Network',
    description: 'Extensive network of trusted manufacturers across Asia',
    icon: Globe,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Round-the-clock customer support and communication',
    icon: Users,
    color: 'from-red-500 to-red-600'
  }
];

export const processes = [
  {
    id: 'planning',
    title: 'Strategic Planning',
    description: 'Comprehensive analysis of requirements and market conditions',
    icon: FileText
  },
  {
    id: 'sourcing',
    title: 'Vendor Selection',
    description: 'Careful evaluation and selection of the best manufacturers',
    icon: Users
  },
  {
    id: 'production',
    title: 'Production Management',
    description: 'Ongoing monitoring and coordination throughout production',
    icon: Factory
  },
  {
    id: 'quality',
    title: 'Quality Control',
    description: 'Multiple inspection points to ensure product quality',
    icon: Shield
  },
  {
    id: 'logistics',
    title: 'Logistics & Shipping',
    description: 'Efficient handling of shipping and customs procedures',
    icon: Truck
  },
  {
    id: 'delivery',
    title: 'Final Delivery',
    description: 'Timely delivery and post-sale support',
    icon: CheckCircle
  }
];
