// types/index.ts

export const FILTER_CATEGORIES = {
  EXPERIENCE: 'Experience',
  WORK_SITE: 'Work Site',
  PROFESSION: 'Profession',
  DISCIPLINE: 'Discipline',
  ROLE_TYPE: 'Role Type',
  EMPLOYMENT_TYPE: 'Employment Type'
} as const;

export type FilterCategory = typeof FILTER_CATEGORIES[keyof typeof FILTER_CATEGORIES];
export type FilterCategoryKey = keyof typeof FILTER_CATEGORIES;

export interface Position {
  id: number;
  title: string;
  companyName?: string; // Made optional since it's not in your sample data
  companyLogo?: string;
  department: string;
  employmentType: string;
  salary: string;
  experienceRequired: number;
  location: string;
  workSite: string;
  datePosted: string;
  isNew?: boolean;
  discipline: string;
  roleType: string;
  jobNumber: string;
  tags: string[];
  description: string;
  type?: string; // Add optional type property
}

export interface FilterOption {
  label: string;
  count: number;
  checked?: boolean;
}

export interface FilterSelectProps {
  title: FilterCategory;
  options: FilterOption[];
  selectedValues: string[];
  onFilterChange: (category: FilterCategory, value: string[]) => void;
}

export interface FilterBarProps {
  filterOptions: Record<FilterCategory, FilterOption[]>;
  selectedFilters: Record<FilterCategory, string[]>;
  handleFilterChange: (category: FilterCategory, value: string[]) => void;
  clearFilters: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export interface HeroProps {
  title: string;
  subtitle?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit?: (e: React.FormEvent) => void;
}

export interface JobCardProps {
  position: Position;
  onApply: (position: Position) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ShareMenuProps {
  position: Position;
  onClose: () => void;
}

export interface JobApplicationProps {
  position: Position;
  onBack?: () => void;
}