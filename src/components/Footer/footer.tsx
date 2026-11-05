// src/components/Footer/footer.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
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
import { Instagram, Linkedin, Youtube, ExternalLink } from "lucide-react";
import { SOLUTION_LINKS } from "@/lib/site";

const FISHLIFE_DESCRIPTION =
  "FishLife is an interactive educational experience that brings the underwater world to life. Explore diverse aquatic ecosystems, discover fascinating fish species, and learn about marine biology through engaging, immersive content designed for all ages.";

const STUDIO_DESCRIPTION =
  "Tecplore Studio is an online platform where educators and students can access curated digital content, create interactive lessons, and collaborate on science-based projects. It extends the Tecplore experience beyond the classroom with tools built for modern STEM education.";

const headingClass = "font-semibold text-base uppercase tracking-wide text-ink-foreground mb-4";
const linkClass = "text-ink-muted text-sm hover:text-ink-foreground transition-colors duration-200 inline-flex items-center gap-1 text-left";

const Footer = () => {
  const [fishlifeOpen, setFishlifeOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);

  const whatWeDoLinks = [
    ...SOLUTION_LINKS,
    { name: "Learning Stations", href: "/learning-stations" },
    { name: "Maker Spaces", href: "/maker-space" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Join Our Team", href: "/careers" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-ink text-ink-foreground">
      {/* FishLife Dialog */}
      <Dialog open={fishlifeOpen} onOpenChange={setFishlifeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>FishLife</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground pt-1">
              An interactive experience by Tecplore
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-body leading-relaxed">
            {FISHLIFE_DESCRIPTION}
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setFishlifeOpen(false)}>
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
            <DialogDescription className="text-sm text-muted-foreground pt-1">
              A separate platform by Tecplore
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-body leading-relaxed">
            {STUDIO_DESCRIPTION}
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setStudioOpen(false)}>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">

            {/* Tecplore logo + socials */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1 order-last lg:order-first space-y-6 text-center sm:text-left">
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
                  className="text-ink-muted hover:text-brand-sky transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/tecplore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-brand-sky transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://www.youtube.com/@Tecplore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-brand-sky transition-colors duration-200"
                  aria-label="Youtube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* What We Do */}
            <div>
              <h4 className={headingClass}>What We Do</h4>
              <ul className="space-y-3">
                {whatWeDoLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Tools */}
            <div>
              <h4 className={headingClass}>Learning Tools</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/teacher-resources" className={linkClass}>
                    Teacher Resources
                  </Link>
                </li>
                <li>
                  {/* Real links, so search engines can follow them. Visitors still get the popup. */}
                  <a
                    href="https://studio.tecplore.com/"
                    onClick={(e) => { e.preventDefault(); setStudioOpen(true); }}
                    className={linkClass}
                  >
                    Tecplore Studio
                  </a>
                </li>
                <li>
                  <a
                    href="https://fishlife.tecplore.com/"
                    onClick={(e) => { e.preventDefault(); setFishlifeOpen(true); }}
                    className={linkClass}
                  >
                    FishLife Digital Aquarium
                    <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full ml-1">New</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className={headingClass}>Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className={linkClass}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-ink-muted text-xs order-2 sm:order-1 text-center">
              © {new Date().getFullYear()} Tecplore. All rights reserved.
              <span className="mx-2">|</span>
              <Link href="/privacy-policy" className="text-ink-muted hover:text-ink-foreground">Privacy Policy</Link>
              <span className="mx-1">•</span>
              <Link href="/terms-conditions" className="text-ink-muted hover:text-ink-foreground">Terms of Use</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
