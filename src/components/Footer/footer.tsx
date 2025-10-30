// src/components/Footer/footer.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Globe, Instagram, Linkedin, Home } from "lucide-react";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { name: "English" },
    { name: "தமிழ்" },
    { name: "हिन्दी" },
  ];

  const resourceLinks = [
    { name: "Interactive Exhibits", href: "/interactive-exhibits" },
    { name: "Teacher Resources", href: "/teacher-resources" },
    { name: "Tecplore Studio", href: "/tecplore-studio" },
    { name: "Setup Maker Space", href: "/maker-space" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Join Our Team", href: "/careers" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Use", href: "/terms-conditions" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section - Takes 4 columns on large screens */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <Image
                  src="/photos/Tecplore logo.jpg"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-contain rounded-full"
                />
                <h3 className="text-2xl font-bold tracking-tight">Tecplore</h3>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed pr-4">
                Inspiring the next generation through interactive science and technology education.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-2">
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
              </div>
            </div>

            {/* Navigation Section - Takes 4 columns on large screens */}
            <div className="lg:col-span-4 space-y-4">
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

            {/* Company Section - Takes 4 columns on large screens */}
            <div className="lg:col-span-4 space-y-4">
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

        {/* Bottom Bar */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-xs order-2 sm:order-1">
              © {new Date().getFullYear()} Tecplore. All rights reserved.
            </p>

            {/* Language Selector */}
            <div className="order-1 sm:order-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="w-36 bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white text-sm"
                  >
                    <Globe className="mr-2 h-4 w-4" /> 
                    {selectedLanguage}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36 bg-gray-800 border-gray-700">
                  {languages.map((language) => (
                    <DropdownMenuItem 
                      key={language.name} 
                      onClick={() => setSelectedLanguage(language.name)}
                      className="text-white hover:bg-gray-700 focus:bg-gray-700 cursor-pointer"
                    >
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;