'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(email: string, password: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/admin/login/error')
  }

  // Check if user has admin role
  if (data.user) {
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', data.user.id)
      .single()

    if (!roleData || roleData.role !== 'admin') {
      // Sign out non-admin users
      await supabase.auth.signOut()
      redirect('/admin/login/error')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/admin/dashboard')
}
