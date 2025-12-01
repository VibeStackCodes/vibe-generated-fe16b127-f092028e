/**
 * Hook for managing search and filter state
 */

import { useState, useCallback } from 'react'
import type { Book, FilterOptions, SearchState, SortOption, BookFormat } from '@/types/book'

interface UseSearchOptions {
  initialQuery?: string
  initialFilters?: Partial<FilterOptions>
  initialSort?: SortOption
}

export function useSearch(options: UseSearchOptions = {}) {
  const defaultFilters: FilterOptions = {
    genres: [],
    authors: [],
    priceRange: [0, 100],
    ratings: [],
    formats: [],
  }

  const [state, setState] = useState<SearchState>({
    query: options.initialQuery || '',
    filters: { ...defaultFilters, ...options.initialFilters },
    sortBy: options.initialSort || 'relevance',
  })

  const updateQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, query }))
  }, [])

  const updateFilters = useCallback((filters: Partial<FilterOptions>) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ...filters },
    }))
  }, [])

  const updateGenres = useCallback((genres: string[]) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, genres },
    }))
  }, [])

  const updateAuthors = useCallback((authors: string[]) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, authors },
    }))
  }, [])

  const updatePriceRange = useCallback((priceRange: [number, number]) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, priceRange },
    }))
  }, [])

  const updateRatings = useCallback((ratings: number[]) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, ratings },
    }))
  }, [])

  const updateFormats = useCallback((formats: BookFormat[]) => {
    setState((prev) => ({
      ...prev,
      filters: { ...prev.filters, formats },
    }))
  }, [])

  const updateSortBy = useCallback((sortBy: SortOption) => {
    setState((prev) => ({ ...prev, sortBy }))
  }, [])

  const resetFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      filters: defaultFilters,
    }))
  }, [])

  const resetAll = useCallback(() => {
    setState({
      query: '',
      filters: defaultFilters,
      sortBy: 'relevance',
    })
  }, [])

  return {
    state,
    updateQuery,
    updateFilters,
    updateGenres,
    updateAuthors,
    updatePriceRange,
    updateRatings,
    updateFormats,
    updateSortBy,
    resetFilters,
    resetAll,
  }
}

/**
 * Filter and search books based on search state
 */
export function filterBooks(books: Book[], searchState: SearchState): Book[] {
  let filtered = [...books]

  // Filter by query
  if (searchState.query.trim()) {
    const query = searchState.query.toLowerCase()
    filtered = filtered.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.description?.toLowerCase().includes(query)
    )
  }

  // Filter by genres
  if (searchState.filters.genres.length > 0) {
    filtered = filtered.filter((book) => searchState.filters.genres.includes(book.genre))
  }

  // Filter by authors
  if (searchState.filters.authors.length > 0) {
    filtered = filtered.filter((book) => searchState.filters.authors.includes(book.author))
  }

  // Filter by price range
  const [minPrice, maxPrice] = searchState.filters.priceRange
  filtered = filtered.filter((book) => book.price >= minPrice && book.price <= maxPrice)

  // Filter by ratings
  if (searchState.filters.ratings.length > 0) {
    filtered = filtered.filter((book) =>
      searchState.filters.ratings.some((rating) => book.rating >= rating)
    )
  }

  // Filter by formats
  if (searchState.filters.formats.length > 0) {
    filtered = filtered.filter((book) => searchState.filters.formats.includes(book.format))
  }

  // Sort results
  filtered.sort((a, b) => {
    switch (searchState.sortBy) {
      case 'price-asc':
        return a.price - b.price
      case 'price-desc':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return (
          new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime()
        )
      case 'relevance':
      default:
        return 0
    }
  })

  return filtered
}
