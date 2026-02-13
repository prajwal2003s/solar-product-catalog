import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sun, Leaf, Shield } from 'lucide-react'
import Image from "next/image"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 to-secondary/5 py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                  Solar Solutions for a Better Tomorrow
                </h1>
                <p className="text-lg text-muted-foreground mb-8 text-pretty">
                  H.V. Electricals & Engineering Services is an authorized Renew Power dealer providing high-quality solar panels, inverters, and complete solar infrastructure solutions across India.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/products">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
                      Explore Products
                    </Button>
                  </Link>
                  <a
                    href="https://wa.me/919529989096?text=Hello, I am interested in your solar products. Please share details."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5 text-lg px-8 py-6 bg-transparent"
                    >
                      Contact Now
                    </Button>
                  </a>
                </div>
              </div>

              {/* Right Image */}
<div className="hidden md:flex items-center justify-center">
  <div className="relative w-full aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center overflow-hidden">

    <Image
      src="/solar-kit.png"
      alt="Solar Kit"
      fill
      priority
      className="object-contain p-6 hover:scale-105 transition-transform duration-300"
    />

  

  </div>
</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-16">
              Why Choose Us?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Eco-Friendly
                </h3>
                <p className="text-muted-foreground">
                  Premium quality solar solutions that reduce carbon footprint and promote sustainable energy.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Reliable Quality
                </h3>
                <p className="text-muted-foreground">
                  Authorized Renew Power dealer with certified products and comprehensive warranty coverage.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
                  <Sun className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Pan India Service
                </h3>
                <p className="text-muted-foreground">
                  Nationwide distribution network ensuring timely delivery and expert support across India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Explore our comprehensive range of solar products including panels, inverters, and complete system components.
            </p>
            <div className="text-center">
              <Link href="/products">
                <Button className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Go Solar?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Contact us today to discuss your solar energy needs and get a customized solution.
            </p>
            <a
              href="https://wa.me/919529989096?text=Hello, I am interested in your solar products. Please share details."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 font-semibold">
                Connect on WhatsApp
              </Button>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-white py-12">
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
                    <Link
                      href="/products"
                      className="hover:text-white transition-colors"
                    >
                      Products
                    </Link>
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
      </main>
    </>
  )
}
