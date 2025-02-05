import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Beaker, Brain, Microscope, Atom, FlaskConical, Lightbulb } from 'lucide-react';

const ScienceCentersPage = () => {
  const exhibits = [
    {
      title: "Interactive Physics Lab",
      description: "Hands-on experiments with force, motion, and energy",
      icon: <Atom className="w-6 h-6" />,
      features: ["Motion simulators", "Force measurement", "Energy conversion demos"]
    },
    {
      title: "Chemistry Discovery Zone",
      description: "Safe and exciting chemical reactions and experiments",
      icon: <FlaskConical className="w-6 h-6" />,
      features: ["Safe reactions", "Element exploration", "Molecular building"]
    },
    {
      title: "Biology Investigation Station",
      description: "Explore living systems and microscopic worlds",
      icon: <Microscope className="w-6 h-6" />,
      features: ["Digital microscopes", "DNA models", "Ecosystem displays"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Interactive Science Centers
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover our cutting-edge exhibits that make learning science an unforgettable adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Exhibits Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {exhibits.map((exhibit, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {exhibit.icon}
                  </div>
                  <CardTitle>{exhibit.title}</CardTitle>
                </div>
                <CardDescription>{exhibit.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exhibit.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-yellow-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4">Learn More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Features Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Experience Science Like Never Before</h2>
              <p className="text-lg text-blue-100 mb-8">
                Our exhibits combine cutting-edge technology with hands-on learning to create
                unforgettable educational experiences.
              </p>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
                Schedule a Visit
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-blue-800 rounded-lg">
                <Brain className="w-8 h-8 mb-4" />
                <h3 className="font-semibold mb-2">Cognitive Learning</h3>
                <p className="text-blue-100">Engage multiple learning styles through interactive exhibits</p>
              </div>
              <div className="p-6 bg-blue-800 rounded-lg">
                <Beaker className="w-8 h-8 mb-4" />
                <h3 className="font-semibold mb-2">Hands-on Experience</h3>
                <p className="text-blue-100">Real experiments and demonstrations for practical learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceCentersPage;