import React from 'react';
import { motion } from 'framer-motion';

// Explicit type definition using React.FC with no props
const HeroElements: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Sphere - Optimized for all screen sizes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-[20%] top-1/4 sm:left-1/4 sm:top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 opacity-80 blur-sm" />
        <div className="absolute inset-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-purple-500/30 animate-pulse blur-xl" />
      </motion.div>

      {/* Circular Badge - Responsive visibility */}
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="hidden sm:block absolute right-1/4 top-1/3 transform -translate-y-1/2"
        aria-hidden="true"
      >
        <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-purple-500/30 flex items-center justify-center">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-purple-500/20 flex items-center justify-center">
            <div className="w-8 h-8 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-purple-500/10 to-pink-500/10" />
          </div>
        </div>
      </motion.div>

      {/* Stats Badge - Responsive design */}
      <div className="absolute top-2 sm:top-8 right-2 sm:right-1/4 flex flex-col gap-2 items-end pointer-events-auto">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-black/30 backdrop-blur-md rounded-full py-1 sm:py-2 px-2 sm:px-4 flex items-center gap-1 sm:gap-2"
        >
          <div className="flex -space-x-1 sm:-space-x-2">
            <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-purple-500" />
            <div className="w-3 h-3 sm:w-6 sm:h-6 rounded-full bg-pink-500" />
          </div>
          <span className="text-white text-[10px] sm:text-sm font-medium truncate max-w-[120px] sm:max-w-none">
            50k+ talents found their dream job
          </span>
        </motion.div>
      </div>

      {/* Additional Decorative Elements - Screen size optimized */}
      <div className="hidden sm:block absolute bottom-1/4 right-1/3" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-purple-500/50"
        />
      </div>

      {/* Mobile-only decorative element */}
      <div className="block sm:hidden absolute bottom-1/4 right-2" aria-hidden="true">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-2 h-2 rounded-full bg-purple-500/50"
        />
      </div>

      {/* Abstract Background Shapes - Improved responsiveness */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-l from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" aria-hidden="true" />
    </div>
  );
};

export default HeroElements;