'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Mock data for books - would be fetched from Supabase in a real implementation
const books = [
  {
    id: "1",
    title: "The Little Explorer",
    author: "Jamie Smith",
    coverUrl: "/images/book1.jpg",
    ageGroup: "4-6",
    genre: "Adventure",
    mood: "Exciting",
    description: "Join Mia as she explores the magical forest behind her grandparents' house. A tale of curiosity, courage, and the wonders of nature.",
    readingTime: "10-15 minutes",
    pages: 12
  },
  {
    id: "2",
    title: "Dreams of the Ocean",
    author: "Lily Taylor",
    coverUrl: "/images/book2.jpg",
    ageGroup: "5-7",
    genre: "Fantasy",
    mood: "Calm",
    description: "Dive into an underwater adventure with Sam and his dolphin friend Echo. Discover the beauty and mysteries of the ocean in this serene tale.",
    readingTime: "15-20 minutes",
    pages: 18
  },
  {
    id: "3",
    title: "Friendly Forest",
    author: "Mark Johnson",
    coverUrl: "/images/book3.jpg",
    ageGroup: "3-5",
    genre: "Nature",
    mood: "Happy",
    description: "Meet the animals who live in the Friendly Forest! They work together to prepare for the annual forest festival in this heartwarming story about friendship and cooperation.",
    readingTime: "8-10 minutes",
    pages: 10
  },
  {
    id: "4",
    title: "Starry Night Adventures",
    author: "Sarah Wilson",
    coverUrl: "/images/book4.jpg",
    ageGroup: "6-8",
    genre: "Science",
    mood: "Curious",
    description: "When Zoe and her brother Alex camp in their backyard, the stars come alive! Join them as they learn about constellations and space in this magical night adventure.",
    readingTime: "12-15 minutes",
    pages: 15
  }
];

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  ageGroup: string;
  genre: string;
  mood: string;
  description: string;
  readingTime: string;
  pages: number;
}

export default function BookDetailPage() {
  const params = useParams();
  const bookId = params.id as string;
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be a database query
    const foundBook = books.find(book => book.id === bookId);
    
    if (foundBook) {
      setBook(foundBook);
    }
    
    setLoading(false);
  }, [bookId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7E8D4]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9C5D73]"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen py-12 px-6 flex flex-col items-center justify-center bg-[#F7E8D4]">
        <h1 className="text-2xl font-bold text-black mb-4 font-['Varela_Round',sans-serif]">Book Not Found</h1>
        <p className="text-black mb-6">We couldn&apos;t find the book you&apos;re looking for.</p>
        <Link 
          href="/library" 
          className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Return to Library
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-6 md:px-10 bg-[#F7E8D4] min-h-screen">
      <div className="container mx-auto">
        <Link href="/library" className="inline-flex items-center text-black mb-8 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Library
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Book Cover (Left) */}
            <div className="md:w-1/3 bg-[#E6CCB2] flex items-center justify-center p-8">
              <div className="w-full max-w-xs aspect-[3/4] bg-white shadow-lg rounded-md flex items-center justify-center">
                {/* Placeholder for book cover */}
                <span className="text-[#9C5D73] text-8xl">📚</span>
              </div>
            </div>
            
            {/* Book Details (Right) */}
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-black mb-2 font-['Varela_Round',sans-serif]">{book.title}</h1>
              <p className="text-xl text-black mb-6">by {book.author}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-sm bg-[#F7E8D4] text-black px-3 py-1 rounded-full">
                  Ages {book.ageGroup}
                </span>
                <span className="text-sm bg-[#EFD9C3] text-black px-3 py-1 rounded-full">
                  {book.genre}
                </span>
                <span className="text-sm bg-[#E6CCB2] text-black px-3 py-1 rounded-full">
                  {book.mood}
                </span>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-black mb-2 font-['Varela_Round',sans-serif]">About This Book</h2>
                <p className="text-black leading-relaxed">{book.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#FAF2E8] p-4 rounded-lg">
                  <h3 className="font-medium text-black mb-1">Reading Time</h3>
                  <p className="text-black">{book.readingTime}</p>
                </div>
                <div className="bg-[#FAF2E8] p-4 rounded-lg">
                  <h3 className="font-medium text-black mb-1">Pages</h3>
                  <p className="text-black">{book.pages} pages</p>
                </div>
              </div>
              
              <Link 
                href={`/read/${book.id}`}
                className="inline-block px-6 py-3 bg-[#9C5D73] text-white font-medium rounded-full hover:bg-[#764E5A] transition-colors shadow-md"
              >
                Start Reading
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 