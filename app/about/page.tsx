import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/ui/page-hero";
import { aboutData } from "@/data/aboutData";
import { achievements } from "@/data/achievements";
import { documents } from "@/data/documentsData";
import { CheckCircle, Users, Globe, Award, Target, Shield, Eye, Download } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logos07Page from "@/components/logos-07/logos-07";

export default function AboutPage() {
  const stats = [
    {
      icon: Users,
      number: "180+",
      label: "Happy Clients",
      description: "Satisfied customers worldwide"
    },
    {
      icon: Globe,
      number: "12+",
      label: "Countries Served",
      description: "Global sourcing network"
    },
    {
      icon: Award,
      number: "15+",
      label: "Years Experience",
      description: "Industry expertise"
    },
    {
      icon: Target,
      number: "15+",
      label: "Team Members",
      description: "Expert professionals"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensure every product meets international standards and your specifications."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Extensive network of verified suppliers across 12+ countries for reliable and diverse sourcing options."
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "15+ experienced professionals with deep industry knowledge and local market expertise."
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "15+ years of successful sourcing experience with 180+ satisfied clients worldwide."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHero
        badge="About APPATEX"
        title={aboutData.title}
        description={aboutData.description}
        backgroundImage="/about.jpg"
        backgroundImageAlt="Professional garments sourcing and manufacturing"
        primaryButton={{
          text: "Our Services",
          href: "/services"
        }}
        secondaryButton={{
          text: "Contact Us",
          href: "/contact"
        }}
        height="lg"
        overlay="medium"
      />

      {/* Stats Section */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
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
      {/* Our Story Section */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-6">
              {aboutData.story.title}
            </Heading>
            <Text size="lg" className="body-text-black-secondary leading-relaxed text-center ">
              {aboutData.story.content}
            </Text>
          </div>

          {/* Co-Founders Section */}
          <div className="space-y-16">
            {/* Co-Founder 1 - Left Aligned */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <div>
                    <Heading level={3} className="heading-black mb-2">
                      {aboutData.founders[0].name}
                    </Heading>
                    <Text weight="semibold" className="body-text-black text-primary">
                      {aboutData.founders[0].role}
                    </Text>
                  </div>
                  <Text className="body-text-black-muted leading-relaxed text-lg">
                    {aboutData.founders[0].bio}
                  </Text>
                  {/* <div className="flex items-center gap-4 pt-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <Text weight="semibold" className="body-text-black">Global Network</Text>
                      <Text size="sm" className="body-text-black-muted">12+ Countries</Text>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center">
                    <div className="w-64 h-64 bg-white rounded-xl shadow-lg overflow-hidden">
                      <Image
                        src="/content/zia"
                        alt={aboutData.founders[0].name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Co-Founder 2 - Right Aligned */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="relative">
                  <div className="w-full h-80 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center">
                    <div className="w-64 h-64 bg-white rounded-xl shadow-lg overflow-hidden">
                      <Image
                        src="/content/nayeem.jpeg"
                        alt={aboutData.founders[1].name}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-2">
                <div className="space-y-6">
                  <div>
                    <Heading level={3} className="heading-black mb-2">
                      {aboutData.founders[1].name}
                    </Heading>
                    <Text weight="semibold" className="body-text-black text-primary">
                      {aboutData.founders[1].role}
                    </Text>
                  </div>
                  <Text className="body-text-black-muted leading-relaxed text-lg">
                    {aboutData.founders[1].bio}
                  </Text>
                </div>
              </div>
            </div>
          </div>


        </div>
      </SectionContainer>
      {/* Mission & Vision */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Heading level={2} className="heading-black">
              Our Mission
            </Heading>
            <Text size="lg" className="body-text-black-secondary leading-relaxed">
              {aboutData.mission}
            </Text>
            <div className="space-y-4">
              {aboutData.missionPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <Text className="body-text-black">{point}</Text>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <Heading level={2} className="heading-black">
              Our Vision
            </Heading>
            <Text size="lg" className="body-text-black-secondary leading-relaxed">
              {aboutData.vision}
            </Text>
            <div className="space-y-4">
              {aboutData.visionPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <Text className="body-text-black">{point}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>



      {/* Key Achievements */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Key Achievements
            </Heading>
            <Text size="lg" className="body-text-black-secondary text-center">
              Our track record speaks for itself. Here are some of our notable achievements in the sourcing industry.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <Heading level={4} className="heading-black mb-3">
                      {achievement.title}
                    </Heading>
                    <Text className="body-text-black-muted text-center">
                      {achievement.description}
                    </Text>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* Certifications & Documents Section */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Certifications & Documents
            </Heading>
            <Text size="lg" className="body-text-black-secondary text-center">
              We maintain complete transparency with all our legal documents and certifications available for review.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Icon */}
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      
                      {/* Badge */}
                      <Badge variant="secondary" size="sm">
                        {doc.category}
                      </Badge>
                      
                      {/* Title & Description */}
                      <div className="space-y-2">
                        <Heading level={4} className="heading-black">
                          {doc.title}
                        </Heading>
                        <Text size="sm" className="body-text-black-muted">
                          {doc.description}
                        </Text>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full pt-2">
                        <a
                          href={`/pdf/${encodeURIComponent(doc.filename)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="outline" size="sm" className="w-full">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </a>
                        <a
                          href={`/pdf/${encodeURIComponent(doc.filename)}`}
                          download
                          className="flex-1"
                        >
                          <Button variant="primary" size="sm" className="w-full">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </SectionContainer>

      {/* Core Values */}


      {/* Why Choose Us Features */}
      <SectionContainer size="xl" padding="xl" background="muted">
        <div className="text-center space-y-12">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="heading-black mb-4">
              Why Choose APPATEX?
            </Heading>
            <Text size="lg" className="body-text-black-secondary text-center">
              We combine industry expertise, global reach, and personalized service to deliver exceptional sourcing solutions.
            </Text>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-6 text-left">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Heading level={4} className="heading-black mb-3">
                      {feature.title}
                    </Heading>
                    <Text className="body-text-black-muted">
                      {feature.description}
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
      <Logos07Page type="client" />

      {/* CTA Section */}
      <SectionContainer size="xl" padding="xl" background="default">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <Heading level={2} className="heading-black mb-4">
              Ready to Partner With Us?
            </Heading>
            <Text size="lg" className="body-text-black-secondary mb-6 max-w-2xl mx-auto text-center">
              Let&apos;s discuss your sourcing requirements and how we can help you achieve your business goals.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" className="appatex-gradient">
                  Get Started
                </Button>
              </Link>
              <a
                href="/Presentation - APPATEX.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </SectionContainer>
    </div>
  );
}
