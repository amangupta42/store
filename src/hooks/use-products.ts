import { useQuery } from '@tanstack/react-query'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: string
  image: string
  stock: number
  featured: boolean
  categories: Category[]
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string | null
  productCount?: number
}

async function fetchProducts(category?: string, featured?: boolean): Promise<Product[]> {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (featured) params.set('featured', 'true')

  const response = await fetch(`/api/products?${params.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

async function fetchProduct(slug: string): Promise<Product> {
  const response = await fetch(`/api/products/${slug}`)
  if (!response.ok) {
    throw new Error('Failed to fetch product')
  }
  return response.json()
}

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/api/categories')
  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }
  return response.json()
}

export function useProducts(category?: string, featured?: boolean) {
  return useQuery({
    queryKey: ['products', category, featured],
    queryFn: () => fetchProducts(category, featured),
  })
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProduct(slug),
    enabled: !!slug,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}
