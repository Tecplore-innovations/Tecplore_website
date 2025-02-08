"use client";

{/* app/careers/page.tsx */}

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Search, MapPin } from 'lucide-react';
import { Position } from './components/types';
import { positions, PAGE_SIZE } from './components/constants';
import { generateFilterOptions, filterPositions } from './components/utils';
import { FilterBar } from './components/FilterComponents';
import JobApplicationClient from './components/JobApplicationClient';

interface FeaturedJobCardProps {
  position: Position;
  onApply: (position: Position) => void;
}

const FeaturedJobCard: React.FC<FeaturedJobCardProps> = ({ position, onApply }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="group relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative p-6 backdrop-blur-sm rounded-xl border bg-white border border-gray-200 hover:border-purple-500 transition-all duration-300">
      <div className="absolute top-4 right-4">
        {position.isNew && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-sm"
          >
            New
          </motion.span>
        )}
      </div>
      <div className="flex items-start gap-4">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold"
        >
          {position.title.charAt(0)}
        </motion.div>
        <div className="flex-1 min-w-0"> {/* Added min-w-0 for text truncation */}
          <h3 className="text-xl font-semibold text-black transition-colors truncate">
            {position.title}
          </h3>
          <p className="mt-2 text-gray-700 truncate">{position.department}</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <div className="flex items-center text-gray-700 truncate">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="truncate">{position.location}</span>
            </div>
            <div className="text-gray-700 truncate">{position.salary}</div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          {position.tags.slice(0, 3).map((tag: string, index: number) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 rounded-full bg-white/5 text-gray-700 text-sm truncate max-w-full"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white whitespace-nowrap"
            onClick={() => onApply(position)}
          >
            Apply Now
          </Button>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

function CareersPage() {
  const handleSearch = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
  }, []);

  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showApplication, setShowApplication] = useState<boolean>(false);

  const filteredPositions = useMemo(() => {
    return filterPositions(positions, searchKeyword, selectedFilters);
  }, [searchKeyword, selectedFilters]);

  const filterOptions = useMemo(() => {
    const searchFiltered = searchKeyword.trim()
      ? filterPositions(positions, searchKeyword, {})
      : positions;

    return generateFilterOptions(
      positions,
      searchFiltered,
      selectedFilters
    );
  }, [searchKeyword, selectedFilters]);

  const handleFilterChange = useCallback((category: string, value: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: value
    }));
    setCurrentPage(1);
  }, []);

  const handleApply = useCallback((position: Position) => {
    setSelectedPosition(position);
    setShowApplication(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-gray-900">
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
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative pt-16 pb-24 overflow-hidden"
            >
              {/* Background Elements */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src="/photos/career1.jpg" 
                  alt="background" 
                  layout="fill"
                  objectFit="cover"
                  priority
                  className="absolute inset-0 w-full h-full"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-3xl"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight break-words"
                  >
                    Your Tecplore
                    <br />
                    Career Starts
                    <motion.span
                      animate={{ 
                        color: ['#A855F7', '#F472B6', '#A855F7'],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                      }}
                      className="text-purple-400"
                    >
                      {' '}Here +
                    </motion.span>
                  </motion.h1>

                  {/* Search Section */}
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    onSubmit={handleSearch}
                    className="mt-12 w-full"
                  >
                    <div className="relative max-w-2xl bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 z-10" />
                      <input
                        type="text"
                        placeholder="Search by title or keyword"
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-white placeholder-gray-100 focus:border-purple-500 focus:ring-purple-500 focus:ring-offset-0 bg-transparent border-0"
                      />
                    </div>
                  </motion.form>
                </motion.div>
              </div>
            </motion.div>

            {/* Filter Section */}
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
                  clearFilters={() => {
                    setSelectedFilters({});
                    setSearchKeyword('');
                    setCurrentPage(1);
                  }}
                  searchQuery={searchKeyword}
                  setSearchQuery={setSearchKeyword}
                />
              </div>
            </motion.div>

            {/* Content Section */}
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
                          />
                        </motion.div>
                      ))}
                  </div>
                </AnimatePresence>

                {/* Pagination */}
                {filteredPositions.length > PAGE_SIZE && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-12 flex justify-center gap-2 flex-wrap"
                  >
                    {Array.from({ length: Math.ceil(filteredPositions.length / PAGE_SIZE) }).map((_, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant={currentPage === i + 1 ? "default" : "outline"}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`
                            ${currentPage === i + 1 
                              ? "bg-purple-500 text-white hover:bg-purple-600" 
                              : "border-white/20 text-gray-700 hover:bg-gray-800 hover:text-white"
                            }
                            min-w-8
                          `}
                        >
                          {i + 1}
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
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