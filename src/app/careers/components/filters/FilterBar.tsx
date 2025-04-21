import React from 'react';
import { FilterX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { FilterBarProps, FilterCategory } from '../../types';
import FilterOptions from './FilterOptions';

const FilterBar: React.FC<FilterBarProps> = ({
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
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center py-6">
      <div className="flex flex-wrap gap-4 items-center">
        {(Object.entries(filterOptions) as [FilterCategory, typeof filterOptions[FilterCategory]][]).map(([category, options]) => (
          <FilterOptions
            key={category}
            title={category}
            options={options}
            selectedValues={selectedFilters[category] || []}
            onFilterChange={handleFilterChange}
          />
        ))}
      </div>
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          onClick={handleClearAll}
          className="text-gray-400 border-black/20 text-black hover:border-purple-500"
        >
          <FilterX className="w-4 h-4 mr-2" />
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterBar;