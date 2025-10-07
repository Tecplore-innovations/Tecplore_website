"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Globe,
  Facebook,
  TwitterIcon,
  Instagram,
  Linkedin,
  Youtube,
  ChevronUp,
} from "lucide-react";

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const languages = [
    { name: "English" },
    { name: "தமிழ்" },
    { name: "हिन्दी" },
  ];

  // Handle Go-To-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
 <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-white pt-16 pb-8 relative">


      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold">Tecplore</h3>
            </Link>
            <p className="text-gray-400">
              Inspiring the next generation through interactive science and
              technology
            </p>
            <div className="flex space-x-4">
              {/* Uncomment these if needed */}
              {/*
              <a 
                href="#" 
                className="hover:text-blue-400 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="hover:text-blue-400 transition-colors duration-300"
                aria-label="Twitter"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              */}
              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                  href="https://www.linkedin.com/company/tecplore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300"
                  aria-label="LinkedIn"
                > 
                  <Linkedin className="h-5 w-5" />
                </a>

              <a
                href="#"
                className="hover:text-blue-400 transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Educational Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Educational Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/interactive-exhibits"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Interactive Exhibits
                </Link>
              </li>
              <li>
                <Link
                  href="/stem-programs"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  STEM Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/virtual-labs"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Virtual Labs
                </Link>
              </li>
              <li>
                <Link
                  href="/teacher-resources"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Teacher Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/curriculum"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Curriculum Integration
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Join Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/legal-notice"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Language and Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-3">Select Language</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    className="w-full justify-start bg-white text-black hover:bg-gray-100"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    {selectedLanguage}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.name}
                      onClick={() => setSelectedLanguage(language.name)}
                      className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                    >
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Contact Us</h4>
              <div className="text-gray-400 space-y-2">
                <p>Email: education@tecplore.com</p>
                <p>Support: +91 70101 31721</p>
                <p>Hours: Mon-Fri 9AM-5PM IST</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 relative">
          <p className="text-gray-500 text-sm md:text-base">
            © {new Date().getFullYear()} Tecplore. Empowering education through innovation.
          </p>

          {/* Circular Go-To-Top Button */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="fixed bottom-6 right-6 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 shadow-lg transition-all duration-300"
            >
              <ChevronUp className="h-6 w-6 md:h-7 md:w-7" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
