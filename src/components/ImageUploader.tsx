import { useState, useCallback } from 'react';
import FileUpload from './FileUpload';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  initialImageUrl?: string;
  aspectRatio?: 'poster' | 'banner';
}

export default function ImageUploader({ 
  onImageUploaded, 
  initialImageUrl,
  aspectRatio = 'poster'
}: ImageUploaderProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
    setPreviewUrl(null);
    onImageUploaded(url);
  };

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  }, []);

  const aspectRatioClass = aspectRatio === 'poster' 
    ? 'aspect-[2/3]' // Movie poster ratio
    : 'aspect-[16/9]'; // Banner ratio

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="space-y-4">
        {/* Preview Area */}
        <div className={`relative ${aspectRatioClass} bg-gray-100 rounded-lg overflow-hidden`}>
          {(previewUrl || imageUrl) ? (
            <img
              src={previewUrl || imageUrl || ''}
              alt="Movie"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <svg
                className="w-16 h-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Upload Component */}
        <FileUpload
          onUploadComplete={handleUploadComplete}
          folder="movie-images"
          acceptedFileTypes="image/*"
          onFileSelect={handleFileSelect}
        />

        {/* Image Info */}
        {imageUrl && (
          <div className="mt-2 text-sm text-gray-600">
            <p className="truncate">
              Image URL: <span className="break-all">{imageUrl}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 