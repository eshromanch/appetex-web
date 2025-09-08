import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text, LeadText } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { achievements } from "@/data/achievements";
import { values } from "@/data/values";
import { Award, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Overview = () => {

  return (
    <SectionContainer size="xl" padding="xl" background="default">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-6">
            <Badge variant="outline" className="w-fit">
              About APPATEX
            </Badge>
            
            <Heading level={2} className="heading-black">
              Your Trusted Partner in Global Garments Sourcing
            </Heading>
            
            <LeadText className="body-text-black-secondary">
              With over 14 years of expertise in the textile industry, APPATEX has established itself as a leading garments sourcing company, connecting businesses worldwide with premium manufacturing partners across Asia.
            </LeadText>
          </div>

          {/* Key Achievements */}
          <div className="grid grid-cols-2 gap-4">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6  space-y-4 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                  <div className="w-14 h-14 mx-auto bg-primary/15 rounded-full flex items-center justify-center">
                    <Icon className="text-left w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <Text weight="semibold" size="lg" className="body-text-black text-center">
                      {achievement.title}
                    </Text>
                    {/* <Text size="sm" className="body-text-black-muted">
                      {achievement.description}
                    </Text> */}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Core Values */}
          <div className="space-y-4">
            <Text weight="semibold" className="body-text-black">
              Our Core Values
            </Text>
            <div className="flex flex-wrap gap-2">
              {values.map((value, index) => (
                <Badge key={index} variant="secondary" className="body-text-black">
                  {value.title}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <Link href="/about" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <span className="body-text-primary">Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative h-[500px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Garments manufacturing and sourcing"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Floating Card */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg max-w-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <Text weight="semibold" className="body-text-black">
                  Quality Assured
                </Text>
                <Text size="sm" className="body-text-black-muted">
                  Every product undergoes rigorous quality control processes to meet international standards.
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Overview;
