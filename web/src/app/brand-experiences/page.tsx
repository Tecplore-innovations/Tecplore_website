import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Layers, 
  LayoutGrid, 
  Monitor, 
  Users, 
  Smartphone,
  Zap,
  Target,
  Projector
} from 'lucide-react';

const BrandExperiencesPage = () => {
  const solutions = [
    {
      title: "Interactive Walls",
      description: "Gesture-controlled displays that respond to visitor movements",
      icon: <Smartphone className="w-6 h-6" />,
      metrics: ["98% engagement rate", "Average 5min interaction time"]
    },
    {
      title: "AR Product Showcases",
      description: "Augmented reality experiences for product demonstrations",
      icon: <Projector className="w-6 h-6" />,
      metrics: ["45% increase in product understanding", "2x brand recall"]
    },
    {
      title: "Data Visualization",
      description: "Real-time interactive data stories and brand metrics",
      icon: <Layers className="w-6 h-6" />,
      metrics: ["87% information retention", "3x visitor insights"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 py-24 px-6 lg:px-8 bg-white">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
                Transform Your Brand Story
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Create unforgettable brand experiences through interactive installations
                and immersive technology
              </p>
              <div className="mt-10 flex gap-4 justify-center">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Start Your Project
                </Button>
                <Button variant="outline">
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {solutions.map((solution, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    {solution.icon}
                  </div>
                  <CardTitle>{solution.title}</CardTitle>
                </div>
                <p className="text-gray-600 mt-2">{solution.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {solution.metrics.map((metric, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <Target className="w-4 h-4 text-purple-500" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-6">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-purple-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Discovery", icon: <Target />, desc: "Understanding your brand and objectives" },
              { title: "Design", icon: <LayoutGrid />, desc: "Creating engaging interactive concepts" },
              { title: "Development", icon: <Monitor />, desc: "Building robust technical solutions" },
              { title: "Deployment", icon: <Zap />, desc: "Seamless installation and support" }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-purple-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-purple-200">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-px bg-purple-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Preview */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-12">
                <h3 className="text-2xl font-bold mb-4">Featured Case Study</h3>
                <h4 className="text-xl text-purple-600 mb-6">Tech Innovation Center</h4>
                <p className="text-gray-600 mb-8">
                  Interactive installation showcasing future technologies through
                  gesture-controlled displays and real-time data visualization.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "250,000+ visitors engaged",
                    "95% positive feedback",
                    "40% increase in brand awareness"
                  ].map((stat, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span>{stat}</span>
                    </li>
                  ))}
                </ul>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  View Full Case Study
                </Button>
              </div>
              <div className="bg-purple-100 p-12 flex items-center justify-center">
                <div className="aspect-video w-full bg-purple-200 rounded-lg flex items-center justify-center">
                  <Users className="w-12 h-12 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandExperiencesPage;