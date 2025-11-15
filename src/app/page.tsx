"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import WhoWeAreSection from "@/components/Home/WhoWeAre";
import CounterEffectStats from "@/components/Home/counterEffect";

const videos = [
  "/videos/Video_1.webm",
  "/videos/Video_2.webm",
  "/videos/Video_3.webm",
  "/videos/Video_4.webm",
  "/videos/Video_5.webm",
  "/videos/Video_6.webm",
  "/videos/Video_7.webm",
  "/videos/Video_8.webm",
];
const words = ["Making", "Solving", "Breaking"];
const MOBILE_BREAKPOINT = 1024; 

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);



const handleCarouselChange = (newIndex: number) => {
  // Pause all videos except newIndex
  videoRefs.current.forEach((video, idx) => {
    if (video && idx !== newIndex) {
      video.pause();
      video.currentTime = 0; 
    }
  });
  setActiveIndex(newIndex);
};


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentWord((prev) => (prev + 1) % words.length), 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let indicesToLoad: number[] = [];
    if (isMobile) {
      indicesToLoad = [activeIndex, (activeIndex + 1) % videos.length];
    } else {
      indicesToLoad = Array.from({ length: videos.length }, (_, i) => i);
    }
    const loadPromises = indicesToLoad.map((idx) =>
      new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.src = videos[idx];
        video.preload = "auto";
        video.oncanplaythrough = () => resolve();
      })
    );
    Promise.all(loadPromises).then(() => setVideosLoaded(true));
  }, [activeIndex, isMobile]);

  useEffect(() => {
    if (!videosLoaded) return;
    const video = videoRefs.current[activeIndex];
    if (!video) return;
    const next = () => setActiveIndex((prev) => (prev + 1) % videos.length);
    video.play().catch(() => {});
    const timeout = setTimeout(next, isMobile ? 12000 : 8000);
    video.addEventListener("ended", next);
    return () => {
      clearTimeout(timeout);
      video.removeEventListener("ended", next);
    };
  }, [activeIndex, videosLoaded, isMobile]);

