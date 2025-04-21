import type { Metadata } from "next";
import NavBar from "@/components/Navigation/navbar";
import Footer from "@/components/Footer/footer";
import { Source_Sans_3 } from 'next/font/google';
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Tecplore - Interactive Science Experiments",
  description: "Innovative educational platform for interactive science exhibits",
  keywords: ["science", "education", "experiments", "interactive learning"],
  openGraph: {
    title: "Tecplore - Bringing Science to Life",
    description: "Explore cutting-edge science experiments and interactive exhibits",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${sourceSans.variable} antialiased font-sourceSans min-h-screen flex flex-col`}
      >
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}