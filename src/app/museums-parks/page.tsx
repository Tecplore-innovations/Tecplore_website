import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palmtree, Cloud, Sun, Puzzle, Star, MapPin } from 'lucide-react';

const ChildrensMuseumsPage = () => {
  const activities = [
    {
      title: "Nature Explorer's Path",
      description: "Interactive outdoor trail with hands-on learning stations",
      icon: <Palmtree className="w-6 h-6" />,
      age: "Ages 5-12"
    },
    {
      title: "Weather Wonder Station",
      description: "Learn about weather patterns through play",
      icon: <Cloud className="w-6 h-6" />,
      age: "Ages 4-10"
    },
    {
      title: "Solar System Adventure",
      description: "Journey through space in our themed playground",
      icon: <Sun className="w-6 h-6" />,
      age: "Ages 6-14"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-blue-100 opacity-50" />
        <div className="relative py-20 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Children&apos;s Museums & Parks
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Where learning meets adventure in nature&apos;s classroom
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Find Adventure Near You</h2>
            <Button variant="outline" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              View Map
            </Button>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Interactive Map Placeholder</p>
          </div>
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {activities.map((activity, index) => (
            <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    {activity.icon}
                  </div>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                </div>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">{activity.age}</span>
                  <Button variant="outline" size="sm">Learn More</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-green-900 text-white py-16 mt-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Puzzle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Problem Solving</h3>
              <p className="text-green-100">Interactive challenges that develop critical thinking</p>
            </div>
            <div className="text-center">
              <Star className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Creative Play</h3>
              <p className="text-green-100">Open-ended activities that spark imagination</p>
            </div>
            <div className="text-center">
              <Palmtree className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Nature Connection</h3>
              <p className="text-green-100">Outdoor experiences that build environmental awareness</p>
            </div>
            <div className="text-center">
              <Sun className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Science Discovery</h3>
              <p className="text-green-100">Hands-on experiments that make learning fun</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildrensMuseumsPage;