"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover our innovative science exhibits that make learning engaging and memorable. 
            Each project is custom-designed to meet specific educational objectives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] bg-gray-100"
          >
            <img
              src={projects[activeIndex].image}
              alt={projects[activeIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <div className="text-white">
                <div className="text-sm font-medium mb-2">{projects[activeIndex].category}</div>
                <h3 className="text-2xl font-bold mb-2">{projects[activeIndex].title}</h3>
                <p className="text-gray-300">Client: {projects[activeIndex].client}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 flex flex-col justify-center"
          >
            <div className="space-y-6">
              {projects.map((project, index) => (
                <Card 
                  key={index}
                  className={`transition-colors cursor-pointer hover:bg-gray-50 ${
                    activeIndex === index ? 'border-2 border-blue-600' : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">{project.category}</div>
                        <h4 className="text-lg font-semibold mb-3">{project.title}</h4>
                        <p className="text-gray-600">{project.description}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 mt-1 transition-colors ${
                        activeIndex === index ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="lg"
              className="w-fit border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <Link href="/catalog">View All Projects</Link> <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
