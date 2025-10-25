"use client";

import React, { useState, useEffect } from "react";
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
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("English");


  const languages = [
    { name: "English" },
    { name: "தமிழ்" },
    { name: "हिन्दी" },
  ];


  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-white pt-10 pb-10 relative">
      <div className="container mx-auto px-4">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Company Info + Socials + Language */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold">Tecplore</h3>
            </Link>
            <p className="text-gray-400">
              Inspiring the next generation through interactive science and technology
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-2">
              <a
                href="https://www.instagram.com/tecplore_edu/?igsh=YzljYTk1ODg3Zg%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
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
            </div>

            {/* Language Selector */}
            <div className="mt-2 w-40">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full justify-start bg-white text-black hover:bg-gray-100">
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
                  href="/teacher-resources"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Teacher Resources
                </Link>
              </li>

              <li>
            <Link
              href="/tecplore-studio"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              Tecplore Studio
            </Link>
          </li>


              <li>
                <Link
                  href="/maker-space"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Setup Maker Space
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
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Join Our Team
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
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm md:text-base">
            © {new Date().getFullYear()} Tecplore. Empowering education through innovation.
          </p>
        </div>

      
      </div>
    </footer>
  );
};

export default Footer;
