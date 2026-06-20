// src/components/Footer/footer.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Home, Youtube, ExternalLink } from "lucide-react";

const FISHLIFE_DESCRIPTION =
  "FishLife is an interactive educational experience that brings the underwater world to life. Explore diverse aquatic ecosystems, discover fascinating fish species, and learn about marine biology through engaging, immersive content designed for all ages.";

const STUDIO_DESCRIPTION =
  "Tecplore Studio is an online platform where educators and students can access curated digital content, create interactive lessons, and collaborate on science-based projects. It extends the Tecplore experience beyond the classroom with tools built for modern STEM education.";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [fishlifeOpen, setFishlifeOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);

  const exhibitLinks = [
    { name: "Interactive Exhibits", href: "/interactive-exhibits" },
    { name: "Makerspace", href: "/maker-space" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Join Our Team", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-950 text-white">
      {/* FishLife Dialog */}
      <Dialog open={fishlifeOpen} onOpenChange={setFishlifeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>FishLife</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 pt-1">
              An interactive experience by Tecplore
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-gray-700 leading-relaxed">
            {FISHLIFE_DESCRIPTION}
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setFishlifeOpen(false)}>
              Cancel
            </Button>
            <Button asChild>
              <a
                href="https://fishlife.tecplore.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setFishlifeOpen(false)}
              >
                Open FishLife <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Tecplore Studio Dialog */}
      <Dialog open={studioOpen} onOpenChange={setStudioOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tecplore Studio</DialogTitle>
            <DialogDescription className="text-sm text-gray-500 pt-1">
              A separate platform by Tecplore
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-gray-700 leading-relaxed">
            {STUDIO_DESCRIPTION}
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setStudioOpen(false)}>
              Cancel
            </Button>
            <Button asChild>
              <a
                href="https://studio.tecplore.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setStudioOpen(false)}
              >
                Visit Tecplore Studio <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">

            {/* Tecplore logo + socials */}
            <div className="sm:col-span-2 lg:col-span-1 order-last lg:order-first space-y-6 text-center sm:text-left">
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
                  href="https://www.youtube.com/@Tecplore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="Youtube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Exhibits */}
            <div className="sm:col-span-1 lg:col-span-1 order-1 lg:order-2 space-y-4">
              <h4 className="font-semibold text-base uppercase tracking-wide text-white mb-4">
                Exhibits
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
                {exhibitLinks.map((link) => (
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

            {/* Interactives */}
            <div className="sm:col-span-1 lg:col-span-1 order-2 lg:order-3 space-y-4">
              <h4 className="font-semibold text-base uppercase tracking-wide text-white mb-4">
                Interactives
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setFishlifeOpen(true)}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200 inline-flex items-center gap-1 text-left"
                  >
                    FishLife
                    <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded ml-1">New</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Teacher Training */}
            <div className="sm:col-span-1 lg:col-span-1 order-3 lg:order-4 space-y-4">
              <h4 className="font-semibold text-base uppercase tracking-wide text-white mb-4">
                Teacher Training
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/teacher-resources"
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200 inline-block"
                  >
                    Teaching Resources
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setStudioOpen(true)}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200 inline-block text-left"
                  >
                    Tecplore Studio
                  </button>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="sm:col-span-1 lg:col-span-1 order-4 lg:order-5 space-y-4">
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
