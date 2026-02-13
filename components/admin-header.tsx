'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { logout } from '@/app/admin/actions'
import { LogOut, Home } from 'lucide-react'

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/admin/dashboard" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
            HV
          </div>
          <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            Admin Dashboard
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm" className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
