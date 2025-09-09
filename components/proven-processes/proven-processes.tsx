import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { processes } from "@/data/whyChooseUsData";
import Image from "next/image";

const ProvenProcesses = () => {
  return (
    <SectionContainer size="xl" padding="xl" background="default">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-left space-y-6 w-full lg:w-1/2">
          <Heading level={2} className="heading-black">
            Our Proven Processes
          </Heading>
          <Text size="lg" className="body-text-black-secondary text-left">
            From initial consultation to final delivery, our systematic approach ensures quality, efficiency, and customer satisfaction at every step.
          </Text>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Accordion */}
          <div>
            <Accordion defaultValue="item-0" type="single" className="w-full">
              {processes.map((process, index) => {
                const Icon = process.icon;
                return (
                  <AccordionItem
                    key={process.id}
                    value={`item-${index}`}
                    className="data-[state=open]:border-b-2 data-[state=open]:border-primary"
                  >
                    <AccordionTrigger className="text-lg [&>svg]:hidden hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="body-text-black font-semibold text-left">
                          {process.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-[17px] leading-relaxed body-text-black-muted pl-14">
                      {process.description}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Media */}
          <div className="hidden lg:block">
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/process.jpg"
                alt="Professional garments manufacturing and quality control process"
                fill
                className="object-cover scale-125"
                  />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Mobile Media */}
        <div className="lg:hidden">
          <div className="relative w-full h-64 rounded-2xl overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/4492073/pexels-photo-4492073.jpeg"
              alt="Professional garments manufacturing and quality control process"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default ProvenProcesses;
