import { Collection } from '@/types'
import Link from 'next/link'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link 
      href={`/collections/${collection.slug}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-64 overflow-hidden bg-gray-200">
        {collection.metadata.featured_image ? (
          <img
            src={`${collection.metadata.featured_image.imgix_url}?w=800&h=400&fit=crop&auto=format,compress`}
            alt={collection.metadata.collection_name}
            width={400}
            height={200}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
          {collection.metadata.collection_name}
        </h3>
        
        {collection.metadata.description && (
          <p className="text-gray-600 line-clamp-2">
            {collection.metadata.description}
          </p>
        )}
      </div>
    </Link>
  )
}