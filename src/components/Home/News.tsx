import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Beaker } from "lucide-react";

interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  preview: string;
  image: string;
}

const NewsSection = () => {
  const news: NewsItem[] = [
    {
      id: 1,
      title: "Revolutionary Quantum Physics Interactive Display",
      category: "Physics",
      date: "Feb 5, 2025",
      readTime: "5 min read",
      preview: "Experience quantum mechanics like never before with our new interactive exhibit featuring real-time particle visualization.",
      image: "/api/placeholder/800/600"
    },
    {
      id: 2,
      title: "Bio-luminescence Workshop Launch",
      category: "Biology",
      date: "Feb 3, 2025",
      readTime: "4 min read",
      preview: "Students can now explore the fascinating world of bio-luminescent organisms through hands-on experiments.",
      image: "/api/placeholder/800/600"
    },
    {
      id: 3,
      title: "Climate Science Data Visualization",
      category: "Environmental Science",
      date: "Feb 1, 2025",
      readTime: "6 min read",
      preview: "New interactive displays showing real-time climate data and its impact on global ecosystems.",
      image: "/api/placeholder/800/600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Latest Discoveries
            </h2>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Stay updated with our newest exhibits and workshops
            </p>
          </div>
          <Button
            variant="ghost"
            className="hidden md:inline-flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <span className="font-medium">View All</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <Badge className="bg-white/90 text-blue-600 hover:bg-white/95 transition-colors">
                      <Beaker className="w-3 h-3 mr-1" />
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2">
                    {item.preview}
                  </p>
                  <div className="flex items-center justify-between text-xs md:text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {item.readTime}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Button
            variant="ghost"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <span className="font-medium">View All Articles</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;