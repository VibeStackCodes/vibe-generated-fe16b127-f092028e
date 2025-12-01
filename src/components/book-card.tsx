/**
 * Book card component for displaying book information
 * Used in both grid and list views
 */

import type { Book } from '@/types/book'

interface BookCardProps {
  book: Book
  variant?: 'grid' | 'list'
}

export function BookCard({ book, variant = 'grid' }: BookCardProps) {
  if (variant === 'list') {
    return (
      <div className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="flex-shrink-0">
          <img
            src={book.image}
            alt={book.title}
            className="w-24 h-32 object-cover rounded"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{book.author}</p>
            <p className="text-sm text-gray-600 mt-1">{book.genre}</p>
            {book.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{book.description}</p>
            )}
          </div>

          <div className="flex items-end justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-sm">
                {'★'.repeat(Math.round(book.rating))}
              </span>
              <span className="text-sm text-gray-600">
                {book.rating} ({book.reviews})
              </span>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-gray-900">${book.price.toFixed(2)}</p>
              <p className="text-xs text-gray-500 capitalize">{book.format}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid variant
  return (
    <div className="flex flex-col h-full p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow hover:border-gray-300">
      {/* Image */}
      <div className="mb-4 flex-shrink-0">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover rounded"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>

        <div className="text-xs text-gray-500 mb-3">
          <p className="inline-block bg-gray-100 px-2 py-1 rounded">{book.genre}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-500 text-sm">
            {'★'.repeat(Math.round(book.rating))}
          </span>
          <span className="text-xs text-gray-600">
            {book.rating} <span className="text-gray-400">({book.reviews})</span>
          </span>
        </div>

        {/* Price and Format */}
        <div className="mt-auto">
          <p className="text-lg font-bold text-gray-900 mb-2">${book.price.toFixed(2)}</p>
          <p className="text-xs text-gray-500 capitalize mb-3">{book.format}</p>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
