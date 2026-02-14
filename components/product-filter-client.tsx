'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { CategoryFilter } from '@/components/category-filter'
import { ProductGrid } from '@/components/product-grid'
import { Search } from 'lucide-react'
import type { Product } from '@/app/products/actions'

interface ProductFilterClientProps {
  products: Product[]
}

export function ProductFilterClient({
  products,
}: ProductFilterClientProps) {

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {

    let filtered = products || []

    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.category === selectedCategory
      )
    }

    if (searchTerm) {

      const term = searchTerm.toLowerCase()

      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(term) ||
        (p.description ?? '').toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      )

    }

    return filtered

  }, [searchTerm, selectedCategory, products])

  return (
    <>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">

          <Search className="absolute left-4 top-3 text-muted-foreground w-5 h-5" />

          <Input
            type="text"
            placeholder="Search solar products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-6"
          />

        </div>
      </div>

      {/* Category */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Count */}
      <div className="mb-6 text-muted-foreground">
        Showing {filteredProducts.length} products
      </div>

      {/* Grid */}
      <ProductGrid
        products={filteredProducts}
        isLoading={false}
      />

    </>
  )
}
