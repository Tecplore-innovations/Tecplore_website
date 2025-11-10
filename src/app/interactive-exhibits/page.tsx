"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { showcases, moreExhibits, Showcase, MoreExhibit } from "./exhibits";

type Exhibit = Showcase | MoreExhibit; // unified type

const VARIATION_MS = 4000;

function preloadImages(paths: string[]) {
  paths.forEach((path) => {
    const img = new Image();
    img.src = path;
  });
}



// Helper component for the Expanded Desktop Gallery (Modal)
const DesktopGalleryModal = ({
  exhibit,
  onClose,
}: {
  exhibit: Exhibit;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose} // Close when clicking outside
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto text-gray-900"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h5 className="font-bold text-3xl text-gray-800">{exhibit.title}</h5>
            <p className="text-md text-gray-600 mt-2">{exhibit.long}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all shadow-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal scroll gallery with fixed height - MADE SMALLER (h-36) */}
        <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide h-36 mt-4">
          {exhibit.gallery.map((g, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-60 h-full rounded-xl overflow-hidden shadow-lg" // Added rounded-xl and shadow
            >
              <img
                src={g}
                alt={`${exhibit.title}-gallery-${i}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg" // Rounded corners on image (rounded-lg = 2dp more than rounded-xl)
              />
            </div>
          ))}
        </div>
        
        {/* Categories (optional, moved here for completeness) */}
        <div className="flex flex-wrap gap-2 mt-4 border-t pt-4">
          {exhibit.categories.map((c) => (
            <span
              key={c}
              className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function InteractiveExhibits() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Preload all images once when component mounts
  useEffect(() => {
    const showcaseImages = showcases.flatMap(
      (item) => [...(item.images || []), ...(item.gallery || [])]
    );
    const moreExhibitImages = moreExhibits.flatMap((item) => [...(item.gallery || [])]);
    const allImages = Array.from(new Set([...showcaseImages, ...moreExhibitImages]));
    preloadImages(allImages);
  }, []);


  // Detect mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % showcases.length);
    }, VARIATION_MS);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goNext = () => setIndex((i) => (i + 1) % showcases.length);
  const goPrev = () => setIndex((i) => (i - 1 + showcases.length) % showcases.length);
  const goTo = (i: number) => setIndex(i);
  const handleExpand = (id: number) => setExpanded((prev) => (prev === id ? null : id));

  // Merge showcases + more exhibits
  const allExhibits: Exhibit[] = [...showcases, ...moreExhibits];

  // Filter logic
  const ALL_CATEGORIES = Array.from(
    new Set(allExhibits.flatMap((ex) => ex.categories))
  );
  const filteredExhibits = filter
    ? allExhibits.filter((ex) => ex.categories.includes(filter))
    : allExhibits;

  // Find the currently expanded exhibit for the modal
  const expandedExhibit = allExhibits.find((ex) => ex.id === expanded);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* --- HERO SECTION  --- */}
      <section
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:absolute lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-md z-10">
          <h2 className="text-xs uppercase text-gray-400 mb-3 tracking-widest">
            Interactive Exhibits
          </h2>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {showcases[index].title}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {showcases[index].short}
          </p>
        </div>

        {/* Cards */}
        <div className="relative lg:ml-auto lg:mr-0 lg:w-2/3 h-[500px] md:h-[600px] lg:h-[700px]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={showcases[index].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              {/* Top Right Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="absolute top-0 right-0 
                w-[90%] sm:w-[80%] h-[45%]
                md:w-[60%] lg:w-[55%] md:h-[50%] lg:h-[55%]
                translate-y-2 
                rounded-2xl overflow-hidden shadow-2xl
                [clip-path:polygon(0_0,100%_0,100%_100%,25%_100%,0_75%)]
                md:[clip-path:polygon(0_0,100%_0,100%_90%,0_100%)]
                lg:[clip-path:polygon(0_0,100%_0,100%_100%,25%_100%,0_75%)]"
              >
                <img
                  src={
                    isMobile
                      ? showcases[index].images[0]
                      : showcases[index].images[1]
                  }
                  alt={showcases[index].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Bottom Left Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="absolute bottom-0 left-0 
                w-[90%] sm:w-[80%] h-[45%]
                md:w-[60%] lg:w-[55%] md:h-[50%] lg:h-[55%]
                -translate-y-2
                rounded-2xl overflow-hidden shadow-2xl
                [clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,0_100%)]
                md:[clip-path:polygon(0_10%,100%_0,100%_100%,0_100%)]
                lg:[clip-path:polygon(0_0,75%_0,100%_25%,100%_100%,0_100%)]"
              >
                <img
                  src={
                    isMobile
                      ? showcases[index].images[1]
                      : showcases[index].images[0]
                  }
                  alt={showcases[index].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={goPrev}
            className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md text-white shadow-lg flex items-center justify-center hover:bg-black/70 transition-all z-20"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goNext}
            className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md text-white shadow-lg flex items-center justify-center hover:bg-black/70 transition-all z-20"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots  */}
        <div className="flex justify-center gap-2 mt-8 lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 lg:mt-0">
          {showcases.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "bg-white w-8" : "bg-gray-600 w-2"
              }`}
            />
          ))}
        </div>
      </section>

    

    
      {/* ---------- Explore Exhibits ---------- */}
