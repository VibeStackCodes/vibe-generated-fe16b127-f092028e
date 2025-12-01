/**
 * Sample book data for PaperPulse bookstore
 */

import type { Book } from '@/types/book'

export const SAMPLE_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fiction',
    price: 16.99,
    rating: 4.5,
    reviews: 3245,
    format: 'hardcover',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'A dazzling novel about all the choices that go into a life well lived.',
    isbn: '978-0-525-55555-3',
    publishDate: '2020-08-13',
  },
  {
    id: '2',
    title: 'Educated',
    author: 'Tara Westover',
    genre: 'Memoir',
    price: 18.99,
    rating: 4.7,
    reviews: 5621,
    format: 'hardcover',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'A memoir about a young woman who leaves her survivalist family to pursue education.',
    isbn: '978-0-399-59074-9',
    publishDate: '2018-02-20',
  },
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    genre: 'Mystery',
    price: 15.99,
    rating: 4.3,
    reviews: 4102,
    format: 'paperback',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'A woman shoots her husband and never speaks again. A psychotherapist becomes obsessed with uncovering why.',
    isbn: '978-0-399-17954-7',
    publishDate: '2019-02-05',
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: 'Science Fiction',
    price: 17.99,
    rating: 4.6,
    reviews: 6234,
    format: 'hardcover',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'A lone astronaut must save Earth from extinction.',
    isbn: '978-0-593-13524-5',
    publishDate: '2021-05-04',
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    price: 14.99,
    rating: 4.8,
    reviews: 7823,
    format: 'paperback',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'An easy and proven way to build good habits and break bad ones.',
    isbn: '978-0-735-21141-8',
    publishDate: '2018-10-16',
  },
  {
    id: '6',
    title: 'The Four Winds',
    author: 'Kristin Hannah',
    genre: 'Historical Fiction',
    price: 16.99,
    rating: 4.4,
    reviews: 2891,
    format: 'ebook',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'A sweeping novel set during the Great Depression.',
    isbn: '978-0-399-17945-5',
    publishDate: '2021-02-02',
  },
  {
    id: '7',
    title: 'The Midnight Bargain',
    author: 'C.L. Polk',
    genre: 'Fantasy',
    price: 15.99,
    rating: 4.2,
    reviews: 1645,
    format: 'hardcover',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'A fantasy romance set in a world of privilege and magic.',
    isbn: '978-0-765-39843-0',
    publishDate: '2021-05-04',
  },
  {
    id: '8',
    title: 'It Ends With Us',
    author: 'Colleen Hoover',
    genre: 'Romance',
    price: 13.99,
    rating: 4.5,
    reviews: 8934,
    format: 'paperback',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'A novel exploring domestic violence and the power of love.',
    isbn: '978-1-492-20631-6',
    publishDate: '2016-08-02',
  },
  {
    id: '9',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    genre: 'Science Fiction',
    price: 17.99,
    rating: 4.1,
    reviews: 2134,
    format: 'hardcover',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'A novel about an Artificial Friend and the family that loves her.',
    isbn: '978-0-593-31099-8',
    publishDate: '2021-03-02',
  },
  {
    id: '10',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    genre: 'Mystery',
    price: 16.99,
    rating: 4.6,
    reviews: 5678,
    format: 'paperback',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=400&h=600&fit=crop',
    description: 'Four unlikely friends meet weekly to solve cold cases.',
    isbn: '978-0-062-96867-4',
    publishDate: '2020-09-03',
  },
]

/**
 * Get all unique genres from books
 */
export function getUniqueGenres(books: Book[]): string[] {
  const genres = new Set(books.map((b) => b.genre))
  return Array.from(genres).sort()
}

/**
 * Get all unique authors from books
 */
export function getUniqueAuthors(books: Book[]): string[] {
  const authors = new Set(books.map((b) => b.author))
  return Array.from(authors).sort()
}

/**
 * Get price range from books
 */
export function getPriceRange(books: Book[]): [number, number] {
  const prices = books.map((b) => b.price)
  return [Math.min(...prices), Math.max(...prices)]
}

/**
 * Get unique formats from books
 */
export function getUniqueFormats(books: Book[]) {
  const formats = new Set(books.map((b) => b.format))
  return Array.from(formats).sort()
}
