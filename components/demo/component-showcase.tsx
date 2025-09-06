import {
  SectionContainer,
  Heading,
  Text,
  LeadText,
  SmallText,
  SectionTitle,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
} from "@/components/ui";

export function ComponentShowcase() {
  return (
    <div className="min-h-screen bg-background">
      {/* Typography Showcase */}
      <SectionContainer>
        <div className="space-y-12">
          <SectionTitle
            subtitle="Professional garments sourcing with luxury appeal"
            gradient
          >
            APPATEX Design System
          </SectionTitle>
          
          {/* Typography Examples */}
          <div className="space-y-8">
            <Heading level={1}>Heading Level 1 - Main Hero Title</Heading>
            <Heading level={2}>Heading Level 2 - Section Titles</Heading>
            <Heading level={3}>Heading Level 3 - Subsection Titles</Heading>
            <Heading level={4}>Heading Level 4 - Card Titles</Heading>
            
            <LeadText>
              This is a lead text component used for introductions and important descriptions. 
              It provides a larger, more readable text for key messaging.
            </LeadText>
            
            <Text>
              This is regular body text using the Inter font family. It&apos;s clean, modern, and highly readable 
              for all business communications and detailed product specifications.
            </Text>
            
            <Text size="lg" weight="medium">
              This is larger text with medium weight for emphasis.
            </Text>
            
            <SmallText>
              This is small text typically used for captions, labels, and secondary information.
            </SmallText>
          </div>
          
          {/* Button Examples */}
          <div className="space-y-6">
            <Heading level={3}>Buttons</Heading>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button</Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button loading>Loading Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>
          </div>
          
          {/* Badge Examples */}
          <div className="space-y-6">
            <Heading level={3}>Badges</Heading>
            <div className="flex flex-wrap gap-4">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge variant="accent">Accent Badge</Badge>
              <Badge variant="gradient">Gradient Badge</Badge>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Badge size="sm">Small Badge</Badge>
              <Badge size="md">Medium Badge</Badge>
              <Badge size="lg">Large Badge</Badge>
            </div>
          </div>
          
          {/* Card Examples */}
          <div className="space-y-6">
            <Heading level={3}>Cards</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card hover>
                <CardHeader>
                  <CardTitle>Service Card</CardTitle>
                  <CardDescription>
                    Professional sourcing solutions for your business needs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text>
                    Our comprehensive quality assurance doesn&apos;t just meet industry standards—it defines them.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">Learn More</Button>
                </CardFooter>
              </Card>
              
              <Card hover>
                <CardHeader>
                  <CardTitle>Product Category</CardTitle>
                  <CardDescription>
                    Premium men&apos;s clothing and formal wear.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="gradient">Men&apos;s Wear</Badge>
                    <Text size="sm" color="muted">
                      Minimum Order: 1000 pieces
                    </Text>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm">View Products</Button>
                </CardFooter>
              </Card>
              
              <Card hover>
                <CardHeader>
                  <CardTitle>Client Testimonial</CardTitle>
                  <CardDescription>
                    What our clients say about us.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Text size="sm" color="muted">
                    &quot;APPATEX has been our trusted partner for over 5 years. Their quality control and attention to detail have helped us maintain our brand standards.&quot;
                  </Text>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center gap-2">
                    <SmallText weight="semibold">Sarah Johnson</SmallText>
                    <SmallText color="muted">Fashion Forward Inc.</SmallText>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          {/* Color Palette */}
          <div className="space-y-6">
            <Heading level={3}>Color Palette</Heading>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="space-y-2">
                <div className="h-16 bg-[#1a1a1a] rounded-lg"></div>
                <SmallText>Primary Dark</SmallText>
                <SmallText color="muted">#1a1a1a</SmallText>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-[#d4a574] rounded-lg"></div>
                <SmallText>Gold Accent</SmallText>
                <SmallText color="muted">#d4a574</SmallText>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-[#2c2c2c] rounded-lg"></div>
                <SmallText>Charcoal</SmallText>
                <SmallText color="muted">#2c2c2c</SmallText>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-[#f8f9fa] border border-border rounded-lg"></div>
                <SmallText>Light Grey</SmallText>
                <SmallText color="muted">#f8f9fa</SmallText>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-[#8a8a8a] rounded-lg"></div>
                <SmallText>Medium Grey</SmallText>
                <SmallText color="muted">#8a8a8a</SmallText>
              </div>
              <div className="space-y-2">
                <div className="h-16 bg-white border border-border rounded-lg"></div>
                <SmallText>Pure White</SmallText>
                <SmallText color="muted">#ffffff</SmallText>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
