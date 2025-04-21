"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Search, Lightbulb, Code, TestTube, Rocket, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const ProcessDetail = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery & Research",
      description: "We begin with understanding your educational goals, target audience, and project requirements through in-depth research and consultation.",
      icon: Search
    },
    {
      number: "02", 
      title: "Concept Development",
      description: "Our team creates innovative scientific concepts and interactive exhibits based on research findings and curriculum requirements.",
      icon: Lightbulb
    },
    {
      number: "03",
      title: "Design & Engineering",
      description: "We bring scientific concepts to life through detailed design, prototyping, and rigorous engineering processes.",
      icon: Code
    },
    {
      number: "04",
      title: "Testing & Refinement",
      description: "Each experiment and exhibit undergoes thorough testing and refinement to ensure optimal educational value and user experience.",
      icon: TestTube
    },
    {
      number: "05",
      title: "Implementation",
      description: "We handle the complete implementation, from setup to installation, ensuring safety and quality at every step.",
      icon: Rocket
    },
    {
      number: "06",
      title: "Support & Maintenance",
      description: "Our commitment continues with comprehensive support and maintenance services to keep your exhibits running smoothly.",
      icon: Wrench
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <motion.div 
        className="pt-20 pb-16 text-center"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6">
          Transforming Science Education
        </h1>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Our systematic approach to creating innovative science experiments and interactive exhibits
        </motion.p>
      </motion.div>

      {/* Process Steps */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <Card className="relative overflow-hidden h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="flex-none"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <step.icon className="h-6 w-6 text-blue-600" />
                      </div>
                    </motion.div>
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-center gap-2"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <span className="text-sm font-semibold text-blue-600 whitespace-nowrap">Step {step.number}</span>
                        <div className="h-px flex-grow bg-blue-100"></div>
                      </motion.div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="inline-block p-px rounded-xl bg-gradient-to-r from-blue-600 to-purple-600"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-6 text-lg rounded-xl"
              onClick={() => window.location.href = '/contact'}
            >
              Start Your Educational Journey
              <motion.div
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProcessDetail;