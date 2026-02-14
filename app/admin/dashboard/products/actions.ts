'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidateTag } from 'next/cache'

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

/* ================= FETCH ALL ================= */

export async function fetchAllProducts(): Promise<{
  data: Product[] | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: error.message }
    }

    return { data: data || [], error: null }

  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error'
    }
  }
}

/* ================= FETCH ONE ================= */

export async function fetchProductById(id: string): Promise<{
  data: Product | null
  error: string | null
}> {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    return { data, error: null }

  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error'
    }
  }
}

/* ================= CREATE ================= */

export async function createProduct(formData: {
  name: string
  description: string
  category: string
  whatsapp_number: string
  image_url?: string | null
  status: string
}): Promise<{
  data: Product | null
  error: string | null
}> {

  try {

    const supabase = await createClient()

    const { data, error } = await supabase
      .from('products')
      .insert({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        whatsapp_number: formData.whatsapp_number,
        image_url: formData.image_url ?? null,
        status: formData.status,
      })
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    revalidateTag('products')

    return { data, error: null }

  } catch (err) {

    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error'
    }

  }

}

/* ================= UPDATE ================= */

export async function updateProduct(
  id: string,
  formData: {
    name: string
    description: string
    category: string
    whatsapp_number: string
    image_url?: string | null
    status: string
  }
): Promise<{
  data: Product | null
  error: string | null
}> {

  try {

    const supabase = await createClient()

    const updateData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      whatsapp_number: formData.whatsapp_number,
      image_url: formData.image_url ?? null,
      status: formData.status,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { data: null, error: error.message }
    }

    revalidateTag('products')

    return { data, error: null }

  } catch (err) {

    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown error'
    }

  }

}

/* ================= DELETE ================= */

export async function deleteProduct(id: string): Promise<{
  success: boolean
  error: string | null
}> {

  try {

    const supabase = await createClient()

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidateTag('products')

    return { success: true, error: null }

  } catch (err) {

    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error'
    }

  }

}

/* ================= TOGGLE STATUS ================= */

export async function toggleProductStatus(
  id: string,
  currentStatus: string
): Promise<{
  data: Product | null
  error: string | null
}> {

  const newStatus = currentStatus === 'active'
    ? 'inactive'
    : 'active'

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { data: null, error: error.message }
  }

  revalidateTag('products')

  return { data, error: null }

}
