"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FeaturedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      title: "Wind Tunnel",
      category: "Physics",
      description: "Ever wondered why some buildings survive hurricanes while others crumble? Or why certain cars seem to glide through the air while others guzzle gas? Welcome to the Junior Wind Tunnel Lab – where young scientists unlock the secrets of aerodynamics through hands-on exploration! This innovative educational kit transforms abstract concepts into tangible discoveries, allowing students to investigate how wind interacts with everyday objects.",
      image: "/photos/wt.jpg",
      client: "National Science Museum"
    },
    {
      title: "Bio-Luminescence Lab",
      category: "Biology",
      description: "An immersive dark room experience showcasing various bio-luminescent organisms and the chemistry behind natural light production.",
      image: "/api/placeholder/800/500",
      client: "Marine Research Center"
    },
    {
      title: "Renewable Energy Station",
      category: "Environmental Science",
      description: "Interactive solar and wind energy demonstration with real-time power generation metrics and environmental impact visualization.",
      image: "/photos/res.jpg",
      client: "Green Tech Institute"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Image and Content Section */}
        <div className="relative mb-12">
          <div className="aspect-[16/9] w-full relative overflow-hidden rounded-2xl">
            <Image
              src={projects[activeIndex].image}
              alt={projects[activeIndex].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Image Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-3xl">
                <span className="inline-block px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full mb-4">
                  {projects[activeIndex].category}
                </span>
                <h2 className="text-4xl font-bold text-white mb-4">
                  {projects[activeIndex].title}
                </h2>
                <p className="text-gray-200 text-lg mb-6">
                  Client: {projects[activeIndex].client}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Navigation Cards */}
        <div className="relative">
          {/* Shadow Overlays for Scroll Indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />
          
          {/* Scrollable Cards */}
          <div className="flex gap-4 overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className="flex-none w-[400px] snap-start cursor-pointer"
              >
                <div className={`p-6 rounded-xl transition-all duration-300 ${
                  activeIndex === index 
                    ? 'bg-blue-50 border-2 border-blue-600 shadow-lg' 
                    : 'bg-gray-50 border border-gray-200 hover:border-blue-300'
                }`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 text-sm font-medium rounded-full mb-3 ${
                        activeIndex === index 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {project.category}
                      </span>
                      <h3 className={`text-xl font-semibold mb-3 ${
                        activeIndex === index ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 text-sm">
                        {project.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 mt-1 flex-shrink-0 ${
                      activeIndex === index ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            <Link href="/catalog" className="flex items-center">
              View All Projects
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}