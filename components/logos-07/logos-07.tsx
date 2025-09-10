import Marquee from "@/components/ui/marquee";
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { clientLogosContent, clientLogos } from "@/data/clientLogosData";
import { partnerLogosContent, partnerLogos } from "@/data/partnerLogosData";
import Image from "next/image";

interface Logos07PageProps {
  type: 'client' | 'partner';
}

const Logos07Page = ({ type }: Logos07PageProps) => {
  const isClient = type === 'client';
  const content = isClient ? clientLogosContent : partnerLogosContent;
  const logos = isClient ? clientLogos : partnerLogos;

  return (
    <SectionContainer size="xl" padding="lg" background="muted">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <Heading level={2} className="heading-black">
            {content.title}
          </Heading>
          <Text size="lg" className="body-text-black-muted max-w-2xl mx-auto text-center">
            {content.subtitle}
          </Text>
        </div>

        <div className="max-w-screen mx-auto space-y-8">
          <Marquee pauseOnHover className="[--duration:30s]">
            {logos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center mx-8">
                <Image
                  src={logo.image}
                  alt={logo.alt}
                  width={120}
                  height={60}
                  className="w-[120px] h-[80px] object-contain scale-105 transition-all duration-300 opacity-60 hover:opacity-100"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Logos07Page;
