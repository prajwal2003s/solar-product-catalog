'use server'

import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: string
  name: string
  description: string | null
  category: string
  image_url: string | null
  whatsapp_number: string
  status: string
  created_at: string
  updated_at: string
}

export async function fetchProducts(): Promise<{
  data: Product[] | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Supabase error:', error)
      return { data: null, error: error.message }
    }

    return { data: data || [], error: null }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.error('[v0] Error fetching products:', errorMessage)
    return { data: null, error: errorMessage }
  }
}
