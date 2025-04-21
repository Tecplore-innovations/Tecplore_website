import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';

const ModernSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="w-full py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="border-2 border-gray-200 rounded-2xl p-8 bg-white shadow-xl relative overflow-hidden">
          {/* Gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50"></div>
          
          {/* Content wrapper */}
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left Section - Featured Projects */}
              <motion.div 
                className="lg:w-1/3 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Decorative elements */}
                <div className="absolute -top-2 -left-2 w-12 h-12">
                  {/* <div className="absolute inset-0 border-t-2 border-l-2 border-blue-600 rounded-tl-lg"></div> */}
                </div>
                
                <h2 className="text-4xl font-bold mb-4 text-gray-900 tracking-tight">
                  Featured Projects <Sparkles className="absolute right-0 w-4 h-4 text-blue-600" />
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 mb-8 rounded-full"></div>
                
                {/* Project Information Card */}
                <div className="mt-8 space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-4">
                        {slides[activeSlide].category}
                      </span>
                      <h3 className="text-2xl font-semibold mb-4 text-gray-800">{slides[activeSlide].title}</h3>
                      <p className="text-gray-600 mb-8 line-clamp-4 leading-relaxed">
                        {slides[activeSlide].description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* CTA Button */}
                  <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }}
                    className="mt-8"
                  >
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
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
                <motion.div 
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-gray-200 shadow-lg"
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  {slides.map((slide, index) => (
                    <motion.div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === activeSlide ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-cover bg-center"
                        animate={{
                          scale: isHovered ? 1.05 : 1
                        }}
                        transition={{ duration: 0.7 }}
                        style={{
                          backgroundImage: `url(${slide.image})`,
                        }}
                      />
                      {/* Enhanced overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                      
                      {/* Text Overlay */}
                      <div className="absolute bottom-8 left-8">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-xl shadow-xl border border-white/20"
                        >
                          <p className="text-sm font-medium text-blue-600 mb-1">{slide.category}</p>
                          <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            {slide.title}
                          </h3>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced Navigation */}
                <div className="absolute bottom-8 right-8 flex items-center gap-6 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200 shadow-lg">
                  <div className="text-gray-800 text-sm font-medium tracking-wider">
                    {String(activeSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevSlide}
                      className="w-10 h-10 border-2 border-gray-800 rounded-full flex items-center justify-center text-gray-800 bg-white hover:bg-gray-800 hover:text-white transition-colors duration-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextSlide}
                      className="w-10 h-10 border-2 border-gray-800 rounded-full flex items-center justify-center text-gray-800 bg-white hover:bg-gray-800 hover:text-white transition-colors duration-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom decorative element */}
            <div className="absolute -bottom-2 -right-2 w-12 h-12">
                  <div className="absolute inset-0 border-b-2 border-r-2 border-blue-600 rounded-br-lg"></div>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSlider;