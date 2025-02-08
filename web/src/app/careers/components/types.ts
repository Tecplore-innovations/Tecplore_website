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
  }
  
  export interface FilterOption {
    label: string;
    count: number;
  }
  
  export type SelectedFilters = {
    [key: string]: string[];
    Experience: string[];
    'Work site': string[];
    Profession: string[];
    Discipline: string[];
    'Role type': string[];
    'Employment type': string[];
  }
  
  export interface FilterSelectProps {
    title: string;
    options: FilterOption[];
    selectedValues: string[];
    onFilterChange: (category: string, value: string[]) => void;
  }