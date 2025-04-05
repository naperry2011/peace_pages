import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Peace & Pages - Children's Reading Web App",
  description: "A calm, enjoyable reading experience for children.",
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Varela+Round&display=swap"
          rel="stylesheet"
          precedence="default"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-[#482836] text-[#F7E8D4] py-8">
          <div className="container mx-auto px-6 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2 font-['Varela_Round',sans-serif]">Peace & Pages</h3>
                <p className="text-sm text-[#E6CCB2]">A calm reading experience for children</p>
              </div>
              <div className="flex gap-6">
                <a href="#" className="text-[#E6CCB2] hover:text-[#F7E8D4]">About</a>
                <a href="#" className="text-[#E6CCB2] hover:text-[#F7E8D4]">Contact</a>
                <a href="#" className="text-[#E6CCB2] hover:text-[#F7E8D4]">Privacy</a>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-[#764E5A] text-sm text-[#E6CCB2]">
              © {new Date().getFullYear()} Peace & Pages. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
