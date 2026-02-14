'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-primary/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">

            <Image
              src="/logo.png"
              alt="H.V. Electricals Logo"
              width={45}
              height={45}
              priority
              className="rounded-lg group-hover:scale-105 transition-transform"
            />

            <span className="hidden sm:inline text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              H.V. Electricals
            </span>

          </Link>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">

            <Link
              href="/"
              className="font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="font-medium hover:text-primary transition-colors"
            >
              Products
            </Link>

            <Link
              href="/contact"
              className="font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>

          </div>


          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Desktop WhatsApp */}
            <a
              href="https://wa.me/919529989096"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2">

                <MessageCircle className="w-4 h-4"/>

                WhatsApp

              </Button>
            </a>


            {/* Mobile Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-muted"
            >
              {isOpen
                ? <X className="w-6 h-6"/>
                : <Menu className="w-6 h-6"/>
              }
            </button>

          </div>

        </div>


        {/* Mobile Menu */}
        {isOpen && (

          <div className="md:hidden border-t pt-3 pb-4 space-y-2">

            <Link
              href="/"
              onClick={closeMenu}
              className="block px-4 py-2 hover:bg-muted rounded-md"
            >
              Home
            </Link>

            <Link
              href="/products"
              onClick={closeMenu}
              className="block px-4 py-2 hover:bg-muted rounded-md"
            >
              Products
            </Link>

            {/* FIXED: Contact added */}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="block px-4 py-2 hover:bg-muted rounded-md"
            >
              Contact
            </Link>


            {/* Mobile WhatsApp */}
            <div className="px-4 pt-2">

              <a
                href="https://wa.me/919529989096"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">

                  <MessageCircle className="w-4 h-4"/>

                  WhatsApp

                </Button>

              </a>

            </div>

          </div>

        )}

      </div>

    </nav>
  )
}
