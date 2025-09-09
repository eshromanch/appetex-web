import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHero } from "@/components/ui/page-hero";
import { services } from "@/data/services";
import { Search, Users, Package, Truck, Shield, Clock, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const processSteps = [
    {
      icon: Search,
      title: "Requirement Analysis",
      description: "We analyze your specific requirements, quality standards, and business objectives to understand your sourcing needs."
    },
    {
      icon: Users,
      title: "Supplier Selection",
      description: "Our team identifies and evaluates the best suppliers from our global network that match your criteria."
    },
    {
      icon: Package,
      title: "Sample Development",
      description: "We coordinate sample development and approval processes to ensure products meet your specifications."
    },
    {
      icon: Shield,
      title: "Quality Control",
      description: "Rigorous quality control processes ensure every product meets international standards and your requirements."
    },
    {
      icon: Truck,
      title: "Logistics & Delivery",
      description: "We handle all logistics, shipping, and delivery coordination to ensure timely and safe product delivery."
    },
    {
      icon: CheckCircle,
      title: "Post-Delivery Support",
      description: "Ongoing support and relationship management to ensure continued satisfaction and future collaboration."
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Time Efficient",
      description: "Save time with our streamlined sourcing process and established supplier relationships."
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Comprehensive quality control ensures products meet your standards and specifications."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated account managers and sourcing experts to guide you through every step."
    },
    {
      icon: Package,
      title: "Cost Effective",
      description: "Competitive pricing through our extensive supplier network and volume negotiations."
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <PageHero
        badge="Our Services"
        title="Comprehensive Sourcing Solutions"
        description="From initial consultation to final delivery, we provide end-to-end sourcing services that help you find the right products at the right price with the right quality."
        backgroundImage="/service.jpg"
        backgroundImageAlt="Professional sourcing and supply chain management"
        primaryButton={{
          text: "START YOUR ORDER",
          href: "/contact"
        }}
        secondaryButton={{
          text: "View Products",
          href: "/products"
        }}
        height="lg"
        overlay="medium"
      />

      {/* Services Grid */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Our Core Services
            </Heading>
            <Text size="lg" className="text-center body-text-black-secondary">
              We offer a comprehensive range of sourcing services tailored to meet your specific business needs.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="heading-black">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text className="body-text-black-muted mb-6">
                      {service.description}
                    </Text>
                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
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

      {/* Our Process */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Our Sourcing Process
            </Heading>
            <Text size="lg" className="text-center body-text-black-secondary">
              Our systematic approach ensures quality, efficiency, and customer satisfaction at every step of the sourcing journey.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    {/* {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-primary/20 transform translate-x-4"></div>
                    )} */}
                  </div>
                  <Heading level={4} className="heading-black mb-3">
                    {step.title}
                  </Heading>
                  <Text className="body-text-black-muted text-center">
                    {step.description}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* Benefits Section */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Why Choose Our Services?
            </Heading>
            <Text size="lg" className="body-text-black-secondary text-center">
              We combine industry expertise, global reach, and personalized service to deliver exceptional results.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <Text className="body-text-black-muted text-center">
                      {benefit.description}
                    </Text>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* Industry Expertise */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Heading level={2} className="heading-black">
              Industry Expertise
            </Heading>
            <Text size="lg" className="body-text-black-secondary leading-relaxed">
              With 14+ years of experience in the sourcing industry, we understand the complexities and challenges of global supply chains. Our team brings deep knowledge of:
            </Text>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <Text weight="semibold" className="body-text-black">International Trade Regulations</Text>
                  <Text size="sm" className="body-text-black-muted">Compliance with global trade laws and customs requirements</Text>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <Text weight="semibold" className="body-text-black">Quality Standards</Text>
                  <Text size="sm" className="body-text-black-muted">Understanding of international quality certifications and standards</Text>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <Text weight="semibold" className="body-text-black">Market Dynamics</Text>
                  <Text size="sm" className="body-text-black-muted">Knowledge of global market trends and pricing dynamics</Text>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <Text weight="semibold" className="body-text-black">Supplier Networks</Text>
                  <Text size="sm" className="body-text-black-muted">Established relationships with verified suppliers worldwide</Text>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/factory.jpg"
                alt="Global sourcing and supply chain management"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <Heading level={2} className="heading-black mb-4">
              Ready to Get Started?
            </Heading>
            <Text size="lg" className="body-text-black-secondary mb-6 max-w-2xl mx-auto text-center">
              Let&apos;s discuss your sourcing requirements and how our services can help you achieve your business goals.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" className="appatex-gradient">
                  Request Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </SectionContainer>
    </div>
  );
}
