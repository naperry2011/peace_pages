'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data for books - would be fetched from Supabase in a real implementation
const allBooks = [
  {
    id: 1,
    title: "The Little Explorer",
    author: "Jamie Smith",
    coverUrl: "/images/book1.jpg",
    ageGroup: "4-6",
    genre: "Adventure",
    mood: "Exciting"
  },
  {
    id: 2,
    title: "Dreams of the Ocean",
    author: "Lily Taylor",
    coverUrl: "/images/book2.jpg",
    ageGroup: "5-7",
    genre: "Fantasy",
    mood: "Calm"
  },
  {
    id: 3,
    title: "Friendly Forest",
    author: "Mark Johnson",
    coverUrl: "/images/book3.jpg",
    ageGroup: "3-5",
    genre: "Nature",
    mood: "Happy"
  },
  {
    id: 4,
    title: "Starry Night Adventures",
    author: "Sarah Wilson",
    coverUrl: "/images/book4.jpg",
    ageGroup: "6-8",
    genre: "Science",
    mood: "Curious"
  },
  {
    id: 5,
    title: "The Brave Little Rabbit",
    author: "Daniel Brown",
    coverUrl: "/images/book5.jpg",
    ageGroup: "3-5",
    genre: "Adventure",
    mood: "Brave"
  },
  {
    id: 6,
    title: "Underwater Kingdom",
    author: "Emma Davis",
    coverUrl: "/images/book6.jpg",
    ageGroup: "5-7",
    genre: "Fantasy",
    mood: "Magical"
  },
  {
    id: 7,
    title: "Counting Stars",
    author: "Oliver Wilson",
    coverUrl: "/images/book7.jpg",
    ageGroup: "2-4",
    genre: "Educational",
    mood: "Calm"
  },
  {
    id: 8,
    title: "Dinosaur Days",
    author: "Lucy Thompson",
    coverUrl: "/images/book8.jpg",
    ageGroup: "4-6",
    genre: "Educational",
    mood: "Exciting"
  }
];

// Filter options
const ageGroups = ["2-4", "3-5", "4-6", "5-7", "6-8"];
const genres = ["Adventure", "Fantasy", "Nature", "Science", "Educational"];
const moods = ["Calm", "Exciting", "Happy", "Brave", "Curious", "Magical"];

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  // Filter books based on search term and filters
  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAge = selectedAgeGroup ? book.ageGroup === selectedAgeGroup : true;
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;
    const matchesMood = selectedMood ? book.mood === selectedMood : true;
    
    return matchesSearch && matchesAge && matchesGenre && matchesMood;
  });

  return (
    <div className="py-6 sm:py-8 px-4 sm:px-6 md:px-10 bg-[#F7E8D4] min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-6 sm:mb-8 text-center md:text-left font-['Varela_Round',sans-serif] drop-shadow-sm">
          Book Library
        </h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-6">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full px-3 sm:px-4 py-2 rounded-lg border border-[#C38D71] focus:outline-none focus:ring-2 focus:ring-[#9C5D73] focus:border-transparent text-sm sm:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:gap-4 md:grid-cols-3">
            {/* Age Group Filter */}
            <div className="mb-2 sm:mb-0">
              <label className="block text-xs sm:text-sm font-medium text-black mb-1">Age Group</label>
              <select 
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-[#C38D71] focus:outline-none focus:ring-2 focus:ring-[#9C5D73] text-sm"
                value={selectedAgeGroup}
                onChange={(e) => setSelectedAgeGroup(e.target.value)}
              >
                <option value="">All Ages</option>
                {ageGroups.map(age => (
                  <option key={age} value={age}>{age}</option>
                ))}
              </select>
            </div>
            
            {/* Genre Filter */}
            <div className="mb-2 sm:mb-0">
              <label className="block text-xs sm:text-sm font-medium text-black mb-1">Genre</label>
              <select 
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-[#C38D71] focus:outline-none focus:ring-2 focus:ring-[#9C5D73] text-sm"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            {/* Mood Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-black mb-1">Mood</label>
              <select 
                className="w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded-md border border-[#C38D71] focus:outline-none focus:ring-2 focus:ring-[#9C5D73] text-sm"
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
              >
                <option value="">All Moods</option>
                {moods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <div key={book.id} className="card hover:shadow-lg bg-white">
                <div className="h-48 sm:h-56 relative">
                  <div className="absolute inset-0 bg-[#E6CCB2] flex items-center justify-center">
                    {/* Placeholder for book covers */}
                    <span className="text-[#9C5D73] text-5xl sm:text-6xl">📚</span>
                  </div>
                </div>
                <div className="p-3 sm:p-4 bg-white">
                  <h3 className="font-bold text-base sm:text-lg text-[#000000] mb-1 font-['Varela_Round',sans-serif]">{book.title}</h3>
                  <p className="text-[#000000] text-xs sm:text-sm mb-2 font-medium">{book.author}</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <span className="text-[10px] sm:text-xs bg-[#F7E8D4] text-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold border border-[#C38D71]">
                      Ages {book.ageGroup}
                    </span>
                    <span className="text-[10px] sm:text-xs bg-[#EFD9C3] text-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold border border-[#C38D71]">
                      {book.genre}
                    </span>
                    <span className="text-[10px] sm:text-xs bg-[#E6CCB2] text-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-semibold border border-[#C38D71]">
                      {book.mood}
                    </span>
                  </div>
                  <Link href={`/book/${book.id}`} className="block text-center text-white bg-[#764E5A] rounded-full py-1.5 sm:py-2 hover:bg-[#5D3A45] transition-colors font-bold shadow-sm text-xs sm:text-sm">
                    View Book
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[#331C26] font-bold text-lg">No books found matching your filters.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedAgeGroup('');
                  setSelectedGenre('');
                  setSelectedMood('');
                }}
                className="mt-4 px-4 py-2 bg-[#C38D71] text-white rounded-md hover:bg-[#A67761] transition-colors font-medium text-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 