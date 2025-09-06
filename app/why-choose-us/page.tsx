import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { benefits } from "@/data/benefits";
import { processes } from "@/data/whyChooseUsData";
import { 
  CheckCircle, 
  Users, 
  Globe, 
  Award, 
  Shield, 
  Clock, 
  Target, 
  ArrowRight,
  Star
} from "lucide-react";

export default function WhyChooseUsPage() {
  const keyStats = [
    {
      icon: Users,
      number: "500+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide"
    },
    {
      icon: Globe,
      number: "25+",
      label: "Countries Served",
      description: "Global sourcing network"
    },
    {
      icon: Award,
      number: "14+",
      label: "Years Experience",
      description: "Industry expertise"
    },
    {
      icon: Target,
      number: "100%",
      label: "Quality Assured",
      description: "Quality control standards"
    }
  ];

  const competitiveAdvantages = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensure every product meets international standards and your specifications.",
      features: ["Pre-production inspections", "In-process quality checks", "Final quality audits", "Certification compliance"]
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Extensive network of verified suppliers across 25+ countries for reliable and diverse sourcing options.",
      features: ["Verified supplier database", "Local market expertise", "Cultural understanding", "Regional compliance"]
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced professionals with deep industry knowledge and local market expertise.",
      features: ["Industry specialists", "Local language support", "Technical expertise", "Dedicated account managers"]
    },
    {
      icon: Clock,
      title: "Efficient Process",
      description: "Streamlined sourcing process that saves time and reduces costs while maintaining quality standards.",
      features: ["Fast turnaround times", "Streamlined communication", "Digital documentation", "Real-time updates"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Fashion Forward Ltd",
      country: "USA",
      rating: 5,
      text: "APPATEX has been our trusted sourcing partner for over 3 years. Their quality control and attention to detail is exceptional."
    },
    {
      name: "Michael Chen",
      company: "Global Retail Co",
      country: "Canada",
      rating: 5,
      text: "The team&apos;s expertise in international sourcing has helped us expand our product line while maintaining quality standards."
    },
    {
      name: "Emma Williams",
      company: "Style Solutions",
      country: "UK",
      rating: 5,
      text: "Professional, reliable, and always delivers on time. APPATEX understands our business needs perfectly."
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <PageHero
        badge="Why Choose APPATEX"
        title="Your Trusted Sourcing Partner"
        description="With 14+ years of experience and a global network of verified suppliers, we deliver exceptional sourcing solutions that help your business thrive."
        backgroundImage="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        backgroundImageAlt="Professional team and quality assurance in sourcing"
        primaryButton={{
          text: "Get Started",
          href: "/contact"
        }}
        secondaryButton={{
          text: "View Our Process",
          href: "/services"
        }}
        height="lg"
        overlay="medium"
      />

      {/* Key Stats */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {keyStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold body-text-black mb-2">{stat.number}</div>
                <div className="font-semibold body-text-black mb-1">{stat.label}</div>
                <div className="text-sm body-text-black-muted">{stat.description}</div>
              </div>
            );
          })}
        </div>
      </SectionContainer>

      {/* Competitive Advantages */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              What Sets Us Apart
            </Heading>
            <Text size="lg" className="body-text-black-secondary">
              Our competitive advantages make us the preferred choice for businesses seeking reliable sourcing solutions.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {competitiveAdvantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="heading-black mb-2">{advantage.title}</CardTitle>
                        <Text className="body-text-black-muted">{advantage.description}</Text>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {advantage.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <Text size="sm" className="body-text-black">{feature}</Text>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* Our Benefits */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Benefits of Working With Us
            </Heading>
            <Text size="lg" className="body-text-black-secondary">
              We provide comprehensive benefits that help your business succeed in today&apos;s competitive market.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <Heading level={4} className="heading-black mb-3">
                      {benefit.title}
                    </Heading>
                    <Text className="body-text-black-muted">
                      {benefit.description}
                    </Text>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* Our Process */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Our Proven Process
            </Heading>
            <Text size="lg" className="body-text-black-secondary">
              Our systematic approach ensures quality, efficiency, and customer satisfaction at every step.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processes.map((process, index) => {
              const Icon = process.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <Heading level={4} className="heading-black mb-3">
                      {process.title}
                    </Heading>
                    <Text className="body-text-black-muted">
                      {process.description}
                    </Text>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* Client Testimonials */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              What Our Clients Say
            </Heading>
            <Text size="lg" className="body-text-black-secondary">
              Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about working with APPATEX.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4 justify-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Text className="body-text-black mb-6 italic text-center">
                    &quot;{testimonial.text}&quot;
                  </Text>
                  <div className="text-center">
                    <Text weight="semibold" className="body-text-black">{testimonial.name}</Text>
                    <Text size="sm" className="body-text-black-muted">{testimonial.company}</Text>
                    <Text size="sm" className="body-text-black-muted">{testimonial.country}</Text>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer size="xl" padding="xl" background="default">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <Heading level={2} className="heading-black mb-4">
              Ready to Experience the Difference?
            </Heading>
            <Text size="lg" className="body-text-black-secondary mb-6 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trust APPATEX for their sourcing needs. Let&apos;s discuss how we can help your business succeed.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="appatex-gradient">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </SectionContainer>
    </div>
  );
}
