"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import VideoPlayer from '../components/VideoPlayer';
import { ArrowRight, ChevronRight, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedWord from '@/components/Animated/AnimatedWord';



const HomePage = () => {

  const videos = [
    '/videos/BGV1.mp4',
    '/videos/BGV2.mp4',
    '/videos/BGV4.mp4',
    '/videos/BGV5.mp4',
    '/videos/BGV6.mp4',
  ];

  const services = [
    {
      title: "Process Solutions",
      description: "Innovative solutions for industrial manufacturing processes",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Building Solutions",
      description: "Complete solutions for industrial buildings and infrastructure",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Digital Solutions",
      description: "Smart digital technologies for industry 4.0",
      image: "/api/placeholder/600/400"
    }
  ];

  const news = [
    {
      date: "2025-01-15",
      title: "New Technology Center Opening",
      category: "Company News",
      preview: "Expanding our capabilities with state-of-the-art facilities..."
    },
    {
      date: "2025-01-10",
      title: "Sustainability Achievement Award",
      category: "Awards",
      preview: "Recognition for our commitment to environmental responsibility..."
    },
    {
      date: "2025-01-05",
      title: "Innovation in Process Solutions",
      category: "Technology",
      preview: "Breakthrough developments in industrial automation..."
    }
  ];

  const [email, setEmail] = useState('')
const [status, setStatus] = useState({ type: '', message: '' })

const handleSubmit = (e) => {
  e.preventDefault()
  if (!email) {
    setStatus({ type: 'error', message: 'Please enter your email address.' })
    return
  }
  // Here you would typically make an API call to your backend
  setStatus({ type: 'success', message: 'Thank you for subscribing!' })
  setEmail('')
}

const scrollToNext = () => {
  const nextSection = document.querySelector('.py-24')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}

const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      title: "Wind Tunnel",
      category: "Physics",
      description: "Ever wondered why some buildings survive hurricanes while others crumble? Or why certain cars seem to glide through the air while others guzzle gas? Welcome to the Junior Wind Tunnel Lab – where young scientists unlock the secrets of aerodynamics through hands-on exploration! This innovative educational kit transforms abstract concepts into tangible discoveries, allowing students to investigate how wind interacts with everyday objects.",
      image: "/photos/wt.jpg",
      client: "National Science Museum"
    },
    {
      title: "Bio-Luminescence Lab",
      category: "Biology",
      description: "An immersive dark room experience showcasing various bio-luminescent organisms and the chemistry behind natural light production.",
      image: "/api/placeholder/800/500",
      client: "Marine Research Center"
    },
    {
      title: "Renewable Energy Station",
      category: "Environmental Science",
      description: "Interactive solar and wind energy demonstration with real-time power generation metrics and environmental impact visualization.",
      image: "/photos/res.jpg",
      client: "Green Tech Institute"
    }
  ];

  return (
    <main className="w-full">
      {/* Hero Section with Video */}
      <section className="relative h-screen">
        <VideoPlayer videos={videos} />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center">
          <div className="container mx-auto px-4 space-y-8">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-7xl font-bold mx-auto max-w-5xl mb-4"
              >
                <div className="">
                  <span>Engineering Science Through</span><br />
                  <AnimatedWord />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-gray-100 text-xl max-w-2xl mx-auto mb-8"
              >
                Discover our collection of meticulously engineered science experiments 
                designed to inspire learning and innovation
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex gap-4 justify-center"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-black border-2 transition-colors"
                >
                  <Link href="/catalog">Explore Experiments</Link> <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="default" 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Custom Projects <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div 
            onClick={scrollToNext}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
            }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.div
              animate={{ 
                y: [0, 8, 0],
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="flex flex-col items-center text-white"
            >
              <span className="text-sm font-light mb-2">Scroll Down</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative py-24 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/photos/whoweare.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay with 50% opacity */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-bold leading-tight text-white"
            >
              Bespoke Solutions
              <br />
              That Transform
              <br />
              Visions Into Reality
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-gray-200"
            >
              <p className="text-xl">
                Tecplore is a multidisciplinary design and fabrication firm specializing
                in the engineering and construction of engaging objects and experiences
                for science centers, museums, learning centers, and public spaces. Our
                focus is creating interactive exhibits, educational installations, and
                innovative experimental setups.
              </p>
              <p className="text-xl">
                We bring innovative designs to life through careful engineering,
                efficient management, and sophisticated fabrication. Our in-house team
                of engineers, educators, and craftspeople work closely with
                clients to develop meaningful experiences that inspire wonder,
                facilitate curiosity, and make science accessible to everyone.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-300 mb-2">We're In Business</p>
                  <h3 className="text-4xl font-bold text-white">5+ Years</h3>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">Completed Successfully</p>
                  <h3 className="text-4xl font-bold text-white">500+ Projects</h3>
                </div>
              </div>
              
              <button className="px-8 py-3 bg-[#B19777] text-white hover:bg-[#9a825f] transition-colors">
                Contact a Specialist
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-full overflow-hidden aspect-square bg-black/20 backdrop-blur-sm">
              <img 
                src="/photos/whoweare2.jpg" 
                alt="Team discussion" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>

      {/* Featured Section */}
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover our innovative science exhibits that make learning engaging and memorable. 
            Each project is custom-designed to meet specific educational objectives.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] bg-gray-100"
          >
            <img
              src={projects[activeIndex].image}
              alt={projects[activeIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <div className="text-white">
                <div className="text-sm font-medium mb-2">{projects[activeIndex].category}</div>
                <h3 className="text-2xl font-bold mb-2">{projects[activeIndex].title}</h3>
                <p className="text-gray-300">Client: {projects[activeIndex].client}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 flex flex-col justify-center"
          >
            <div className="space-y-6">
              {projects.map((project, index) => (
                <Card 
                  key={index}
                  className={`transition-colors cursor-pointer hover:bg-gray-50 ${
                    activeIndex === index ? 'border-2 border-blue-600' : ''
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm text-gray-500 mb-2">{project.category}</div>
                        <h4 className="text-lg font-semibold mb-3">{project.title}</h4>
                        <p className="text-gray-600">{project.description}</p>
                      </div>
                      <ChevronRight className={`w-5 h-5 mt-1 transition-colors ${
                        activeIndex === index ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="lg"
              className="w-fit border-2 border-black hover:bg-black hover:text-white transition-colors"
            >
              <Link href="/catalog">View All Projects</Link> <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-none">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden group">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mt-6 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Large Feature Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8">Global Excellence in Industrial Solutions</h2>
              <p className="text-xl text-gray-600 mb-8">
                With over 50 years of experience, we deliver cutting-edge solutions 
                for industrial processes and buildings worldwide.
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-black hover:bg-black hover:text-white"
              >
                About Us <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative h-96">
              <img 
                src="/api/placeholder/800/600" 
                alt="Industrial facility" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Latest News</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <Card className="border-t-2 border-x-0 border-b-0 rounded-none hover:cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="text-sm text-gray-500 mb-2">{item.category}</div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </CardContent>
                  </Card>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.preview}
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-24 text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('/photos/contact.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-bold mb-8">Let's Build Your Future</h2>
              <p className="text-xl mb-8">
                Connect with our experts to discuss your industrial needs and discover 
                how we can help transform your operations.
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="text-black border-2 border-white hover:bg-white hover:text-black"
              >
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Headquarters</h3>
                <p>Coming soon in India<br /></p>
              </div>
              <Separator className="bg-white" />
              <div>
                <h3 className="text-xl font-bold mb-2">Contact</h3>
                <p>+91 234 567 8900<br />info@tecplore.com</p>
              </div>
              <Separator className="bg-white" />
              <div>
                <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border-white text-black placeholder:text-gray-400"
                    />
                    <Button 
                      type="submit"
                      variant="outline"
                      className="text-black border-2 border-white hover:bg-white hover:text-black"
                    >
                      Subscribe
                    </Button>
                  </div>
                  {status.message && (
                    <Alert className={`${status.type === 'error' ? 'bg-red-900/20 text-red-400' : 'bg-green-900/20 text-green-400'} border-0`}>
                      <AlertDescription>
                        {status.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;