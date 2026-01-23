import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Gallery from '@/models/Gallery';

// GET all galleries
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    
    // For public view, only show published galleries
    const query = published === 'true' ? { isPublished: true } : {};
    
    const galleries = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    
    return NextResponse.json(galleries);
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch galleries' },
      { status: 500 }
    );
  }
}

// POST new gallery
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { title, description, slug, coverImage, images, category, isPublished, order } = body;
    
    // Validate required fields
    if (!title || !coverImage) {
      return NextResponse.json(
        { error: 'Title and cover image are required' },
        { status: 400 }
      );
    }
    
    // Generate slug if not provided
    const finalSlug = slug || title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if slug already exists
    const existingGallery = await Gallery.findOne({ slug: finalSlug });
    if (existingGallery) {
      return NextResponse.json(
        { error: 'A gallery with this slug already exists' },
        { status: 400 }
      );
    }
    
    const gallery = new Gallery({
      title,
      description,
      slug: finalSlug,
      coverImage,
      images: images || [],
      category,
      isPublished: isPublished || false,
      order: order || 0,
    });
    
    await gallery.save();
    
    return NextResponse.json(gallery, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery' },
      { status: 500 }
    );
  }
}
