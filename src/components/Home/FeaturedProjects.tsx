import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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


  // Default projects if none are provided
  const defaultProjects = [
    {
      id: 1,
      title: 'WIND TUNNEL',
      image: '/photos/wt1.jpeg',
      category: 'PHYSICS',
      description: 'Discover aerodynamics principles by testing different object shapes in a controlled airflow system, visualizing real-time effects of air resistance and pressure.'
    },
    {
      id: 2,
      title: 'AIR ROCKET',
      image: '/photos/ar2.jpeg',
      category: 'PHYSICS',
      description: "Explore Newton's laws of motion and propulsion by designing, building, and launching compressed air-powered rockets, measuring flight trajectories and variables."
    },
    {
      id: 3,
      title: 'PARABOLA',
      image: '/photos/parabola1.jpeg',
      category: 'MATHS',
      description: 'Explore the focal point of a parabola using a laser light and a parabolic structure fitted with a mirror. Can observe how light rays converge, helping to understand reflective properties and the unique geometry of parabolic shapes.'
    }

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
           <h2 className="text-3xl md:text-4xl font-semibold text-gray-600 tracking-tight">
           Featured Projects
            </h2>
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
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
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-full bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                {/* Image Section */}
                <div className="relative h-80 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${project.image})`,
                    }}
                    animate={{
                      scale: hoveredProject === project.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold tracking-wider shadow-lg">
                      {project.category}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Description Section */}
                <div className="p-6 bg-white">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredProject === project.id ? 'auto' : 0,
                      opacity: hoveredProject === project.id ? 1 : 0
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 mb-4 rounded-full"></div>
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Static Preview Text (visible when not hovered) */}
                  <motion.div
                    animate={{
                      opacity: hoveredProject === project.id ? 0 : 1,
                      height: hoveredProject === project.id ? 0 : 'auto'
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </motion.div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 border-4 border-blue-600 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeProjectsSection;