'use client'

import { useState } from 'react'

interface ProductImageGalleryProps {
  images: Array<{
    url: string
    imgix_url: string
  }>
  productName: string
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
        <img
          src={`${images[selectedImage].imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
          alt={`${productName} - Image ${selectedImage + 1}`}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImage === index 
                  ? 'border-blue-600 ring-2 ring-blue-200' 
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <img
                src={`${image.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}