const handleSwipe = (offsetX: number, velocityX: number) => {
  if (offsetX > 80 || velocityX > 500) {
    handleCarouselChange((activeIndex - 1 + videos.length) % videos.length);
  } else if (offsetX < -80 || velocityX < -500) {
    handleCarouselChange((activeIndex + 1) % videos.length);
  }
};


  // Carousel for desktop
  const getVisibleVideos = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + videos.length) % videos.length;
      visible.push({ index, offset: i });
    }
    return visible;
  };

  const sectionPadding = isMobile ? "py-6" : "py-10 lg:py-10";

  return (
    <main className="w-full overflow-x-hidden bg-black">
   <section className="relative min-h-[0] lg:min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* BG blobs */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className={`relative z-10 container mx-auto px-2 sm:px-4 lg:px-12 ${sectionPadding} flex flex-col min-h-[0]`}>
          {/* Mobile/Tablet */}
          {isMobile ? (
            <div className="w-full flex flex-col items-center">
              {/* Top 24px Margin */}
              <div style={{ height: '24px' }} />

              {/* Video Player */}         
                <div
                className="
                  w-full
                  aspect-video
                  rounded-2xl
                  overflow-hidden
                  p-[2px]
                  bg-gradient-to-r from-[#4F46E5] via-[#2563EB] to-[#00C6FF]
                "
                style={{
                  background:
                    "linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #00C6FF 100%)",
                }}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <motion.div
                    className="w-full h-full"
                    drag="x"
                    dragElastic={0.18}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, { offset, velocity }) => handleSwipe(offset.x, velocity.x)}
                  >
                    <video
                      ref={el => { videoRefs.current[activeIndex] = el; }}
                      src={videos[activeIndex]}
                      className="w-full h-full object-cover rounded-2xl"
                      autoPlay
                      muted
                      playsInline
                      preload="auto"
                      aria-label="Hero video"
                      style={{
                        display: "block", padding: 0, margin: 0,
                        borderRadius: "1rem" 
                      }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Dots with 24px Margin Below */}
              <div className="flex gap-2" style={{ marginTop: "24px", marginBottom: "24px" }}>
                {videos.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show video ${i + 1}`}
                    onClick={() => handleCarouselChange(i)}
                    className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-white" : "bg-gray-400/50"} transition-all duration-300`}
                    style={{ border: 'none', padding: 0, margin: 0 }}
                  />
                ))}
              </div>

              {/* Text below video and dots */}
              <div className="w-full px-4 pb-8 flex flex-col items-center">
                <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white text-center">
                  Learn Science Through
                  <div className="mt-1 bg-gradient-to-r from-[#4f46e5] via-white/90 to-[#00c6ff] bg-clip-text text-transparent">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWord}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                      >
                        {words[currentWord]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </h1>
                {/* Get Started button hidden on mobile/tablet */}
              </div>
            </div>
          ) : (
            // Desktop layout code here
           <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[70vh] lg:min-h-[80vh]">

              {/* Text area */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white space-y-6 lg:space-y-8"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  Learn Science Through
                  <div className="mt-2 bg-gradient-to-r from-[#4f46e5] via-white/90 to-[#00c6ff] bg-clip-text text-transparent">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWord}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block"
                      >
                        {words[currentWord]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl"
                >
                </motion.p>                      
              </motion.div>
    
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-[850px] aspect-video flex flex-col items-center justify-center mx-auto"
        >
          {/* Carousel Slides Layer */}
          <div className="relative w-full h-full flex items-center justify-center px-8 sm:px-12"> {/* px-* for side arrow space */}
            {getVisibleVideos().map(({ index, offset }) => {
              // Allow only -1, 0, 1, center is active
              const isActive = offset === 0;
              const isBgCard = Math.abs(offset) === 1;
              let scale = 1, opacity = 1, zIndex = 100;
              if (isBgCard) {
                scale = 0.60; // Much smaller
                opacity = 0.22; // Lower, almost only card shape visible
                zIndex = 10;  // active on top
              } else if (!isActive) {
                scale = 0.60; // offscreen/spacer
                opacity = 0;
                zIndex = 0;
              }
              // Each slot has a fixed xOffset so cards never go under the text
              const xOffset = offset * 300; // Detach background cards further from text
              
              return (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer"
                  style={{ zIndex }}
                  initial={false}
                  animate={{ x: xOffset, scale, opacity }}
                  transition={{ type: "spring", stiffness: 280, damping: 32 }}
                  onClick={() => handleCarouselChange(index)}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`Show video ${index + 1}`}
                  role="button"
                >
                  {/* Outer Card */}
                  <div
                    className={`relative w-full max-w-[800px] aspect-video rounded-2xl overflow-hidden shadow-2xl p-[2px] transition-all duration-300`}
                    style={{
                      background:
                        "linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #00C6FF 100%)",
                    }}
                  >
                    <motion.video
                      ref={el => { videoRefs.current[index] = el; }}
                      src={videos[index]}
                      className="w-full h-full object-cover rounded-2xl"
                      muted
                      playsInline
                      preload="auto"
                      animate={{ opacity: isActive ? 1 : 0.6 }} // lower bg video content
                      transition={{ duration: 0.5 }}
                      aria-label={`Demo video ${index + 1}`}
                      style={{
                        filter: isActive ? "none" : "brightness(0.35) blur(3px)", // Hide bg content, show only card
                        pointerEvents: isActive ? "auto" : "none"
                      }}
                    />
                    {/* No play button overlay! */}
                  </div>
                </motion.div>
              );
            })}
          {/* Carousel Arrows with explicit px-2, top-1/2 tweaks */}
          <button
            aria-label="Previous"
            onClick={() => handleCarouselChange((activeIndex - 1 + videos.length) % videos.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-200 p-3 bg-black/50 hover:bg-black/70 rounded-full border border-white/20"
            style={{ marginLeft: "8px" }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
          aria-label="Previous"
          onClick={() => handleCarouselChange((activeIndex - 1 + videos.length) % videos.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-[999] p-3 bg-black/50 hover:bg-black/70 rounded-full border border-white/20"
          style={{ marginLeft: "8px" }}
        >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            aria-label="Next"
            onClick={() => handleCarouselChange((activeIndex + 1) % videos.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-[999] p-3 bg-black/50 hover:bg-black/70 rounded-full border border-white/20"
            style={{ marginRight: "8px" }}
          >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

        </div>
              {/* Vertically stacked: Dots then Button */}
              <div className="flex flex-col items-center justify-center mt-12 gap-2 sm:gap-4 md:gap-6 w-full">

                <div className="flex gap-3 justify-center">
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show video ${i + 1}`}
                      onClick={() => handleCarouselChange(i)}
                      className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-white" : "bg-gray-400/50"} transition-all duration-300`}
                      style={{ border: 'none', padding: 0, margin: 0 }}
                    />
                  ))} 
                </div>
                <button
                  onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white hover:scale-105 transition-all duration-300"
                  style={{
                    border: "2px solid transparent",
                    background: "linear-gradient(black, black) padding-box, linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #00C6FF 100%) border-box",
                  }}
                >
                  Get Started
                  <ChevronDown className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
            </div>
          )}
        </div>
      </section>
      <WhoWeAreSection />
      <CounterEffectStats />
    </main>
  );
};

export default HomePage;
