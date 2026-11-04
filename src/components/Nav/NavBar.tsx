"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DESIGN_CALL, NAV_LINKS, SOLUTION_LINKS } from "@/lib/site";

export default function NavBar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname === `${href}/`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-ink-foreground">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" aria-label="Tecplore home" className="flex-shrink-0">
          <Image
            src="/photos/Tecplore_logo_Brand.png"
            alt="Tecplore"
            width={110}
            height={45}
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-6 lg:flex xl:gap-8">
          <ul className="flex items-center gap-6 xl:gap-8">
            <li>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger
                  className={`inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-ink-foreground focus:outline-none ${
                    SOLUTION_LINKS.some((link) => isActive(link.href)) ? "text-ink-foreground" : "text-ink-muted"
                  }`}
                >
                  Solutions
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="z-50 min-w-44 rounded-card p-2">
                  {SOLUTION_LINKS.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link href={link.href} className="cursor-pointer rounded-card px-3 py-2 text-foreground">
                        {link.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`text-sm font-medium transition-colors hover:text-ink-foreground ${
                    isActive(link.href) ? "text-ink-foreground" : "text-ink-muted"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild size="sm">
            <Link href={DESIGN_CALL.href}>{DESIGN_CALL.shortLabel}</Link>
          </Button>
        </div>

        {/* Mobile and tablet */}
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-foreground transition-colors hover:bg-white/10 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" aria-describedby={undefined} className="flex flex-col pt-14">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <ul className="flex-1 space-y-1 overflow-y-auto">
              <li className="section-label px-3 pb-1 pt-2">Solutions</li>
              {SOLUTION_LINKS.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`block rounded-card px-3 py-3 text-base font-medium transition-colors hover:bg-accent ${
                        isActive(link.href) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                </li>
              ))}
              <li aria-hidden className="mx-3 my-2 border-t border-border" />
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`block rounded-card px-3 py-3 text-base font-medium transition-colors hover:bg-accent ${
                        isActive(link.href) ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
            <SheetClose asChild>
              <Button asChild className="w-full">
                <Link href={DESIGN_CALL.href}>{DESIGN_CALL.shortLabel}</Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
