"use client";
import React, { useRef, useEffect } from 'react';
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
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV1-PKSHVobblZE7VFBgCYqwuBBKLKQrsB.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV2-ISCVNsjAbwaGWSNlyFzWUFTuWhlSCM.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV3-RscwAh2sWKQZBp3PvZ5u2BlBOpry8f.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV4-TqUWNjSFyboIphwqA9yRS0EsTJRYVK.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV5-LNsdwNddSwJKXueikk4zJ2UkEHujGi.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV6-Ne8MUie91AmNTQDGIvqsSXs8m2SSdN.mp4'
   ];

 

    const videoRef = useRef<HTMLVideoElement>(null);

      // Pause/play video based on tab visibility
      useEffect(() => {
        const handleVisibility = () => {
          if (!videoRef.current) return;
          if (document.hidden) {
            videoRef.current.pause();
          } else {
            videoRef.current.play().catch(() => console.warn('Video play blocked.'));
          }
        };
        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
      }, []);


      


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
              transition={{ duration: 15 }}
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

      

        </div>
      </section>

      {/* Who We Are Section */}
      <WhoWeAreSection />

      {/* Featured Section */}
      <FeaturedProjects />
    
    </main>
  );
};

export default HomePage;