import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui";

const CTA = () => {
  return (
    <SectionContainer size="xl" padding="xl" background="default">
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <Heading level={2} className="heading-black mb-4">
              Ready to Partner With Us?
            </Heading>
            <Text size="lg" className="text-center body-text-black-secondary mb-6 max-w-2xl mx-auto">
              Let&apos;s discuss your sourcing requirements and how we can help you achieve your business goals.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="appatex-gradient">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </SectionContainer>
  );
};

export default CTA;

