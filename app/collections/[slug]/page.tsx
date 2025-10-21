// app/collections/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Collection, Product } from '@/types'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

async function getCollection(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'collections', slug })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.object as Collection
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

async function getCollectionProducts(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'products',
        'metadata.collections': collectionId 
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1)
    
    return response.objects as Product[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const collection = await getCollection(slug)

  if (!collection) {
    notFound()
  }

  const products = await getCollectionProducts(collection.id)

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link href="/collections" className="hover:text-blue-600">Collections</Link></li>
            <li>/</li>
            <li className="text-gray-900">{collection.metadata.collection_name}</li>
          </ol>
        </nav>

        {/* Collection Header */}
        <div className="mb-12">
          {collection.metadata.featured_image && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={`${collection.metadata.featured_image.imgix_url}?w=1200&h=400&fit=crop&auto=format,compress`}
                alt={collection.metadata.collection_name}
                width={1200}
                height={400}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {collection.metadata.collection_name}
          </h1>
          {collection.metadata.description && (
            <p className="text-lg text-gray-600 max-w-3xl">
              {collection.metadata.description}
            </p>
          )}
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Products in this Collection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products in this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}