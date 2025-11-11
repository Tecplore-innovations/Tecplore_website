"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import WhoWeAreSection from "@/components/Home/WhoWeAre";
import CounterEffectStats from "@/components/Home/counterEffect";


const HomePage = () => {
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

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const words = ["Making", "Solving", "Breaking"];
  const [currentWord, setCurrentWord] = useState(0);

  const [isMobile, setIsMobile] = useState(false);


  
  useEffect(() => {
    if (typeof window === "undefined") {
      return; // safely exit during SSR — fixes "not all code paths return a value"
    }

    setIsMobile(window.innerWidth < 640);

    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    },2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
    const loadPromises = videos.map((src) => {
      return new Promise<void>((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.preload = "auto";
        video.oncanplaythrough = () => resolve();
      });
    });
    Promise.all(loadPromises).then(() => setVideosLoaded(true));
  }, [videos]);

  useEffect(() => {
    if (!videosLoaded) return;
    const currentVideo = videoRefs.current[activeIndex];
    if (!currentVideo) return;

    const next = () => setActiveIndex((prev) => (prev + 1) % videos.length);
    currentVideo.play().catch(console.warn);

    const timeout = setTimeout(next, 10000);
    currentVideo.addEventListener("ended", next);

    return () => {
      clearTimeout(timeout);
      currentVideo.removeEventListener("ended", next);
    };
  }, [activeIndex, videosLoaded, videos.length]);

  const handleVideoClick = (index: number) => {
    if (index === activeIndex) {
      const video = videoRefs.current[activeIndex];
      if (video) {
        if (video.paused) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }
    } else {
      setActiveIndex(index);
      setIsPlaying(true);
    }
  };

  const getVisibleVideos = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (activeIndex + i + videos.length) % videos.length;
      visible.push({ index, offset: i });
    }
    return visible;
  };


  void isPlaying;


  return (
    <main className="w-full overflow-x-hidden bg-black">
      {/* 🎬 Hero Section */}
     <section className="relative min-h-[75vh] sm:min-h-screen w-full bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
        {/* background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

     
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-12 lg:py-20">

         <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[50vh] sm:min-h-screen">

            {/* 🧠 Text */}
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {/* Gradient Stroke Button with Down Icon */}
                <button
                  onClick={() => {
                     if (typeof window !== "undefined") {
                    window.scrollBy({
                      top: window.innerHeight,
                      behavior: "smooth",
                    });
                  }
                  }}
                   className="hidden sm:inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white hover:scale-105 transition-all duration-300"
                style={{
                  border: "2px solid transparent",
                  background:
                    "linear-gradient(black, black) padding-box, linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #00C6FF 100%) border-box",
                }}
              >
                Get Started
                <ChevronDown className="w-5 h-5 text-white" />
              </button>
              </motion.div>
            </motion.div>

            {/* 🎥 Video Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center perspective-1000 px-2 sm:px-4 md:px-8">
                {getVisibleVideos().map(({ index, offset }) => {
                  const isActive = offset === 0;
                  const scale = isActive ? 1.1 : 0.8 - Math.abs(offset) * 0.05;
                  const opacity = isActive ? 1 : 0.4 - Math.abs(offset) * 0.1;
                  const zIndex = 50 - Math.abs(offset);
                 const xOffset = offset * (isMobile ? 100 : 200);


                  return (
                    <motion.div
                      key={index}
                      className="absolute cursor-pointer"
                      style={{ zIndex }}
                      initial={false}
                      animate={{ x: xOffset, scale, opacity }}
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                      onClick={() => handleVideoClick(index)}
                    >
                      <div
                        className={`relative ${
                          isActive
                            ? "w-[300px] sm:w-[400px] md:w-[480px] h-[200px] sm:h-[280px] md:h-[340px]"
                            : "w-[240px] sm:w-[320px] md:w-[360px] h-[160px] sm:h-[220px] md:h-[260px]"
                        } rounded-2xl overflow-hidden shadow-2xl p-[2px] transition-all duration-300`}
                        style={{
                          background:
                            "linear-gradient(135deg, #4F46E5 0%, #2563EB 50%, #00C6FF 100%)",
                        }}
                      >
                        <motion.video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          src={videos[index]}
                          className="w-full h-full object-cover rounded-2xl"
                          muted
                          playsInline
                          preload="auto"
                          animate={{ opacity: isActive ? 1 : 0.7 }}
                          transition={{ duration: 0.5 }}
                        />
                        {!isActive && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Play className="w-10 h-10 text-white opacity-80" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Arrows */}
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full border border-white/20"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % videos.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full border border-white/20"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

  
      <WhoWeAreSection />

      <CounterEffectStats />

    </main>
  );
};

export default HomePage;
