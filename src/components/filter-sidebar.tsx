/**
 * Faceted search/filter sidebar component
 * Provides genre, author, price range, rating, and format filters
 */

import type { Book, BookFormat } from '@/types/book'
import {
  getUniqueGenres,
  getUniqueAuthors,
  getPriceRange,
  getUniqueFormats,
} from '@/data/books'

interface FilterSidebarProps {
  books: Book[]
  selectedGenres: string[]
  selectedAuthors: string[]
  priceRange: [number, number]
  selectedRatings: number[]
  selectedFormats: BookFormat[]
  onGenresChange: (genres: string[]) => void
  onAuthorsChange: (authors: string[]) => void
  onPriceRangeChange: (range: [number, number]) => void
  onRatingsChange: (ratings: number[]) => void
  onFormatsChange: (formats: BookFormat[]) => void
  onResetFilters: () => void
}

export function FilterSidebar({
  books,
  selectedGenres,
  selectedAuthors,
  priceRange,
  selectedRatings,
  selectedFormats,
  onGenresChange,
  onAuthorsChange,
  onPriceRangeChange,
  onRatingsChange,
  onFormatsChange,
  onResetFilters,
}: FilterSidebarProps) {
  const genres = getUniqueGenres(books)
  const authors = getUniqueAuthors(books)
  const [minPrice, maxPrice] = getPriceRange(books)
  const formats = getUniqueFormats(books)

  const toggleGenre = (genre: string) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre]
    onGenresChange(updated)
  }

  const toggleAuthor = (author: string) => {
    const updated = selectedAuthors.includes(author)
      ? selectedAuthors.filter((a) => a !== author)
      : [...selectedAuthors, author]
    onAuthorsChange(updated)
  }

  const toggleRating = (rating: number) => {
    const updated = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating]
    onRatingsChange(updated)
  }

  const toggleFormat = (format: BookFormat) => {
    const updated = selectedFormats.includes(format)
      ? selectedFormats.filter((f) => f !== format)
      : [...selectedFormats, format]
    onFormatsChange(updated)
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.min(parseFloat(e.target.value) || 0, priceRange[1])
    onPriceRangeChange([newMin, priceRange[1]])
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.max(parseFloat(e.target.value) || 100, priceRange[0])
    onPriceRangeChange([priceRange[0], newMax])
  }

  const isFiltered =
    selectedGenres.length > 0 ||
    selectedAuthors.length > 0 ||
    priceRange[0] !== minPrice ||
    priceRange[1] !== maxPrice ||
    selectedRatings.length > 0 ||
    selectedFormats.length > 0

  return (
    <aside className="w-64 flex-shrink-0 space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Reset
          </button>
        )}
      </div>

      {/* Genre Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Genre</h3>
        <div className="space-y-2">
          {genres.map((genre) => (
            <label key={genre} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Author Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Author</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {authors.map((author) => (
            <label key={author} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAuthors.includes(author)}
                onChange={() => toggleAuthor(author)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{author}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Price Range</h3>
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-gray-600 block mb-1">Min</label>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={handleMinPriceChange}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-gray-600 block mb-1">Max</label>
              <input
                type="number"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={handleMaxPriceChange}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
          <div className="text-sm text-gray-600">
            ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating)}
                onChange={() => toggleRating(rating)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)} {rating} stars & up
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Format Filter */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Format</h3>
        <div className="space-y-2">
          {formats.map((format) => (
            <label key={format} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFormats.includes(format as BookFormat)}
                onChange={() => toggleFormat(format as BookFormat)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{format}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
