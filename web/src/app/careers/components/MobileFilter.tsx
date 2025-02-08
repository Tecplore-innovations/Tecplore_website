import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, Check } from 'lucide-react';
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
  
  // Count total active filters
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
          className="md:hidden flex items-center gap-2 bg-white/5 border-white/20 text-white"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full text-xs">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="bottom" 
        className="h-[80vh] bg-gray-900 border-t border-white/20 text-white"
      >
        <SheetHeader className="flex flex-row items-center justify-between mb-4">
          <SheetTitle className="text-white">Filters</SheetTitle>
          <div className="flex gap-2">
            {activeFiltersCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  clearFilters();
                  setIsOpen(false);
                }}
                className="text-sm border-white/20"
              >
                Clear all
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </SheetHeader>

        <Accordion type="single" collapsible className="w-full">
          {Object.entries(filterOptions).map(([category, options]) => (
            <AccordionItem key={category} value={category} className="border-white/20">
              <AccordionTrigger className="text-white hover:text-white/90">
                {category}
                {selectedFilters[category]?.length > 0 && (
                  <span className="ml-2 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full text-xs">
                    {selectedFilters[category].length}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 py-2">
                  {options.map((option) => {
                    const isSelected = selectedFilters[category]?.includes(option.label);
                    return (
                      <Button
                        key={option.label}
                        variant="ghost"
                        className={`justify-between h-auto py-2 px-4 ${
                          isSelected ? 'bg-white/10' : ''
                        }`}
                        onClick={() => handleOptionSelect(category, option.label)}
                      >
                        <span className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border ${
                            isSelected ? 'bg-purple-500 border-purple-500' : 'border-white/20'
                          } flex items-center justify-center`}>
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                          {option.label}
                        </span>
                        <span className="text-gray-400">({option.count})</span>
                      </Button>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-white/20">
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            onClick={() => setIsOpen(false)}
          >
            Show Results
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterMenu;