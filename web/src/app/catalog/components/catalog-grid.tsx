'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Exhibit } from '../types';

interface CatalogGridProps {
  exhibits: Exhibit[];
}

export function CatalogGrid({ exhibits }: CatalogGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Get unique categories
  const categories = useMemo(() => {
    return [...new Set(exhibits.map(exhibit => exhibit.category))];
  }, [exhibits]);

  // Filter exhibits based on search query and selected category
  const filteredExhibits = useMemo(() => {
    return exhibits.filter(exhibit => {
      // Check if exhibit and its properties exist
      if (!exhibit) return false;

      const searchLower = searchQuery.toLowerCase().trim();
      
      // Search in title, description, and category
      const matchesSearch = searchLower === '' || [
        exhibit.title,
        exhibit.description,
        exhibit.category
      ].some(field => 
        field?.toLowerCase().includes(searchLower)
      );

      // Category filter
      const matchesCategory = !selectedCategory || exhibit.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [exhibits, searchQuery, selectedCategory]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our collection of interactive science exhibits designed for hands-on learning
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search exhibits..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === '' ? "default" : "outline"}
            onClick={() => handleCategoryChange('')}
            className="h-9"
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => handleCategoryChange(category)}
              className="h-9"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExhibits.map((exhibit) => (
          <Link
            href={`/catalog/${exhibit.id}`}
            key={exhibit.id}
            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={exhibit.image}
                alt={exhibit.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-cyan-100 text-cyan-800 hover:bg-cyan-100">
                Interactive
              </Badge>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">{exhibit.title}</h2>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{exhibit.category}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">Group Size</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm text-gray-600">Duration</span>
                  </div>
                  <div>
                    <Badge variant="outline" className="w-full justify-center">
                      {exhibit.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredExhibits.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900">No exhibits found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}