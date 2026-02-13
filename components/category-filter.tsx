'use client'

import { Button } from '@/components/ui/button'

const CATEGORIES = [
  'Solar Panel',
  'Inverter',
  'ACDB-DCDB',
  'Cable',
  'Structure',
  'BOS Material',
  'Meter',
]

interface CategoryFilterProps {
  selectedCategory: string | null
  onCategoryChange: (category: string | null) => void
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        onClick={() => onCategoryChange(null)}
        variant={selectedCategory === null ? 'default' : 'outline'}
        className={selectedCategory === null ? 'bg-primary text-white' : ''}
      >
        All Products
      </Button>
      {CATEGORIES.map((category) => (
        <Button
          key={category}
          onClick={() => onCategoryChange(category)}
          variant={selectedCategory === category ? 'default' : 'outline'}
          className={
            selectedCategory === category ? 'bg-primary text-white' : ''
          }
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
