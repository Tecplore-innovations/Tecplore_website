"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Users, Clock, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import type { Exhibit } from '../types';

interface CatalogGridProps {
  exhibits: Exhibit[];
}

export function CatalogGrid({ exhibits }: CatalogGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [selectedGroupSize, setSelectedGroupSize] = useState<string>('');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(exhibits.map(exhibit => exhibit.category))];
  }, [exhibits]);

  const durations = ['15-30 min', '30-60 min', '60+ min'];
  const groupSizes = ['1-2', '3-5', '6+'];

  // Filter exhibits based on all criteria
  const filteredExhibits = useMemo(() => {
    return exhibits.filter(exhibit => {
      if (!exhibit) return false;
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = searchLower === '' || [
        exhibit.title,
        exhibit.description,
        exhibit.category
      ].some(field => field?.toLowerCase().includes(searchLower));
      const matchesCategory = !selectedCategory || exhibit.category === selectedCategory;
      const matchesDuration = !selectedDuration || exhibit.duration === selectedDuration;
      const matchesGroupSize = !selectedGroupSize || exhibit.groupSize === selectedGroupSize;
      return matchesSearch && matchesCategory && matchesDuration && matchesGroupSize;
    });
  }, [exhibits, searchQuery, selectedCategory, selectedDuration, selectedGroupSize]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedDuration('');
    setSelectedGroupSize('');
  };

  const activeFiltersCount = [
    searchQuery,
    selectedCategory,
    selectedDuration,
    selectedGroupSize
  ].filter(Boolean).length;

  // Render filter section (shared between sidebar and sheet)
  const FilterSection = ({ className = '' }: { className?: string }) => (
    <div className={`space-y-6 ${className}`}>
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm text-gray-600">Active Filters</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700"
              onClick={resetFilters}
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-2">
                {searchQuery}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-2">
                {selectedCategory}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('')} />
              </Badge>
            )}
            {selectedDuration && (
              <Badge variant="secondary" className="flex items-center gap-2">
                {selectedDuration}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedDuration('')} />
              </Badge>
            )}
            {selectedGroupSize && (
              <Badge variant="secondary" className="flex items-center gap-2">
                {selectedGroupSize} students
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedGroupSize('')} />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Categories</h3>
        <div className="flex flex-col gap-2">
          <Button
            variant={selectedCategory === '' ? "default" : "outline"}
            onClick={() => setSelectedCategory('')}
            className="justify-start h-10"
          >
            All Categories
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(selectedCategory === category ? '' : category)}
              className="justify-start h-10"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Duration</h3>
        <div className="flex flex-col gap-2">
          <Button
            variant={selectedDuration === '' ? "default" : "outline"}
            onClick={() => setSelectedDuration('')}
            className="justify-start h-10"
          >
            Any Duration
          </Button>
          {durations.map(duration => (
            <Button
              key={duration}
              variant={selectedDuration === duration ? "default" : "outline"}
              onClick={() => setSelectedDuration(selectedDuration === duration ? '' : duration)}
              className="justify-start h-10"
            >
              {duration}
            </Button>
          ))}
        </div>
      </div>

      {/* Group Size */}
      <div className="space-y-4">
        <h3 className="font-medium text-lg">Group Size</h3>
        <div className="flex flex-col gap-2">
          <Button
            variant={selectedGroupSize === '' ? "default" : "outline"}
            onClick={() => setSelectedGroupSize('')}
            className="justify-start h-10"
          >
            Any Size
          </Button>
          {groupSizes.map(size => (
            <Button
              key={size}
              variant={selectedGroupSize === size ? "default" : "outline"}
              onClick={() => setSelectedGroupSize(selectedGroupSize === size ? '' : size)}
              className="justify-start h-10"
            >
              {size} students
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      {/* Desktop Layout */}
      <div className="flex gap-8">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-4">
            <FilterSection />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search Bar and Mobile Filter Button */}
          <div className="sticky top-0 z-20 bg-gray-50 pt-4 pb-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search exhibits..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Mobile Filter Button - Hidden on desktop */}
              <div className="lg:hidden">
                <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="relative">
                      <Filter className="h-4 w-4" />
                      {activeFiltersCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                          {activeFiltersCount}
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[540px] p-0">
                    <div className="h-full flex flex-col">
                      <SheetHeader className="border-b p-6 pb-4">
                        <div className="flex justify-between items-center">
                          <SheetTitle>Filter Exhibits</SheetTitle>
                          <SheetClose asChild>
                            <Button variant="ghost" size="icon">
                              <X className="h-5 w-5" />
                            </Button>
                          </SheetClose>
                        </div>
                      </SheetHeader>
                      
                      <div className="flex-1 overflow-y-auto p-6">
                        <FilterSection />
                      </div>

                      <div className="border-t p-6 pt-4">
                        <SheetClose asChild>
                          <Button className="w-full">
                            Apply Filters
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Exhibits Grid */}
          <div className="space-y-6 mt-4">
            <p className="text-sm text-gray-600">
              {filteredExhibits.length} exhibit{filteredExhibits.length !== 1 ? 's' : ''} found
            </p>

            <AnimatePresence mode="wait">
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4"
                layout
              >
                {filteredExhibits.map((exhibit) => (
                  <motion.div
                    key={exhibit.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      href={`/catalog/${exhibit.id}`}
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 block"
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={exhibit.image}
                          alt={exhibit.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transform transition-transform group-hover:scale-105"
                        />
                        <Badge className="absolute top-4 right-4 bg-cyan-100 text-cyan-800 hover:bg-cyan-100">
                          Interactive
                        </Badge>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                            {exhibit.title}
                          </h2>
                          <div className="flex items-center text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{exhibit.category}</span>
                          </div>
                        </div>
                        
                        <div className="border-t border-gray-100 pt-3">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="text-xs text-gray-600">Group</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1 text-gray-400" />
                              <span className="text-xs text-gray-600">Time</span>
                            </div>
                            <div>
                              <Badge variant="outline" className="w-full justify-center text-xs">
                                {exhibit.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredExhibits.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-2xl shadow-lg"
              >
                <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No exhibits found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={resetFilters}>
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogGrid;