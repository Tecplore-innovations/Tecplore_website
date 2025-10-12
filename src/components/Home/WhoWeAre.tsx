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
      className="relative w-full py-20 sm:py-28 md:py-36 flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
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
        className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-green-400/20 rounded-full blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl sm:max-w-6xl md:max-w-7xl mx-auto px-6 sm:px-8 md:px-16 w-full">
        {/* Title */}
        <div ref={titleRef} className="mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={titleInView ? {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            } : {}}
          >
           <div className="inline-flex items-center gap-3 sm:gap-4">
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-blue-600 to-green-600 w-16 sm:w-20"
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: 'left' }}
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-gray-800">
            What Defines Us
          </h1>
        </div>

          </motion.div>
        </div>

        {/* Main statement */}
        <div ref={contentRef} className="space-y-4 sm:space-y-5 md:space-y-6">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-snug sm:leading-tight md:leading-tight space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-800 break-words"
            >
              We build <span className="italic text-blue-600">interactive science exhibits</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-800 break-words"
            >
              and set up <span className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">maker spaces</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-700 break-words text-base sm:text-lg md:text-xl lg:text-2xl"
            >
              that inspire discovery and creativity.
            </motion.div>
          </div>

          {/* Decorative divider */}
          <motion.div 
            className="mt-8 sm:mt-12 flex items-center gap-4"
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
