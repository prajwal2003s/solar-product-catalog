import React from "react"
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Check if user has admin role
  const { data: roleData, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (error || !roleData || roleData.role !== 'admin') {
    redirect('/admin/login')
  }

  return <>{children}</>
}
