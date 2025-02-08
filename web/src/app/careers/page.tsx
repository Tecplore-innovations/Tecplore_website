"use client";

import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Share2, ChevronDown, ChevronUp } from 'lucide-react';

import { Position, SelectedFilters } from './components/types';
import { positions, PAGE_SIZE } from './components/constants';
import { generateFilterOptions, filterPositions } from './components/utils';
import { FilterBar } from './components/FilterComponents';

const CareersPage: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    Experience: [],
    'Work site': [],
    Profession: [],
    Discipline: [],
    'Role type': [],
    'Employment type': []
  });
  
  // Generate filter options based on positions data
  const filterOptions = useMemo(() => generateFilterOptions(positions), []);

  // Filtered and paginated data
  const filteredAndPaginatedData = useMemo(() => {
    const filtered = filterPositions(positions, searchQuery, selectedFilters);
    
    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const start = (currentPage - 1) * PAGE_SIZE;
    const paginatedPositions = filtered.slice(start, start + PAGE_SIZE);
  
    return {
      filteredPositions: filtered,
      paginatedPositions,
      totalPages,
      startIndex: start + 1,
      endIndex: Math.min(start + PAGE_SIZE, filtered.length)
    };
  }, [searchQuery, selectedFilters, currentPage]);

  const handleFilterChange = (category: string, values: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: values
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedFilters({
      Experience: [],
      'Work site': [],
      Profession: [],
      Discipline: [],
      'Role type': [],
      'Employment type': []
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="text-gray-800 bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
              Tecplore
            </span>{" "}
            <span className="text-gray-300">
              Careers
            </span>
          </h1>

          {/* Filter Bar */}
          <FilterBar
            filterOptions={filterOptions}
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Jobs List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-600 text-sm">
                Showing {filteredAndPaginatedData.startIndex}-{filteredAndPaginatedData.endIndex} of {filteredAndPaginatedData.filteredPositions.length} results
              </p>
            </div>

            <div className="space-y-4">
              {filteredAndPaginatedData.paginatedPositions.map((position) => (
                <div
                  key={position.id}
                  onClick={() => {
                    setSelectedPosition(position);
                    setIsMobileDetailsOpen(true);
                  }}
                  className={`p-4 sm:p-6 border rounded-lg cursor-pointer transition-colors ${
                    selectedPosition?.id === position.id
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-600'
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-base sm:text-xl font-semibold text-gray-900">{position.title}</h3>
                      <div className="mt-2 text-gray-600 text-sm">
                        <p>{position.location}</p>
                        <p className="mt-1">{position.workSite}</p>
                      </div>
                      <p className="mt-2 text-gray-500 text-xs">{position.datePosted}</p>
                    </div>
                    <Button variant="ghost" className="h-8 w-8 p-1">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {/* Pagination */}
              {filteredAndPaginatedData.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 hidden sm:block"
                  >
                    Previous
                  </Button>
                  {Array.from({ length: filteredAndPaginatedData.totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className="px-4 hidden sm:block"
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === filteredAndPaginatedData.totalPages}
                    className="px-4 hidden sm:block"
                  >
                    Next
                  </Button>
                  
                  {/* Mobile Pagination */}
                  <div className="flex sm:hidden items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-2"
                    >
                      Prev
                    </Button>
                    <span className="text-sm">
                      Page {currentPage} of {filteredAndPaginatedData.totalPages}
                    </span>
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === filteredAndPaginatedData.totalPages}
                      className="px-2"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Job Details Panel - Mobile & Desktop */}
          {selectedPosition && (
            <>
              {/* Desktop Details Panel */}
              <div className="hidden md:block w-1/2 bg-white border rounded-lg p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPosition.title}</h2>
                    <p className="text-gray-600 mt-2">{selectedPosition.location}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-6">
                  Apply
                </Button>

                <div className="space-y-6">
                  {/* Job Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Date posted</p>
                      <p className="font-medium">{selectedPosition.datePosted}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Job number</p>
                      <p className="font-medium">{selectedPosition.jobNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Work site</p>
                      <p className="font-medium">{selectedPosition.workSite}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Discipline</p>
                      <p className="font-medium">{selectedPosition.discipline}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Role type</p>
                      <p className="font-medium">{selectedPosition.roleType}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Salary</p>
                      <p className="font-medium">{selectedPosition.salary}</p>
                    </div>
                  </div>

                  {/* Job Description */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Overview</h3>
                    <p className="text-gray-600">{selectedPosition.description}</p>
                  </div>

                  {/* Required Skills */}
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPosition.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Details Panel */}
              <div className="fixed inset-x-0 bottom-0 md:hidden bg-white border-t rounded-t-lg shadow-2xl z-50">
                <div className="p-4">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsMobileDetailsOpen(!isMobileDetailsOpen)}
                  >
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">{selectedPosition.title}</h2>
                      <p className="text-gray-600 text-sm">{selectedPosition.location}</p>
                    </div>
                    {isMobileDetailsOpen ? <ChevronDown /> : <ChevronUp />}
                  </div>

                  {isMobileDetailsOpen && (
                    <div className="mt-4 space-y-4">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        Apply
                      </Button>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Date posted</p>
                          <p className="font-medium">{selectedPosition.datePosted}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Job number</p>
                          <p className="font-medium">{selectedPosition.jobNumber}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Work site</p>
                          <p className="font-medium">{selectedPosition.workSite}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Discipline</p>
                          <p className="font-medium">{selectedPosition.discipline}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Role type</p>
                          <p className="font-medium">{selectedPosition.roleType}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Salary</p>
                          <p className="font-medium">{selectedPosition.salary}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="text-base font-semibold mb-2">Overview</h3>
                        <p className="text-gray-600 text-sm">{selectedPosition.description}</p>
                      </div>

                      <div className="border-t pt-4">
                        <h3 className="text-base font-semibold mb-2">Required Skills</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedPosition.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between gap-2">
                        <Button variant="outline" className="flex-1">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;