"use client";

{/* app/catalog/components/catalog-grid.tsx */}

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, ChevronDown, Menu } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import type { CatalogGridProps, FilterSections, FilterSectionProps } from '../types';

export function CatalogGrid({ exhibits }: CatalogGridProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
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

  // Define price ranges with proper typing
  const priceRanges: Array<{ id: string; label: string }> = [
    { id: 'free', label: 'Free' },
    { id: 'paid', label: 'Paid' },
    { id: 'premium', label: 'Premium' }
  ];

  // Define availability options
  const availabilityOptions = [
    { id: 'in-stock', label: 'In Stock' },
    { id: 'pre-order', label: 'Pre-order' },
    { id: 'coming-soon', label: 'Coming Soon' }
  ];

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
      
      // Handle potentially undefined price with optional chaining and fallbacks
      const matchesPriceRange = !selectedPriceRange || (
        (selectedPriceRange === 'free' && (exhibit.price === 0 || exhibit.price === undefined)) ||
        (selectedPriceRange === 'paid' && exhibit.price !== undefined && exhibit.price > 0) ||
        (selectedPriceRange === 'premium' && exhibit.price !== undefined && exhibit.price > 100)
      );
      
      // Handle potentially undefined availability
      const matchesAvailability = !selectedAvailability || 
        exhibit.availability === selectedAvailability;
      
      return matchesSearch && matchesCategory && matchesPriceRange && matchesAvailability;
    });
  }, [exhibits, searchQuery, selectedCategory, selectedPriceRange, selectedAvailability]);

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
          {priceRanges.map(price => (
            <label
              key={price.id}
              className="flex items-center space-x-2 text-sm cursor-pointer"
            >
              <input 
                type="checkbox" 
                checked={selectedPriceRange === price.id}
                onChange={() => setSelectedPriceRange(
                  selectedPriceRange === price.id ? '' : price.id
                )}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{price.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Availability" sectionKey="availability">
        <div className="space-y-2">
          {availabilityOptions.map(option => (
            <label
              key={option.id}
              className="flex items-center space-x-2 text-sm cursor-pointer"
            >
              <input 
                type="checkbox" 
                checked={selectedAvailability === option.id}
                onChange={() => setSelectedAvailability(
                  selectedAvailability === option.id ? '' : option.id
                )}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
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
  
  // Handling clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedPriceRange('');
    setSelectedAvailability('');
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header with TECPLORE branding */}
      <div className="w-full text-center py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">BROWSE PROJECTS</h1>
        <p className="max-w-md mx-auto text-center mb-6">
          We create a unique, custom projects and experiences for next
          <br />generation kids to learn STEM concepts in ease.
        </p>
        
        {/* Search Bar - Centered */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative flex items-center border border-gray-300 rounded-md">
            <Search className="ml-3 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search Products ..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border-0 pl-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Button - Only visible on small screens */}
      <div className="md:hidden border-t border-gray-200 py-3 px-4 sticky top-0 bg-white z-10">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-between"
          onClick={() => setIsMobileFilterOpen(true)}
        >
          <span>Filters {selectedCategory || selectedPriceRange || selectedAvailability ? '(Active)' : ''}</span>
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Mobile Filter Sheet */}
      <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
          <SheetHeader className="px-4 py-4 border-b">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto">
            <FilterContent />
          </div>
          <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={() => {
                clearFilters();
                setIsMobileFilterOpen(false);
              }}
            >
              Clear All
            </Button>
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      
      {/* Filter Dropdowns using ShadUI DropdownMenu - Hidden on mobile */}
      <div className="border-t border-b border-gray-200 py-3 px-4 hidden md:block">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 overflow-x-auto">
            {/* Category Dropdown - Using ShadUI */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 py-1 px-3 font-normal text-sm"
                >
                  Category {selectedCategory ? `(${selectedCategory})` : ""} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {categories.map(category => (
                  <DropdownMenuCheckboxItem
                    key={category}
                    checked={selectedCategory === category}
                    onCheckedChange={() => setSelectedCategory(
                      selectedCategory === category ? '' : category
                    )}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
                {categories.length === 0 && (
                  <DropdownMenuItem disabled>No categories available</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Price Range Dropdown - Using ShadUI */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 py-1 px-3 font-normal text-sm"
                >
                  Price Range {selectedPriceRange ? `(${priceRanges.find(p => p.id === selectedPriceRange)?.label})` : ""} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {priceRanges.map(price => (
                  <DropdownMenuCheckboxItem
                    key={price.id}
                    checked={selectedPriceRange === price.id}
                    onCheckedChange={() => setSelectedPriceRange(
                      selectedPriceRange === price.id ? '' : price.id
                    )}
                  >
                    {price.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Availability Dropdown - Using ShadUI */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-2 py-1 px-3 font-normal text-sm"
                >
                  Availability {selectedAvailability ? `(${availabilityOptions.find(a => a.id === selectedAvailability)?.label})` : ""} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {availabilityOptions.map(option => (
                  <DropdownMenuCheckboxItem
                    key={option.id}
                    checked={selectedAvailability === option.id}
                    onCheckedChange={() => setSelectedAvailability(
                      selectedAvailability === option.id ? '' : option.id
                    )}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Clear Filters Button */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full px-2 sm:px-4 mt-6">
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
                className="h-full"
              >
                <Link
                  href={`/catalog/${exhibit.id}`}
                  className="block h-full"
                >
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden w-full">
                    <Image
                      src={exhibit.image}
                      alt={exhibit.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium text-gray-900 border-b border-gray-200 pb-1">
                      {exhibit.title}
                    </h3>
                    <p className="text-sm text-gray-500 border-b border-gray-200 pb-1 pt-1">
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
  );
}

export default CatalogGrid;