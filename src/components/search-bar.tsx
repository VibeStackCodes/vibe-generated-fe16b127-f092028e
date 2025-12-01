/**
 * Search bar component with sorting options
 * Handles search query input and sort selection
 */

import type { SortOption } from '@/types/book'

interface SearchBarProps {
  query: string
  sortBy: SortOption
  resultCount: number
  onQueryChange: (query: string) => void
  onSortChange: (sort: SortOption) => void
}

export function SearchBar({
  query,
  sortBy,
  resultCount,
  onQueryChange,
  onSortChange,
}: SearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption)
  }

  const handleClearSearch = () => {
    onQueryChange('')
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search books by title, author, or description..."
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {query && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Sort and Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Found <span className="font-semibold text-gray-900">{resultCount}</span> results
        </p>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating: Highest</option>
          <option value="newest">Newest First</option>
        </select>
      </div>
    </div>
  )
}
