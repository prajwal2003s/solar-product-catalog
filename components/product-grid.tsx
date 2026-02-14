'use client'

import { ProductCard } from './product-card'
import type { Product } from '@/app/products/actions'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-muted rounded-lg h-64 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">
          No products found. Please try adjusting your filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          description={product.description ?? ''}
          category={product.category}
          imageUrl={product.image_url}
          whatsappNumber={product.whatsapp_number}
        />

      ))}

    </div>
  )
}
