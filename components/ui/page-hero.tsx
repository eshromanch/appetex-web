import { Badge } from "@/components/ui/badge";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

interface PageHeroProps {
  badge?: string;
  title: string;
  description: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  primaryButton?: {
    text: string;
    href: string;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  height?: 'sm' | 'md' | 'lg' | 'xl';
  overlay?: 'light' | 'medium' | 'dark';
}

const heightClasses = {
  sm: 'min-h-[50vh]',
  md: 'min-h-[60vh]',
  lg: 'min-h-[70vh]',
  xl: 'min-h-[80vh]'
};

const overlayClasses = {
  light: 'bg-black/30',
  medium: 'bg-black/50',
  dark: 'bg-black/70'
};

export const PageHero = ({
  badge,
  title,
  description,
  backgroundImage,
  primaryButton,
  secondaryButton,
  height = 'lg',
  overlay = 'medium'
}: PageHeroProps) => {
  return (
    <div 
      className={`relative ${heightClasses[height]} flex items-center justify-center`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />
      
      {/* Content */}
      <div className="relative z-10 w-full px-6 xl:px-0">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center space-y-8 max-w-4xl mx-auto py-12">
            <div className="pt-20 lg:pt-0">
              {badge && (
                <Badge variant="secondary" className="mb-4 bg-white/90 text-black">
                  {badge}
                </Badge>
              )}
              <Heading level={1} className="heading-white mb-6">
                {title}
              </Heading>
              <Text size="xl" className="body-text-white-secondary leading-relaxed text-center">
                {description}
              </Text>
            </div>
            
            {(primaryButton || secondaryButton) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {primaryButton && (
                  <Button size="lg" className="appatex-gradient">
                    {primaryButton.text}
                  </Button>
                )}
                {secondaryButton && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
                  >
                    {secondaryButton.text}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
