'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from "next/image"
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Company Name */}
          <Link href="/" className="flex items-center gap-2 group">
             <Image
    src="/logo.png"
    alt="H.V. Electricals Logo"
    width={60}
    height={60}
    className="rounded-lg group-hover:scale-105 transition-transform"
  />

            <span className="hidden sm:inline text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              H.V. Electricals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Products
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* WhatsApp Button and Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919529989096?text=Hello, I am interested in your solar products. Please share details."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link
              href="/"
              className="block py-2 px-4 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 px-4 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <a
              href="https://wa.me/919529989096?text=Hello, I am interested in your solar products. Please share details."
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 px-4"
              onClick={() => setIsOpen(false)}
            >
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
