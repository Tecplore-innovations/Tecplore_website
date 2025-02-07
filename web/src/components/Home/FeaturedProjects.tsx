import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const ModernSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: 'WIND TUNNEL',
      image: '/photos/wt1.jpeg',
      category: 'PHYSICS',
      description: 'Discover aerodynamics principles by testing different object shapes in a controlled airflow system, visualizing real-time effects of air resistance and pressure.'
    },
    {
      title: 'AIR ROCKET',
      image: '/photos/ar2.jpeg',
      category: 'PHYSICS',
      description: "Explore Newton's laws of motion and propulsion by designing, building, and launching compressed air-powered rockets, measuring flight trajectories and variables."
    },
    {
      title: 'PRISM AND SLIT',
      image: '/photos/ps1.jpeg',
      category: 'PHYSICS',
      description: 'Investigate the properties of light by observing how white light splits into its component colors when passing through a prism, demonstrating wave properties and spectral analysis.'
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Section - Featured Projects */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <div className="h-px w-16 bg-gray-300 mb-6"></div>
            
            {/* Project Information */}
            <div className="mt-8">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-light mb-3">{slides[activeSlide].title}</h3>
                <p className="text-gray-600 mb-8 line-clamp-4">
                  {slides[activeSlide].description}
                </p>
              </motion.div>
              
              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                >
                  <Link href="/catalog" className="flex items-center">
                    View All Projects
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Image Slider */}
          <div className="lg:w-2/3 relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                    index === activeSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                    }}
                  />
                  {/* Text Overlay */}
                  <div className="absolute bottom-8 left-8">
                  <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white/90 backdrop-blur-sm px-3 py-2 md:px-6 md:py-4 rounded-lg shadow-lg"
                    >
                      <p className="text-xs md:text-sm font-medium text-blue-600 mb-0.5 md:mb-1">{slide.category}</p>
                      <h3 className="text-lg md:text-2xl font-light text-gray-900">{slide.title}</h3>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex items-center gap-6">
              <div className="text-gray-800 text-sm font-medium">
                {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="w-10 h-10 border-2 border-gray-800 rounded-full flex items-center justify-center text-gray-800 bg-white/80 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="w-10 h-10 border-2 border-gray-800 rounded-full flex items-center justify-center text-gray-800 bg-white/80 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSlider;