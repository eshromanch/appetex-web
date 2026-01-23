import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
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
  isPublished: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGallery>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  coverImage: {
    type: String,
    required: [true, 'Cover image is required'],
  },
  images: [{
    url: {
      type: String,
      required: true,
    },
    caption: String,
    order: {
      type: Number,
      default: 0,
    },
  }],
  category: {
    type: String,
    trim: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Create slug from title before saving
GallerySchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
