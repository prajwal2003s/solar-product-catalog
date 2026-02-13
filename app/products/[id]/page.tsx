import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { fetchProductById } from '@/app/admin/dashboard/products/actions'

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const { data: product, error } = await fetchProductById(id)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {error || !product ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/products">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Navigation */}
            <section className="border-b border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <Link
                  href="/products"
                  className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </Link>
              </div>
            </section>

            {/* Product Details */}
            <section className="py-12 md:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12">
                  {/* Product Image */}
                  <div>
                    {product.image_url ? (
                      <div className="relative w-full aspect-square bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">No image available</p>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div>
                    <div className="mb-6">
                      <div className="inline-block px-3 py-1 bg-secondary/10 rounded-full text-sm font-medium text-secondary mb-4">
                        {product.category}
                      </div>
                      <h1 className="text-4xl font-bold text-foreground mb-4">
                        {product.name}
                      </h1>
                      <p className="text-lg text-muted-foreground mb-6">
                        {product.description}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4">
                      <a
                        href={`https://wa.me/${product.whatsapp_number}?text=Hello, I am interested in ${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Inquire on WhatsApp
                        </Button>
                      </a>
                      <Link href="/products">
                        <Button variant="outline" className="w-full h-12 text-lg bg-transparent">
                          <ArrowLeft className="w-5 h-5 mr-2" />
                          View More Products
                        </Button>
                      </Link>
                    </div>

                    {/* Product Details */}
                    <div className="mt-12 pt-8 border-t border-border space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Category
                        </p>
                        <p className="text-lg font-medium text-foreground">
                          {product.category}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Availability
                        </p>
                        <p className="text-lg font-medium text-foreground capitalize">
                          {product.status}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Contact
                        </p>
                        <a
                          href={`https://wa.me/${product.whatsapp_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium text-primary hover:underline"
                        >
                          {product.whatsapp_number}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Footer */}
        <footer className="bg-foreground text-white py-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  H.V. Electricals & Engineering Services
                </h3>
                <p className="text-white/70">
                  Authorized Renew Power Dealer providing premium solar solutions across India.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="hover:text-white transition-colors">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-white/70">
              <p>
                &copy; 2024 H.V. Electricals & Engineering Services. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
