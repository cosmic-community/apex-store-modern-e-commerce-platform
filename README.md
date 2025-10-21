# 🛍️ Apex Store - Modern E-commerce Platform

![App Preview](https://imgix.cosmicjs.com/9a938090-ae75-11f0-9136-0d133deb8c87-photo-1441986300917-64674bd600d8-1760974449493.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, fully-featured e-commerce platform built with Next.js 15 and powered by Cosmic CMS. Browse products, explore collections, and read authentic customer reviews in a beautiful, responsive interface.

## ✨ Features

- 🛍️ **Product Catalog** - Browse all products with beautiful card layouts and high-quality images
- 🎨 **Product Collections** - Explore curated collections like "Summer Collection" and "Best Sellers"
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- ⭐ **Customer Reviews** - Read authentic reviews with star ratings and verified purchase badges
- 🖼️ **Product Image Galleries** - View multiple product images with smooth navigation
- 🏷️ **Collection Filtering** - Browse products by collection
- 💰 **Pricing Display** - Clear pricing information with stock status indicators
- 🔗 **Dynamic Relationships** - Seamlessly connected products, collections, and reviews

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f7751bacfac65ad9cd1e6a&clone_repository=68f777d0acfac65ad9cd204b)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Based on the content model I created for "Design a content model for an e-commerce store with products, collections, and customer reviews", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic
- **Content Management**: @cosmicjs/sdk
- **Runtime**: Bun

## 🎯 Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with your bucket already set up

### Installation

1. **Clone this repository**
   ```bash
   git clone <repository-url>
   cd apex-store
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

   Your Cosmic credentials can be found in your Cosmic dashboard under Bucket Settings > API Access.

4. **Run the development server**
   ```bash
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all products with collections
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'product-slug' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Collections

```typescript
// Get all collections
const { objects: collections } = await cosmic.objects
  .find({ type: 'collections' })
  .props(['id', 'title', 'slug', 'metadata'])

// Get products by collection
const { objects: products } = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.collections': collectionId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews

```typescript
// Get all reviews with related products
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews' })
  .props(['id', 'title', 'metadata'])
  .depth(1)

// Get reviews for a specific product
const { objects: reviews } = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## 🔗 Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following content structure:

### Products Object Type
- **Product Name** (text) - The product title
- **Description** (html-textarea) - Rich text product description
- **Price** (number) - Product price
- **Product Images** (files) - Multiple product images
- **In Stock** (switch) - Stock availability status
- **Collections** (objects) - Related collections

### Collections Object Type
- **Collection Name** (text) - Collection title
- **Description** (textarea) - Collection description
- **Featured Image** (file) - Collection banner image

### Reviews Object Type
- **Customer Name** (text) - Reviewer name
- **Rating** (select-dropdown) - 1-5 star rating
- **Review Text** (textarea) - Review content
- **Product** (object) - Related product
- **Verified Purchase** (switch) - Purchase verification status

The application leverages Cosmic's powerful relationship system to connect products with collections and reviews, using the `depth` parameter to efficiently fetch related data in a single query.

## 🚀 Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is with Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the "Deploy" button above
2. Connect your GitHub repository
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

You can also deploy to Netlify:

1. Connect your repository to Netlify
2. Set the build command: `bun run build`
3. Set the publish directory: `.next`
4. Add your environment variables in the Netlify dashboard
5. Deploy!

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Built with [Cosmic](https://www.cosmicjs.com) - The headless CMS for modern applications
- Powered by [Next.js](https://nextjs.org) - The React framework for production
- Styled with [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework

<!-- README_END -->