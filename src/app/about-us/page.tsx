'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Linkedin, } from "lucide-react";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const scaleUp: Variants = {
  hidden: { scale: 0.96, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } }
};

const teamMembers = [
  {
    name: "Vivek Devaraj",  
    imageUrl: "/photos/aboutus/Vivek.jpeg",
    linkedin: "https://www.linkedin.com/in/vdevaraj",
    bio: "Leads Tecplore with a passion for experiential STEM learning and hands-on science innovation."
  },
  {
    name: "Prasanna G", 
    imageUrl: "/photos/aboutus/Prasanna.jpeg",
    linkedin: "https://www.linkedin.com/in/prasanna-g-57284012",
    bio: "Designs science experiments that make complex concepts simple, engaging and fun."
  },
  {
    name: "Dhamodharan K",    
    imageUrl: "/photos/aboutus/Dhomodharan.jpeg",
    linkedin: "https://www.linkedin.com/in/dhamodarankkp",
    bio: "Builds interactive learning systems that spark curiosity and creativity."
  },
  {
    name: "Arunkumar R",    
    imageUrl: "/photos/aboutus/Arunkumar.jpeg",
    linkedin: "https://www.linkedin.com/in/arunkumar--r",
    bio: "Drives digital strategy & learning experience design to bring ideas to life."
  }
];

const values = [
  { title: "Excellence", description: "We set high standards for content, experience, and delivery." },
  { title: "Innovation", description: "Constantly evolving to make STEM exciting and meaningful." },
  { title: "Collaboration", description: "We co-create with educators and learners, together." },
  { title: "Quality", description: "Obsessive about safe tools and evidence-based pedagogy." }
];


export default function AboutPage() {
  return (
    <motion.div className="min-h-screen flex flex-col">
      {/* HERO */}
     <header
  className="relative text-white py-6 px-6 overflow-hidden"
  style={{
    backgroundImage: "url('/patterns/pattern_pink.jpg')",
    backgroundRepeat: "repeat",
    backgroundSize: "auto",
    backgroundPosition: "center center",
  }}
>
  {/* Dim Overlay */}
  <div className="absolute inset-0 bg-white opacity-70"></div>

  <motion.div
    className="relative max-w-4xl mx-auto text-center"
    variants={fadeIn}
  >
    <h1 className="text-3xl font-bold text-slate-900 mb-2">
      About Us
    </h1>
  </motion.div>

  {/* ABOUT US */}
  <section className="relative py-6 px-6 text-center max-w-4xl mx-auto">
    <p className="text-lg text-slate-700 leading-relaxed">
      At Tecplore, we turn science into an experience.
      <br/> From classrooms to communities, our mission is to ignite
      curiosity, inspire creativity, and connect everyday life with the wonders of science.
    </p>
  </section>

  {/* CORE VALUES */}
  <section className="relative py-6 px-6">
    {/* Optional faint background image behind values */}
    <div
      className="absolute inset-0 bg-cover bg-center opacity-20"
      style={{
        backgroundImage: "url('/photos/stat cards.jpg')",
      }}
    ></div>

    <motion.div
      className="relative max-w-6xl mx-auto text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Main Title */}
      <h1 className="text-slate-900 text-2xl md:text-4xl font-light mb-8">
        Core Values
      </h1>

      {/* Values */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={staggerContainer}
      >
        {values.map((val, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center text-center"
            variants={scaleUp}
          >
            <h3 className="text-medium font-bold text-slate-900 mb-1">
              {val.title}
            </h3>
            <p className="text-slate-600 max-w-xs">{val.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </section>
</header>

   
      {/* TEAM MEMBERS */}
      <section className="bg-slate-50 px-6 py-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Meet Our Team</h2>
            <p className="text-xl text-slate-600">Passionate educators, makers & engineers</p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
          >
            {teamMembers.map((m, i) => (
              <motion.div 
                key={i}
                className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:shadow-xl transition"
                variants={scaleUp}
              >
                <div className="w-40 h-40 mx-auto mb-5 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-slate-200">
                  <img
                    src={m.imageUrl}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              
               
               <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-light text-slate-900 mb-1 block outline-none focus:outline-none hover:text-blue-500 transition-colors"
              >
                <Linkedin size={18} className="inline mr-1" /> {m.name}
              </a>


          
                <p className="text-slate-600">{m.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>   

      
    </motion.div>
  );
}
