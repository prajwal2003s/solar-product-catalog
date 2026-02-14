'use client'

import type { Product } from '@/app/products/actions'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {products.map((product) => (

        <div key={product.id} className="border rounded-lg p-4">

          <h3 className="font-semibold text-lg">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          )}

          <p className="text-sm">
            Category: {product.category}
          </p>

        </div>

      ))}

    </div>
  )
}
