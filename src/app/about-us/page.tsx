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

      {/* Hero Section */}
<section className="relative h-[65vh] md:h-[70vh] lg:h-[75vh] bg-black text-white flex items-center overflow-hidden">
  {/* Background Image */}
  <motion.div
    className="absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.2 }}
  >
    <motion.div
      className="w-full h-full bg-[url('/photos/aboutus/2.jpg')] bg-cover bg-center"
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.5 }}
      style={{ opacity: 0.75 }}
    />
  </motion.div>

  {/* Text Overlay */}
  <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-start h-full">
    <div className="max-w-xl w-full">
      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-snug sm:leading-tight"
        variants={fadeIn}
      >
        We believe every great mind begins with a <span className="text-blue-500">spark</span>
        <br />
        <br />
        a first encounter that changes how we see the world.
      </motion.h1>
      <motion.p
        className="text-base sm:text-lg text-gray-300"
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
        className="bg-white text-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-16">
            <motion.div 
              className="lg:w-1/4"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
           
              <h2 className="text-4xl font-bold">
               Inspiring Young Minds Through Learning
              </h2>
            </motion.div>

            <div className="lg:w-3/4">
              <motion.p 
                className="text-gray-600 mb-16 text-lg"
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                At {companyName}, we create a hands-on learning space where students explore science, technology, and engineering. 
                <br/>
                Through interactive projects, DIY activities, and real experiments, learners discover and build their skills.
              </motion.p>

              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
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
                    <Card className="relative bg-gray-50 border border-gray-200 p-6 rounded-3xl shadow-sm overflow-hidden h-56 flex flex-col justify-center items-center">
                      {/* Decorative Blurs */}
                      <div className={`absolute top-1/2 right-0 w-32 h-32 ${colorCombinations[index].primary} rounded-full blur-2xl transform translate-x-8 -translate-y-12`}></div>
                      <div className={`absolute bottom-0 left-1/2 w-32 h-32 ${colorCombinations[index].secondary} rounded-full blur-2xl transform -translate-x-16 translate-y-12`}></div>

                      {/* Content */}
                      <div className="relative z-10 text-center">
                        <div className="text-4xl font-bold text-black mb-2">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>


              <motion.div 
                className="mt-16 grid grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeIn}>
                  <h3 className="text-xl font-semibold mb-4 text-black">Our Mission</h3>
                  <p className="text-gray-600">
                    We empower the next generation through immersive STEAM education by transforming traditional learning into hands-on experiences that spark innovation and scientific discovery.
                  </p>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <h3 className="text-xl font-semibold mb-4 text-black">Our Values</h3>
                  <p className="text-gray-600">
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
      className="py-16 bg-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-4">
        <motion.div className="mb-16 text-center" variants={fadeIn}>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            The <span className="text-blue-500">Team</span> of {companyName}
          </h2>
         
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="group text-center"
              variants={scaleUp}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Clickable Image */}
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <div className="relative aspect-square mb-4 overflow-hidden bg-white rounded-2xl shadow-md">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>

              {/* Name + LinkedIn Icon */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
              >
                <Linkedin size={18} className="text-blue-600" />
                {member.name}
              </a>

              {/* Bio */}
              <p className="text-gray-600 mt-2 text-sm max-w-xs mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
     


          {/* --- COMMENTED SECTION --- */}
          {/*
          <motion.div 
            className="mt-16 text-center"
            variants={fadeIn}
          >
            <h3 className="text-2xl font-bold mb-8">Join Our Team!</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We&apos;re looking for talented individuals to help us drive innovation. Explore our
              open positions and become a part of {companyName} today!
            </p>
            <motion.button 
              className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See Open Positions →
            </motion.button>
          </motion.div>
          */}
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;
