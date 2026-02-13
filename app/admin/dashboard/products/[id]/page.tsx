'use client';

import { useRouter } from 'next/navigation'
import { AdminHeader } from '@/components/admin-header'
import { AdminProductForm } from '@/components/admin-product-form'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { fetchProductById } from '../actions'

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const { data: product, error } = await fetchProductById(id)

  if (error || !product) {
    return (
      <>
        <AdminHeader />
        <main className="min-h-screen bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Product Not Found
            </h1>
            <Link href="/admin/dashboard/products">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Back to Products
              </Button>
            </Link>
          </div>
        </main>
      </>
    )
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
            <h1 className="text-4xl font-bold text-foreground">
              Edit Product
            </h1>
          </div>

          {/* Form */}
          <EditProductFormClient product={product} />
        </div>
      </main>
    </>
  )
}

function EditProductFormClient({ product }: { product: any }) {
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/admin/dashboard/products')
  }

  return <AdminProductForm product={product} onSuccess={handleSuccess} />
}
