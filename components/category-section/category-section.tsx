import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { categories } from "@/data/productCategoriesData";
import { categorySectionContent } from "@/data/categorySectionData";
import Image from "next/image";
import Link from "next/link";

const CategorySection = () => {
  return (
    <SectionContainer size="xl" padding="xl" background="muted">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <Heading level={2} className="heading-black">
            {categorySectionContent.title}
          </Heading>
          <Text size="lg" className="body-text-black-secondary text-center">
            {categorySectionContent.subtitle}
          </Text>
        </div>

        {/* Clean Uniform Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.id}`}>
              <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-xl mb-2">
                      {category.name}
                    </h3>
                    {/* <p className="text-white/90 text-sm leading-relaxed mb-4">
                      {category.description}
                    </p> */}
                    
                    {/* CTA Button */}
                    {/* <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary transition-all duration-300"
                    >
                      Explore Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button> */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center pt-8">
          <Button size="lg" className="appatex-gradient">
            {categorySectionContent.cta.text}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div> */}
      </div>
    </SectionContainer>
  );
};

export default CategorySection;
