// types.ts
import React from 'react';

// With exactOptionalPropertyTypes: true, we need explicit union with undefined
export interface HeroProps {
  title: string;
  searchValue: string;
  onSearchChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onSearchSubmit: ((e: React.FormEvent) => void) | undefined;
}

export interface SearchBarProps {
  value: string;
  onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onSubmit: ((e: React.FormEvent) => void) | undefined;
}