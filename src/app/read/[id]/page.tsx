'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

// Mock data for books - would be fetched from Supabase in a real implementation
const books = [
  {
    id: "1",
    title: "The Little Explorer",
    author: "Jamie Smith",
    pages: [
      { text: "Once upon a time, there was a little girl named Mia who loved to explore.", background: "bg-amber-50" },
      { text: "Her grandparents lived in a small cottage near a magical forest.", background: "bg-amber-50" },
      { text: "One sunny day, Mia decided to explore the forest behind her grandparents' house.", background: "bg-green-50" },
      { text: "She packed her explorer bag with a compass, a notebook, and some snacks.", background: "bg-green-50" },
      { text: "As she entered the forest, she noticed the birds singing beautiful songs.", background: "bg-blue-50" },
      { text: "Deeper in the forest, she found a small stream with crystal clear water.", background: "bg-blue-50" },
      { text: "Next to the stream, there was a family of rabbits playing happily.", background: "bg-purple-50" },
      { text: "Mia carefully approached them and offered them some carrots from her bag.", background: "bg-purple-50" },
      { text: "The rabbits thanked her and showed her a hidden path through the forest.", background: "bg-indigo-50" },
      { text: "The path led to a beautiful meadow full of colorful flowers.", background: "bg-indigo-50" },
      { text: "Mia spent the whole day exploring and drew all her discoveries in her notebook.", background: "bg-pink-50" },
      { text: "When the sun began to set, she followed the path back home, excited to share her adventures with her grandparents. The End.", background: "bg-pink-50" }
    ]
  },
  {
    id: "2",
    title: "Dreams of the Ocean",
    author: "Lily Taylor",
    pages: [
      { text: "Sam loved to sit by the ocean and watch the waves crash against the shore.", background: "bg-blue-50" },
      { text: "Every night before bed, he dreamed of swimming beneath the waves.", background: "bg-blue-50" },
      { text: "One night, he dreamed he could breathe underwater like a fish.", background: "bg-blue-100" },
      { text: "As he swam deeper, he met a friendly dolphin named Echo.", background: "bg-blue-100" },
      { text: "Echo showed Sam the beautiful coral reefs with fish of every color.", background: "bg-cyan-50" },
      { text: "They swam past a family of sea turtles floating lazily in the current.", background: "bg-cyan-50" },
      { text: "Echo taught Sam how dolphins speak to each other through clicks and whistles.", background: "bg-teal-50" },
      { text: "They played games, chasing each other through underwater caves.", background: "bg-teal-50" },
      { text: "As the sun began to set in his dream, Sam knew it was time to go home.", background: "bg-indigo-50" },
      { text: "Echo led him back to the shore, promising to meet again in his dreams.", background: "bg-indigo-50" },
      { text: "Sam woke up with a smile, feeling the gentle rocking of the ocean waves.", background: "bg-blue-50" },
      { text: "He couldn't wait to fall asleep again and continue his underwater adventures with Echo. The End.", background: "bg-blue-50" }
    ]
  },
  {
    id: "3",
    title: "Friendly Forest",
    author: "Mark Johnson",
    pages: [
      { text: "In the heart of the Friendly Forest, the animals were preparing for the annual forest festival.", background: "bg-green-50" },
      { text: "Ollie the Owl was in charge of sending invitations to all the forest animals.", background: "bg-green-50" },
      { text: "Benny the Bear was collecting honey to make sweet treats for everyone.", background: "bg-amber-50" },
      { text: "Sammy the Squirrel gathered nuts and berries for the forest feast.", background: "bg-amber-50" },
      { text: "Fiona the Fox decorated the clearing with colorful leaves and flowers.", background: "bg-purple-50" },
      { text: "When the day of the festival arrived, the sun shone brightly over the forest.", background: "bg-purple-50" },
      { text: "All the animals gathered in the clearing, excited for the festivities to begin.", background: "bg-blue-50" },
      { text: "They shared food, played games, and listened to the beautiful songs of the birds.", background: "bg-blue-50" },
      { text: "As the day came to an end, the animals sat together under the starry sky.", background: "bg-indigo-100" },
      { text: "They were thankful for their friends and the beautiful forest they called home. The End.", background: "bg-indigo-100" }
    ]
  }
];

