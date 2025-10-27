"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

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

const ThreeProjectsSection: React.FC<ThreeProjectsSectionProps> = ({
  projects = [],
}) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const defaultProjects = [
    {
      id: 1,
      title: "Wind Tunnel",
      image: "/photos/wt1.jpeg",
      category: "Physics",
      description:
        "Test different object shapes in controlled airflow and visualize aerodynamics in real-time.",
    },
    {
      id: 2,
      title: "Projectile Launcher",
      image: "/photos/ar2.jpeg",
      category: "Physics",
      description:
        "Design and launch air-powered projectiles while measuring motion and trajectory.",
    },
    {
      id: 3,
      title: "Ellipse Foci",
      image: "/photos/ellipse1.jpeg",
      category: "Maths",
      description:
        "Use laser reflections to explore the geometry and properties of ellipses.",
    },
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-white">
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
            <Sparkles className="w-6 h-6 text-blue-600 stroke-[1.5]" />
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
              Featured Projects
            </h2>
          </div>
          <div className="h-px w-32 bg-gray-300 mx-auto rounded-full"></div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              className="group relative border border-gray-300 rounded-2xl overflow-hidden bg-white transition-all duration-500 hover:shadow-md"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                  animate={{
                    scale: hoveredProject === project.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* Fade overlay on hover (light gray, not color) */}
                <motion.div
                  className="absolute inset-0 bg-white/0"
                  animate={{
                    backgroundColor:
                      hoveredProject === project.id
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0)",
                  }}
                  transition={{ duration: 0.4 }}
                />

             {/* Title (visible normally) */}
            <div
              className={`absolute bottom-4 left-4 right-4 transition-opacity duration-300 ${
                hoveredProject === project.id ? "opacity-0" : "opacity-100"
              }`}
            >
              <h3 className="text-2xl font-medium text-white drop-shadow-md">
                {project.title}
              </h3>
            </div>


                {/* Description (on hover) */}
                <motion.div
                  className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-base leading-relaxed">{project.description}</p>
                </motion.div>

                {/* Category badge - stroke only */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 border border-gray-400 text-gray-700 rounded-full text-xs font-medium tracking-wide bg-white/80 backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href="/interactive-exhibits"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 rounded-full text-base font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300"
          >
            View All Exhibits
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeProjectsSection;
