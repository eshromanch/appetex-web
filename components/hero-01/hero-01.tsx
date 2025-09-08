import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heading, Text, LeadText } from "@/components/ui/typography";
import { SectionContainer } from "@/components/ui/section-container";
import { heroContent } from "@/data/heroData";
import Link from "next/link";

const Hero01 = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/4622438-hd_1366_720_50fps.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay z-10"></div>
      
      {/* Content */}
      <SectionContainer 
        size="xl" 
        padding="xl" 
        background="default"
        className="relative z-20 min-h-screen flex items-center bg-transparent"
      >
        <div className="text-center pt-6 lg:pt-0 max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <Badge variant="gradient" size="lg" className="hero-glass body-text-white">
              {heroContent.badge}
            </Badge>
            
            <Heading level={1} className="heading-white">
              {heroContent.title}
            </Heading>
            
            <LeadText className="body-text-white-secondary text-lg max-w-3xl mx-auto text-center">
              {heroContent.subtitle}
            </LeadText>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Link href={'/quote'}>
           <Button size="lg" className="w-full appatex-gradient group relative">
              {heroContent.primaryButton.text} 
              {/* <ArrowRight className="absolute right-4 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" /> */}
            </Button>
           </Link>
            <Link href={'/services'}>
            <Button variant="outline" size="lg" className="w-full hero-glass body-text-white hover:bg-white/20 group relative">
              {heroContent.secondaryButton.text} 
              {/* <ArrowRight className="absolute right-4 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" /> */}
            </Button>
            </Link>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-12">
            {heroContent.benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="w-16 h-16 mx-auto hero-glass rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 body-text-white" />
                  </div>
                  <Text weight="semibold" className="body-text-white text-center">{benefit.title}</Text>
                  <Text size="sm" className="hidden lg:block body-text-white-muted text-center">
                    {benefit.description}
                  </Text>
                </div>
              );
            })}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Hero01;
