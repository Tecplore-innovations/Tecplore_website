'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Linkedin, } from "lucide-react";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const scaleUp: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

const teamMembers = [
  {
    name: "Vivek Devaraj",  
    imageUrl: "/photos/aboutus/Vivek.avif",
    linkedin: "https://www.linkedin.com/in/vdevaraj",
    bio: "A mechanical engineer with a Master's from Eindhoven University of Technology, Netherlands. Formerly at Renault-Nissan, where I designed advanced automotive systems across Europe. Now, I channel that experience into building maker spaces - places where students don't just learn engineering, they build it."
  },
  {
    name: "Prasanna G",
    imageUrl: "/photos/aboutus/Prasanna.avif",
    linkedin: "https://www.linkedin.com/in/prasanna-g-57284012",
    bio: "I spent two decades at ISRO, launching satellites - now I launch young minds into orbit. I bring the same precision used in space engineering to craft hands-on experiments that make physics truly click."
  },
  {
    name: "Dhamodharan K",
    imageUrl: "/photos/aboutus/Dhomodharan.avif",
    linkedin: "https://www.linkedin.com/in/dhamodarankkp",
    bio: "An engineer turned community educator who believes science should feel like play, not pressure. After years with NGOs designing learning spaces, I focus on helping kids discover science naturally - through curiosity, not curriculum."
  },
  {
    name: "Arunkumar R",
    imageUrl: "/photos/aboutus/Arunkumar.avif",
    linkedin: "https://www.linkedin.com/in/arunkumar--r",
    bio: "An Physics graduate with experience in manufacturing startups, CSIR aerospace labs, and agri-tech ventures. I blend scientific rigor with creative storytelling to design learning experiences that truly resonate."
  }
];

const values = [
  {    
    title: "Excellence", 
    description: "We set high standards for content, experience, and delivery in every maker space and learning environment we create." 
  },
  { 
    title: "Innovation", 
    description: "Constantly evolving our approach to make STEM education exciting, relevant, and deeply meaningful for learners." 
  },
  {   
    title: "Collaboration", 
    description: "We co-create with educators, institutions, and learners to build sustainable learning ecosystems together." 
  },
  {   
    title: "Quality", 
    description: "Obsessive about safe tools, evidence-based pedagogy, and creating transformative educational experiences." 
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* COMBINED HERO + MISSION BACKGROUND */}
      <section
        className="relative text-white py-20 px-6 overflow-hidden"
        style={{
          backgroundImage: "url('/patterns/pattern_pink.avif')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundPosition: "center center",
        }}
      >
      {/* Simple dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/60"></div>


        <motion.div
          className="relative max-w-5xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.h1
            className="text-4xl md:text-4xl font-bold mb-6 text-white"
            variants={fadeInUp}
          >
            About Tecplore
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Transforming Education Through Experiential Learning
          </motion.p>
        </motion.div>

        {/* MISSION SECTION */}
        <motion.div
          className="relative max-w-4xl mx-auto text-center mt-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-3xl font-bold text-white mb-6">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
            At Tecplore, we turn science into an experience. From classrooms to communities,
            we design and setup maker spaces and learning environments that ignite curiosity,
            inspire creativity, and connect everyday life with the wonders of science. Our mission
            is to make STEM education accessible, engaging, and transformative for every learner.
          </p>
        </motion.div>
      </section>
  


      {/* CORE VALUES */}
      <section className="py-16 px-6 bg-white relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
      
        ></div>

        <motion.div
          className="relative max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-12" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we create and deliver
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
            {values.map((val, i) => {
          
              return (
                <motion.div
                  key={i}
                  className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                  variants={scaleUp}
                >
               
                  <h3 className="text-xl font-light text-blue-900 mb-3 text-center">
                    {val.title}
                  </h3>
                  <p className="text-slate-600 text-center leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-16 px-6 bg-slate-50">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="text-center mb-16" variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Passionate educators, engineers, and makers dedicated to transforming STEM learning
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
            variants={staggerContainer}
          >
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                variants={scaleUp}
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-100 shadow-lg group-hover:border-blue-200 transition-colors">
                        <img
                          src={member.imageUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {member.name}
                      </h3>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors text-sm"
                      >
                        <Linkedin size={16} />
                        <span>Connect on LinkedIn</span>
                      </a>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed mt-6">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-16 px-6 text-slate-900">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-light mb-6">
            Ready to Transform Your Learning Space?
          </h2>
          <p className="font-light text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Let&apos;s collaborate to create engaging maker spaces and STEM learning environments 
            that inspire the next generation of innovators and problem-solvers.
          </p>        
        </motion.div>
      </section>
    </div>
  );
}