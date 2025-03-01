import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroElements from './HeroElements';
import SearchBar, { SearchBarProps } from './SearchBar';

export interface HeroProps {
  title: string;
  searchValue: string;
  onSearchChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  onSearchSubmit: ((e: React.FormEvent) => void) | undefined;
}

const HeroSection = (props: HeroProps): React.ReactElement => {
  const { title, searchValue, onSearchChange, onSearchSubmit } = props;

  // Create a properly typed SearchBarProps object
  const searchBarProps: SearchBarProps = {
    value: searchValue,
    onChange: onSearchChange,
    onSubmit: onSearchSubmit
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative pt-16 md:pt-20 pb-24 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/photos/career1.jpg" 
          alt="Background image showing career-related theme" 
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={90}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>
          
      <HeroElements />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight break-words text-white"
          >
            {title}
            <motion.span
              animate={{ 
                color: ['#A855F7', '#F472B6', '#A855F7'],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
              }}
              className="text-purple-400"
            >
              {' '}Here +
            </motion.span>
          </motion.h1>

          <SearchBar {...searchBarProps} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;