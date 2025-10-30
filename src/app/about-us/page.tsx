// Improved Tecplore About Page (Refined)
'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Linkedin } from "lucide-react";

const companyName = 'Tecplore';

// Animation variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleUp: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

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

export default function AboutPage() {
  return (
    <motion.div className="min-h-screen bg-black text-white" initial="hidden" animate="visible">

      {/* HERO */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden px-6 py-16">
        <motion.div className="absolute inset-0 bg-[url('/photos/aboutus/2.jpg')] bg-cover bg-center opacity-70" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} />
        <div className="absolute inset-0 bg-black/50" />

        <motion.div className="relative z-10 text-center max-w-3xl" variants={fadeIn}>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            We believe every great mind begins with a <span className="text-blue-500">spark</span>
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl">
            {companyName} power curiosity-led learning through science, creativity, and technology.
          </p>
        </motion.div>
      </section>

      {/* Mission Vision */}
      <section className="bg-white text-black py-16 px-6">
        <motion.div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div className="bg-gray-100 p-8 rounded-2xl" variants={fadeIn}>
            <h3 className="text-2xl font-bold mb-3 text-blue-600">Our Mission</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              Empower young minds through hands-on STEM exploration and real-world scientific learning.
            </p>
          </motion.div>
          <motion.div className="bg-gray-100 p-8 rounded-2xl" variants={fadeIn}>
            <h3 className="text-2xl font-bold mb-3 text-blue-600">Our Vision</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              To make experiential science accessible to every learner, nurturing the innovators of tomorrow.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-16 px-6">
        <motion.div className="text-center mb-12" variants={fadeIn}>
          <h2 className="text-4xl font-bold text-gray-900">Meet Our <span className="text-blue-500">Team</span></h2>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto" variants={staggerContainer}>
          {teamMembers.map((m, i) => (
            <motion.div key={i} className="bg-white p-4 rounded-2xl text-center shadow-sm hover:shadow-lg transition" variants={scaleUp}>
              <div className="w-28 h-28 md:w-40 md:h-40 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-gray-200">
                <Image src={m.imageUrl} alt={m.name} width={200} height={200} className="object-cover" />
              </div>

              {/* Only LinkedIn clickable */}
              <a href={m.linkedin} target="_blank" className="flex items-center justify-center gap-2 font-semibold text-gray-800 hover:text-blue-600">
                <Linkedin size={18} /> {m.name}
              </a>

              <p className="text-gray-600 text-xs md:text-sm mt-2 line-clamp-3">
                {m.bio}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.div>
  );
}
