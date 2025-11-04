'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Linkedin, Target, Lightbulb, Users, Award, BookOpen, Microscope } from "lucide-react";


const companyTagline = "Learn and Love Science.";

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
  { icon: Target, title: "Excellence", description: "We set high standards for content, experience, and delivery." },
  { icon: Lightbulb, title: "Innovation", description: "Constantly evolving to make STEM exciting and meaningful." },
  { icon: Users, title: "Collaboration", description: "We co-create with educators and learners, together." },
  { icon: Award, title: "Quality", description: "Obsessive about safe tools and evidence-based pedagogy." }
];

const offerings = [
  { 
    icon: BookOpen,
    title: "Experiment Kits",
    text: "Engaging kits with step-by-step guides, designed for science learning.",
    highlight: "Perfect for classrooms and home labs."
  },
  {
    icon: Users,
    title: "Workshops",
    text: "Interactive sessions for students & educators, blending fun with understanding.",
    highlight: "Available onsite & virtually."
  },
  {
    icon: Microscope,
    title: "Learning Programs",
    text: "Academic year programs grounded in inquiry, creativity, and real-world skills.",
    highlight: "Suited for schools seeking impact."
  }
];
export default function AboutPage() {
  return (
    <motion.div className="min-h-screen flex flex-col">
        {/* HERO */}
        <header 
        className="relative text-white py-20 px-6"
        style={{
          backgroundImage: "url('/patterns/oriental-tiles.png')",
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'center center'
        }}
      >
        {/* Dim Overlay */}
        <div className="absolute inset-0 bg-white opacity-90"></div>

        <motion.div className="relative max-w-4xl mx-auto text-center" variants={fadeIn}>
        <h1 className="text-black text-5xl md:text-4xl font-bold mb-4">
      Experience STEM education through real-world experiments
        </h1>
        <p className="text-2xl text-gray-700 font-medium mb-2">{companyTagline}</p>
      </motion.div>

      </header>

          

      {/* CORE VALUES */}
      <section className="bg-slate-50 py-20 px-6">
        <motion.div className="max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div className="text-center mb-8" variants={fadeIn}>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Core Values</h2>
            <p className="text-xl text-slate-600">Our culture, our guide.</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" variants={staggerContainer}>
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div key={i} className="text-center bg-white p-8 rounded-xl border border-slate-200" variants={scaleUp}>
                
                  <div className="w-14 h-14 mx-auto border-2 border-blue-400 bg-transparent rounded-lg flex items-center justify-center mb-4">
                    {/* ICON COLOR */}
                    <Icon className="text-blue-400" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{val.title}</h3>
                  <p className="text-slate-600">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* TEAM MEMBERS */}
      <section className="bg-slate-50 px-6">
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
                  className="font-bold text-slate-900 hover:text-blue-400 mb-1 block outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <Linkedin size={18} className="inline mr-1 text-blue-400" /> {m.name}
                </a>
          
                <p className="text-slate-600">{m.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>   


      {/* WHAT WE OFFER */}
      <section className="bg-white py-20 px-6">
        <motion.div className="max-w-6xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">What We Offer</h2>
            <p className="text-xl text-slate-600">Hands-on STEM for real learning outcomes</p>
          </motion.div>
          <motion.div className="grid md:grid-cols-3 gap-8" variants={staggerContainer}>
            {offerings.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={i} className="bg-white p-8 rounded-xl border border-slate-200 flex flex-col items-center" variants={fadeIn}>
                
                  <div className="w-12 h-12 mx-auto border-2 border-blue-400 bg-transparent rounded-lg flex items-center justify-center mb-4">
                
                    <Icon className="text-blue-400" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.text}</p>
               
                  <div className="mt-2 text-gray-600 font-medium text-sm">{item.highlight}</div>
                </motion.div>
              );
            })}
          </motion.div>
          
        </motion.div>
      </section>
      
    </motion.div>
  );
}
