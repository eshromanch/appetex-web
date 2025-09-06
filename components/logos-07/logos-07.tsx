import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
} from "@/components/logos-07/logos";
import Marquee from "@/components/ui/marquee";
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { logosContent, logos } from "@/data/logosData";

const Logos07Page = () => {
  const logoComponents = {
    Logo01,
    Logo02,
    Logo03,
    Logo04,
    Logo05,
    Logo06,
    Logo07,
    Logo08,
  };

  return (
    <SectionContainer size="xl" padding="lg" background="muted">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <Heading level={2} className="heading-black">
            {logosContent.title}
          </Heading>
          <Text size="lg" className="body-text-black-muted max-w-2xl mx-auto text-center">
            {logosContent.subtitle}
          </Text>
        </div>

        <div className="max-w-screen mx-auto space-y-8">
          <Marquee pauseOnHover className="[--duration:30s] [&_svg]:mr-10">
            {logos.map((logo, index) => {
              const LogoComponent = logoComponents[logo.component as keyof typeof logoComponents];
              return <LogoComponent key={index} />;
            })}
          </Marquee>
          {/* <Marquee
            pauseOnHover
            reverse
            className="[--duration:30s] [&_svg]:mr-10"
          >
            {logos.map((logo, index) => {
              const LogoComponent = logoComponents[logo.component as keyof typeof logoComponents];
              return <LogoComponent key={index} />;
            })}
          </Marquee> */}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Logos07Page;
