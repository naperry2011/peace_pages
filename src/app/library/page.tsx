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
    <div className="py-8 px-6 md:px-10 bg-[#F7E8D4] min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#482836] mb-6 font-['Varela_Round',sans-serif]">Book Library</h1>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full px-4 py-2 rounded-lg border border-[#C38D71] focus:outline-none focus:ring-2 focus:ring-[#9C5D73] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Age Group Filter */}
            <div>
              <label className="block text-sm font-medium text-[#482836] mb-1">Age Group</label>
              <select 
                className="w-full px-3 py-2 rounded-md border border-[#C38D71] focus:outline-none focus:ring-2 focus:ring-[#9C5D73]"
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
            <div>
              <label className="block text-sm font-medium text-[#482836] mb-1">Genre</label>
              <select 
                className="w-full px-3 py-2 rounded-md border border-[#C38D71] focus:outline-none focus:ring-2 focus:ring-[#9C5D73]"
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
              <label className="block text-sm font-medium text-[#482836] mb-1">Mood</label>
              <select 
                className="w-full px-3 py-2 rounded-md border border-[#C38D71] focus:outline-none focus:ring-2 focus:ring-[#9C5D73]"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <div key={book.id} className="card hover:shadow-lg">
                <div className="h-56 relative">
                  <div className="absolute inset-0 bg-[#E6CCB2] flex items-center justify-center">
                    {/* Placeholder for book covers */}
                    <span className="text-[#9C5D73] text-6xl">📚</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-[#482836] mb-1">{book.title}</h3>
                  <p className="text-[#8A5A44] text-sm mb-2">{book.author}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-[#F7E8D4] text-[#8A5A44] px-2 py-1 rounded-full">
                      Ages {book.ageGroup}
                    </span>
                    <span className="text-xs bg-[#EFD9C3] text-[#8A5A44] px-2 py-1 rounded-full">
                      {book.genre}
                    </span>
                    <span className="text-xs bg-[#E6CCB2] text-[#8A5A44] px-2 py-1 rounded-full">
                      {book.mood}
                    </span>
                  </div>
                  <Link href={`/book/${book.id}`} className="block text-center text-[#F7E8D4] bg-[#9C5D73] rounded-full py-2 hover:bg-[#764E5A] transition-colors">
                    View Book
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-[#482836] text-lg">No books match your filters. Try adjusting your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 