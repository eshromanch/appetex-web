'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Image {
  url: string;
  caption?: string;
  order: number;
}

interface MultiImageUploaderProps {
  images: Image[];
  onImagesChange: (images: Image[]) => void;
  className?: string;
}

export function MultiImageUploader({ images, onImagesChange, className }: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList) => {
    if (!files.length) return;

    // Validate file types and sizes
    const validFiles: File[] = [];
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!validTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}`);
        continue;
      }
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    setError('');
    setUploading(true);

    try {
      const uploadPromises = validFiles.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        return response.ok ? data.url : null;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newImages: Image[] = uploadedUrls
        .filter((url): url is string => url !== null)
        .map((url, index) => ({
          url,
          caption: '',
          order: images.length + index,
        }));

      onImagesChange([...images, ...newImages]);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // Reorder remaining images
    const reorderedImages = newImages.map((img, i) => ({
      ...img,
      order: i,
    }));
    onImagesChange(reorderedImages);
  };

  const updateCaption = (index: number, caption: string) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], caption };
    onImagesChange(newImages);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-3">
        <label className="block text-sm font-medium">Gallery Images</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <Upload className="h-4 w-4 mr-1" />
          Add Images
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleChange}
        disabled={uploading}
      />

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 mb-4 text-center transition-colors ${
          dragActive
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <p className="text-sm text-gray-600">Uploading images...</p>
          </div>
        ) : (
          <>
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Drag and drop images here or click &quot;Add Images&quot;
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Multiple images supported (Max 5MB each)
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 mb-4">{error}</p>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative border rounded-lg p-2 bg-white">
              <div className="relative group">
                <img
                  src={image.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="absolute top-1 left-1 bg-black/50 text-white rounded px-2 py-0.5 text-xs">
                  #{index + 1}
                </div>
              </div>
              <input
                type="text"
                value={image.caption || ''}
                onChange={(e) => updateCaption(index, e.target.value)}
                placeholder="Add caption (optional)"
                className="w-full mt-2 p-1.5 text-xs border rounded"
              />
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No images added yet</p>
        </div>
      )}
    </div>
  );
}
