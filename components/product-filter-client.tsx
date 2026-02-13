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

export function ProductFilterClient({ products }: ProductFilterClientProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Use useMemo to avoid recalculating filtered products on every render
  const filteredProducts = useMemo(() => {
    let filtered = products

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [searchTerm, selectedCategory, products])

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-3 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search products by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-6 text-base border-primary/20 focus:border-primary"
          />
        </div>
      </div>

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Results Count */}
      <div className="mb-6 text-muted-foreground">
        Showing {filteredProducts.length} product
        {filteredProducts.length !== 1 ? 's' : ''}
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} isLoading={false} />
    </>
  )
}
