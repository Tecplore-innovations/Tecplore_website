"use client";

import React, { useState } from "react";
import { resources, Resource } from "./resources";
import { motion } from "framer-motion";

const TeacherResources: React.FC = () => {
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [levelFilter, setLevelFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<"All" | "video" | "document">("All");

  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const subjects = Array.from(new Set(resources.map(r => r.subject)));
  const levels = Array.from(new Set(resources.map(r => r.level)));

  // Filtered & sorted resources

  const filteredResources = resources
  .filter(r => (subjectFilter === "All" ? true : r.subject === subjectFilter))
  .filter(r => (levelFilter === "All" ? true : r.level === levelFilter))
  .filter(r => (typeFilter === "All" ? true : r.type === typeFilter))
  .sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });




  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 md:px-8 py-16">
      {/* Top Section */}
     
     {/* Top Hero Section */}
<div
  className="relative w-full bg-cover bg-center rounded-xl mb-12"
  style={{
    backgroundImage: "url('/teacher-resources/images/teacher_bg.jpg')",
  }}
>
  {/* Dark overlay for readability */}
  <div className="absolute inset-0 bg-black/50 rounded-xl"></div>

  {/* Hero content */}
  <div className="relative max-w-4xl mx-auto text-center py-24 px-6 text-white">
    <h1 className="text-4xl md:text-5xl font-bold mb-4">
      Teacher Training & Resources
    </h1>
    <p className="text-lg md:text-xl mb-6">
      Explore our curated resources and training materials for teachers.  
      Want personalized support? 
    </p>
    <a
      href="/contact"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
    >
      Contact Us
    </a>
  </div>
</div>



      {/* Filters & Sort */}
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 mb-8">
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="All">All Subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="All">All Levels</option>
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>

        <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value as "All" | "video" | "document")}
        className="border rounded-md px-3 py-2"
        >
        <option value="All">All Types</option>
        <option value="video">Video</option>
        <option value="document">Document</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
          className="border rounded-md px-3 py-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredResources.map(resource => (
          <motion.div
            key={resource.id}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedResource(resource)}
          >
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{resource.title}</h3>
              <p className="text-gray-500 text-sm">{resource.level}</p>
            </div>
          </motion.div>
        ))}
      </div>

     
     {/* Full-page Resource Overlay */}
{selectedResource && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 p-4 overflow-auto">
    <div className="bg-white rounded-2xl w-full max-w-4xl relative shadow-2xl">
      
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold z-10"
        onClick={() => setSelectedResource(null)}
      >
        ×
      </button>

      {/* Resource Content */}
      <div className="p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-bold">{selectedResource.title}</h2>

       

        {/* Videos */}
        {selectedResource.type === "video" && (
          <div className="w-full h-[70vh] rounded-md overflow-hidden">
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
                className="w-full h-full rounded-md"
              />
            )}
          </div>
        )}

        {/* Documents */}
        {selectedResource.type === "document" && (
          <iframe
            src={selectedResource.contentUrl}
            className="w-full h-[80vh] rounded-md"
            title={selectedResource.title}
          />
        )}
      </div>
    </div>
  </div>
)}


    
    </div>
  );
};

export default TeacherResources;
