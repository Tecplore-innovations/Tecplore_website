// src/components/Footer/footer.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import {Instagram, Linkedin, Home, Youtube } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";


  const resourceLinks = [
    { name: "Interactive Exhibits", href: "/interactive-exhibits" },
    { name: "Teaching Resources", href: "/teacher-resources" },
    { name: "Tecplore Studio", href: "/tecplore-studio" },
    { name: "Setup Maker Space", href: "/maker-space" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Join Our Team", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
    
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
         
        <div className="py-12 lg:py-16">
          <div className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-12 
            gap-8 lg:gap-12
          ">

            {/* --- Tecplore logo + socials (top on web, bottom on mobile) --- */}
            <div className="lg:col-span-4 sm:col-span-2 order-3 lg:order-1 space-y-6 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3">
               
               <div className="lg:col-span-4 sm:col-span-2 order-3 lg:order-1 space-y-6 text-center sm:text-left">
                <Link
                  href="/"
                  className="flex items-center justify-center sm:justify-start gap-3 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src="/photos/Tecplore_logo.avif"
                    alt="Tecplore Logo"
                    width={40}
                    height={40}
                    className="object-contain rounded-full"
                  />
                  <h3 className="text-2xl font-bold tracking-tight">Tecplore</h3>
                </Link>
              </div>
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                <a
                  href="https://www.instagram.com/tecplore_edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/tecplore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
               

                 <a
                  href=" https://www.youtube.com/@Tecplore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Youtube"
                >
                  <Youtube className="h-5 w-5" />
                </a>

              </div>
            </div>

            {/* --- Quick Links --- */}
            <div className="sm:col-span-1 lg:col-span-4 order-1 lg:order-2 space-y-4">
              <h4 className="font-semibold text-base uppercase tracking-wide text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {!isHomePage && (
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-2"
                    >
                      <Home className="h-4 w-4" />
                      Home
                    </Link>
                  </li>
                )}
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* --- Company Links --- */}
            <div className="sm:col-span-1 lg:col-span-4 order-2 lg:order-3 space-y-4">
              <h4 className="font-semibold text-base uppercase tracking-wide text-white mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors duration-200 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <Separator className="bg-gray-700" />

        <div className="py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs order-2 sm:order-1 text-center">
              © {new Date().getFullYear()} Tecplore. All rights reserved.
              <span className="mx-2">|</span>
              <Link href="/privacy-policy" className="text-gray-500 hover:text-white">Privacy Policy</Link>
              <span className="mx-1">•</span>
              <Link href="/terms-conditions" className="text-gray-500 hover:text-white">Terms of Use</Link>
            </p>

          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;