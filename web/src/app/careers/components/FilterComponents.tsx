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
import { FilterSelectProps, FilterOption } from './types';

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
      onValueChange={(value) => handleValueChange(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={title} />
        {selectedValues.length > 0 && (
          <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
            {selectedValues.length}
          </span>
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options.map((option: FilterOption) => (
            <SelectItem 
              key={option.label} 
              value={option.label}
              className="flex justify-between"
            >
              <span>{option.label}</span>
              <span className="text-gray-500 ml-2">({option.count})</span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

interface FilterBarProps {
  filterOptions: Record<string, FilterOption[]>;
  selectedFilters: Record<string, string[]>;
  handleFilterChange: (category: string, value: string[]) => void;
  clearFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filterOptions,
  selectedFilters,
  handleFilterChange,
  clearFilters,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 shadow-lg">
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
          Find jobs
        </Button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(filterOptions).map(([title, options]) => (
          <FilterSelect
            key={title}
            title={title}
            options={options}
            selectedValues={selectedFilters[title] || []}
            onFilterChange={handleFilterChange}
          />
        ))}
        {Object.values(selectedFilters).some(filters => filters.length > 0) && (
          <Button 
            variant="outline" 
            onClick={clearFilters}
            className="text-gray-600"
          >
            <FilterX className="w-4 h-4 mr-2" />
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};