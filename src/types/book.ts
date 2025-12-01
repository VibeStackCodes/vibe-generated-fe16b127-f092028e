/**
 * Book domain types for PaperPulse bookstore
 */

export interface Book {
  id: string
  title: string
  author: string
  genre: string
  price: number
  rating: number
  reviews: number
  format: BookFormat
  image: string
  description?: string
  isbn?: string
  publishDate?: string
}

export type BookFormat = 'hardcover' | 'paperback' | 'ebook'

export interface FilterOptions {
  genres: string[]
  authors: string[]
  priceRange: [number, number]
  ratings: number[]
  formats: BookFormat[]
}

export interface SearchState {
  query: string
  filters: FilterOptions
  sortBy: SortOption
}

export type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
