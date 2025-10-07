import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhoWeAre = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const [titleRef, titleInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [contentRef, contentInView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.4, 0.4, 0.2]);

  return (
  <section 
    ref={containerRef}
    className="relative w-full h-[60vh] py-20 md:py-32 flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
  >

      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: 'url("/patterns/webb.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          y: backgroundY,
          opacity: backgroundOpacity
        }}
      />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Title with modern styling */}
        <div ref={titleRef} className="mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={titleInView ? {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            } : {}}
          >
            <div className="inline-flex items-center gap-4">
              <motion.div 
                className="w-16 h-0.5 bg-gradient-to-r from-blue-600 to-green-600"
                initial={{ width: 0 }}
                animate={titleInView ? { width: 64 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <h1 className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase text-gray-800">
                What Define Us
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Main content area */}
        <div ref={contentRef} className="max-w-6xl">
          {/* Main statement */}
          <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight space-y-2 md:space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-800"
            >
              Building <span className="italic text-blue-600">Science temperament</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-800"
            >
              among the <span className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">next generation</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-700"
            >
              through hands-on activities.
            </motion.div>
          </div>

          {/* Decorative divider */}
          <motion.div 
            className="mt-12 md:mt-16 flex items-center gap-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={contentInView ? { 
              opacity: 1, 
              scaleX: 1,
              transition: { duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
            } : {}}
            style={{ transformOrigin: 'left' }}
          >
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <div className="w-2 h-2 rounded-full bg-red-600" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;