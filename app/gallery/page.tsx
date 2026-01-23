'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/ui/page-hero";
import { Image as ImageIcon } from "lucide-react";

interface Gallery {
  _id: string;
  title: string;
  description?: string;
  slug: string;
  coverImage: string;
  images: Array<{
    url: string;
    caption?: string;
    order: number;
  }>;
  category?: string;
  order: number;
  createdAt: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await fetch('/api/gallery?published=true');
      const data = await response.json();
      setGalleries(data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['all', ...new Set(galleries.map(g => g.category).filter(Boolean))] as string[];

  // Filter galleries by category
  const filteredGalleries = selectedCategory === 'all' 
    ? galleries 
    : galleries.filter(g => g.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <PageHero
        title="Gallery"
        description="Explore our collection of images showcasing our work, facilities, and products"
        backgroundImage="https://images.pexels.com/photos/8117479/pexels-photo-8117479.jpeg?_gl=1*1yqf3da*_ga*MTk2MTM3Mjk3My4xNzY5MTczOTI5*_ga_8JE65Q40S6*czE3NjkxNzM5MjgkbzEkZzEkdDE3NjkxNzUzNTYkajU5JGwwJGgw"
        backgroundImageAlt="Gallery Hero Background"
        height="md"
        overlay="dark"
      />

      <SectionContainer>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full border transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Text>Loading galleries...</Text>
          </div>
        ) : filteredGalleries.length === 0 ? (
          <div className="text-center py-12">
            <Text>No galleries found.</Text>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGalleries.map((gallery) => (
              <Link key={gallery._id} href={`/gallery/${gallery.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                  <div className="relative h-64">
                    <img
                      src={gallery.coverImage}
                      alt={gallery.title}
                      className="w-full h-full object-cover"
                    />
                    {gallery.category && (
                      <Badge className="absolute top-4 right-4">
                        {gallery.category}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <Heading level={3} className="text-xl font-bold mb-2">
                      {gallery.title}
                    </Heading>
                    {gallery.description && (
                      <Text className="text-gray-600 mb-3 line-clamp-2">
                        {gallery.description}
                      </Text>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ImageIcon className="h-4 w-4" />
                      <span>{gallery.images.length} images</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
