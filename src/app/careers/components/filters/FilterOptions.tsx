import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { FilterSelectProps } from '../../types';

const FilterOptions: React.FC<FilterSelectProps> = ({
  title,
  options,
  selectedValues,
  onFilterChange,
}) => {
  if (!options || options.length === 0) return null;

  const handleCheckboxChange = (checked: boolean, label: string) => {
    const newValues = checked 
      ? [...selectedValues, label]
      : selectedValues.filter(val => val !== label);
    onFilterChange(title, newValues);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-[180px] justify-between bg-white/5 border-black/20 text-black"
        >
          {title}
          {selectedValues.length > 0 && (
            <span className="ml-2 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full text-xs">
              {selectedValues.length}
            </span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white border-black/20">
        <div className="p-4">
          <div className="space-y-4">
            {options.map((option) => (
              <div key={option.label} className="flex items-center space-x-2">
                <Checkbox
                  id={`${title}-${option.label}`}
                  checked={selectedValues.includes(option.label)}
                  onCheckedChange={(checked) => 
                    handleCheckboxChange(checked as boolean, option.label)
                  }
                />
                <label
                  htmlFor={`${title}-${option.label}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex justify-between w-full"
                >
                  <span>{option.label}</span>
                  <span className="text-black/50">({option.count})</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterOptions;