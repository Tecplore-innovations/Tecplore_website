"use client";

{/* app/catalog/components/catalog-grid.tsx */}

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { motion, AnimatePresence } from "framer-motion";
import type { CatalogGridProps, FilterSections, FilterSectionProps } from '../types';

export function CatalogGrid({ exhibits }: CatalogGridProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [openSections, setOpenSections] = useState<FilterSections>({
    categories: true,
    price: true,
    availability: true,
    location: true
  });

  // Get unique categories
  const categories = useMemo<string[]>(() => {
    return [...new Set(exhibits.map(exhibit => exhibit.category))];
  }, [exhibits]);

  // Filter exhibits with proper type checking
  const filteredExhibits = useMemo(() => {
    return exhibits.filter(exhibit => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = searchLower === '' || [
        exhibit.title,
        exhibit.description,
        exhibit.category
      ].some(field => field?.toLowerCase().includes(searchLower));
      const matchesCategory = !selectedCategory || exhibit.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [exhibits, searchQuery, selectedCategory]);

  // Filter Section Component with proper typing
  const FilterSection: React.FC<FilterSectionProps> = ({ title, children, sectionKey }) => (
    <Collapsible
      open={openSections[sectionKey]}
      onOpenChange={(isOpen: boolean) => 
        setOpenSections(prev => ({ ...prev, [sectionKey]: isOpen }))
      }
      className="border-b border-gray-200 py-4"
    >
      <div className="px-4">
        <CollapsibleTrigger className="flex w-full items-center justify-between text-base">
          <span className="font-medium text-gray-900">{title}</span>
          <ChevronDown 
            className={`h-4 w-4 text-gray-500 transition-transform ${
              openSections[sectionKey] ? 'transform rotate-180' : ''
            }`}
          />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="pt-4">
        <div className="px-4 space-y-2">
          {children}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );

  // Filter Content Component
  const FilterContent: React.FC = () => (
    <div className="py-2">
      <FilterSection title="Categories" sectionKey="categories">
        {categories.map(category => (
          <label
            key={category}
            className="flex items-center space-x-2 text-sm cursor-pointer py-1"
          >
            <input
              type="checkbox"
              checked={selectedCategory === category}
              onChange={() => setSelectedCategory(
                selectedCategory === category ? '' : category
              )}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{category}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">Free</span>
          </label>
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">Paid</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Availability" sectionKey="availability">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">Pre-order</span>
          </label>
        </div>
      </FilterSection>

      <FilterSection title="Location" sectionKey="location">
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">North America</span>
          </label>
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">Europe</span>
          </label>
          <label className="flex items-center space-x-2 text-sm cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-gray-700">Asia</span>
          </label>
        </div>
      </FilterSection>
    </div>
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block w-72 border-r border-gray-200 flex-shrink-0">
        <div className="sticky top-0 overflow-y-auto h-screen">
          <div className="px-4 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="p-4">
            <div className="flex gap-2">
              {/* Mobile Filter Button */}
              <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="md:hidden"
                  >
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 sm:w-96 p-0">
                  <SheetHeader className="px-4 py-4 border-b border-gray-200">
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterContent />
                </SheetContent>
              </Sheet>

              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search exhibits..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 h-10 bg-gray-50 border-gray-200"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
              <Button 
                variant="outline"
                className="px-6 h-10 border-gray-200 text-gray-700 hover:bg-gray-50 hidden sm:inline-flex"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              layout
            >
              {filteredExhibits.map((exhibit) => (
                <motion.div
                  key={exhibit.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Link
                    href={`/catalog/${exhibit.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={exhibit.image}
                        alt={exhibit.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="mt-3">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {exhibit.title}
                      </h3>
                      <p className="text-sm text-gray-900 mt-1">
                        {exhibit.category}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredExhibits.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No exhibits found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogGrid;