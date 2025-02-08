'use client';
{/* app/careers/components/FilterComponents.tsx */}

import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FilterX } from 'lucide-react';
import { FilterSelectProps, FilterBarProps } from './types';

export const FilterSelect: React.FC<FilterSelectProps> = ({
  title,
  options,
  selectedValues,
  onFilterChange,
}) => {
  if (!options || options.length === 0) return null;

  const handleValueChange = (value: string) => {
    onFilterChange(title, [value]);
  };

  return (
    <Select 
      defaultValue={selectedValues[0]}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px] bg-white/5 border-black/20 text-black">
        <SelectValue placeholder={title} />
        {selectedValues.length > 0 && (
          <span className="ml-2 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full text-xs">
            {selectedValues.length}
          </span>
        )}
      </SelectTrigger>
      <SelectContent className="bg-white border-black/20">
        <SelectGroup>
          <SelectLabel className="text-black">{title}</SelectLabel>
          {options.map((option) => (
            <SelectItem 
              key={option.label} 
              value={option.label}
              className="text-black hover:bg-black/10 flex justify-between"
            >
              <span>{option.label}</span>
              <span className="text-black ml-2">({option.count})</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const FilterBar: React.FC<FilterBarProps> = ({
  filterOptions,
  selectedFilters,
  handleFilterChange,
  clearFilters,
  searchQuery,
  setSearchQuery
}) => {
  const hasActiveFilters = 
    Object.values(selectedFilters).some(filters => filters.length > 0) ||
    (searchQuery && searchQuery.trim() !== '');

  const handleClearAll = () => {
    clearFilters();
    if (setSearchQuery) {
      setSearchQuery('');
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {Object.entries(filterOptions).map(([title, options]) => (
        <FilterSelect
          key={title}
          title={title}
          options={options}
          selectedValues={selectedFilters[title] || []}
          onFilterChange={handleFilterChange}
        />
      ))}
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          onClick={handleClearAll}
          className="text-gray-400 border-white/20 text-black hover:border-purple-500"
        >
          <FilterX className="w-4 h-4 mr-2" />
          Clear all
        </Button>
      )}
    </div>
  );
};