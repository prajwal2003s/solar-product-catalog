import { Navbar } from '@/components/navbar'
import { ProductFilterClient } from '@/components/product-filter-client'
import { fetchProducts, type Product } from './actions'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function ProductsPage() {
  const { data: products, error } = await fetchProducts()

  if (error) {
    console.error('[v0] Products page error:', error)
  }

  const productList: Product[] = products || []

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Products
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Explore our comprehensive range of high-quality solar products and
              components.
            </p>
          </div>
        </section>

        {/* Search and Filters Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Client-side filtering component */}
            <ProductFilterClient products={productList} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                H.V. Electricals & Engineering Services
              </h3>
              <p className="text-white/70">
                Authorized Renew Power Dealer providing premium solar solutions
                across India.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="/" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/products"
                    className="hover:text-white transition-colors"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/919529989096"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/70">
            <p>
              &copy; 2024 H.V. Electricals & Engineering Services. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
