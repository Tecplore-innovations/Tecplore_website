"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Palette, 
  Eye, 
  Sparkles, 
  Shapes,
  Lightbulb,
  Wand2
} from 'lucide-react';

interface Installation {
  title: string;
  description: string;
  artist: string;
  medium: string;
  image: string;
}

const MotionButtonWrapper = motion.div;

const ArtInstallationsPage = () => {
  const installations: Installation[] = [
    {
      title: "Light & Motion",
      description: "Interactive light sculptures responding to movement",
      artist: "Digital Art Collective",
      medium: "LED, Motion Sensors, Custom Software",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Sound Garden",
      description: "Musical installation activated by natural elements",
      artist: "Sound Design Lab",
      medium: "Mixed Media, Environmental Sensors",
      image: "/api/placeholder/400/300"
    },
    {
      title: "Digital Canvas",
      description: "AI-powered generative art display",
      artist: "Tech Arts Studio",
      medium: "Digital Projection, Machine Learning",
      image: "/api/placeholder/400/300"
    }
  ];

  const upcomingExhibitions = [
    {
      date: "MAR 15-30",
      title: "Digital Dreams",
      status: "Opening Soon"
    },
    {
      date: "APR 1-20",
      title: "Light Festival",
      status: "Registration Open"
    },
    {
      date: "MAY 5-25",
      title: "Interactive Futures",
      status: "Early Access"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Hero Section */}
      <motion.div 
        className="relative py-24 px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <motion.h1 
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Where Art Meets Innovation
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Experience interactive art installations that blend creativity with cutting-edge technology
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Featured Installations */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <motion.div 
          className="grid grid-cols-1 gap-12 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {installations.map((installation, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative w-full h-48">
                  <Image 
                    src={installation.image} 
                    alt={installation.title}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-rose-500" />
                    {installation.title}
                  </CardTitle>
                  <p className="text-gray-600">{installation.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Palette className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{installation.artist}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shapes className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{installation.medium}</span>
                    </div>
                    <MotionButtonWrapper
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full mt-4">
                        View Installation
                      </Button>
                    </MotionButtonWrapper>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Interactive Experience */}
      <motion.div 
        className="bg-rose-900 text-white py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-3xl font-bold mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                Interactive Experience
              </motion.h2>
              <motion.p 
                className="text-lg text-rose-100 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Our installations create unique, participatory experiences that blur
                the lines between art, technology, and human interaction.
              </motion.p>
              <div className="grid grid-cols-2 gap-6">
                <motion.div 
                  className="bg-rose-800 p-6 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Eye className="w-8 h-8 mb-4" />
                  <h3 className="font-semibold mb-2">Visual Response</h3>
                  <p className="text-rose-200">Dynamic visuals that react to viewer presence</p>
                </motion.div>
                <motion.div 
                  className="bg-rose-800 p-6 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <Wand2 className="w-8 h-8 mb-4" />
                  <h3 className="font-semibold mb-2">Magic Touch</h3>
                  <p className="text-rose-200">Touch-sensitive artistic elements</p>
                </motion.div>
              </div>
            </div>
            <motion.div 
              className="aspect-square bg-rose-800 rounded-full flex items-center justify-center"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Lightbulb className="w-32 h-32 text-rose-100" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Exhibition Calendar */}
      <motion.div 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Upcoming Exhibitions
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {upcomingExhibitions.map((event, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white">
                  <CardContent className="pt-6">
                    <div className="text-rose-600 font-mono mb-2">{event.date}</div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{event.status}</span>
                      <MotionButtonWrapper
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button variant="outline" size="sm">Register</Button>
                      </MotionButtonWrapper>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ArtInstallationsPage;