<section className="bg-gray-100 text-gray-900 py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Header + Filters */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <h3 className="text-2xl md:text-3xl font-bold">Explore Exhibits</h3>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            filter === null
              ? "bg-black text-white"
              : "bg-white hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter((f) => (f === cat ? null : cat))}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>

    {/* Card Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredExhibits.map((ex) => (
        <React.Fragment key={ex.id}>
          {/* Exhibit Card */}
          <div
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all cursor-pointer border border-gray-200"
            onClick={() => {
              if ("gallery" in ex && ex.gallery && ex.gallery.length > 0) {
                handleExpand(ex.id);
              }
            }}
          >
            {/* Header / Image */}
            {"images" in ex && ex.images ? (
            
              <div className="flex gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={ex.images[0]}
                    alt={ex.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-lg mb-2">{ex.title}</h4>
                  {"short" in ex && ex.short && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {ex.short}
                    </p>
                  )}
                </div>
              </div>
            ) : "image" in ex && ex.image ? (

              // --- MoreExhibit with single image ---

               <div className="flex gap-4">
               <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={ex.image}
                alt={ex.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
                <div className="flex-1 min-w-0">

                <h4 className="font-semibold text-lg mb-2">{ex.title}</h4>
                {ex.short && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {ex.short}
                  </p>
                )}
                </div>
              </div>
            ) : (
              // --- Fallback text-only exhibit ---
              <>
                <h4 className="font-semibold text-lg mb-2">{ex.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {ex.long}
                </p>
              </>
            )}

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {ex.categories.map((c) => (
                <span
                  key={c}
                  className="bg-gray-100 rounded-full px-3 py-1 text-xs"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Mobile Gallery (Inline) */}
            <div className="block lg:hidden">
              <AnimatePresence>
                {expanded === ex.id &&
                  "gallery" in ex &&
                  ex.gallery.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200"
                    >
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(null);
                          }}
                          className="hidden sm:flex absolute top-2 right-2 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 items-center justify-center transition-all shadow-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">{ex.long}</p>

                      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                        {ex.gallery.map((g, i) => (
                          <div
                            key={i}
                            className="flex-shrink-0 w-40 h-40 rounded-xl overflow-hidden snap-center"
                          >
                            <img
                              src={g}
                              alt={`${ex.title}-gallery-${i}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </AnimatePresence>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  </div>
</section>

{/* --- DESKTOP GALLERY MODAL --- */}
<AnimatePresence>
  {expandedExhibit &&
    "gallery" in expandedExhibit &&
    expandedExhibit.gallery.length > 0 &&
    !isMobile && (
      <DesktopGalleryModal
        exhibit={expandedExhibit}
        onClose={() => setExpanded(null)}
      />
    )}
</AnimatePresence>

    </div>
  );
}