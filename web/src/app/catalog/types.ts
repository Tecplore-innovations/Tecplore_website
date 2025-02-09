{/* app/catalog/types.ts */}

import type { ReactNode } from 'react';
import type { Exhibit } from './base-types';

export type { Exhibit };

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
  icon?: string;
}

export interface Resource {
  title: string;
  fileUrl: string;
  fileSize: string;
  fileType: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  alt: string;
  duration?: string;
}

export interface ProductSectionContent {
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  alignment: 'left' | 'right';
}

export interface Safety {
  guidelines: string[];
  requirements: string[];
}

export interface SetupGuide {
  steps: string[];
  timeRequired: string;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  reddit?: string;
}

export interface EnhancedExhibit extends Exhibit {
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
}

// Component Props Types
export interface CatalogGridProps {
  exhibits: Exhibit[];
}

export interface FilterSections {
  categories: boolean;
  price: boolean;
  availability: boolean;
  location: boolean;
}

export interface FilterSectionProps {
  title: string;
  children: ReactNode;
  sectionKey: keyof FilterSections;
}