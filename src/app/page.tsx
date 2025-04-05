import Link from "next/link";
import Image from "next/image";

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
      <section className="relative min-h-[600px] flex items-center justify-center bg-[#482836]">
        <div className="absolute inset-0 opacity-10 lofi-pattern"></div>
        <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center z-10">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 font-['Varela_Round',sans-serif] drop-shadow-md">
              Peace & Pages
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl drop-shadow-sm">
              Discover the magic of reading with calm, immersive stories for children
            </p>
            <Link
              href="/library"
              className="inline-block px-6 py-3 rounded-full bg-[#C38D71] text-white font-medium transition-colors hover:bg-[#A67761] shadow-md"
            >
              Browse Library
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-80">
              <Image
                src="/logo.png"
                alt="Peace & Pages" 
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-[#F7E8D4]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-black mb-10 text-center font-['Varela_Round',sans-serif] drop-shadow-sm">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <div key={book.id} className="card hover:shadow-lg bg-white">
                <div className="h-64 relative">
                  <div className="absolute inset-0 bg-[#E6CCB2] flex items-center justify-center">
                    {/* Placeholder for book covers until we have actual images */}
                    <span className="text-[#9C5D73] text-7xl">📚</span>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-[#000000] font-['Varela_Round',sans-serif]">{book.title}</h3>
                  <p className="text-[#000000] text-sm font-medium">{book.author}</p>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs bg-[#F7E8D4] text-black px-2 py-1 rounded-full font-semibold border border-[#C38D71]">
                      Ages {book.ageGroup}
                    </span>
                    <Link href={`/book/${book.id}`} className="text-[#764E5A] text-sm hover:underline font-bold">
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
              className="inline-block px-6 py-3 rounded-full border-2 border-[#764E5A] text-[#764E5A] font-bold text-lg transition-colors hover:bg-[#FAF2E8] shadow-sm"
            >
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-[#764E5A] text-[#F7E8D4]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative h-72 w-full rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-[#482836] flex items-center justify-center">
                  <span className="text-[#F7E8D4] text-7xl">📖</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <h2 className="text-3xl font-bold mb-6 font-['Varela_Round',sans-serif]">Our Mission</h2>
              <p className="mb-4 leading-relaxed">
                Peace & Pages is dedicated to providing a calm, enjoyable reading experience for children of all backgrounds. 
                We believe that every child deserves access to stories that inspire, educate, and represent them.
              </p>
              <p className="mb-6 leading-relaxed">
                Our carefully curated collection features diverse characters, meaningful stories, and beautiful illustrations 
                that promote empathy, creativity, and a lifelong love of reading.
              </p>
              <Link
                href="/library"
                className="inline-block px-6 py-3 rounded-full bg-[#C38D71] text-[#F7E8D4] font-medium transition-colors hover:bg-[#A67761] shadow-md"
              >
                Start Reading
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Teaser */}
      <section className="py-12 bg-[#482836]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-[#F7E8D4] mb-4 font-['Varela_Round',sans-serif]">Ready to Begin?</h2>
          <p className="text-[#E6CCB2] mb-8 max-w-2xl mx-auto">
            Explore our collection of calming, inclusive stories designed for young readers
          </p>
          <Link
            href="/library"
            className="inline-block px-6 py-3 rounded-full bg-[#C38D71] text-[#F7E8D4] font-medium transition-colors hover:bg-[#A67761] shadow-md"
          >
            Visit the Library
          </Link>
        </div>
      </section>
    </div>
  );
}
