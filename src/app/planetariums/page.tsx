import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Orbit, Stars, Rocket, Globe, Telescope, Moon } from 'lucide-react';

const MuseumsPlanetariumsPage = () => {
  const exhibits = [
    {
      title: "Solar System Explorer",
      description: "Interactive 3D journey through our cosmic neighborhood",
      icon: <Globe className="w-6 h-6" />,
      features: ["Real-time planet tracking", "Interactive orbit visualization", "Space mission highlights"]
    },
    {
      title: "Deep Space Theater",
      description: "Immersive 360° space visualization experience",
      icon: <Stars className="w-6 h-6" />,
      features: ["4K projection dome", "Live space feeds", "Expert narration"]
    },
    {
      title: "Space Mission Control",
      description: "Hands-on space flight simulation center",
      icon: <Rocket className="w-6 h-6" />,
      features: ["Mission simulators", "Real-time data feeds", "Team challenges"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-70" />
        </div>
        <div className="relative py-24 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                Explore the Cosmos
              </h1>
              <p className="text-xl text-blue-100">
                Journey through space and time in our state-of-the-art planetarium
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Exhibits */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {exhibits.map((exhibit, index) => (
            <Card key={index} className="bg-slate-800 text-white border-slate-700 hover:border-blue-500 transition-colors duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-blue-900 rounded-lg">
                    {exhibit.icon}
                  </div>
                  <CardTitle>{exhibit.title}</CardTitle>
                </div>
                <p className="text-slate-300">{exhibit.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {exhibit.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <Stars className="w-4 h-4 text-blue-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                  Explore Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Timeline */}
      <div className="bg-slate-800 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Space Exploration Timeline</h2>
          <div className="relative">
            <div className="absolute top-0 left-1/2 w-px h-full bg-blue-600" />
            <div className="space-y-12">
              {[
                { year: "1960s", event: "First Human in Space", icon: <Rocket /> },
                { year: "1970s", event: "Moon Landings", icon: <Moon /> },
                { year: "2020s", event: "Mars Exploration", icon: <Globe /> }
              ].map((item, index) => (
                <div key={index} className="relative flex items-center gap-8">
                  <div className="w-1/2 text-right pr-8">
                    <h3 className="text-xl font-bold text-white">{item.year}</h3>
                    <p className="text-blue-300">{item.event}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="w-1/2 pl-8">
                    <Card className="bg-slate-700 border-none">
                      <CardContent className="pt-6">
                        <p className="text-slate-300">
                          Interactive exhibit showcasing the major milestones and technological achievements.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Feed Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Live Space Feed</h2>
              <p className="text-lg text-blue-100 mb-8">
                Watch real-time feeds from space telescopes and international space stations.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-900">
                  <Telescope className="w-4 h-4 mr-2" />
                  Connect to Feed
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Schedule Viewing
                </Button>
              </div>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                <Orbit className="w-12 h-12 text-blue-500 animate-spin" />
                <span className="ml-4 text-slate-400">Live Feed Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseumsPlanetariumsPage;