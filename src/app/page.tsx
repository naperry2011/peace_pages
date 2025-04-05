import Link from "next/link";

const featuredBooks = [
  {
    id: 1,
    title: "The Little Explorer",
    author: "Jamie Smith",
    coverUrl: "/images/book1.jpg",
    ageGroup: "4-6",
  },
  {
    id: 2,
    title: "Dreams of the Ocean",
    author: "Lily Taylor",
    coverUrl: "/images/book2.jpg",
    ageGroup: "5-7",
  },
  {
    id: 3,
    title: "Friendly Forest",
    author: "Mark Johnson",
    coverUrl: "/images/book3.jpg",
    ageGroup: "3-5",
  },
  {
    id: 4,
    title: "Starry Night Adventures",
    author: "Sarah Wilson",
    coverUrl: "/images/book4.jpg",
    ageGroup: "6-8",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-b from-indigo-100 to-white">
        <div className="absolute inset-0 opacity-15 bg-pattern-dots"></div>
        <div className="container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-800 mb-4">
            Peace & Pages
          </h1>
          <p className="text-xl md:text-2xl text-indigo-600 mb-8 max-w-2xl mx-auto">
            Discover the magic of reading with calm, immersive stories for children
          </p>
          <Link
            href="/library"
            className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium transition-colors hover:bg-indigo-700"
          >
            Browse Library
          </Link>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <div key={book.id} className="rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
                <div className="h-64 relative">
                  <div className="absolute inset-0 bg-indigo-100 flex items-center justify-center">
                    {/* Placeholder for book covers until we have actual images */}
                    <span className="text-indigo-300 text-7xl">📚</span>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-gray-800">{book.title}</h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
                      Ages {book.ageGroup}
                    </span>
                    <Link href={`/book/${book.id}`} className="text-indigo-600 text-sm hover:underline">
                      View Book
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/library"
              className="inline-block px-5 py-2 rounded-lg border border-indigo-600 text-indigo-600 font-medium transition-colors hover:bg-indigo-50"
            >
              View All Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
