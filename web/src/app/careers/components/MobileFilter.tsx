'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import { FilterOption } from './types';

interface MobileFilterMenuProps {
  filterOptions: Record<string, FilterOption[]>;
  selectedFilters: Record<string, string[]>;
  handleFilterChange: (category: string, value: string[]) => void;
  clearFilters: () => void;
}

const MobileFilterMenu: React.FC<MobileFilterMenuProps> = ({
  filterOptions,
  selectedFilters,
  handleFilterChange,
  clearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const activeFiltersCount = Object.values(selectedFilters)
    .reduce((sum, filters) => sum + filters.length, 0);

  const handleOptionSelect = (category: string, value: string) => {
    const currentValues = selectedFilters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    handleFilterChange(category, newValues);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="md:hidden flex items-center gap-2 bg-white border-gray-200 text-gray-900"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[80vh] bg-white border-t border-gray-200 text-gray-900"
      >
        <SheetHeader className="flex flex-row items-center justify-between mb-4">
          <SheetTitle className="text-gray-900">Filters</SheetTitle>
          <div className="flex gap-2">
            {activeFiltersCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={clearFilters}
                className="text-sm border-gray-200"
              >
                Clear all
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-gray-900"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <Button
          variant="ghost"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex justify-between items-center mb-4 text-gray-900"
        >
          <span>Show Filters</span>
          {showFilters ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>

        {showFilters && (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto">
            {Object.entries(filterOptions).map(([category, options]) => (
              <div key={category} className="border-b border-gray-200 pb-4">
                <h3 className="font-medium mb-2">{category}</h3>
                <div className="space-y-2">
                  {options.map((option) => {
                    const isSelected = selectedFilters[category]?.includes(option.label);
                    return (
                      <Button
                        key={option.label}
                        variant="ghost"
                        className={`w-full justify-between ${
                          isSelected ? 'bg-purple-50 text-purple-600' : 'text-gray-900'
                        } hover:bg-gray-100`}
                        onClick={() => handleOptionSelect(category, option.label)}
                      >
                        <span>{option.label}</span>
                        <span className="text-gray-500">({option.count})</span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <Button 
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setIsOpen(false)}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterMenu;