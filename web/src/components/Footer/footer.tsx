"use client";

import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Globe, Facebook, Twitter, Instagram, Linkedin, Youtube, ChevronUp } from 'lucide-react';

const Footer = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { name: 'English', flag: 'us', countryCode: 'US' },
    { name: 'Spanish', flag: 'es', countryCode: 'ES' },
    { name: 'French', flag: 'fr', countryCode: 'FR' },
    { name: 'German', flag: 'de', countryCode: 'DE' },
    { name: 'Chinese', flag: 'cn', countryCode: 'CN' },
    { name: 'Japanese', flag: 'jp', countryCode: 'JP' },
    { name: 'Korean', flag: 'kr', countryCode: 'KR' },
    { name: 'Arabic', flag: 'sa', countryCode: 'SA' },
    { name: 'Hindi', flag: 'in', countryCode: 'IN' },
  ];

  const getFlagUrl = (countryCode: string) => {
    return `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Tecplore</h3>
            <p className="text-gray-400">
              Engineering science through innovation and education
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Explore</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-white transition-colors">Science Centers</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">Children's Museums & Parks</a></li>
              <li><a href="/news" className="text-gray-400 hover:text-white transition-colors">Museums & Planetariums</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Brand Experiences</a></li>
              <li><a href="/art" className="text-gray-400 hover:text-white transition-colors">Art</a></li>
              <li><a href="/product" className="text-gray-400 hover:text-white transition-colors">Product Development</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Language and Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Select Language</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white text-black hover:bg-gray-100 hover:text-black"
                >
                  <Globe className="mr-2 h-4 w-4" />
                  <img 
                    src={getFlagUrl(languages.find(lang => lang.name === selectedLanguage)?.countryCode || 'us')}
                    alt={selectedLanguage}
                    className="w-5 h-4 object-cover mr-2"
                  />
                  {selectedLanguage}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-white"
              >
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.name}
                    onClick={() => setSelectedLanguage(language.name)}
                    className="cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                  >
                    <img 
                      src={getFlagUrl(language.countryCode)}
                      alt={language.name}
                      className="w-5 h-4 object-cover"
                    />
                    {language.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="space-y-2">
              <h4 className="font-semibold text-lg">Contact</h4>
              <p className="text-gray-400">info@tecplore.com</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tecplore. All rights reserved.
          </p>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={scrollToTop}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;