'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Star, Zap, Users, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import { fadeIn, fadeInUp, staggerContainer, scaleUp } from '@/lib/animations';

const values = [
  {
    icon: Star,
    title: 'Excellence',
    description: 'We set high standards for content, experience, and delivery in every maker space and learning environment we create.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Constantly evolving our approach to make STEM education exciting, relevant, and deeply meaningful for learners.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'We co-create with educators, institutions, and learners to build sustainable learning ecosystems together.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality',
    description: 'Obsessive about safe tools, evidence-based pedagogy, and creating transformative educational experiences.',
  },
];

const teamMembers = [
  {
    name: 'Vivek Devaraj',
    imageUrl: '/photos/aboutus/Vivek.avif',
    linkedin: 'https://www.linkedin.com/in/vdevaraj',
    bio: "Engineer, maker, and educator with a Master's from Eindhoven University of Technology. With years of global R&D experience and two patents, I now build maker spaces that help students explore ideas and learn engineering by doing.",
  },
  {
    name: 'Prasanna G',
    imageUrl: '/photos/aboutus/Prasanna.avif',
    linkedin: 'https://www.linkedin.com/in/prasanna-g-57284012',
    bio: 'After over two decades at ISRO working on space systems, I now bring the same precision and creativity to education, designing practical science experiences that make learning exciting and meaningful.',
  },
  {
    name: 'Dhamodharan K',
    imageUrl: '/photos/aboutus/Dhomodharan.avif',
    linkedin: 'https://www.linkedin.com/in/dhamodarankkp',
    bio: 'An engineer turned community educator who believes science should feel like play, not pressure. After years with NGOs creating learning spaces, I now help children explore science through fun, hands-on experiences.',
  },
  {
    name: 'Arunkumar R',
    imageUrl: '/photos/aboutus/Arunkumar.avif',
    linkedin: 'https://www.linkedin.com/in/arunkumar--r',
    bio: 'A physics graduate with experience in manufacturing startups, CSIR aerospace labs, and agri-tech ventures. I combine science and creativity to design digital content that makes learning engaging and accessible.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <PageHero
        title="Where Science Becomes an Experience"
        subtitle="We design and build maker spaces, interactive exhibits, and STEM learning environments that transform how students see the world."
        backgroundImage="/photos/career1.avif"
        overlayClass="bg-slate-950/80"
      />

      {/* MISSION */}
      <section className="py-28 lg:py-36 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
          >
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-4">Our Mission</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Making STEM accessible to every learner
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              At Tecplore, we turn science into an experience. From classrooms to communities, we
              design and set up maker spaces and learning environments that ignite curiosity, inspire
              creativity, and connect everyday life with the wonders of science.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="bg-slate-50 rounded-3xl p-10 border border-slate-200"
          >
            <blockquote className="text-2xl font-light text-slate-700 leading-relaxed italic">
              Our goal is not just to teach science - it is to make students fall in love with asking questions.
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="mb-14" variants={fadeIn}>
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">What Drives Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Our Core Values</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={val.title}
                  className="bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md rounded-2xl p-8 transition-all duration-300"
                  variants={scaleUp}
                >
                  <Icon className="h-6 w-6 text-blue-600 mb-5" strokeWidth={1.5} />
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* TEAM */}
      <section className="py-28 lg:py-32 px-6 bg-white">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="mb-14" variants={fadeIn}>
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">The People</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Meet Our Team</h2>
            <p className="mt-3 text-lg text-slate-500 max-w-xl">
              Educators, engineers, and makers dedicated to transforming how students experience STEM.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={staggerContainer}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className="flex gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-7 hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
                variants={scaleUp}
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-200 group-hover:border-blue-300 transition-colors">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-400 hover:text-blue-600 transition-colors text-xs mt-1 mb-3"
                  >
                    <Linkedin size={12} strokeWidth={1.5} />
                    LinkedIn
                  </a>
                  <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
