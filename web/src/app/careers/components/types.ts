export interface Position {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experienceRequired: number;
  salary: string;
  tags: string[];
  description: string;
  datePosted: string;
  workSite: string;
  discipline: string;
  roleType: string;
  employmentType: string;
  jobNumber: string;
  isNew?: boolean;
  companyLogo?: string;
  benefits?: string[];
  requirements?: string[];
}

export interface CompanyProfile {
  id: number;
  name: string;
  logo: string;
  industry: string;
  description: string;
  location: string;
  size: string;
  website: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface SearchFilters {
  location: string;
  keyword: string;
  worksite?: string[];
  department?: string[];
  experience?: string[];
  employmentType?: string[];
}

export interface FilterOption {
  label: string;
  count: number;
}

export interface FilterSelectProps {
  title: string;
  options: FilterOption[];
  selectedValues: string[];
  onFilterChange: (category: string, value: string[]) => void;
}

export interface FilterBarProps {
  filterOptions: Record<string, FilterOption[]>;
  selectedFilters: Record<string, string[]>;
  handleFilterChange: (category: string, value: string[]) => void;
  clearFilters: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}