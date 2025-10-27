"use client";
import React, { useRef, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';
import AnimatedWord from '@/components/Animated/AnimatedWord';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import WhoWeAreSection from '@/components/Home/WhoWeAre';


import { motion, Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';

const HomePage = () => {


   const videos = [
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV1-PKSHVobblZE7VFBgCYqwuBBKLKQrsB.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV2-ISCVNsjAbwaGWSNlyFzWUFTuWhlSCM.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV3-RscwAh2sWKQZBp3PvZ5u2BlBOpry8f.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV4-TqUWNjSFyboIphwqA9yRS0EsTJRYVK.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV5-LNsdwNddSwJKXueikk4zJ2UkEHujGi.mp4',
     'https://bnncn1eg7vp85k7u.public.blob.vercel-storage.com/BGV6-Ne8MUie91AmNTQDGIvqsSXs8m2SSdN.mp4'
   ];


const companyName = 'Tecplore';
   
   
     // Animation variants
   const fadeIn: Variants = {
     hidden: { opacity: 0, y: 20 },
     visible: { 
       opacity: 1, 
       y: 0,
       transition: { duration: 0.3 }
     }
   };
   
   
   const scaleUp: Variants = {
     hidden: { scale: 0.8, opacity: 0 },
     visible: {
       scale: 1,
       opacity: 1,
       transition: { duration: 0.5 }
     }
   };
   
   const colorCombinations = [
     { primary: 'bg-blue-300/40', secondary: 'bg-purple-300/40' },
     { primary: 'bg-emerald-300/40', secondary: 'bg-teal-300/40' },
     { primary: 'bg-pink-300/40', secondary: 'bg-indigo-300/40' },
     { primary: 'bg-amber-300/40', secondary: 'bg-rose-300/40' }
   ];
   
   
   
   const staggerContainer: Variants = {
     hidden: { opacity: 0 },
     visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
   };
   
     const stats = [
       { value: "50+", label: "Interactive STEM Exhibits Created" },
       { value: "95%", label: "Concept Retention Improvement in Students" },
       { value: "20+", label: "Teachers Trained in Experiential Learning" },
       { value: "12+", label: "STEM Learning Programs & Experiments" },
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




{/* Who We Are Section */}
      <motion.section 
        className="bg-white text-black py-12 sm:py-16 lg:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Title Section */}
            <motion.div 
              className="lg:w-1/4 text-center lg:text-left"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-0">
                Inspiring Young Minds Through Learning
              </h2>
            </motion.div>

            {/* Content Section */}
            <div className="lg:w-3/4">
              <motion.p 
                className="text-gray-600 mb-8 sm:mb-12 lg:mb-16 text-base sm:text-lg leading-relaxed"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                At {companyName}, we create a hands-on learning space where students explore science, technology, and engineering. 
                Through interactive projects, DIY activities, and real experiments, learners discover and build their skills.
              </motion.p>

              {/* Stats Grid */}
              <motion.div 
                className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-16"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    variants={scaleUp}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer"
                  >
                    <Card className="relative bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden h-40 sm:h-56 flex flex-col justify-center items-center">
                      {/* Decorative Blurs */}
                      <div className={`absolute top-1/2 right-0 w-20 h-20 sm:w-32 sm:h-32 ${colorCombinations[index].primary} rounded-full blur-xl sm:blur-2xl transform translate-x-4 sm:translate-x-8 -translate-y-8 sm:-translate-y-12`}></div>
                      <div className={`absolute bottom-0 left-1/2 w-20 h-20 sm:w-32 sm:h-32 ${colorCombinations[index].secondary} rounded-full blur-xl sm:blur-2xl transform -translate-x-10 sm:-translate-x-16 translate-y-8 sm:translate-y-12`}></div>

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-gray-600 px-2">{stat.label}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Mission & Values */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeIn} className="bg-gray-50/50 p-6 rounded-2xl">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-black">Our Mission</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    We empower the next generation through immersive STEAM education by transforming traditional learning into hands-on experiences that spark innovation and scientific discovery.
                  </p>
                </motion.div>
                
                <motion.div variants={fadeIn} className="bg-gray-50/50 p-6 rounded-2xl">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4 text-black">Our Values</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    We cultivate curiosity, creativity, and critical thinking by providing state-of-the-art tools and expert mentorship in an inclusive environment where every learner can explore, experiment, and excel.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>




      {/* Featured Section */}
      <FeaturedProjects />
    
    </main>
  );
};

export default HomePage;