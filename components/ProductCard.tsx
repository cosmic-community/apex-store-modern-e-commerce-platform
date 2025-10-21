import { Product } from '@/types'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.metadata.product_images?.[0]?.imgix_url || product.thumbnail

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="aspect-square overflow-hidden bg-gray-200">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={product.metadata.product_name}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {product.metadata.product_name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.metadata.price.toFixed(2)}
          </span>
          
          {product.metadata.in_stock ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              In Stock
            </span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}