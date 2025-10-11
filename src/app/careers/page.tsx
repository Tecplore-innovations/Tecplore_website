'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CareersPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Full-page Hero Image */}
      <div className="relative w-full h-screen">
        <Image
          src="/photos/career1.jpg" // replace with your hero image
          alt="Careers at Tecplore"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-start max-w-3xl px-8 lg:px-16">
          <motion.h1
            className="text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Your <span className="text-blue-400">Tecplore</span> Career <br /> Starts Here
          </motion.h1>
          <motion.p
            className="text-lg text-gray-300 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Follow us on{' '}
            <a
              href="https://www.linkedin.com/company/tecplore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              LinkedIn
            </a>{' '}
            to get the latest updates on job openings.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
