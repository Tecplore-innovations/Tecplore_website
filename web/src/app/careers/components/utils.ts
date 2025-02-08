{/* app/careers/components/util.ts */}

import { Position, FilterOption } from './types';

export const getExperienceRange = (years: number): string => {
  if (years <= 2) return '0-2 years';
  if (years <= 4) return '2-4 years';
  if (years <= 6) return '4-6 years';
  return '6+ years';
};

// Helper to check if a position matches all selected filters in a category
const matchesFilters = (position: Position, category: string, values: string[]): boolean => {
  if (values.length === 0) return true;
  
  switch (category) {
    case 'Experience': {
      const years = position.experienceRequired;
      return values.some(range => {
        if (range.includes('+')) {
          const minYears = parseInt(range.replace(/\D/g, ''));
          return years >= minYears;
        }
        const [min, max] = range.split('-').map(n => parseInt(n));
        return years >= min && years <= max;
      });
    }
    case 'Work site':
      return values.some(site => 
        position.workSite.toLowerCase().includes(site.toLowerCase())
      );
    case 'Profession':
      return values.includes(position.department);
    case 'Discipline':
      return values.includes(position.discipline);
    case 'Role type':
      return values.includes(position.roleType);
    case 'Employment type':
      return values.includes(position.employmentType);
    default:
      return true;
  }
};

// Filter positions based on all selected filters
export const filterPositions = (
  positions: Position[],
  searchQuery: string,
  selectedFilters: Record<string, string[]>
): Position[] => {
  let filtered = positions;

  // Apply search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(position =>
      position.title.toLowerCase().includes(query) ||
      position.department.toLowerCase().includes(query) ||
      position.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply each filter category
  Object.entries(selectedFilters).forEach(([category, values]) => {
    if (values.length > 0) {
      filtered = filtered.filter(position => matchesFilters(position, category, values));
    }
  });

  return filtered;
};

// Generate filter options with counts based on currently filtered positions
export const generateFilterOptions = (
  allPositions: Position[],
  filteredPositions: Position[],
  currentFilters: Record<string, string[]>,
  excludeCategory?: string
): Record<string, FilterOption[]> => {
  const filterOptions: Record<string, Map<string, number>> = {
    Experience: new Map(),
    'Work site': new Map(),
    Profession: new Map(),
    Discipline: new Map(),
    'Role type': new Map(),
    'Employment type': new Map()
  };

  // For each position that passes current filters
  filteredPositions.forEach(position => {
    // For each filter category
    Object.keys(filterOptions).forEach(category => {
      if (category === excludeCategory) return;

      // Get the value for this category from the position
      let value: string;
      switch (category) {
        case 'Experience':
          value = getExperienceRange(position.experienceRequired);
          break;
        case 'Work site':
          value = position.workSite;
          break;
        case 'Profession':
          value = position.department;
          break;
        case 'Discipline':
          value = position.discipline;
          break;
        case 'Role type':
          value = position.roleType;
          break;
        case 'Employment type':
          value = position.employmentType;
          break;
        default:
          return;
      }

      // Create a temporary set of filters excluding the current category
      const tempFilters = { ...currentFilters };
      delete tempFilters[category];

      // Check if this position would match all other current filters
      const matchesOtherFilters = Object.entries(tempFilters)
        .every(([filterCat, values]) => matchesFilters(position, filterCat, values));

      if (matchesOtherFilters) {
        filterOptions[category].set(
          value,
          (filterOptions[category].get(value) || 0) + 1
        );
      }
    });
  });

  // Convert Maps to arrays and sort
  return Object.fromEntries(
    Object.entries(filterOptions).map(([category, countMap]) => [
      category,
      Array.from(countMap.entries())
        .map(([label, count]) => ({ label, count }))
        .sort((a, b) => b.count - a.count)
    ])
  );
};