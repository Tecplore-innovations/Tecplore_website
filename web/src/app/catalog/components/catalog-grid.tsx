'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Exhibit } from '../page';

interface CatalogGridProps {
  exhibits: Exhibit[];
}

export function CatalogGrid({ exhibits }: CatalogGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = [...new Set(exhibits.map(exhibit => exhibit.category))];

  const filteredExhibits = exhibits.filter(exhibit => {
    const matchesSearch = exhibit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exhibit.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || exhibit.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === '' ? "default" : "outline"}
            onClick={() => setSelectedCategory('')}
            className="h-9"
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
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
            className="group hover:no-underline bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="relative aspect-video">
              <Image
                src={exhibit.image}
                alt={exhibit.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <Badge className="mb-2">{exhibit.category}</Badge>
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{exhibit.title}</h2>
              <p className="text-gray-600 line-clamp-3">{exhibit.description}</p>
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