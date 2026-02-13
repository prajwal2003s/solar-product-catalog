'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from '@/app/admin/dashboard/products/actions'

interface DeleteProductButtonProps {
  productId: string
}

export function DeleteProductButton({ productId }: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const { success, error } = await deleteProduct(productId)

      if (error) {
        alert(`Error deleting product: ${error}`)
      } else if (success) {
        router.refresh()
        setShowConfirm(false)
      }
    } catch (err) {
      alert('Error deleting product')
    } finally {
      setIsDeleting(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="flex gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Confirm'}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
        >
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2 text-red-600 hover:text-red-700 bg-transparent"
      onClick={() => setShowConfirm(true)}
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </Button>
  )
}
