"use client";

import React, { useState } from 'react';
import Image from 'next/image';
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
  ChevronUp 
} from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Tecplore</h3>
            <p className="text-gray-400">
              Inspiring the next generation through interactive science and technology
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Educational Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Educational Resources</h4>
            <ul className="space-y-2">
              <li><a href="/interactive-exhibits" className="text-gray-400 hover:text-white transition-colors duration-300">Interactive Exhibits</a></li>
              <li><a href="/stem-programs" className="text-gray-400 hover:text-white transition-colors duration-300">STEM Programs</a></li>
              <li><a href="/virtual-labs" className="text-gray-400 hover:text-white transition-colors duration-300">Virtual Labs</a></li>
              <li><a href="/teacher-resources" className="text-gray-400 hover:text-white transition-colors duration-300">Teacher Resources</a></li>
              <li><a href="/curriculum" className="text-gray-400 hover:text-white transition-colors duration-300">Curriculum Integration</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="/research" className="text-gray-400 hover:text-white transition-colors duration-300">Research & Innovation</a></li>
              <li><a href="/partners" className="text-gray-400 hover:text-white transition-colors duration-300">Educational Partners</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              <li><a href="/careers" className="text-gray-400 hover:text-white transition-colors duration-300">Join Our Team</a></li>
            </ul>
          </div>

          {/* Language and Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-3">Select Language</h4>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-white text-black hover:bg-gray-100"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    <div className="relative w-5 h-4 mr-2">
                      <Image 
                        src={getFlagUrl(languages.find(lang => lang.name === selectedLanguage)?.countryCode || 'us')}
                        alt={selectedLanguage}
                        fill
                        className="object-cover"
                      />
                    </div>
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
                      <div className="relative w-5 h-4">
                        <Image 
                          src={getFlagUrl(language.countryCode)}
                          alt={language.name}
                          fill
                          className="object-cover"
                        />
                      </div>
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
                <p>Support: +1 (555) 123-4567</p>
                <p>Hours: Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tecplore. Empowering education through innovation.
          </p>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-gray-800"
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