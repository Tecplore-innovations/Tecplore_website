"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import AboutSection from '@/components/Home/AboutSection';
import HowItWorks from '@/components/Home/HowItWorks';
import TrustStrip from '@/components/Home/TrustStrip';
import CtaSection from '@/components/shared/CtaSection';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DESIGN_CALL, POSITIONING } from '@/lib/site';

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
const MOBILE_BREAKPOINT = 1024;

const heroHeadline = (
  <>
    We design <span className="text-primary">science learning experiences</span> for NGO and CSR programmes, schools and public spaces.
  </>
);

const HomePage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const aboutSectionRef = useRef<HTMLElement>(null);


  const scrollToAboutSection = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };


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
    <main className="w-full overflow-x-hidden ">
   <section className="relative min-h-[0] lg:min-h-[calc(100vh-4rem)] w-full border-b border-border bg-background overflow-hidden">

        <div className={`relative z-10 container mx-auto px-2 sm:px-4 lg:px-12 ${sectionPadding} flex flex-col min-h-[0]`}>
          {/* Mobile/Tablet */}
          {isMobile ? (
            <div className="w-full flex flex-col items-center pt-2">

              {/* Headline first, so the positioning is the first thing read */}
              <div className="w-full px-4 pt-4 pb-8 flex flex-col items-center text-center">
                <h1 className="text-3xl sm:text-4xl font-semibold leading-tight text-foreground">
                  {heroHeadline}
                </h1>
                <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-body">
                  {POSITIONING.subhead}
                </p>
                <Button asChild size="lg" className="mt-6">
                  <Link href={DESIGN_CALL.href}>{DESIGN_CALL.label}</Link>
                </Button>
              </div>

              {/* Video Player */}
                <div
                className="w-full aspect-video rounded-card overflow-hidden border-2 border-primary"
              >
                <div className="w-full h-full rounded-card overflow-hidden">
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
                      className="w-full h-full object-cover rounded-card"
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
                    className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-primary" : "bg-input"} transition-all duration-300`}
                    style={{ border: 'none', padding: 0, margin: 0 }}
                  />
                ))}
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
                className="text-foreground space-y-6 lg:space-y-8"
              >
                <h1 className="text-4xl xl:text-5xl font-semibold leading-tight">
                  {heroHeadline}
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg xl:text-xl text-body leading-relaxed max-w-xl"
                >
                  {POSITIONING.subhead}
                </motion.p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg">
                    <Link href={DESIGN_CALL.href}>{DESIGN_CALL.label}</Link>
                  </Button>
                  <Button size="lg" variant="secondary" onClick={scrollToAboutSection}>
                    See What We Do
                    <ChevronDown />
                  </Button>
                </div>
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
                opacity = 0; // Only the active video is shown
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
                    className="relative w-full max-w-[800px] aspect-video rounded-card overflow-hidden shadow-2xl border-2 border-primary transition-all duration-300"
                  >
                    <motion.video
                      ref={el => { videoRefs.current[index] = el; }}
                      src={videos[index]}
                      className="w-full h-full object-cover rounded-card"
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
          className="media-control absolute left-4 top-1/2 -translate-y-1/2 z-[999]"
        >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            aria-label="Next"
            onClick={() => handleCarouselChange((activeIndex + 1) % videos.length)}
            className="media-control absolute right-4 top-1/2 -translate-y-1/2 z-[999]"
          >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

        </div>
              {/* Carousel dots */}
              <div className="flex flex-col items-center justify-center mt-12 w-full">

                <div className="flex gap-3 justify-center">
                  {videos.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Show video ${i + 1}`}
                      onClick={() => handleCarouselChange(i)}
                      className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-primary" : "bg-input"} transition-all duration-300`}
                      style={{ border: 'none', padding: 0, margin: 0 }}
                    />
                  ))} 
                </div>
              </div>
            </motion.div>
            </div>
          )}
        </div>
      </section>
     <TrustStrip />
     <AboutSection ref={aboutSectionRef} />
     <HowItWorks />
     <CtaSection />
    </main>
  );
};

export default HomePage;
