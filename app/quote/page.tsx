'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { PageHero } from "@/components/ui/page-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { products } from "@/data/productsData";
import { categories } from "@/data/productCategoriesData";
import { MessageSquare, X, Package, Search, Check } from "lucide-react";

interface QuoteItem {
  id: string;
  productId: string;
  quantity: number;
  notes: string;
  isCustom?: boolean;
  customProductName?: string;
  customProductDescription?: string;
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
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [showCustomProductForm, setShowCustomProductForm] = useState(false);
  const [customProduct, setCustomProduct] = useState({
    name: '',
    description: '',
    quantity: 1000,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSubmitQuote = async () => {
    if (quoteItems.length === 0) {
      alert('Please add at least one product to your quote request.');
      return;
    }

    if (!clientInfo.firstName || !clientInfo.lastName || !clientInfo.email) {
      alert('Please fill in all required fields (First Name, Last Name, Email).');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const quoteData = {
        firstName: clientInfo.firstName,
        lastName: clientInfo.lastName,
        email: clientInfo.email,
        company: clientInfo.company,
        phone: clientInfo.phone,
        items: quoteItems.map(item => ({
          productId: item.productId,
          productName: item.isCustom ? item.customProductName : products.find(p => p.id === item.productId)?.name || '',
          description: item.isCustom ? item.customProductDescription : products.find(p => p.id === item.productId)?.description || '',
          quantity: item.quantity,
          notes: item.notes,
          isCustom: item.isCustom
        })),
        notes: additionalRequirements
      };

      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setQuoteItems([]);
        setClientInfo({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: ''
        });
        setAdditionalRequirements('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addProductToQuote = (productId: string) => {
    const existingItem = quoteItems.find(item => item.productId === productId);
    if (existingItem) {
      // Update quantity if product already exists
      setQuoteItems(items => 
        items.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + 1000 }
            : item
        )
      );
    } else {
      // Add new product
      const newItem: QuoteItem = {
        id: Date.now().toString(),
        productId,
        quantity: 1000,
        notes: ''
      };
      setQuoteItems(items => [...items, newItem]);
    }
  };

  const addCustomProductToQuote = () => {
    if (!customProduct.name.trim()) return;
    
    const newItem: QuoteItem = {
      id: Date.now().toString(),
      productId: `custom-${Date.now()}`,
      quantity: customProduct.quantity,
      notes: customProduct.notes,
      isCustom: true,
      customProductName: customProduct.name,
      customProductDescription: customProduct.description
    };
    
    setQuoteItems(items => [...items, newItem]);
    setCustomProduct({ name: '', description: '', quantity: 1000, notes: '' });
    setShowCustomProductForm(false);
  };

  const removeFromQuote = (itemId: string) => {
    setQuoteItems(items => items.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1000) return; // Minimum quantity is 1000
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

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    
    const query = searchQuery.toLowerCase();
    return products.filter(product => {
      const category = getCategoryById(product.categoryId);
      return (
        product.name.toLowerCase().includes(query) ||
        category?.name.toLowerCase().includes(query) ||
        product.moq.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const handleProductSelect = (productId: string) => {
    addProductToQuote(productId);
    setSearchQuery('');
    setIsSelectOpen(false);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title="Request a Quote"
        description="Select products from our catalog and get a customized quotation for your sourcing needs."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        backgroundImageAlt="Professional garments sourcing and quotation request"
        primaryButton={{
          text: "View Products",
          href: "/products"
        }}
        secondaryButton={{
          text: "Contact Us",
          href: "/contact"
        }}
        height="md"
        overlay="medium"
      />

      <SectionContainer className='-mt-20 pt-4' size="xl" padding="xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <div>
              <Heading level={3} className="heading-black mb-4">
                Select Products
              </Heading>
              <Text className="body-text-black-secondary mb-6">
                Choose from our extensive catalog of garments and textiles. You can select multiple products and specify quantities for each.
              </Text>
            </div>

            {/* Product Search */}
            <Card>
              <CardHeader>
                <CardTitle className="body-text-black">Add Product to Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-search" className="body-text-black">
                      Search and Select Product
                    </Label>
                    <div className="relative" ref={searchRef}>
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="product-search"
                        placeholder="Search products by name, category, or MOQ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSelectOpen(true)}
                        className="pl-10"
                      />
                      
                      {/* Search Results Dropdown */}
                      {isSelectOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product) => {
                            const category = getCategoryById(product.categoryId);
                            const isAlreadyAdded = quoteItems.some(item => item.productId === product.id);
                            
                            return (
                              <div
                                key={product.id}
                                onClick={() => !isAlreadyAdded && handleProductSelect(product.id)}
                                className={`p-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                                  isAlreadyAdded ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="font-medium text-gray-900 truncate">
                                      {product.name}
                                    </div>
                                    <div className="text-sm text-gray-500 truncate">
                                      {category?.name} • MOQ: {product.moq}
                                    </div>
                                  </div>
                                  {isAlreadyAdded && (
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="p-3 text-center text-gray-500">
                            <div className="mb-3">
                              No products found matching &quot;{searchQuery}&quot;
                            </div>
                            <div className="text-sm">
                              Looking for other products?{' '}
                              <button
                                onClick={() => {
                                  setShowCustomProductForm(true);
                                  setIsSelectOpen(false);
                                }}
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                Click here to add custom product
                              </button>
                            </div>
                          </div>
                        )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Custom Product Form */}
            {showCustomProductForm && (
              <Card>
                <CardHeader>
                  <CardTitle className="body-text-black">Add Custom Product</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="custom-product-name" className="body-text-black">
                        Product Name *
                      </Label>
                      <Input
                        id="custom-product-name"
                        placeholder="e.g., Custom T-Shirt, Specialized Workwear"
                        value={customProduct.name}
                        onChange={(e) => setCustomProduct(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="custom-product-description" className="body-text-black">
                        Product Description
                      </Label>
                      <Textarea
                        id="custom-product-description"
                        placeholder="Describe the product specifications, materials, colors, etc."
                        value={customProduct.description}
                        onChange={(e) => setCustomProduct(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="custom-product-quantity" className="body-text-black">
                        Quantity *
                      </Label>
                      <Input
                        id="custom-product-quantity"
                        type="number"
                        min="1000"
                        step="1000"
                        value={customProduct.quantity}
                        onChange={(e) => setCustomProduct(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1000 }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="custom-product-notes" className="body-text-black">
                        Special Requirements
                      </Label>
                      <Textarea
                        id="custom-product-notes"
                        placeholder="Any special requirements, quality standards, delivery timeline, etc."
                        value={customProduct.notes}
                        onChange={(e) => setCustomProduct(prev => ({ ...prev, notes: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={addCustomProductToQuote}
                        disabled={!customProduct.name.trim()}
                        className="flex-1"
                      >
                        Add to Quote
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowCustomProductForm(false);
                          setCustomProduct({ name: '', description: '', quantity: 1000, notes: '' });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Selected Products */}
            {quoteItems.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <CardTitle className="body-text-black">
                      Selected Products ({quoteItems.length})
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAll}
                      className="text-destructive hover:text-destructive self-start sm:self-auto"
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
                      
                      // Handle custom products
                      if (item.isCustom) {
                        return (
                          <div key={item.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
                            <div className="flex-1 space-y-3 w-full">
                              <div>
                                <Heading level={6} className="heading-black">
                                  {item.customProductName}
                                </Heading>
                                <Text size="sm" className="body-text-black-muted">
                                  Custom Product • MOQ: 1000
                                </Text>
                                {item.customProductDescription && (
                                  <Text size="sm" className="body-text-black-muted mt-1">
                                    {item.customProductDescription}
                                  </Text>
                                )}
                              </div>
                              
                              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="w-full sm:w-auto">
                                  <Label htmlFor={`quantity-${item.id}`} className="text-sm">
                                    Quantity
                                  </Label>
                                  <Input
                                    id={`quantity-${item.id}`}
                                    type="number"
                                    min="1000"
                                    step="1000"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1000)}
                                    className="w-full sm:w-24"
                                  />
                                </div>
                                <div className="flex-1 w-full">
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
                                  className="text-destructive hover:text-destructive self-end sm:self-auto"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      
                      if (!product) return null;

                      return (
                        <div key={item.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
                          {/* <Image
                            src={product.image}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded object-cover flex-shrink-0"
                          /> */}
                          <div className="flex-1 space-y-3 w-full">
                            <div>
                              <Heading level={6} className="heading-black">
                                {product.name}
                              </Heading>
                              <Text size="sm" className="body-text-black-muted">
                                {category?.name} • MOQ: {product.moq}
                              </Text>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                              <div className="w-full sm:w-auto">
                                <Label htmlFor={`quantity-${item.id}`} className="text-sm">
                                  Quantity
                                </Label>
                                <Input
                                  id={`quantity-${item.id}`}
                                  type="number"
                                  min="1000"
                                  step="1000"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1000)}
                                  className="w-full sm:w-24"
                                />
                              </div>
                              <div className="flex-1 w-full">
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
                                className="text-destructive hover:text-destructive self-end sm:self-auto"
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
                  <Text className="body-text-black-secondary text-center">
                    Use the dropdown above to add products to your quote request.
                  </Text>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Client Information & Submit */}
          <div className="space-y-4 lg:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="body-text-black">Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <Text className="text-green-800 font-medium">
                        Thank you! Your quote request has been submitted successfully. We&apos;ll review it and get back to you within 24 hours.
                      </Text>
                    </div>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <Text className="text-red-800 font-medium">
                      Sorry, there was an error submitting your quote request. Please try again or contact us directly.
                    </Text>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="text-center">
                    <Text size="sm" className="body-text-black-muted">
                      {quoteItems.length} product{quoteItems.length !== 1 ? 's' : ''} selected
                    </Text>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full appatex-gradient"
                    onClick={handleSubmitQuote}
                    disabled={isSubmitting || quoteItems.length === 0}
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                  </Button>
                  <Text size="xs" className="text-center body-text-black-muted">
                    We&apos;ll review your request and get back to you within 24 hours
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