'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const companyName = 'Tecplore';

// Animation variants with proper typing
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const colorCombinations = [
  { primary: 'bg-blue-300/40', secondary: 'bg-purple-300/40' },   // Blue & Purple
  { primary: 'bg-emerald-300/40', secondary: 'bg-teal-300/40' },  // Emerald & Teal
  { primary: 'bg-pink-300/40', secondary: 'bg-indigo-300/40' },   // Pink & Indigo
  { primary: 'bg-amber-300/40', secondary: 'bg-rose-300/40' }     // Amber & Rose
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleUp: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5
    }
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
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const AboutPage = () => {
  const stats = [
    { value: "98%", label: "Project Delivery Rate" },
    { value: "92%", label: "Client Retention Rate" },
    { value: "35%", label: "Annual Revenue Growth" },
    { value: "15+", label: "Countries Reached" },
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Coming Soon",
      role: "CEO & Founder",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "COO",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "CTO",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "Full-Stack Developer",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "UI/UX Designer",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "Lead Software Engineer",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "Cybersecurity Specialist",
      imageUrl: "/api/placeholder/400/400"
    },
    {
      name: "Coming Soon",
      role: "Network Administrator",
      imageUrl: "/api/placeholder/400/400"
    }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-black text-white"
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <motion.div 
            className="w-full h-full bg-[url('/photos/aboutus/hero2.jpg')] bg-cover bg-center"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{ opacity: 0.2 }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10" />
          </motion.div>
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10">
          {/* Upper Text Section */}
          <div className="container mx-auto px-4 pt-32 pb-16">
            <motion.h1 
              className="text-6xl font-bold mb-6 max-w-4xl"
              variants={fadeIn}
            >
              We Empower <span className="text-gray-400">Innovation</span>, and help{" "}
              <span className="text-gray-400">Simplify</span> Technology.
            </motion.h1>
            <motion.p 
              className="text-xl max-w-2xl text-gray-300"
              variants={fadeIn}
            >
              At {companyName}, we transform ideas into reality with cutting-edge tech solutions
              tailored to your needs.
            </motion.p>
          </div>

          {/* Split Image Section */}
          <div className="grid grid-cols-2 gap-0 h-96">
            <motion.div 
              className="relative overflow-hidden"
              custom={-1}
              variants={slideIn}
            >
              <Image 
                src="/photos/aboutus/2.jpg" 
                alt="VR Technology"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </motion.div>
            <motion.div 
              className="relative overflow-hidden"
              custom={1}
              variants={slideIn}
            >
              <Image 
                src="/photos/aboutus/3.jpg" 
                alt="AR Technology"
                fill
                className="object-cover grayscale"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </motion.div>
          </div>

          {/* Who We Are Section */}
          <motion.div 
            className="bg-white text-black"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-4 py-24">
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
                    Meet {companyName}: Where Learning Meets Vision Through Innovation and Technology
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
                    At {companyName}, we&apos;ve created an innovative learning environment that combines cutting-edge technology with hands-on experimentation. 
                    Our space features interactive electronics projects, DIY activities, real-world science hands-on experiments where students engage in real-world projects. 
                    Expert mentors guide learners through practical experiments in physics, chemistry, and engineering, fostering scientific thinking and problem-solving skills. 
                    The collaborative atmosphere encourages peer learning and creative exploration, while regular workshops introduce new concepts through hands-on activities. 
                    Students develop technical skills by working with Arduino boards, programming robots, and creating digital solutions for real-world challenges. 
                    This immersive approach builds confidence in technology usage and nurtures an innovative mindset essential for future success in STEM fields.
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
                        <Card className="relative bg-gray-50 border border-gray-200 p-4 sm:p-6 rounded-3xl shadow-sm overflow-hidden">
                          <div className={`absolute top-1/2 right-0 w-32 h-32 ${colorCombinations[index].primary} rounded-full blur-2xl transform translate-x-8 -translate-y-12`}></div>
                          <div className={`absolute bottom-0 left-1/2 w-32 h-32 ${colorCombinations[index].secondary} rounded-full blur-2xl transform -translate-x-16 translate-y-12`}></div>
                          <div className="relative z-10">
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
                        We empower the next generation through immersive STEM education by transforming traditional learning into hands-on experiences that spark innovation and scientific discovery.
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
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <motion.section 
        className="py-24 bg-zinc-900"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-16"
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-4">
              The <span className="text-gray-400">Brains</span> Behind {companyName}
            </h2>
            <p className="text-gray-300">
              Our talented team combines expertise and creativity to bring innovative ideas 
              to life and deliver exceptional results.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="group"
                variants={scaleUp}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative aspect-square mb-4 overflow-hidden bg-zinc-800 rounded-lg">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>

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

          {/* CEO Quote */}
          <motion.div 
            className="mt-24 max-w-3xl mx-auto text-center"
            variants={fadeIn}
          >
            <blockquote className="text-xl text-gray-300 mb-8">
              &quot;At {companyName}, our goal is simple: to empower businesses with innovative technology
              that drives growth and success. We aim to be a trusted partner, delivering
              solutions that not only meet today&apos;s needs but also prepare our clients for
              the opportunities of tomorrow.&quot;
            </blockquote>
            <motion.div 
              className="flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-12 h-12 mr-4">
                <Image
                  src="/api/placeholder/48/48"
                  alt="Coming Soon"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">To Be Announced</div>
                <div className="text-sm text-gray-400">CEO & Founder</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;