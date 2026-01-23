'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X } from "lucide-react";

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
  createdAt: string;
}

export default function GalleryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchGallery();
    }
  }, [slug]);

  const fetchGallery = async () => {
    try {
      const response = await fetch(`/api/gallery/slug/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setGallery(data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SectionContainer>
        <div className="text-center py-12">
          <Text>Loading gallery...</Text>
        </div>
      </SectionContainer>
    );
  }

  if (!gallery) {
    return (
      <SectionContainer>
        <div className="text-center py-12">
          <Text>Gallery not found</Text>
          <Link href="/gallery">
            <Button className="mt-4">Back to Galleries</Button>
          </Link>
        </div>
      </SectionContainer>
    );
  }

  return (
    <div className="min-h-screen">
      <SectionContainer className="py-12">
        <Link href="/gallery">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Galleries
          </Button>
        </Link>

        <div className="mb-8">
          <Heading level={1} className="text-4xl font-bold mb-4">
            {gallery.title}
          </Heading>
          {gallery.description && (
            <Text className="text-lg text-gray-600">
              {gallery.description}
            </Text>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.images
            .sort((a, b) => a.order - b.order)
            .map((image, index) => (
              <div
                key={index}
                className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
                onClick={() => setLightboxImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={image.caption || `Image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Text className="text-sm">{image.caption}</Text>
                  </div>
                )}
              </div>
            ))}
        </div>
      </SectionContainer>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
