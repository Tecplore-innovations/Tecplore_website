"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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
    imageUrl: "/photos/interactive-exhibits/chladni_plate.jpg",
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


type GridSize = "small" | "medium" | "large";

const tileSizes: Record<GridSize, string> = {
  small: "w-40 h-40",
  medium: "w-60 h-60",
  large: "w-80 h-80",
};

const gridCols: Record<GridSize, string> = {
  small: "grid-cols-5",
  medium: "grid-cols-4",
  large: "grid-cols-3",
};

const InteractiveExhibitsGallery: React.FC = () => {
  const [gridSize, setGridSize] = useState<GridSize>("medium");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 md:px-8 py-16">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Interactive Exhibits at <span className="text-blue-600">Tecplore</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Explore our hands-on science and technology exhibits.
        </p>
      </div>

      {/* Top Controls */}
      <div className="max-w-6xl mx-auto flex justify-end gap-2 mb-6">
        {(["small", "medium", "large"] as GridSize[]).map((size) => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            className={`px-4 py-2 rounded-md border ${
              gridSize === size ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
          >
            {size.charAt(0).toUpperCase() + size.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div
        className={`grid gap-6 justify-center ${gridCols[gridSize]} max-w-6xl mx-auto`}
      >
        {exhibits.map((exhibit) => (
          <motion.div
            key={exhibit.id}
            className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer ${tileSizes[gridSize]}`}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={exhibit.imageUrl}
              alt={exhibit.title}
              fill
              className="object-cover transition-transform duration-300"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center text-center p-4">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-2">{exhibit.title}</h3>
              <p className="text-white text-sm md:text-base">{exhibit.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveExhibitsGallery;
