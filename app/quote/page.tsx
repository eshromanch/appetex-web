'use client';

import { PageHero } from "@/components/ui/page-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuote } from "@/contexts/QuoteContext";
import { ShoppingCart, X, MessageSquare, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function QuotePage() {
  const { 
    quoteItems, 
    removeFromQuote, 
    updateQuantity, 
    clearQuote, 
    getQuoteCount 
  } = useQuote();

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title="Your Quote Request"
        description="Review and manage your selected products for quotation. Customize quantities and add notes for each item."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        height="md"
        overlay="medium"
        backgroundImageAlt="Quote Request"
      />

      {/* Quote Management Section */}
      <SectionContainer size="xl" padding="xl" background="default">
        <div className="space-y-8">
          {/* Client Information Form */}


          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Heading level={2} className="heading-black mb-2">
                Quote List
              </Heading>
              <Text className="body-text-black-muted">
                {getQuoteCount()} product{getQuoteCount() !== 1 ? 's' : ''} selected for quotation
              </Text>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {quoteItems.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearQuote}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
              <Link href="/contact" className="flex">
                <Button 
                  size="lg" 
                  className="appatex-gradient w-full sm:w-auto"
                  disabled={quoteItems.length === 0}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Submit Quote Request
                </Button>
              </Link>
            </div>
          </div>

          {/* Quote Items */}
          {quoteItems.length > 0 ? (
            <div className="space-y-3">
              {quoteItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text weight="semibold" className="body-text-black text-sm truncate">
                        {item.name}
                      </Text>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                        <div className="flex items-center gap-2">
                          <Text size="sm" className="body-text-black-muted">Qty:</Text>
                          <input
                            type="number"
                            min="100"
                            value={item.quantity || 100}
                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 100)}
                            className="w-16 px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <Text size="sm" className="body-text-black-muted">• {item.price}</Text>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.categoryId}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-6 w-6 flex-shrink-0"
                      onClick={() => removeFromQuote(item.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-muted/50 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              </div>
              <Heading level={3} className="heading-black mb-4">
                Your Quote List is Empty
              </Heading>
              <Text className="body-text-black-muted mb-6 max-w-md mx-auto">
                Browse our products and add items to your quote list to get started with your sourcing request.
              </Text>
              <Link href="/products">
                <Button size="lg" className="appatex-gradient">
                  Browse Products
                </Button>
              </Link>
            </div>
          )}
          <div className="bg-muted/30 rounded-xl p-6 border">
            <Heading level={3} className="heading-black mb-4">
              Your Information
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium body-text-black mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium body-text-black mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium body-text-black mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your.email@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium body-text-black mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium body-text-black mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
            </div>
          </div>
          {/* Additional Message Section */}
          {quoteItems.length > 0 && (
            <div className="bg-muted/30 rounded-xl p-6 border">
              <Heading level={3} className="heading-black mb-4">
                Additional Requirements
              </Heading>
              <div>
                <label className="block text-sm font-medium body-text-black mb-2">
                  Special Instructions or Requirements
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg body-text-black focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Any special requirements, delivery preferences, quality standards, or additional information..."
                ></textarea>
              </div>
            </div>
          )}
        </div>
      </SectionContainer>

      {/* Call to Action */}
      {quoteItems.length > 0 && (
        <SectionContainer size="xl" padding="xl" background="muted">
          <div className="text-center space-y-6">
            <Heading level={2} className="heading-black">
              Ready to Get Your Quote?
            </Heading>
            <Text size="lg" className="body-text-black-muted max-w-2xl mx-auto">
              Once you&apos;ve reviewed your selected products and quantities, proceed to our contact form to submit your quote request. Our team will get back to you within 24 hours.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="flex">
                <Button size="lg" className="appatex-gradient w-full sm:w-auto">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Submit Quote Request
                </Button>
              </Link>
              <Link href="/products" className="flex">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Add More Products
                </Button>
              </Link>
            </div>
          </div>
        </SectionContainer>
      )}
    </div>
  );
}
