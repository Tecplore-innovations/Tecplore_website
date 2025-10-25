'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Linkedin } from "lucide-react";

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

const scaleUp: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const AboutPage = () => {
  const stats = [
    { value: "50+", label: "Interactive STEM Exhibits Created" },
    { value: "95%", label: "Concept Retention Improvement in Students" },
    { value: "20+", label: "Teachers Trained in Experiential Learning" },
    { value: "12+", label: "STEM Learning Programs & Experiments" },
  ];

  const teamMembers = [
    {
      name: "Vivek Devaraj",
      imageUrl: "/photos/aboutus/Vivek.jpeg",
      linkedin: "https://www.linkedin.com/in/vdevaraj", 
      bio: "Vivek leads Tecplore with a passion for experiential STEM education and hands-on learning innovation.",
    },
    {
      name: "Prasanna G",
      imageUrl: "/photos/aboutus/Prasanna.jpeg",
      linkedin: "https://www.linkedin.com/in/prasanna-g-57284012", 
      bio: "Prasanna designs cutting-edge science experiments that make complex concepts accessible and fun.",
    },
    {
      name: "Dhamodharan K",
      imageUrl: "/photos/aboutus/Dhomodharan.jpeg",
      linkedin: "https://www.linkedin.com/in/dhamodarankkp", 
      bio: "Dhamodharan builds interactive technology solutions that inspire curiosity and creativity in learners.",
    },
    {
      name: "Arunkumar R",
      imageUrl: "/photos/aboutus/Arunkumar.jpeg",
      linkedin: "https://www.linkedin.com/in/arunkumar--r",
      bio: "Arunkumar drives the creative and digital strategy at Tecplore, bringing ideas to life through technology and design.",
    },
  ];

  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section - Fixed for Mobile */}
      <section className="relative min-h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] bg-black text-white flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-0">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div
            className="w-full h-full bg-[url('/photos/aboutus/2.jpg')] bg-cover bg-center bg-no-repeat"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{ opacity: 0.75 }}
          />
        </motion.div>

        {/* Dark Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Text Overlay - Centered and Responsive */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center">
          <div className="w-full max-w-4xl text-center lg:text-left">
            <motion.h1
              className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight sm:leading-snug lg:leading-tight"
              variants={fadeIn}
            >
              We believe every great mind begins with a{' '}
              <span className="text-blue-500">spark</span>
              <br className="hidden sm:block" />
              <span className="block mt-2 sm:mt-4 text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-medium">
                a first encounter that changes how we see the world.
              </span>
            </motion.h1>
            
            <motion.p
              className="text-sm xs:text-base sm:text-lg text-gray-300 max-w-3xl mx-auto lg:mx-0 px-2 sm:px-0"
              variants={fadeIn}
            >
              <span className="text-blue-500 font-semibold">{companyName}</span> was founded to design those sparks,  
              blending science, creativity, and technology into learning.
            </motion.p>
          </div>
        </div>
      </section>

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

      {/* Team Section */}
      <motion.section
        className="py-12 sm:py-16 lg:py-20 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="mb-12 sm:mb-16 text-center" variants={fadeIn}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
              The <span className="text-blue-500">Team</span> of {companyName}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto px-4">
              Meet the passionate educators and innovators behind our mission to transform learning experiences.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group text-center bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                variants={scaleUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Clickable Image */}
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block mb-3 sm:mb-4"
                >
                  <div className="relative aspect-square mb-3 sm:mb-4 overflow-hidden bg-gray-100 rounded-xl sm:rounded-2xl shadow-sm">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </a>

                {/* Name + LinkedIn Icon */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-base sm:text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-2"
                >
                  <Linkedin size={16} className="text-blue-600 flex-shrink-0" />
                  <span className="truncate">{member.name}</span>
                </a>

                {/* Bio - Show on hover for desktop, always visible on mobile */}
                <div className="h-12 sm:h-16 overflow-hidden">
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;