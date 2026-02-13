import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
  id: string
  name: string
  description: string
  category: string
  imageUrl: string | null
  whatsappNumber: string
}

export function ProductCard({
  id,
  name,
  description,
  category,
  imageUrl,
  whatsappNumber,
}: ProductCardProps) {
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello, I am interested in the product: ${encodeURIComponent(name)}. Please share details.`

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group border border-border">
      {/* Image Container */}
      <Link href={`/products/${id}`}>
        <div className="relative w-full h-48 bg-muted overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <span className="text-muted-foreground text-sm">No image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col h-full">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <Link href={`/products/${id}`}>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 flex-grow mb-4">
          {description}
        </p>

        {/* WhatsApp Button */}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-white flex items-center justify-center gap-2 transition-colors">
            <MessageCircle className="w-4 h-4" />
            Inquire Now
          </Button>
        </a>
      </div>
    </div>
  )
}
