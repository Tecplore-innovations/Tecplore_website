"use client";

import React from 'react';
import VideoPlayer from '../components/VideoPlayer';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { motion } from "framer-motion";
import AnimatedWord from '@/components/Animated/AnimatedWord';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import Newsletter from '@/components/Home/Newsletter';
import WhoWeAreSection from '@/components/Home/WhoWeAre';

const HomePage = () => {

  // const videos = [
  //   '/videos/BGV1.mp4',
  //   '/videos/BGV2.mp4',
  //   '/videos/BGV3.mp4',
  //   '/videos/BGV4.mp4',
  //   '/videos/BGV5.mp4',
  // ];
  const videos = [
    'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV1-PKSHVobblZE7VFBgCYqwuBBKLKQrsB.mp4',
    'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV2-ISCVNsjAbwaGWSNlyFzWUFTuWhlSCM.mp4',
    'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV3-RscwAh2sWKQZBp3PvZ5u2BlBOpry8f.mp4',
    'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV4-TqUWNjSFyboIphwqA9yRS0EsTJRYVK.mp4',
    'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV5-LNsdwNddSwJKXueikk4zJ2UkEHujGi.mp4',
    'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV6-Ne8MUie91AmNTQDGIvqsSXs8m2SSdN.mp4'
  ];

  const news = [
    {
      date: "2025-01-15",
      title: "New Technology Center Opening",
      category: "Company News",
      preview: "Expanding our capabilities with state-of-the-art facilities..."
    },
    {
      date: "2025-01-10",
      title: "Sustainability Achievement Award",
      category: "Awards",
      preview: "Recognition for our commitment to environmental responsibility..."
    },
    {
      date: "2025-01-05",
      title: "Innovation in Process Solutions",
      category: "Technology",
      preview: "Breakthrough developments in industrial automation..."
    }
  ];

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
                <span>Engineering Science Through</span>
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
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12">Latest News</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {news.map((item, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Card className="border-t-2 border-x-0 border-b-0 rounded-none hover:cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="text-sm text-gray-500 mb-2">{item.category}</div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-72 md:w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.preview}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Newsletter />
    </main>
  );
};

export default HomePage;