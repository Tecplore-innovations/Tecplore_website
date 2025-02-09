'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types and Constants
import { Position, FilterCategory } from './types';
import { positions, PAGE_SIZE, FILTER_CATEGORIES } from './constants';

// Utils
import { generateFilterOptions, filterPositions } from './utils';

// Components
import FilterBar from './components/filters/FilterBar';
import { FeaturedJobCard } from './components/jobs/FeaturedJobCard';
import { Pagination } from './components/jobs/Pagination';
import HeroSection from './components/hero/HeroSection';
import JobApplicationClient from './components/application/JobApplicationClient';

// Helper function to create empty filters
const createEmptyFilters = (): Record<FilterCategory, string[]> => {
  return Object.values(FILTER_CATEGORIES).reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {} as Record<FilterCategory, string[]>);
};

function CareersPage() {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterCategory, string[]>>(createEmptyFilters());
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showApplication, setShowApplication] = useState<boolean>(false);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }, []);

  const filteredPositions = useMemo(() => {
    return filterPositions(positions, searchKeyword, selectedFilters);
  }, [searchKeyword, selectedFilters]);

  const filterOptions = useMemo(() => {
    const searchFiltered = searchKeyword.trim()
      ? filterPositions(positions, searchKeyword, createEmptyFilters())
      : positions;

    return generateFilterOptions(
      positions,
      searchFiltered,
      selectedFilters
    );
  }, [searchKeyword, selectedFilters]);

  const handleFilterChange = useCallback((category: FilterCategory, value: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: value
    }));
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters(createEmptyFilters());
    setSearchKeyword('');
    setCurrentPage(1);
  }, []);

  const handleApply = useCallback((position: Position) => {
    setSelectedPosition(position);
    setShowApplication(true);
  }, []);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="relative min-h-screen bg-gray-100 text-black">
      <AnimatePresence mode="wait">
        {showApplication && selectedPosition ? (
          <motion.div
            key="application"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full h-full"
          >
            <JobApplicationClient 
              position={selectedPosition}
              onBack={() => {
                setShowApplication(false);
                setSelectedPosition(null);
              }}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col w-full"
          >
            <HeroSection
              title="Your Tecplore Career Starts"
              searchValue={searchKeyword}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearch}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="relative z-10 py-6 border-b border-white/10"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <FilterBar
                  filterOptions={filterOptions}
                  selectedFilters={selectedFilters}
                  handleFilterChange={handleFilterChange}
                  clearFilters={handleClearFilters}
                  searchQuery={searchKeyword}
                  setSearchQuery={setSearchKeyword}
                />
              </div>
            </motion.div>

            <div className="relative z-10 py-12 sm:py-24 flex-grow">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center mb-12 flex-wrap gap-4"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Featured Opportunities</h2>
                    <p className="text-gray-700 mt-2">
                      {filteredPositions.length} positions found
                    </p>
                  </div>
                </motion.div>

                <AnimatePresence mode="wait">
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPositions
                      .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
                      .map((position: Position, index: number) => (
                        <motion.div
                          key={position.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <FeaturedJobCard
                            position={position}
                            onApply={handleApply}
                            baseUrl={baseUrl}
                          />
                        </motion.div>
                      ))}
                  </div>
                </AnimatePresence>

                {filteredPositions.length > PAGE_SIZE && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredPositions.length / PAGE_SIZE)}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CareersPage;