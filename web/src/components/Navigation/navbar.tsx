"use client";

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">Tecplore</Link>
        </div>
        
        <NavigationMenu>
          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-gray-300 bg-transparent">
                Highlights
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/catalog" className="block p-3 hover:bg-gray-100 rounded-md">
                        Browse All
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-gray-300 bg-transparent">
                Process
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/process" className="block p-3 hover:bg-gray-100 rounded-md">
                        How We Work
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/process/timeline" className="block p-3 hover:bg-gray-100 rounded-md">
                        Project Timeline
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-white hover:text-gray-300 bg-transparent">
                Projects
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/science-centers" className="block p-3 hover:bg-gray-100 rounded-md">
                        Science Centers
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/museums-parks" className="block p-3 hover:bg-gray-100 rounded-md">
                      Children&apos;s Museums & Parks
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/planetariums" className="block p-3 hover:bg-gray-100 rounded-md">
                        Museums & Planetariums
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/brand-experiences" className="block p-3 hover:bg-gray-100 rounded-md">
                        Brand Experiences
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/art" className="block p-3 hover:bg-gray-100 rounded-md">
                        Art
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/product-development" className="block p-3 hover:bg-gray-100 rounded-md">
                        Product Development
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/contact" className="text-white hover:text-gray-300 px-4 py-2">
                  Contact
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}

export default Navigation