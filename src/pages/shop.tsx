/**
 * Shop page - Main storefront with search, filters, and product listing
 */

import { useState } from 'react'
import { FilterSidebar } from '@/components/filter-sidebar'
import { SearchBar } from '@/components/search-bar'
import { ProductListing } from '@/components/product-listing'
import { useSearch, filterBooks } from '@/hooks/useSearch'
import { SAMPLE_BOOKS } from '@/data/books'

export function ShopPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const {
    state,
    updateQuery,
    updateGenres,
    updateAuthors,
    updatePriceRange,
    updateRatings,
    updateFormats,
    updateSortBy,
    resetFilters,
  } = useSearch()

  const filteredBooks = filterBooks(SAMPLE_BOOKS, state)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">PaperPulse</h1>
              <p className="text-sm text-gray-600 mt-1">Discover your next favorite book</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <SearchBar
              query={state.query}
              sortBy={state.sortBy}
              resultCount={filteredBooks.length}
              onQueryChange={updateQuery}
              onSortChange={updateSortBy}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            books={SAMPLE_BOOKS}
            selectedGenres={state.filters.genres}
            selectedAuthors={state.filters.authors}
            priceRange={state.filters.priceRange}
            selectedRatings={state.filters.ratings}
            selectedFormats={state.filters.formats}
            onGenresChange={updateGenres}
            onAuthorsChange={updateAuthors}
            onPriceRangeChange={updatePriceRange}
            onRatingsChange={updateRatings}
            onFormatsChange={updateFormats}
            onResetFilters={resetFilters}
          />

          {/* Product Listing */}
          <div className="flex-1 min-w-0">
            <ProductListing
              books={filteredBooks}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
