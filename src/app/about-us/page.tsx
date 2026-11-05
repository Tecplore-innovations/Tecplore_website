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
    <div className="min-h-screen bg-background">

      {/* HERO */}
      <PageHero
        title="Where Science Becomes an Experience"
        subtitle="We design science learning experiences for NGO and CSR programmes, schools and public spaces, bringing together interactive exhibits, maker spaces and educator training."
      />

      {/* MISSION */}
      <section className="py-28 lg:py-36 px-6 bg-background">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
          >
            <p className="section-label mb-4">Our Mission</p>
            <h2 className="heading-section leading-tight mb-6">
              Making STEM accessible to every learner
            </h2>
            <p className="text-lg text-body leading-relaxed">
              We set up places where children learn science by doing. From community centres to
              classrooms to public spaces, we design the whole experience: the exhibits, the way they
              are arranged, what children are prompted to try, and how you know it worked.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeInUp}
            className="surface-card bg-muted p-10"
          >
            <blockquote className="text-2xl font-light text-body leading-relaxed italic">
              Our goal is not just to teach science - it is to make students fall in love with asking questions.
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-6 bg-muted border-y border-border">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="mb-14" variants={fadeIn}>
            <p className="section-label mb-3">What Drives Us</p>
            <h2 className="heading-section">Our Core Values</h2>
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
                  className="surface-card-interactive p-8"
                  variants={scaleUp}
                >
                  <Icon className="h-6 w-6 text-primary mb-5" strokeWidth={1.5} />
                  <h3 className="text-base font-semibold text-foreground mb-2">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* TEAM */}
      <section className="py-28 lg:py-32 px-6 bg-background">
        <motion.div
          className="max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="mb-14" variants={fadeIn}>
            <p className="section-label mb-3">The People</p>
            <h2 className="heading-section">Meet Our Team</h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-xl">
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
                className="flex gap-6 surface-card-interactive p-7 group"
                variants={scaleUp}
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-card overflow-hidden border-2 border-border group-hover:border-primary/40 transition-colors">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{member.name}</h3>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs mt-1 mb-3"
                  >
                    <Linkedin size={12} strokeWidth={1.5} />
                    LinkedIn
                  </a>
                  <p className="text-body text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
}
