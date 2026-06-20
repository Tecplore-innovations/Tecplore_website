'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Target, TrendingUp, Lightbulb, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageHero from '@/components/shared/PageHero';
import { fadeIn, staggerContainer, scaleUp } from '@/lib/animations';

const perks = [
  {
    icon: Target,
    title: 'Real Impact',
    description: 'Your work directly changes how students experience science, not just another feature shipped.',
  },
  {
    icon: Lightbulb,
    title: 'Learn Every Day',
    description: 'Work alongside engineers, scientists, and educators who bring decades of hands-on expertise.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Fast',
    description: 'Take ownership of projects from day one. We move quickly and trust our team to lead.',
  },
  {
    icon: Heart,
    title: 'Work That Matters',
    description: 'Education is one of the most important problems of our time. We take that seriously.',
  },
];

const CareersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <PageHero
        title="Your Tecplore Career Starts Here"
        subtitle="We're building a team of curious, driven people who believe learning should be an adventure, not a chore."
        backgroundImage="/photos/career1.avif"
        overlayClass="bg-slate-950/75"
        align="left"
      />

      {/* WHY TECPLORE */}
      <section className="py-28 lg:py-32 px-6 bg-white">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="mb-14" variants={fadeIn}>
            <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Why Join Us</p>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900">More than a job</h2>
            <p className="mt-3 text-lg text-slate-500 max-w-xl">
              At Tecplore, you&apos;re not just filling a role, you&apos;re helping shape the future of STEM education.
            </p>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {perks.map((perk) => {
              const Icon = perk.icon;
              return (
                <motion.div
                  key={perk.title}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                  variants={scaleUp}
                >
                  <Icon className="h-5 w-5 text-blue-600 mb-5" strokeWidth={1.5} />
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{perk.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{perk.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* CULTURE QUOTE */}
      <section className="py-20 px-6 bg-slate-50 border-y border-slate-200">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <p className="text-3xl md:text-4xl font-light text-slate-700 leading-relaxed italic">
            We look for curiosity above all else. Everything else can be taught.
          </p>
          <div className="mt-10">
            <p className="text-slate-500 mb-6">
              We post all openings on LinkedIn. Follow us to be the first to know.
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 h-auto rounded-xl">
              <a
                href="https://www.linkedin.com/company/tecplore"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Linkedin className="h-5 w-5" strokeWidth={1.5} />
                Follow Tecplore on LinkedIn
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default CareersPage;
