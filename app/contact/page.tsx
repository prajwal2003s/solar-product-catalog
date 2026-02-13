import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Get in touch with H.V. Electricals & Engineering Services for all your solar energy needs.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Phone */}
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Phone</h3>
                <a
                  href="tel:+919529989096"
                  className="text-primary hover:underline font-medium"
                >
                  +91-9529989096
                </a>
                <br />
                 <a
                  href="tel:+918329026170"
                  className="text-primary hover:underline font-medium"
                >
                  +91-8329026170
                </a>
                  <br />
                 <a
                  href="tel:+919156493579"
                  className="text-primary hover:underline font-medium"
                >
                  +91-9156493579
                </a>
              </div>

              {/* Email */}
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Email</h3>
                <a
                  href="mailto:hvelectricalsprojects@gmail.com"
                  className="text-primary hover:underline font-medium"
                >
                  hvelectricalsprojects@gmail.com
                </a>
              </div>

              {/* WhatsApp */}
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">WhatsApp</h3>
                <a
                  href="https://wa.me/919529989096"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  +91-9529989096
                </a>
              </div>
            </div>

            {/* Quick Message */}
            <div className="bg-muted/30 p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Quick Message</h2>
              <p className="text-muted-foreground mb-6">
                Need immediate assistance? Click below to send us a message on WhatsApp.
              </p>
              <a
                href="https://wa.me/919529989096?text=Hello, I would like to inquire about your solar products and services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send WhatsApp Message
                </Button>
              </a>
            </div>

            {/* Business Hours */}
            <div className="mt-12 bg-white p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">Business Hours</h2>
              <div className="space-y-2 text-muted-foreground">
                <p className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span>10:00 AM - 6:00 PM</span>
                </p>
               
                <p className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </p>
              </div>
            </div>
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
                Authorized Renew Power Dealer providing premium solar solutions across India.
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
                  <a href="/products" className="hover:text-white transition-colors">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
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
    </>
  )
}
