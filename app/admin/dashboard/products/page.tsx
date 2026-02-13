import { AdminHeader } from '@/components/admin-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { fetchAllProducts } from './actions'
import { DeleteProductButton } from '@/components/delete-product-button'

export default async function AdminProductsPage() {
  const { data: products, error } = await fetchAllProducts()
  const productList = products || []

  return (
    <>
      <AdminHeader />
      <main className="min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Products
              </h1>
              <p className="text-muted-foreground">
                Manage your solar products
              </p>
            </div>
            <Link href="/admin/dashboard/products/new">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </Link>
          </div>

          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>All Products</CardTitle>
              <CardDescription>
                {productList.length} product{productList.length !== 1 ? 's' : ''} in catalog
              </CardDescription>
            </CardHeader>
            <CardContent>
              {productList.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No products yet. Create your first product to get started.
                  </p>
                  <Link href="/admin/dashboard/products/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Product
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Product
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Category
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Status
                        </th>
                        <th className="text-right py-3 px-4 font-semibold text-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {productList.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-4">
                              {product.image_url ? (
                                <div className="relative w-10 h-10 flex-shrink-0">
                                  <Image
                                    src={product.image_url || "/placeholder.svg"}
                                    alt={product.name}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                                  <span className="text-xs text-muted-foreground">No image</span>
                                </div>
                              )}
                              <div>
                                <p className="font-semibold text-foreground">
                                  {product.name}
                                </p>
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-foreground">
                            {product.category}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                product.status === 'active'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-orange-100 text-orange-700'
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/admin/dashboard/products/${product.id}`}
                              >
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 bg-transparent"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </Button>
                              </Link>
                              <DeleteProductButton productId={product.id} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