interface BookPage {
  text: string;
  background: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  pages: BookPage[];
}

interface PageEvent {
  data: number;
}

interface PageFlip {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
}

// Page component for the flipbook
const Page = ({ pageNumber, content, background }: { pageNumber: number, content: string, background: string }) => {
  return (
    <div className={`page ${background} h-full flex flex-col justify-center items-center p-8 shadow-inner`}>
      <div className="text-center">
        <p className="text-lg md:text-xl lg:text-2xl text-black leading-relaxed font-['Quicksand',sans-serif]">{content}</p>
        <div className="mt-6 text-sm text-black">Page {pageNumber}</div>
      </div>
    </div>
  );
};

// Cover page component
const CoverPage = ({ title, author }: { title: string, author: string }) => {
  return (
    <div className="cover-page bg-[#E6CCB2] h-full flex flex-col justify-center items-center p-8 shadow-inner">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-4 font-['Varela_Round',sans-serif]">{title}</h1>
        <p className="text-xl text-black">by {author}</p>
        <div className="mt-16 text-sm text-black">Open to begin reading</div>
      </div>
    </div>
  );
};

// Back cover component
const BackCover = ({ title }: { title: string }) => {
  return (
    <div className="back-cover bg-[#E6CCB2] h-full flex flex-col justify-center items-center p-8 shadow-inner">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black mb-4 font-['Varela_Round',sans-serif]">The End</h2>
        <p className="text-lg text-black">{title}</p>
        <div className="mt-16 text-sm text-black">Thank you for reading!</div>
      </div>
    </div>
  );
};

export default function ReadPage() {
  const params = useParams();
  const bookId = params.id as string;
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  
  const flipBookRef = useRef<PageFlip | null>(null);

  useEffect(() => {
    // In a real app, this would be a database query
    const foundBook = books.find(book => book.id === bookId);
    
    if (foundBook) {
      setBook(foundBook);
    }
    
    setLoading(false);
  }, [bookId]);

  const handlePageFlip = (e: PageEvent) => {
    setPageNumber(e.data);
  };

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

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
    <div className="py-8 px-4 min-h-screen bg-[#F7E8D4] flex flex-col">
      {/* Top Navigation */}
      <div className="container mx-auto mb-6 flex justify-between items-center">
        <Link href={`/book/${book.id}`} className="inline-flex items-center text-black hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Book Details
        </Link>
        <div className="text-black font-['Quicksand',sans-serif]">
          Page {pageNumber} of {book.pages.length + 1}
        </div>
      </div>
      
      {/* Book Container */}
      <div className="flex-grow flex justify-center items-center">
        <div className="relative w-full max-w-4xl h-[70vh] mx-auto">
          <HTMLFlipBook
            width={550}
            height={733}
            size="stretch"
            minWidth={300}
            maxWidth={1000}
            minHeight={400}
            maxHeight={1533}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={handlePageFlip}
            ref={flipBookRef}
            className="mx-auto"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={1000}
            usePortrait={false}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            useMouseEvents={true}
            swipeDistance={30}
            clickEventForward={true}
            showPageCorners={true}
            disableFlipByClick={false}
            renderOnlyPageLengthChange={false}
          >
            {/* Cover */}
            <div>
              <CoverPage title={book.title} author={book.author} />
            </div>
            
            {/* Book Pages */}
            {book.pages.map((page: BookPage, index: number) => (
              <div key={index}>
                <Page 
                  pageNumber={index + 1} 
                  content={page.text} 
                  background={page.background} 
                />
              </div>
            ))}
            
            {/* Back Cover */}
            <div>
              <BackCover title={book.title} />
            </div>
          </HTMLFlipBook>
          
          {/* Navigation Buttons */}
          <div className="absolute left-0 right-0 bottom-0 py-4 flex justify-center gap-4">
            <button 
              onClick={prevPage}
              className="bg-white rounded-full p-2 shadow-md hover:bg-[#FAF2E8] transition-colors"
              aria-label="Previous page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#9C5D73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextPage}
              className="bg-white rounded-full p-2 shadow-md hover:bg-[#FAF2E8] transition-colors"
              aria-label="Next page"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#9C5D73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 