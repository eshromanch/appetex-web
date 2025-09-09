'use client';

import { notFound } from 'next/navigation';
import { use } from 'react';
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/data/productsData";
import { categories } from "@/data/productCategoriesData";
import { ArrowLeft, CheckCircle, Package, Truck, Shield, MessageSquare, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const category = categories.find(cat => cat.id === product.categoryId);

  const features = [
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "Rigorous quality control processes ensure every product meets international standards"
    },
    {
      icon: Package,
      title: "Custom Packaging",
      description: "Professional packaging options available for your brand requirements"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Efficient logistics and production planning ensure timely delivery"
    },
    {
      icon: Shield,
      title: "Compliance Certified",
      description: "All products meet international compliance and certification standards"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="space-y-8">
          {/* Back Button */}
          <Link href="/products" className="inline-flex items-center gap-2 body-text-black-muted hover:body-text-black transition-colors duration-200">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Category Badge */}
              <div className="flex justify-center">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {category?.name || product.categoryId}
                </Badge>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <Heading level={1} className="heading-black mb-4">
                  {product.name}
                </Heading>
                <Text size="lg" className="body-text-black-secondary leading-relaxed">
                  {product.description}
                </Text>
              </div>

              {/* Price and MOQ */}
              <Card>
                <CardHeader>
                  <CardTitle className="body-text-black">Pricing & Ordering</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Text weight="bold" size="lg" className="body-text-black">
                      Price Range
                    </Text>
                    <Text className='block md:hidden'>-</Text>
                    <Text weight="normal" size="lg" className="body-text-black">
                      {product.price}
                    </Text>
                  </div>
                  <div className="flex justify-between items-center">
                    <Text weight='bold' className="body-text-black">
                      Minimum Order Quantity
                    </Text>
                    <Text className='block md:hidden'>-</Text>

                    <Text weight="normal" className="body-text-black">
                      {product.moq}
                    </Text>
                  </div>
            <div className="pt-4">
              <Link href="/quote">
                <Button size="lg" className="w-full appatex-gradient">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Start Inquiry
                </Button>
              </Link>
            </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="body-text-black">Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <Text className="body-text-black">{spec}</Text>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-8">
            <div className="text-center">
              <Heading level={2} className="heading-black mb-4">
                Why Choose Appatex?
              </Heading>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Heading level={4} className="heading-black mb-2">
                        {feature.title}
                      </Heading>
                      <Text size="sm" className="body-text-black-muted text-center">
                        {feature.description}
                      </Text>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
        {/* CTA Section */}

        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="py-12 text-center">
            <Heading level={2} className="heading-black mb-4">
              Ready to Get Started?
            </Heading>
            <Text size="lg" className="body-text-black-secondary mb-6 max-w-2xl mx-auto text-center">
              Let&apos;s discuss your sourcing requirements and how our services can help you achieve your business goals.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" className="appatex-gradient">
                  Request Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        </div>
      </SectionContainer>
    </div>
  );
}
