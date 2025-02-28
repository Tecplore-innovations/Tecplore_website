// app/catalog/types.ts
import type { ReactNode } from 'react';
import type { Exhibit } from './base-types';

export type { Exhibit };

export type PageProps = {
  params: Awaited<{ id: string }>;
  searchParams?: Record<string, string | string[] | undefined>;
};


// Basic Feature Interface
export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

// Technical Specification Interface
export interface TechnicalSpec {
  label: string;
  value: string;
  icon?: string;
}

// Resource Download Interface
export interface Resource {
  title: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
}

// Media Item Interface (Supports Images and Videos)
export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt: string;
  duration?: string;
}

// Product Section Content Interface
export interface ProductSectionContent {
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  alignment: 'left' | 'right';
}

// Safety Guidelines Interface
export interface Safety {
  guidelines: string[];
  requirements: string[];
}

// Setup Guide Interface
export interface SetupGuide {
  steps: string[];
  timeRequired: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

// Social Media Links Interface
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  reddit?: string;
}

// Enhanced Exhibit with Comprehensive Product Details
export interface EnhancedExhibit extends Exhibit {
  // Ensure all properties from Exhibit are included
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;

  // Additional properties
  features?: Feature[];
  technicalSpecs?: TechnicalSpec[];
  resources?: Resource[];
  media?: MediaItem[];
  sections?: ProductSectionContent[];
  educationalBenefits?: string[];
  conceptualQuestions?: string[];
  headerTagline?: string;
  socialLinks?: SocialLinks;
  safety?: Safety;
  setupGuide?: SetupGuide;
  price?: number;
  availability?: string;
}

// Price Range Filter Option
export interface PriceRange {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

// Availability Filter Option
export interface AvailabilityOption {
  id: string;
  label: string;
}

// Catalog Grid Component Props
export interface CatalogGridProps {
  exhibits: EnhancedExhibit[];
  initialExhibits?: EnhancedExhibit[];
  onFilterApplied?: (filteredExhibits: EnhancedExhibit[]) => void;
}

// Filter Sections Configuration
export interface FilterSections {
  categories: boolean;
  price: boolean;
  availability: boolean;
  location: boolean;
}

// Create a type for the keys of FilterSections to avoid string literals
export type FilterSectionKey = keyof FilterSections;

// Filter Section Component Props
export interface FilterSectionProps {
  title: string;
  children: ReactNode;
  sectionKey: keyof FilterSections;
  isOpen?: boolean;
  onToggle?: () => void;
}

// Dropdown References Type
export interface DropdownRefs {
  [key: string]: HTMLDivElement | null;
}

// Filter State Interface
export interface FilterState {
  selectedCategories: string[];
  priceRange?: PriceRange;
  availability?: string;
  location?: string;
}

// Sorting Options with Explicit Union Type
export const SORT_OPTIONS = [
  'price-asc',
  'price-desc',
  'name-asc',
  'name-desc',
  'newest',
  'oldest'
] as const;

export type SortOption = typeof SORT_OPTIONS[number];

// Search and Filter Utility Interface
export interface CatalogFilterUtility {
  searchTerm: string;
  sortBy: SortOption;
  filterState: FilterState;
}

// Type Guard for EnhancedExhibit
export function isEnhancedExhibit(exhibit: unknown): exhibit is EnhancedExhibit {
  // Check if exhibit is an object and not null
  if (typeof exhibit !== 'object' || exhibit === null) {
    return false;
  }

  // Type assertion to help TypeScript understand we're working with an object
  const exhibitObj = exhibit as Record<string, unknown>;

  // Check required primitive properties
  return (
    typeof exhibitObj.id === 'number' &&
    typeof exhibitObj.title === 'string' &&
    typeof exhibitObj.description === 'string' &&
    typeof exhibitObj.category === 'string' &&
    typeof exhibitObj.image === 'string'
  );
}

