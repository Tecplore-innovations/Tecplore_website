import { Position, FilterOption, FilterCategory, FilterCategoryKey } from '../types';
import { FILTER_CATEGORIES } from '../constants';

// Date and formatting utilities
/**
 * Formats salary string to a consistent format
 */
export const formatSalary = (salary: string): string => {
  if (!salary) return '';
  
  // Handle ranges (e.g., "10L - 15L" or "10K - 15K")
  if (salary.includes('-')) {
    const [min, max] = salary.split('-').map(s => s.trim());
    return `${formatSalaryValue(min)} - ${formatSalaryValue(max)}`;
  }
  
  return formatSalaryValue(salary);
};

/**
 * Helper function to format individual salary values
 */
const formatSalaryValue = (value: string): string => {
  return value.replace(/(\d)([LK])/g, '$1 $2');
};

/**
 * Formats date to relative time (e.g., "2 days ago")
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  }

  return date.toLocaleDateString('en-US', { 
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Converts experience years to a human-readable range
 */
export const getExperienceRange = (years: number): string => {
  if (years <= 2) return '0-2 years';
  if (years <= 4) return '2-4 years';
  if (years <= 6) return '4-6 years';
  return '6+ years';
};

// Filter-related utilities
/**
 * Checks if a position matches given filter criteria
 */
const matchesFilters = (
  position: Position,
  category: FilterCategory,
  values: string[]
): boolean => {
  if (!values || values.length === 0) return true;
  
  switch (category) {
    case FILTER_CATEGORIES.EXPERIENCE: {
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
    case FILTER_CATEGORIES.WORK_SITE:
      return values.some(site => 
        position.workSite.toLowerCase() === site.toLowerCase()
      );
    case FILTER_CATEGORIES.PROFESSION:
      return values.includes(position.department);
    case FILTER_CATEGORIES.DISCIPLINE:
      return values.includes(position.discipline);
    case FILTER_CATEGORIES.ROLE_TYPE:
      return values.includes(position.roleType);
    case FILTER_CATEGORIES.EMPLOYMENT_TYPE:
      return values.includes(position.employmentType);
    default:
      return true;
  }
};

/**
 * Gets the value for a specific filter category from a position
 */
const getPositionValue = (position: Position, category: FilterCategory): string => {
  switch (category) {
    case FILTER_CATEGORIES.EXPERIENCE:
      return getExperienceRange(position.experienceRequired);
    case FILTER_CATEGORIES.WORK_SITE:
      return position.workSite;
    case FILTER_CATEGORIES.PROFESSION:
      return position.department;
    case FILTER_CATEGORIES.DISCIPLINE:
      return position.discipline;
    case FILTER_CATEGORIES.ROLE_TYPE:
      return position.roleType;
    case FILTER_CATEGORIES.EMPLOYMENT_TYPE:
      return position.employmentType;
    default:
      return '';
  }
};

/**
 * Filters positions based on search query and selected filters
 */
export const filterPositions = (
  positions: Position[],
  searchQuery: string,
  selectedFilters: Record<FilterCategory, string[]>
): Position[] => {
  return positions.filter(position => {
    // Search filter
    const matchesSearch = !searchQuery.trim() || [
      position.title,
      position.department,
      position.description,
      ...position.tags
    ].some(text => 
      text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!matchesSearch) return false;

    // Category filters - position must match ALL categories
    const matchesAllCategories = Object.entries(selectedFilters)
      .every(([category, values]) => 
        matchesFilters(position, category as FilterCategory, values)
      );

    return matchesAllCategories;
  });
};

/**
 * Generates filter options with counts based on current filtered positions
 */
export const generateFilterOptions = (
  allPositions: Position[],
  filteredPositions: Position[],
  currentFilters: Record<FilterCategory, string[]>,
  excludeCategory?: FilterCategory
): Record<FilterCategory, FilterOption[]> => {
  const filterOptions: Record<FilterCategory, FilterOption[]> = {} as Record<FilterCategory, FilterOption[]>;

  (Object.keys(FILTER_CATEGORIES) as FilterCategoryKey[]).forEach(categoryKey => {
    const category = FILTER_CATEGORIES[categoryKey];
    if (category === excludeCategory) return;

    const allValues = new Set<string>();
    allPositions.forEach(position => {
      const value = getPositionValue(position, category);
      if (value) allValues.add(value);
    });

    const options: FilterOption[] = Array.from(allValues).map(value => {
      const tempFilters = { ...currentFilters };
      delete tempFilters[category];

      const count = filteredPositions.filter(position => {
        const positionValue = getPositionValue(position, category);
        const matchesValue = positionValue === value;
        const matchesOtherFilters = Object.entries(tempFilters)
          .every(([filterCat, values]) => 
            matchesFilters(position, filterCat as FilterCategory, values)
          );

        return matchesValue && matchesOtherFilters;
      }).length;

      return {
        label: value,
        count,
        checked: currentFilters[category]?.includes(value) || false
      };
    });

    filterOptions[category] = options.sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.label.localeCompare(b.label);
    });
  });

  return filterOptions;
};