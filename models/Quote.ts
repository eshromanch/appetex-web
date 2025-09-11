import mongoose, { Document, Schema } from 'mongoose';

export interface IQuoteItem {
  productId?: string;
  productName: string;
  description?: string;
  quantity: number;
  notes?: string;
  isCustom?: boolean;
}

export interface IQuote extends Document {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  country?: string;
  items: IQuoteItem[];
  totalItems: number;
  status: 'new' | 'reviewed' | 'quoted' | 'accepted' | 'rejected';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteItemSchema = new Schema<IQuoteItem>({
  productId: {
    type: String,
    trim: true,
  },
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  notes: {
    type: String,
    trim: true,
  },
  isCustom: {
    type: Boolean,
    default: false,
  },
});

const QuoteSchema = new Schema<IQuote>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  items: [QuoteItemSchema],
  totalItems: {
    type: Number,
    required: true,
    min: [1, 'At least one item is required'],
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'quoted', 'accepted', 'rejected'],
    default: 'new',
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Quote || mongoose.model<IQuote>('Quote', QuoteSchema);
