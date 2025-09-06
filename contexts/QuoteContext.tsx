'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '@/data/productsData';

interface QuoteItem {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  image: string;
  specs: string[];
  price: string;
  moq: string;
  quantity?: number;
  notes?: string;
}

interface QuoteContextType {
  quoteItems: QuoteItem[];
  addToQuote: (product: any) => void;
  removeFromQuote: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearQuote: () => void;
  isInQuote: (productId: string) => boolean;
  getQuoteCount: () => number;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const useQuote = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
};

export const QuoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedQuote = localStorage.getItem('appatex-quote');
    if (savedQuote) {
      try {
        setQuoteItems(JSON.parse(savedQuote));
      } catch (error) {
        console.error('Error loading quote from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever quoteItems change
  useEffect(() => {
    localStorage.setItem('appatex-quote', JSON.stringify(quoteItems));
  }, [quoteItems]);

  const addToQuote = (product: any) => {
    setQuoteItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev; // Already in quote
      }
      
      const newItem: QuoteItem = {
        id: product.id,
        name: product.name,
        categoryId: product.categoryId,
        description: product.description,
        image: product.image,
        specs: product.specs,
        price: product.price,
        moq: product.moq,
        quantity: 100,
        notes: ''
      };
      
      return [...prev, newItem];
    });
  };

  const removeFromQuote = (productId: string) => {
    setQuoteItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setQuoteItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, quantity: Math.max(100, quantity) } : item
      )
    );
  };

  const updateNotes = (productId: string, notes: string) => {
    setQuoteItems(prev => 
      prev.map(item => 
        item.id === productId ? { ...item, notes } : item
      )
    );
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  const isInQuote = (productId: string) => {
    return quoteItems.some(item => item.id === productId);
  };

  const getQuoteCount = () => {
    return quoteItems.length;
  };

  const value: QuoteContextType = {
    quoteItems,
    addToQuote,
    removeFromQuote,
    updateQuantity,
    updateNotes,
    clearQuote,
    isInQuote,
    getQuoteCount
  };

  return (
    <QuoteContext.Provider value={value}>
      {children}
    </QuoteContext.Provider>
  );
};
