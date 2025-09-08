'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/productsData";
import { categories } from "@/data/productCategoriesData";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProductsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Get category from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="min-h-screen pt-20">
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <Heading level={1} className="heading-black">
              Our Sourcing Capabilities
            </Heading>
            <Text size="lg" className="body-text-black-secondary text-center">
              We provide custom sourcing solutions across multiple product categories. Tell us your requirements and we&apos;ll source exactly what you need.
            </Text>
          </div>

          {/* Filters */}
          <div className="space-y-6 ">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 body-text-black-muted" />
              <input
                type="text"
                placeholder="Search sourcing categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg body-text-black placeholder:body-text-black-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide md:flex-wrap md:justify-center md:overflow-visible">
              <Button
                variant={selectedCategory === '' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('')}
                className={`${selectedCategory === '' ? 'appatex-gradient' : ''} flex-shrink-0`}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${selectedCategory === category.id ? 'appatex-gradient' : ''} flex-shrink-0`}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Active Filters */}
            {(selectedCategory || searchQuery) && (
              <div className="flex flex-wrap justify-center gap-2">
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    Category: {getCategoryName(selectedCategory)}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedCategory('')}
                    />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    Search: &quot;{searchQuery}&quot;
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchQuery('')}
                    />
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="text-center">
            <Text className="body-text-black-muted">
              Showing {filteredProducts.length} of {products.length} sourcing categories
            </Text>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border overflow-hidden">
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-[#2c2c2c] body-text-white">
                          {getCategoryName(product.categoryId)}
                        </Badge>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-bold text-lg body-text-black mb-2 group-hover:text-primary transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="body-text-black-muted text-sm leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Specs */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {product.specs.slice(0, 2).map((spec, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Price and MOQ */}
                      <div className="space-y-3 pt-2 border-t border-border">
                        <div className="flex justify-between items-center">
                          <div>
                            <Text weight="bold" className="body-text-black">
                              {product.price}
                            </Text>
                            <Text size="sm" className="body-text-black-muted">
                              MOQ: {product.moq}
                            </Text>
                          </div>
                        </div>
                          <Link href={'/quote'}>
                        
                            <Button
                              size="sm"
                              className="flex-1 appatex-gradient w-full mt-2"
                            >
                              Get Quote
                            </Button>
                  
                          </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 body-text-black-muted" />
              </div>
              <Heading level={3} className="heading-black mb-2">
                No Categories Found
              </Heading>
              <Text className="body-text-black-muted mb-4">
                Try adjusting your search or filter criteria, or contact us for custom sourcing
              </Text>
              <Button onClick={clearFilters} className="appatex-gradient">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </SectionContainer>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
