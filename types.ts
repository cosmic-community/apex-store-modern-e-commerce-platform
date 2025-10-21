// Type definitions for Cosmic CMS content

// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Product type
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    product_name: string;
    description: string;
    price: number;
    product_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    in_stock: boolean;
    collections?: Collection[];
  };
}

// Collection type
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    collection_name: string;
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Review type
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    customer_name: string;
    rating: {
      key: string;
      value: string;
    };
    review_text: string;
    product: Product;
    verified_purchase: boolean;
  };
}

// Rating type literal
export type Rating = '1' | '2' | '3' | '4' | '5';

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}