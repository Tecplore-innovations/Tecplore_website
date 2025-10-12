"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
}

interface ThreeProjectsSectionProps {
  projects?: Project[];
}

const ThreeProjectsSection: React.FC<ThreeProjectsSectionProps> = ({ projects = [] }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Default projects
  const defaultProjects = [
    {
      id: 1,
      title: 'Wind Tunnel',
      image: '/photos/wt1.jpeg',
      category: 'Physics',
      description:
        'Discover aerodynamics principles by testing different object shapes in a controlled airflow system, visualizing real-time effects of air resistance and pressure.',
    },
    {
      id: 2,
      title: 'Projectile Launcher',
      image: '/photos/ar2.jpeg',
      category: 'Physics',
      description:
        "Explore Newton's laws of motion and propulsion by designing, building, and launching compressed air-powered rockets, measuring flight trajectories and variables.",
    },
    {
      id: 3,
      title: 'Ellipse Foci',
      image: '/photos/ellipse1.jpeg',
      category: 'Maths',
      description:
        'Explore the focal point of an ellipse using laser light and mirrors. Observe how light rays converge to understand reflective properties and geometric behavior.',
    },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
              Featured Projects
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* *** CHANGE 1: Modified Grid Layout ***
          Use grid-cols-3 on medium screens to perfectly fit the three projects. 
          The button will be moved outside this grid.
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative" // md:col-span-1 is implied by grid-cols-3
            >
              {/* Card Container */}
              <div className="relative h-full bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.image})` }}
                    animate={{
                      scale: hoveredProject === project.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />

                  {/* Dark overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/0"
                    animate={{
                      backgroundColor:
                        hoveredProject === project.id
                          ? 'rgba(0,0,0,0.8)'
                          : 'rgba(0,0,0,0)',
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Category Badge */}
                  <div
                    className={`absolute top-4 left-4 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold tracking-wider shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div
                    className={`absolute bottom-4 left-4 right-4 z-10 transition-opacity duration-300 ${
                      hoveredProject === project.id ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <h3 className="text-3xl font-light text-white drop-shadow-lg">
                      {project.title}
                    </h3>
                  </div>

                  {/* Description overlay */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center text-white z-20"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-lg leading-relaxed">{project.description}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* *** CHANGE 2: Moved and Centered Show More Button ***
          The button is now a separate element placed below the grid with top margin (mt-12) 
          and is centered using 'flex justify-center'.
        */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/interactive-exhibits"
            className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full text-base font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Explore All Exhibits
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeProjectsSection;