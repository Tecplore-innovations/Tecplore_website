"use client";

import React, { useState, useRef, useEffect } from "react";
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
  { id: 1, title: "Curved Carrom", imageUrl: "/photos/interactive-exhibits/ellipse1.jpeg", description: "Ellipses, Focal Points, Reflection & Convergence, Geometry in Motion." },
  { id: 2, title: "Wind Tunnel", imageUrl: "/photos/interactive-exhibits/wind tunnel.jpeg", description: "Bernoulli’s Principle, Aerodynamics, Drag & Lift Forces, Pressure Differences." },
  { id: 3, title: "Static Rocket Model", imageUrl: "/photos/interactive-exhibits/static rocket.jpeg", description: "Rocket Staging, Thrust, Fuel Mass, Newton’s Laws of Motion." },
  { id: 4, title: "Projectile Launcher", imageUrl: "/photos/interactive-exhibits/teachers_projectile.jpg", description: "Projectile Motion, Parabolic Trajectories, Gravity, Launch Angles & Velocity." },
  { id: 5, title: "Stream Table", imageUrl: "/photos/interactive-exhibits/stream_table.jpg", description: "Erosion & Deposition, River Meanders, Sediment Transport, Delta Formation." },
  { id: 6, title: "Chladni Plate", imageUrl: "/photos/interactive-exhibits/chladni plate.jpg", description: "Resonance, Standing Waves, Frequency & Harmonics, Vibration Patterns." },
  { id: 7, title: "Musical Pipes", imageUrl: "/photos/interactive-exhibits/musical_pipes.jpg", description: "Pitch & Frequency, Wavelengths, Standing Waves in Air Columns." },
  { id: 8, title: "Vertical Wind Tunnel", imageUrl: "/photos/interactive-exhibits/aero tower.jpg", description: "Airflow & Lift, Gravity vs Thrust, Stability & Aerodynamics in Flight." },
  { id: 9, title: "Molecular Structure Builder", imageUrl: "/photos/interactive-exhibits/molecular block.jpg", description: "Atoms & Elements, Valency, Chemical Bonding, Molecular Geometry." },
  { id: 10, title: "DIY Electronics Lab", imageUrl: "/photos/interactive-exhibits/diy_electronics.jpg", description: "Circuits, Current & Voltage, Components & Sensors, Real-world Engineering." }
];

// ✅ Hook to check text truncation + recompute on grid change + resize
// ✅ Hook to check text truncation + recompute on grid change + resize
const useIsTruncated = (
  ref: React.RefObject<HTMLElement | null>,
  dependency: any
) => {
  const [truncated, setTruncated] = useState(false);

  const checkTruncation = () => {
    const el = ref.current;
    if (!el) return;
    setTruncated(el.scrollHeight > el.clientHeight);
  };

  useEffect(() => {
    requestAnimationFrame(checkTruncation);

    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, [dependency]);

  return truncated;
};



const gridOptions: [GridSize, React.ComponentType<any>][] = [
  ["compact", Grid3x3],
  ["comfortable", Grid2x2],
  ["spacious", LayoutGrid],
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
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Interactive Exhibits</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                by <span className="text-blue-600 font-semibold">Tecplore</span>
              </p>
            </div>

           {/* Grid Selector */}
<div className="hidden sm:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
  {gridOptions.map(([size, Icon]) => (
    <button
      key={size}
      onClick={() => setGridSize(size)}
      className={`p-2 rounded-md transition-all ${
        gridSize === size
          ? "bg-white shadow-sm text-blue-600"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      <Icon className="w-5 h-5" />
    </button>
  ))}
</div>

          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className={`grid ${gridConfig[gridSize]} gap-4 sm:gap-6`}>
          {exhibits.map((exhibit, index) => {
            const ref = useRef<HTMLParagraphElement>(null);
           const isTruncated = useIsTruncated(ref, gridSize);


            return (
              <motion.div
                key={exhibit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                  <Image
                    src={exhibit.imageUrl}
                    alt={exhibit.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {isTruncated && (
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-4">
                      <p className="text-white text-sm sm:text-base leading-relaxed">
                        {exhibit.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Title + Truncated Text */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                    {exhibit.title}
                  </h3>

                  <p ref={ref} className="text-sm sm:text-base text-gray-600 line-clamp-2">
                    {exhibit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>  
    </div>
  );
};

export default InteractiveExhibitsGallery;
