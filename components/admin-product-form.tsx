'use client'

import React from "react"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Upload, X } from 'lucide-react'
import { createProduct, updateProduct } from '@/app/admin/dashboard/products/actions'

const CATEGORIES = [
  'Solar Panel',
  'Inverter',
  'ACDB-DCDB',
  'Cable',
  'Structure',
  'BOS Material',
  'Meter',
]

interface Product {
  id?: string
  name: string
  description: string
  category: string
  image_url: string | null
  whatsapp_number: string
  status: string
}

interface AdminProductFormProps {
  product?: Product
  onSuccess: () => void
}

export function AdminProductForm({ product, onSuccess }: AdminProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      name: '',
      description: '',
      category: 'Solar Panel',
      image_url: null,
      whatsapp_number: '919529989096',
      status: 'active',
    }
  )
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    product?.image_url || null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const supabase = createClient()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image must be less than 5MB')
        return
      }
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      let imageUrl = formData.image_url

      // Upload image if new file selected
      if (imageFile) {
        const timestamp = Date.now()
        const fileName = `${timestamp}-${imageFile.name}`

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(fileName, imageFile)

        if (uploadError) throw uploadError

        const {
          data: { publicUrl },
        } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      const submitData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        whatsapp_number: formData.whatsapp_number,
        status: formData.status,
        image_url: imageUrl,
      }

      if (product?.id) {
        // Update existing product
        const { error } = await updateProduct(product.id, submitData)
        if (error) throw new Error(error)
      } else {
        // Create new product
        const { error } = await createProduct(submitData)
        if (error) throw new Error(error)
      }

      onSuccess()
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {product ? 'Edit Product' : 'Add New Product'}
        </CardTitle>
        <CardDescription>
          {product
            ? 'Update product details and image'
            : 'Create a new solar product for your catalog'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Renew Power 550W Solar Panel"
              required
              disabled={isLoading}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Product description and specifications"
              disabled={isLoading}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              disabled={isLoading}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* WhatsApp Number */}
          <div>
            <Label htmlFor="whatsapp">WhatsApp Number *</Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp_number}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp_number: e.target.value })
              }
              placeholder="e.g., 919529989096"
              required
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Include country code (e.g., 91 for India)
            </p>
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              disabled={isLoading}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="image">Product Image</Label>
            <div className="mt-2">
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="h-48 w-48 object-cover rounded-lg border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null)
                      setImageFile(null)
                      if (fileInputRef.current) {
                        fileInputRef.current.value = ''
                      }
                    }}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                    disabled={isLoading}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading
                ? product
                  ? 'Updating...'
                  : 'Creating...'
                : product
                  ? 'Update Product'
                  : 'Create Product'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
