"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Beaker,
  Brain,
  Atom,
  FlaskConical,
  Microscope,
  GraduationCap,
  Users,
  PlayCircle,
  BookOpen
} from 'lucide-react';

interface ExperimentCard {
  title: string;
  description: string;
  subject: string;
  gradeLevel: string;
  duration: string;
  materials: string[];
  thumbnail: string;
}

const ScienceExhibitsPage = () => {
  const exhibits: Record<string, ExperimentCard[]> = {
    physics: [
      {
        title: "Light Refraction Lab",
        description: "Explore how light bends through different mediums",
        subject: "Physics",
        gradeLevel: "Grades 8-10",
        duration: "45 minutes",
        materials: ["Laser pointer", "Glass prism", "Water tank"],
        thumbnail: "/api/placeholder/400/300"
      },
      {
        title: "Electromagnetic Fields",
        description: "Visualize magnetic fields using iron filings",
        subject: "Physics",
        gradeLevel: "Grades 9-12",
        duration: "30 minutes",
        materials: ["Magnets", "Iron filings", "Paper"],
        thumbnail: "/api/placeholder/400/300"
      }
    ],
    chemistry: [
      {
        title: "Acid-Base Reactions",
        description: "Interactive pH testing and color changes",
        subject: "Chemistry",
        gradeLevel: "Grades 7-9",
        duration: "40 minutes",
        materials: ["pH indicators", "Test tubes", "Safety goggles"],
        thumbnail: "/api/placeholder/400/300"
      }
    ],
    biology: [
      {
        title: "Cell Structure Model",
        description: "Build 3D models of plant and animal cells",
        subject: "Biology",
        gradeLevel: "Grades 6-8",
        duration: "60 minutes",
        materials: ["Modeling clay", "Microscope", "Slides"],
        thumbnail: "/api/placeholder/400/300"
      }
    ]
  };

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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <motion.div 
        className="relative py-16 px-6 lg:px-8"
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
              Interactive Science Exhibits
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Engage students with hands-on experiments and interactive demonstrations
              designed for modern STEM education
            </motion.p>
            <motion.div 
              className="mt-10 flex gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button className="bg-purple-600 hover:bg-purple-700">
                <PlayCircle className="w-4 h-4 mr-2" />
                Start Exploring
              </Button>
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                View Curriculum
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Subject Navigation */}
      <Tabs 
        defaultValue="physics" 
        className="mx-auto max-w-7xl px-6 lg:px-8"
        onValueChange={(value) => {
          console.log('Selected subject:', value);
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <TabsList className="grid grid-cols-3 w-[400px] mx-auto mb-8">
            <TabsTrigger value="physics">
              <Atom className="w-4 h-4 mr-2" />
              Physics
            </TabsTrigger>
            <TabsTrigger value="chemistry">
              <FlaskConical className="w-4 h-4 mr-2" />
              Chemistry
            </TabsTrigger>
            <TabsTrigger value="biology">
              <Microscope className="w-4 h-4 mr-2" />
              Biology
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {Object.keys(exhibits).map((subject) => (
          <TabsContent key={subject} value={subject}>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {exhibits[subject].map((exhibit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image
                        src={exhibit.thumbnail}
                        alt={exhibit.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl">{exhibit.title}</CardTitle>
                        <span className="text-sm text-purple-600 font-medium">
                          {exhibit.duration}
                        </span>
                      </div>
                      <p className="text-gray-600">{exhibit.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{exhibit.gradeLevel}</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Required Materials:</p>
                          <div className="flex flex-wrap gap-2">
                            {exhibit.materials.map((material, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full"
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          View Experiment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Benefits Section */}
      <motion.div 
        className="bg-white py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Choose Our Platform
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <Brain className="w-6 h-6 text-purple-600" />,
                title: "Engaging Learning",
                description: "Interactive experiments that make complex concepts easy to understand"
              },
              {
                icon: <Beaker className="w-6 h-6 text-purple-600" />,
                title: "Safe Environment",
                description: "Carefully designed experiments with proper safety guidelines"
              },
              {
                icon: <Users className="w-6 h-6 text-purple-600" />,
                title: "Collaborative",
                description: "Group activities that promote teamwork and discussion"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <Card className="text-center p-6">
                  <motion.div 
                    className="mx-auto w-12 h-12 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScienceExhibitsPage;