import { AdminHeader } from '@/components/admin-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, TrendingUp, AlertCircle, Grid2X2 } from 'lucide-react'
import Link from 'next/link'
import { fetchAllProducts, type Product } from './products/actions'

export default async function AdminDashboardPage() {
  const { data: products, error } = await fetchAllProducts()
  const productList = products || []
  const isLoading = false; // Declare isLoading variable

  const totalProducts = productList.length
  const activeProducts = productList.filter((p) => p.status === 'active').length
  const inactiveProducts = productList.filter((p) => p.status !== 'active').length
  const uniqueCategories = new Set(productList.map((p) => p.category)).size

  return (
    <>
      <AdminHeader />
      <main className="min-h-screen bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your solar products and inventory
              </p>
            </div>
            <Link href="/admin/dashboard/products/new">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Add New Product
              </Button>
            </Link>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  All products in catalog
                </p>
              </CardContent>
            </Card>

            {/* Active Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                <TrendingUp className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">
                  {activeProducts}
                </div>
                <p className="text-xs text-muted-foreground">
                  Currently visible
                </p>
              </CardContent>
            </Card>

            {/* Inactive Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inactive Products</CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-500">
                  {inactiveProducts}
                </div>
                <p className="text-xs text-muted-foreground">
                  Hidden from catalog
                </p>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                <Grid2X2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-500">
                  {uniqueCategories}
                </div>
                <p className="text-xs text-muted-foreground">
                  Different product types
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Products Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>
                  Manage and edit your products
                </CardDescription>
              </div>
              <Link href="/admin/dashboard/products">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {productList.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No products yet. Start by adding your first product.
                  </p>
                  <Link href="/admin/dashboard/products/new">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Add First Product
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {productList.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {product.category} •{' '}
                          <span
                            className={
                              product.status === 'active'
                                ? 'text-secondary'
                                : 'text-orange-500'
                            }
                          >
                            {product.status}
                          </span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/dashboard/products/${product.id}`}
                        >
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
