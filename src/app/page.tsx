"use client";

import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { ChevronDown } from 'lucide-react';
import { motion } from "framer-motion";
import AnimatedWord from '@/components/Animated/AnimatedWord';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import Newsletter from '@/components/Home/Newsletter';
import WhoWeAreSection from '@/components/Home/WhoWeAre';
import News from '@/components/Home/News';

const HomePage = () => {

  const videos = [
    '/videos/BGV1.mp4',
    '/videos/BGV2.mp4',
    '/videos/BGV3.mp4',
    '/videos/BGV4.mp4',
    '/videos/BGV5.mp4',
  ];
  // const videos = [
  //   'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV1-PKSHVobblZE7VFBgCYqwuBBKLKQrsB.mp4',
  //   'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV2-ISCVNsjAbwaGWSNlyFzWUFTuWhlSCM.mp4',
  //   'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV3-RscwAh2sWKQZBp3PvZ5u2BlBOpry8f.mp4',
  //   'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV4-TqUWNjSFyboIphwqA9yRS0EsTJRYVK.mp4',
  //   'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV5-LNsdwNddSwJKXueikk4zJ2UkEHujGi.mp4',
  //   'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV6-Ne8MUie91AmNTQDGIvqsSXs8m2SSdN.mp4'
  // ];

  const scrollToNext = () => {
    const nextSection = document.querySelector('.py-24');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full overflow-x-hidden">
      {/* Hero Section with Video */}
      <section className="relative h-screen w-full">
        <VideoPlayer videos={videos} />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <div className="w-full max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-4xl md:text-7xl font-bold mx-auto max-w-5xl mb-4"
            >
              <div className="break-words">
                <span>Learn Science Through</span>
                <div className="mt-2">
                  <AnimatedWord />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            onClick={scrollToNext}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center text-white"
            >
              <span className="text-sm font-light mb-2">Scroll Down</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <WhoWeAreSection />

      {/* Featured Section */}
      <FeaturedProjects />

      {/* News Section */}
      <News />

      {/* Contact Section */}
      <Newsletter />
    </main>
  );
};

export default HomePage;