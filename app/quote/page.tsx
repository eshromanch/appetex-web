'use client';

import { useState } from 'react';
import { PageHero } from "@/components/ui/page-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/data/productsData";
import { categories } from "@/data/productCategoriesData";
import { MessageSquare, X, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface QuoteItem {
  id: string;
  productId: string;
  quantity: number;
  notes: string;
}

export default function QuotePage() {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [clientInfo, setClientInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: ''
  });
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const addProductToQuote = (productId: string) => {
    const existingItem = quoteItems.find(item => item.productId === productId);
    if (existingItem) {
      // Update quantity if product already exists
      setQuoteItems(items => 
        items.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + 100 }
            : item
        )
      );
    } else {
      // Add new product
      const newItem: QuoteItem = {
        id: Date.now().toString(),
        productId,
        quantity: 100,
        notes: ''
      };
      setQuoteItems(items => [...items, newItem]);
    }
  };

  const removeFromQuote = (itemId: string) => {
    setQuoteItems(items => items.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 100) return; // Minimum quantity is 100
    setQuoteItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const updateNotes = (itemId: string, notes: string) => {
    setQuoteItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, notes } : item
      )
    );
  };

  const clearAll = () => {
    setQuoteItems([]);
  };

  const getProductById = (productId: string) => {
    return products.find(p => p.id === productId);
  };

  const getCategoryById = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title="Request a Quote"
        description="Select products from our catalog and get a customized quotation for your sourcing needs."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        backgroundImageAlt="Professional garments sourcing and quotation request"
        height="md"
        overlay="medium"
      />

      <SectionContainer size="xl" padding="xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Heading level={3} className="heading-black mb-4">
                Select Products
              </Heading>
              <Text className="body-text-black-secondary mb-6">
                Choose from our extensive catalog of garments and textiles. You can select multiple products and specify quantities for each.
              </Text>
            </div>

            {/* Product Dropdown */}
            <Card>
              <CardHeader>
                <CardTitle className="body-text-black">Add Product to Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-select" className="body-text-black">
                      Select Product
                    </Label>
                    <Select onValueChange={addProductToQuote}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a product to add to your quote" />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((product) => {
                          const category = getCategoryById(product.categoryId);
                          return (
                            <SelectItem key={product.id} value={product.id}>
                              <div className="flex items-center gap-3">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={40}
                                  height={40}
                                  className="rounded object-cover"
                                />
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {category?.name} • MOQ: {product.moq}
                                  </div>
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Products */}
            {quoteItems.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="body-text-black">
                      Selected Products ({quoteItems.length})
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAll}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {quoteItems.map((item) => {
                      const product = getProductById(item.productId);
                      const category = getCategoryById(product?.categoryId || '');
                      
                      if (!product) return null;

                      return (
                        <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded object-cover"
                          />
                          <div className="flex-1 space-y-3">
                            <div>
                              <Heading level={6} className="heading-black">
                                {product.name}
                              </Heading>
                              <Text size="sm" className="body-text-black-muted">
                                {category?.name} • MOQ: {product.moq}
                              </Text>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div>
                                <Label htmlFor={`quantity-${item.id}`} className="text-sm">
                                  Quantity
                                </Label>
                                <Input
                                  id={`quantity-${item.id}`}
                                  type="number"
                                  min="100"
                                  step="100"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 100)}
                                  className="w-24"
                                />
                              </div>
                              <div className="flex-1">
                                <Label htmlFor={`notes-${item.id}`} className="text-sm">
                                  Notes (Optional)
                                </Label>
                                <Input
                                  id={`notes-${item.id}`}
                                  placeholder="Special requirements, colors, etc."
                                  value={item.notes}
                                  onChange={(e) => updateNotes(item.id, e.target.value)}
                                />
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFromQuote(item.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {quoteItems.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <Heading level={4} className="heading-black mb-2">
                    No Products Selected
                  </Heading>
                  <Text className="body-text-black-secondary">
                    Use the dropdown above to add products to your quote request.
                  </Text>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Client Information & Submit */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="body-text-black">Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={clientInfo.firstName}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={clientInfo.lastName}
                      onChange={(e) => setClientInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={clientInfo.company}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Your Company Name"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="body-text-black">Additional Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special requirements, delivery timeline, quality standards, or other specifications..."
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <Text size="sm" className="body-text-black-muted">
                      {quoteItems.length} product{quoteItems.length !== 1 ? 's' : ''} selected
                    </Text>
                  </div>
                  <Link href="/contact" className="block">
                    <Button 
                      size="lg" 
                      className="w-full appatex-gradient"
                      disabled={quoteItems.length === 0}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Submit Quote Request
                    </Button>
                  </Link>
                  <Text size="xs" className="text-center body-text-black-muted">
                    You&apos;ll be redirected to our contact form to complete your request
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}