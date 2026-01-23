import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Generate unique filename (EXACTLY like AM-bazaar)
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    
    // Use /uploads/ directory like AM-bazaar
    const uploadDir = process.env.UPLOAD_DIR || 'public/uploads';
    const filepath = join(process.cwd(), uploadDir, filename);
    
    // Create uploads directory if it doesn't exist
    if (!existsSync(join(process.cwd(), uploadDir))) {
      await mkdir(join(process.cwd(), uploadDir), { recursive: true });
    }

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filepath, buffer);

    // Return EXACTLY like AM-bazaar (nested structure)
    const fileUrl = `/uploads/${filename}`;
    
    return NextResponse.json({
      data: {
        url: fileUrl,
        filename: filename,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
