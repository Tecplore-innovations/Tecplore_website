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

const DesktopGalleryModal = ({
  exhibit,
  onClose,
  nextExhibit,
  prevExhibit,
}: {
  exhibit: Exhibit;
  onClose: () => void;
  nextExhibit: () => void;
  prevExhibit: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto text-gray-900 relative flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-start justify-between w-full mb-4">
        <div>
          <h5 className="font-semibold text-3xl text-gray-800">{exhibit.title}</h5>
          <p className="text-md text-gray-600 mt-2">{exhibit.long}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* Images */}
      <div className="flex gap-4 overflow-x-auto py-2 scrollbar-hide h-36 mt-4">
        {exhibit.gallery.map((g, i) => (
          <div key={i} className="flex-shrink-0 w-60 h-full rounded-xl overflow-hidden shadow-lg">
            <img
              src={g}
              alt={`${exhibit.title}-gallery-${i}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-4 border-t pt-4 w-full">
        {exhibit.categories.map((c) => (
          <span key={c} className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-medium">{c}</span>
        ))}
      </div>
      {/* Next/Prev Exhibit — bottom right */}
      <div className="absolute right-6 bottom-6 flex gap-4">
        <button
          onClick={prevExhibit}
          className="border-1 border-blue-500 text-blue-700 rounded-full px-2 py-1 font-light hover:bg-blue-50 hover:border-blue-700 transition-shadow"
        >
          &lt; Prev Exhibit
        </button>
        <button
          onClick={nextExhibit}
              className="border-1 border-blue-500 text-blue-700 rounded-full px-2 py-1 font-light hover:bg-blue-50 hover:border-blue-700 transition-shadow"
        >
          Next Exhibit &gt;
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const GalleryImageModal = ({
  allImages,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  isMobile
}: {
  allImages: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isMobile: boolean;
}) => {
  const { src, alt } = allImages[currentIndex];
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Click on backdrop closes modal
    >
      <div
        className="relative max-w-full max-h-full flex items-center justify-center"
        onClick={e => e.stopPropagation()} // Prevent modal/inner click from closing
      >
        <motion.img
          src={src}
          alt={alt}
          className="max-h-[80vh] max-w-[90vw] rounded-lg shadow-lg object-contain"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
        />
        {/* Only render on desktop/tablet */}
        {!isMobile && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-100/80 hover:bg-white text-black shadow-lg flex items-center justify-center transition-all"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-100/80 hover:bg-white text-black shadow-lg flex items-center justify-center transition-all"
            >
              <ArrowRight className="w-7 h-7" />
            </button>           
          </>
        )}
      </div>
    </motion.div>
  );
};



export default function InteractiveExhibits() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"exhibit" | "gallery">("exhibit"); // New tab state
  const [galleryImageIndex, setGalleryImageIndex] = useState<number | null>(null);
  const [galleryPage, setGalleryPage] = useState(1);

 
  // Preload all images once when component mounts
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
  const ALL_CATEGORIES = Array.from(new Set(allExhibits.flatMap((ex) => ex.categories)));
  const filteredExhibits = filter
    ? allExhibits.filter((ex) => ex.categories.includes(filter))
    : allExhibits;

  // Find the currently expanded exhibit for the modal
  const expandedExhibit = allExhibits.find((ex) => ex.id === expanded);

   // Gather all gallery items
  const allGalleryItems = allExhibits.flatMap((ex) =>
    ex.gallery.map((imgSrc, idx) => ({
      src: imgSrc,
      alt: `${ex.title} - Image ${idx + 1}`,
    }))
  );
  
  // Gallery paging
  const pageSize = 15;
  const totalImages = allGalleryItems.length;
  const totalPages = Math.ceil(totalImages / pageSize);
  const pageImages = allGalleryItems.slice((galleryPage - 1) * pageSize, galleryPage * pageSize);

  // Gallery modal navigation handlers
  const openGalleryImage = (idx: number) => setGalleryImageIndex(idx);
  const closeGalleryImage = () => setGalleryImageIndex(null);
  const nextGalleryImage = () =>
    setGalleryImageIndex((idx: number | null) =>
      idx === null ? null : (idx + 1) % allGalleryItems.length
    );
  const prevGalleryImage = () =>
    setGalleryImageIndex((idx: number | null) =>
      idx === null ? null : (idx - 1 + allGalleryItems.length) % allGalleryItems.length
    );
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* --- Hero section --- */}
      <section
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="text-center lg:text-left mb-8 lg:mb-0 lg:absolute lg:left-8 lg:top-1/2 lg:-translate-y-1/2 lg:max-w-md z-10">
          <h2 className="text-xs uppercase text-gray-400 mb-3 tracking-widest">
            Interactive Exhibits
          </h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
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

        {/* Dots */}
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

      {/*  Explore Exhibits  */}
      <section className="bg-gray-100 text-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Filters + View Tabs */}
<div className="flex flex-col items-center justify-center gap-4 mb-8">
  <h3 className="text-2xl md:text-3xl font-semibold text-center">Explore Exhibits</h3>

  {/* View Mode Tabs */}
  <div className="flex items-center gap-4 justify-center">
    <button
      onClick={() => setViewMode("exhibit")}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        viewMode === "exhibit"
          ? "border border-blue-500 bg-gray-100 text-slate-700"
          : "border border-gray-500 bg-gray-100 text-black hover:bg-gray-200"
      }`}
    >
      Exhibit View
    </button>
    <button
      onClick={() => setViewMode("gallery")}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        viewMode === "gallery"
          ? "border border-blue-500 bg-gray-100 text-slate-700"
          : "border border-gray-500 bg-gray-100 text-black hover:bg-gray-200"
      }`}
    >
      Project Photos
    </button>
  </div>
</div>


      {/* Category Filters - only visible in EXHIBIT mode */}
        {viewMode === "exhibit" && (
          <div className="flex items-center gap-2 py-4 flex-wrap">
            <button
              onClick={() => setFilter(null)}
              className={`px-2 py-1 rounded-full text-sm font-medium transition-all ${
                filter === null ? "bg-slate-500 text-white" : "bg-white hover:bg-gray-200"
              }`}
            >
              All
            </button>

            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter((f) => (f === cat ? null : cat))}
                className={`px-2 py-1 rounded-full text-sm font-medium transition-all ${
                  filter === cat ? "bg-slate-400 text-white" : "bg-white hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

          {/* Content by View Mode */}
          {viewMode === "exhibit" ? (
            <>
              {/* Exhibit Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExhibits.map((ex) => (
                  <React.Fragment key={ex.id}>
                    <div
                      className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all cursor-pointer border border-gray-200"
                      onClick={() => {
                        if ("gallery" in ex && ex.gallery && ex.gallery.length > 0) {
                          handleExpand(ex.id);
                        }
                      }}
                    >
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
                              <p className="text-sm text-gray-600 line-clamp-2">{ex.short}</p>
                            )}
                          </div>
                        </div>
                      ) : "image" in ex && ex.image ? (
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
                              <p className="text-sm text-gray-600 line-clamp-2">{ex.short}</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <>
                          <h4 className="font-semibold text-lg mb-2">{ex.title}</h4>
                          <p className="text-sm text-gray-700 leading-relaxed">{ex.long}</p>
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

                      {/* Mobile Gallery Inline */}
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

              {/* Desktop Gallery Modal */}
              <AnimatePresence>
                {expandedExhibit &&
                  "gallery" in expandedExhibit &&
                  expandedExhibit.gallery.length > 0 &&
                  !isMobile && (
                    <DesktopGalleryModal
                      exhibit={expandedExhibit}
                      onClose={() => setExpanded(null)}

                        nextExhibit={() => {
                        const currIdx = filteredExhibits.findIndex(e => e.id === expandedExhibit.id);
                        const nextIdx = (currIdx + 1) % filteredExhibits.length;
                        setExpanded(filteredExhibits[nextIdx].id);
                      }}
                      prevExhibit={() => {
                        const currIdx = filteredExhibits.findIndex(e => e.id === expandedExhibit.id);
                        const prevIdx = (currIdx - 1 + filteredExhibits.length) % filteredExhibits.length;
                        setExpanded(filteredExhibits[prevIdx].id);
                      }}

                    />
                  )}
              </AnimatePresence>
            </>
          ) : (
            // Gallery View Mode
            <>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
           {pageImages.map(({ src, alt }, i) => (
                <div
                  key={i}
                  className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                 onClick={() => openGalleryImage((galleryPage - 1) * pageSize + i)}

                >
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
              
            </div>

              {/* Pagination Controls */}
              <div className="flex justify-end items-center gap-1 mt-2">
                <button
                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs bg-white text-gray-600 hover:bg-gray-50"
                  style={{ minWidth: 20, minHeight: 20 }}
                  onClick={() => setGalleryPage((prev) => Math.max(1, prev - 1))}
                  disabled={galleryPage === 1}
                >
                  &lt;
                </button>
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs mx-0.5 ${
                      galleryPage === idx + 1
                        ? "border-blue-500 bg-blue-100 text-blue-700 font-bold"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                    style={{ minWidth: 20, minHeight: 20 }}
                    onClick={() => setGalleryPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-xs bg-white text-gray-600 hover:bg-gray-50"
                  style={{ minWidth: 20, minHeight: 20 }}
                  onClick={() => setGalleryPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={galleryPage === totalPages}
                >
                  &gt;
                </button>
                </div>
            {/* Modal with Arrows */}
            <AnimatePresence>
              {galleryImageIndex !== null && (
                <GalleryImageModal
                  allImages={allGalleryItems}
                  currentIndex={galleryImageIndex}
                  onClose={closeGalleryImage}
                  onPrev={prevGalleryImage}
                  onNext={nextGalleryImage}
                  isMobile={isMobile}
                />
              )}
            </AnimatePresence>
        
            </>
          )}
        </div>
      </section>
    </div>
  );
}
