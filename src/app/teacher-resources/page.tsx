"use client";

import React, { useState, useEffect } from "react";
import { resources, Resource } from "./resources";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, FileText, Search, Star, Award, SlidersHorizontal } from "lucide-react";

const TeacherResources: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<"All" | "video" | "document">("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("All");
  const [originFilter, setOriginFilter] = useState<string>("All");
  const [filterHistoryActive, setFilterHistoryActive] = useState(false);



  
  

  const subjects = Array.from(new Set(resources.map(r => r.subject)));
  const levels = Array.from(new Set(resources.map(r => r.level)));
  const languages = Array.from(new Set(resources.map(r => r.language)));
  const origins = Array.from(new Set(resources.map(r => r.content)));


  const filteredResources = resources
    .filter(r => (subjectFilter === "All" || r.subject === subjectFilter))
    .filter(r => (levelFilter === "All" || r.level === levelFilter))
    .filter(r => (typeFilter === "All" || r.type === typeFilter))
    .filter(r => (languageFilter === "All" || r.language === languageFilter))
    .filter(r => (originFilter === "All" || r.content === originFilter))
    .filter(r => {
                  if (searchQuery === "") return true;
                  
                  const query = searchQuery.toLowerCase().replace(/\s+/g, '');
                  
                  const matchesText = 
                    r.title.toLowerCase().replace(/\s+/g, '').includes(query) ||
                    r.subject.toLowerCase().replace(/\s+/g, '').includes(query) ||
                    r.language.toLowerCase().replace(/\s+/g, '').includes(query) ||
                    r.level.toLowerCase().replace(/\s+/g, '').includes(query);
                  
                  let matchesGrade = r.level.toLowerCase().includes(searchQuery.toLowerCase());
                  
                  const searchMatches = searchQuery.match(/\d+/);
                  if (searchMatches) {
                    const searchNumber = parseInt(searchMatches[0]);
                    const gradeNumbers = r.level.match(/\d+/g);
                    
                    if (gradeNumbers && gradeNumbers.length >= 2) {
                      const min = parseInt(gradeNumbers[0]);
                      const max = parseInt(gradeNumbers[1]);
                      matchesGrade = matchesGrade || (searchNumber >= min && searchNumber <= max);
                    } else if (gradeNumbers && gradeNumbers.length === 1) {
                      matchesGrade = matchesGrade || (searchNumber === parseInt(gradeNumbers[0]));
                    }
                  }
                  
                  return matchesText || matchesGrade;
                })
                .sort((a, b) => {
                  const dateA = new Date(a.createdAt).getTime();
                  const dateB = new Date(b.createdAt).getTime();
                  return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
                });


    const activeFilterCount = [subjectFilter, levelFilter, typeFilter, languageFilter, originFilter].filter(f => f !== "All").length;



const clearAllFilters = () => {
  setSubjectFilter("All");
  setLevelFilter("All");
  setTypeFilter("All");
  setLanguageFilter("All");
  setOriginFilter("All");
  setSearchQuery("");
  setShowFilters(false);
  setSortOrder("newest");
  if (filterHistoryActive) {
    window.history.back(); // Go back since extra entry exists from opening sidebar or applying filter
    setFilterHistoryActive(false);
  }
};

useEffect(() => {
  
  // Push history ONLY when sidebar opens or filters/search are active
  if (showFilters && !filterHistoryActive && activeFilterCount === 0 && searchQuery === "") {
    window.history.pushState({ filtersActive: true }, '', window.location.pathname);
    setFilterHistoryActive(true);
  }

  // If sidebar is manually closed (user clicks filter button again) with NO filters/search, remove history entry
  if (!showFilters && filterHistoryActive && activeFilterCount === 0 && searchQuery === "") {
    window.history.back(); // Remove the last history entry
    setFilterHistoryActive(false);
  }

  const handlePopState = (e: PopStateEvent) => {
    if (filterHistoryActive) {
      e.preventDefault();
      setShowFilters(false);
      setSubjectFilter("All");
      setLevelFilter("All");
      setTypeFilter("All");
      setLanguageFilter("All");
      setOriginFilter("All");
      setSearchQuery("");
      setSortOrder("newest");
      setFilterHistoryActive(false);
    }
  };

  window.addEventListener('popstate', handlePopState);
  return () => window.removeEventListener('popstate', handlePopState);
}, [showFilters, activeFilterCount, searchQuery, filterHistoryActive]);



const isMobile = typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent);

  return (
    <div className="min-h-screen bg-gray-50">
    {/* Hero Section - Minimal Professional */}
    <div 
        className="relative w-full bg-white border-b border-gray-200"
        style={{
            backgroundImage: "url('/teacher-resources/images/teacher_res.avif')",
            // Optional: Adjust background properties for a good pattern display
            backgroundRepeat: 'repeat', 
            backgroundSize: 'auto', // or 'cover' if you want it to fill the container
            backgroundPosition: 'center center',
        }}
    >
        {/* Optional: Add an overlay div for better text readability */}
        <div className="absolute inset-0 bg-white opacity-90"></div>
        
        {/* Content Container (make sure this is relative so it sits above the background) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded text-xs font-medium text-gray-700 mb-3">
                    <Award className="w-3.5 h-3.5" />
                    Premium Teacher Resources
                </div>
                
               <h1 className="text-4xl md:text-4xl font-light mb-6 text-slate-700">
                    Teacher Resources Portal
                </h1>
                
                <p className="text-base sm:text-lg max-w-2xl mx-auto text-gray-600 mb-6">
                    Access curated training materials and teaching resources
                </p>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>

      {/* Stats Bar - Compact */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap justify-center gap-6 text-center text-xs">
            <div className="flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-gray-600" />
              <span className="font-semibold text-gray-900">{resources.filter(r => r.type === 'video').length}</span>
              <span className="text-gray-600">Videos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-gray-600" />
              <span className="font-semibold text-gray-900">{resources.filter(r => r.type === 'document').length}</span>
              <span className="text-gray-600">Documents</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-gray-600" />
              <span className="font-semibold text-gray-900">{subjects.length}</span>
              <span className="text-gray-600">Subjects</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-3 py-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-gray-700">
              {filteredResources.length} Resources
            </h2>
            {activeFilterCount > 0 && (
              <span className="text-xs bg-gray-900 text-white px-1.5 py-0.5 rounded font-medium">
                {activeFilterCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                showFilters
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-400"
              }`}
            >
              <SlidersHorizontal className="w-3 h-3" />
              Filter
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                title="Clear filters"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          {/* Desktop Sidebar Filter */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 180, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="hidden lg:block flex-shrink-0 overflow-hidden"
              >
                <div className="w-[180px] bg-white border border-gray-200 rounded p-2.5 space-y-2">
                  <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className={`w-full rounded px-2 py-1.5 text-xs transition-all cursor-pointer ${
                      subjectFilter !== "All"
                        ? "bg-white border border-gray-900 text-gray-900 font-medium"
                        : "bg-gray-50 border border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <option value="All">All Subjects</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>

                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value)}
                    className={`w-full rounded px-2 py-1.5 text-xs transition-all cursor-pointer ${
                      levelFilter !== "All"
                        ? "bg-white border border-gray-900 text-gray-900 font-medium"
                        : "bg-gray-50 border border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <option value="All">All Levels</option>
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as "All" | "video" | "document")}
                    className={`w-full rounded px-2 py-1.5 text-xs transition-all cursor-pointer ${
                      typeFilter !== "All"
                        ? "bg-white border border-gray-900 text-gray-900 font-medium"
                        : "bg-gray-50 border border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    <option value="All">All Types</option>
                    <option value="video">Video</option>
                    <option value="document">Document</option>
                  </select>

                  {/* Language filter */}
                  <select
                    value={languageFilter}
                    onChange={e => setLanguageFilter(e.target.value)}
                   className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700 hover:border-gray-400 cursor-pointer"
                  >
                    <option value="All">All Languages</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>

                  {/* Origin filter */}
                  <select
                    value={originFilter}
                    onChange={e => setOriginFilter(e.target.value)}
                   className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700 hover:border-gray-400 cursor-pointer"
                  >
                    <option value="All">All Origins</option>
                    {origins.map(origin => (
                      <option key={origin} value={origin}>{origin}</option>
                    ))}
                  </select>


                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                    className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700 hover:border-gray-400 cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>

                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="w-full text-xs text-gray-700 hover:text-gray-900 font-medium py-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="lg:hidden overflow-hidden mb-3"
                >
                  <div className="bg-white border border-gray-200 rounded p-2.5 space-y-2">
                    <select
                      value={subjectFilter}
                      onChange={(e) => setSubjectFilter(e.target.value)}
                      className={`w-full rounded px-2 py-1.5 text-xs ${
                        subjectFilter !== "All"
                          ? "bg-white border border-gray-900 text-gray-900 font-medium"
                          : "bg-gray-50 border border-gray-300 text-gray-700"
                      }`}
                    >
                      <option value="All">All Subjects</option>
                      {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    <select
                      value={levelFilter}
                      onChange={(e) => setLevelFilter(e.target.value)}
                      className={`w-full rounded px-2 py-1.5 text-xs ${
                        levelFilter !== "All"
                          ? "bg-white border border-gray-900 text-gray-900 font-medium"
                          : "bg-gray-50 border border-gray-300 text-gray-700"
                      }`}
                    >
                      <option value="All">All Levels</option>
                      {levels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>

                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value as "All" | "video" | "document")}
                      className={`w-full rounded px-2 py-1.5 text-xs ${
                        typeFilter !== "All"
                          ? "bg-white border border-gray-900 text-gray-900 font-medium"
                          : "bg-gray-50 border border-gray-300 text-gray-700"
                      }`}
                    >
                      <option value="All">All Types</option>
                      <option value="video">Video</option>
                      <option value="document">Document</option>
                    </select>

                    {/* Language filter */}
                    <select
                      value={languageFilter}
                      onChange={e => setLanguageFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700"
                    >
                      <option value="All">All Languages</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>

                    {/* Origin filter */}
                    <select
                      value={originFilter}
                      onChange={e => setOriginFilter(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700"
                    >
                      <option value="All">All Origins</option>
                      {origins.map(origin => (
                        <option key={origin} value={origin}>{origin}</option>
                      ))}
                    </select>


                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                      className="w-full bg-gray-50 border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-700"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>

                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="w-full text-xs text-gray-700 font-medium py-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Resources Grid/List */}
            {!showFilters || activeFilterCount > 0 ? (
              filteredResources.length === 0 ? (
                <div className="text-center py-12 bg-white border border-gray-200 rounded">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <h3 className="text-base font-semibold text-gray-900 mb-1">No resources found</h3>
                  <p className="text-sm text-gray-600 mb-3">Try adjusting your filters</p>
                  {(activeFilterCount > 0 || searchQuery !== "") && (
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors font-medium"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {/* Desktop Grid View */}
                  <div className={`hidden sm:grid gap-3 ${
                    showFilters 
                      ? 'grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  }`}>
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="group bg-white border border-gray-200 rounded overflow-hidden hover:border-gray-400 hover:shadow-sm transition-all cursor-pointer"
                        onClick={() => setSelectedResource(resource)}
                      >
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                          <img
                            src={resource.thumbnail}
                            alt={resource.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          <div className="absolute top-1.5 left-1.5">
                            {resource.type === "video" ? (
                              <div className="bg-gray-900 text-white px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[10px] font-medium">
                                <Play className="w-2.5 h-2.5 fill-white" />
                                VIDEO
                              </div>
                            ) : (
                              <div className="bg-gray-900 text-white px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[10px] font-medium">
                                <FileText className="w-2.5 h-2.5" />
                                DOC
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-2.5">
                          <h3 className="font-medium text-xs text-gray-900 mb-1.5 line-clamp-2 group-hover:text-gray-700 transition-colors leading-tight">
                            {resource.title}
                          </h3>
                         
                         <div className="flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1">
                            <span className="font-medium text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">
                              {resource.level}
                            </span>
                            {resource.language && (
                              <span className="font-medium text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded">
                                {resource.language}
                              </span>
                            )}
                          </div>
                          <span className="text-gray-600">{resource.subject}</span>
                        </div>

                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Strip/Tail View */}
                  <div className="sm:hidden space-y-2">
                    {filteredResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="group bg-white border border-gray-200 rounded overflow-hidden hover:border-gray-400 transition-all cursor-pointer flex"
                        onClick={() => setSelectedResource(resource)}
                      >
                        {/* Thumbnail - Narrow strip on left */}
                        <div className="relative w-24 flex-shrink-0 bg-gray-100">
                          <img
                            src={resource.thumbnail}
                            alt={resource.title}
                            className="w-full h-full object-cover"
                          />
                          
                          <div className="absolute top-1 left-1">
                            {resource.type === "video" ? (
                              <div className="bg-gray-900 text-white px-1 py-0.5 rounded flex items-center gap-0.5 text-[9px] font-medium">
                                <Play className="w-2 h-2 fill-white" />
                              </div>
                            ) : (
                              <div className="bg-gray-900 text-white px-1 py-0.5 rounded flex items-center gap-0.5 text-[9px] font-medium">
                                <FileText className="w-2 h-2" />
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content - Takes remaining space */}
                        <div className="flex-1 p-2.5 min-w-0">
                          <h3 className="font-medium text-xs text-gray-900 mb-1 line-clamp-2 leading-tight">
                            {resource.title}
                          </h3>
                         <div className="flex items-center gap-1.5 text-[10px]">
                          <span className="font-medium text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">
                            {resource.level}
                          </span>
                          {resource.language && (
                            <span className="font-medium text-gray-700 bg-gray-50 px-1.5 py-0.5 rounded">
                              {resource.language}
                            </span>
                          )}
                          <span className="text-gray-600 truncate">{resource.subject}</span>
                        </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )
            ) : (
              <div className="text-center py-12 bg-white border border-gray-200 rounded">
                <SlidersHorizontal className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <h3 className="text-base font-semibold text-gray-900 mb-1">Select filters</h3>
                <p className="text-sm text-gray-600">Choose your preferences to view resources</p>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Resource Modal - Clean Professional */}
      <AnimatePresence>
        {selectedResource && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-auto"
            onClick={() => setSelectedResource(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="bg-white rounded w-full max-w-4xl max-h-[95vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
                <div className="flex-1 pr-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {selectedResource.title}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                   <span className="bg-gray-900 text-white px-2 py-0.5 rounded font-medium">
                      {selectedResource.level}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-700">
                      {selectedResource.language}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-700">
                      {selectedResource.content === "Tecplore" ? "Original" : "External"}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-700">
                      {selectedResource.subject}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded font-medium text-gray-700">
                      {selectedResource.type === "video" ? "Video" : "Document"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="flex-shrink-0 p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                {selectedResource.type === "video" && (
                  <div className="w-full aspect-video rounded overflow-hidden bg-black">
                    {selectedResource.contentUrl.includes("youtube.com") ||
                     selectedResource.contentUrl.includes("youtu.be") ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${new URL(selectedResource.contentUrl).searchParams.get('v')}`}
                        title={selectedResource.title}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={selectedResource.contentUrl}
                        controls
                        className="w-full h-full"
                      />
                    )}
                  </div>
                )}

             
             {selectedResource.type === "document" && (
              <>
                {isMobile ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <p className="text-gray-600 mb-4">PDF preview unavailable on mobile.</p>
                    <a
                      href={selectedResource.contentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                      Open PDF in Full Screen
                    </a>
                  </div>
                ) : (
                  <iframe
                    src={selectedResource.contentUrl}
                    className="w-full h-[75vh] rounded border border-gray-200"
                    title={selectedResource.title}
                  />
                )}
              </>
            )}
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

   <footer className="w-full bg-gray-100 border-t border-gray-200 py-6 px-6">
  <div className="max-w-none text-gray-600 text-xs sm:text-sm leading-relaxed text-center md:text-left">
    <p>
      <strong className="text-gray-700">Note:</strong>  At Tecplore, we aim to empower educators with engaging STEM learning tools.
      This section features both Tecplore&apos;s original creations and selected educational resources from trusted global communities.
      While we ensure accuracy and relevance, some materials may link to external sources credited to their respective authors.
      All third-party resources are shared for educational, non-commercial purposes.
      For edits or removal requests, please contact us at <strong>info@tecplore.com</strong>.
    </p>
  </div>
</footer>

    </div>
  );
};

export default TeacherResources;