"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

const AnimatedWord = () => {
  const words = [
    "Innovation",
    "Excellence",
    "Discovery",
    "Creativity",
    "Exploration",
    "Leadership"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block min-w-[280px]">
      <div className="relative h-[80px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[currentIndex]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute text-blue-400 whitespace-nowrap"
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </div>
    </span>
  );
};

export default AnimatedWord;