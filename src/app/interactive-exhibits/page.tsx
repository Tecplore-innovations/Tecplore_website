"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Grid3x3, Grid2x2, LayoutGrid } from "lucide-react";

interface Exhibit {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
}

const exhibits: Exhibit[] = [
  {
    id: 1,
    title: "DIY Electronics Lab",
    imageUrl: "/photos/interactive-exhibits/diy_electronics.jpg",
    description: "Hands-on electronics experiments to learn circuits, LEDs, and sensors.",
  },
  {
    id: 2,
    title: "Wind Tunnel Explorer",
    imageUrl: "/photos/wt1.jpeg",
    description: "Explore aerodynamics and wind resistance in interactive wind tunnels.",
  },
  {
    id: 3,
    title: "Molecular Structure Builder",
    imageUrl: "/photos/interactive-exhibits/molecular block.jpg",
    description: "Build molecules using interactive models to learn chemistry concepts.",
  },
  {
    id: 4,
    title: "Projectile Launcher",
    imageUrl: "/photos/interactive-exhibits/teachers_projectile.jpg",
    description: "Explore motion and gravity by launching objects at different angles to study their flight paths.",
  },
  {
    id: 5,
    title: "Stream Table",
    imageUrl: "/photos/interactive-exhibits/stream_table.jpg",
    description: "Simulate river flow and erosion patterns with hands-on water experiments.",
  },
  {
    id: 6,
    title: "Chladni Plate",
    imageUrl: "/photos/interactive-exhibits/chladni plate.jpg",
    description: "Visualize sound vibrations by creating intricate patterns with sand on a vibrating plate.",
  },
  {
    id: 7,
    title: "Musical Pipes",
    imageUrl: "/photos/interactive-exhibits/musical_pipes.jpg",
    description: "Discover acoustics and sound waves by playing with pipes of different lengths.",
  },
  {
    id: 8,
    title: "Vertical Wind Tunnel",
    imageUrl: "/photos/interactive-exhibits/vertical_wind_tunnel.jpg",
    description: "Experience the thrill of flight and aerodynamics by floating in a vertical wind tunnel.",
  },
  {
    id: 9,
    title: "3D Hologram",
    imageUrl: "/photos/interactive-exhibits/3d_hologram.jpg",
    description: "Explore futuristic 3D holographic displays and interactive projections.",
  },
];

type GridSize = "compact" | "comfortable" | "spacious";

const InteractiveExhibitsGallery: React.FC = () => {
  const [gridSize, setGridSize] = useState<GridSize>("comfortable");

  const gridConfig = {
    compact: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
    comfortable: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    spacious: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Interactive Exhibits
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                by <span className="text-blue-600 font-semibold">Tecplore</span>
              </p>
            </div>
            
            {/* Desktop View Controls */}
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setGridSize("compact")}
                className={`p-2 rounded-md transition-all ${
                  gridSize === "compact"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                title="Compact view"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setGridSize("comfortable")}
                className={`p-2 rounded-md transition-all ${
                  gridSize === "comfortable"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                title="Comfortable view"
              >
                <Grid2x2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setGridSize("spacious")}
                className={`p-2 rounded-md transition-all ${
                  gridSize === "spacious"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                title="Spacious view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className={`grid ${gridConfig[gridSize]} gap-4 sm:gap-6`}>
          {exhibits.map((exhibit, index) => (
            <motion.div
              key={exhibit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
             
            >
              {/* Image Container with fixed aspect ratio */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                <Image
                  src={exhibit.imageUrl}
                  alt={exhibit.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {exhibit.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 line-clamp-2">
                  {exhibit.description}
                </p>
              </div>          
            </motion.div>
          ))}
        </div>
      </div>  
    </div>
  );
};

export default InteractiveExhibitsGallery;