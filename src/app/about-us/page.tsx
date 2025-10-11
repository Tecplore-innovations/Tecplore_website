'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

const companyName = 'Tecplore';

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
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

const slideIn: Variants = {
  hidden: (direction: number) => ({
    x: direction * 100,
    opacity: 0
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

const AboutPage = () => {
  const stats = [
    { value: "50+", label: "Interactive STEM Exhibits Created" },
    { value: "95%", label: "Concept Retention Improvement in Students" },
    { value: "20+", label: "Teachers Trained in Experiential Learning" },
    { value: "12+", label: "STEM Learning Programs & Experiments" },
  ];

 const teamMembers: TeamMember[] = [
  {
    name: "Vivek Devaraj",
    role: "Role",
    imageUrl: "/photos/aboutus/Vivek.jpeg",
    bio: "Vivek leads Tecplore with a passion for experiential STEM education and hands-on learning innovation.",
  },
  {
    name: "Prasanna G",
    role: "Role",
    imageUrl: "/photos/aboutus/Prasanna.jpeg",
    bio: "Prasanna designs cutting-edge science experiments that make complex concepts accessible and fun.",
  },
  {
    name: "Dhamodhiran",
    role: "Role",
    imageUrl: "/photos/aboutus/Dhomodhiran.jpeg",
    bio: "Dhamodhiran builds interactive technology solutions that inspire curiosity and creativity in learners.",
  },
];


  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      initial="hidden"
      animate="visible"
    >

      {/* Hero Section */}
      <section className="relative h-[65vh] bg-black text-white flex items-center">
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

        {/* Text Overlay Left Side */}
        <div className="relative z-10 container mx-auto px-8 lg:px-16 max-w-6xl flex items-center justify-start">
         <div className="max-w-xl">
        <motion.h1
          className="text-5xl lg:text-4xl font-bold mb-6 leading-tight"
          variants={fadeIn}
        >
          We believe every great mind begins with a <span className="text-blue-500">spark</span><br />
          <br/>
          a first encounter that changes how we see the world.
        </motion.h1>
        <motion.p
          className="text-lg text-gray-300"
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
              <div className="text-sm text-gray-500 uppercase tracking-wider mb-2">Who We Are</div>
              <h2 className="text-4xl font-bold">
                Meet {companyName}: Inspiring Young Minds Through Learning
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
              The <span className="text-blue-500">Brains</span> Behind {companyName}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core team drives innovation, strategy, and design to shape the future of {companyName}.
            </p>
          </motion.div> 

         <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
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
            <div className="relative aspect-square mb-4 overflow-hidden bg-white rounded-2xl shadow-md">
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>

            {/* Bio hidden initially, visible on hover */}
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
