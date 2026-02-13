'use client'

import { useRouter } from 'next/navigation'
import { AdminHeader } from '@/components/admin-header'
import { AdminProductForm } from '@/components/admin-product-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/admin/dashboard/products')
  }

  return (
    <>
      <AdminHeader />
      <main className="min-h-screen bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation */}
          <div className="mb-8">
            <Link href="/admin/dashboard/products" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Add New Product</h1>
          </div>

          {/* Form */}
          <AdminProductForm onSuccess={handleSuccess} />
        </div>
      </main>
    </>
  )
}
