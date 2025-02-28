import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

// Define interfaces for type safety
interface HoverWordProps {
  children: React.ReactNode;
  color: string;
  image: string;
  alt: string;
  id: string;
}

interface BackgroundPatternProps {
  url: string;
  opacity?: number;
}

// Separate component for the background pattern
const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ url, opacity = 0.8 }) => {
  return (
    <div 
      className="absolute inset-0 z-0" 
      style={{ 
        backgroundImage: `url("${url}")`, 
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        opacity
      }}
    />
  );
};

// Main component
const WhoWeAre: React.FC = () => {
  // For scroll-triggered animations
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // State to track which tooltip is open (if any)
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  // Create refs for each text line
  const [line1Ref, line1InView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [line2Ref, line2InView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [line3Ref, line3InView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [line4Ref, line4InView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [line5Ref, line5InView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [line6Ref, line6InView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const [titleRef, titleInView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Transform values based on scroll progress
  // const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.3]);

  // Component for underlined words with hover effect
  const HoverWord: React.FC<HoverWordProps> = ({ children, color, image, alt, id }) => {
    const isOpen = openTooltip === id;
    
    const handleToggle = () => {
      if (isOpen) {
        setOpenTooltip(null);
      } else {
        setOpenTooltip(id);
      }
    };
    
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip open={isOpen} onOpenChange={(open) => {
          if (!open) setOpenTooltip(null);
          else setOpenTooltip(id);
        }}>
          <TooltipTrigger asChild>
            <span 
              className={`${color} inline-block relative underline underline-offset-4 decoration-2 cursor-pointer transition-all duration-300 hover:opacity-80`}
              onClick={handleToggle}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleToggle();
              }}
            >
              {children}
            </span>
          </TooltipTrigger>
          <TooltipContent side="top" align="center" className="w-64 sm:w-72 p-0 border-none shadow-2xl rounded-none overflow-hidden z-50">
            <div className="relative h-36 sm:h-48 w-full">
              <Image
                src={image}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white font-medium text-sm">{alt}</p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[75vh] md:min-h-screen py-12 md:py-32 flex items-center" 
      aria-labelledby="who-we-are-heading"
    >
      {/* Pattern background */}
      <BackgroundPattern url="/patterns/webb.png" />
      
      {/* Scroll progress overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-blue-50/10 to-green-50/10 z-1"
        style={{ opacity: backgroundOpacity }}
      />

      {/* Grid container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-16 items-start">
        {/* WHO WE ARE section - left column */}
        <div className="md:col-span-3 md:sticky top-24 self-start mb-2 md:mb-0">
          <div ref={titleRef}>
            <motion.div 
              className="inline-block border border-gray-300 bg-white/80 backdrop-blur-sm rounded-none px-5 py-3 text-sm font-medium tracking-wider shadow-sm transition-all duration-300 hover:shadow-md"
              animate={{
                opacity: titleInView ? 1 : 0,
                x: titleInView ? 0 : -20,
                transition: { duration: 0.5 }
              }}
              initial={{ opacity: 0, x: -20 }}
            >
              <h1 id="who-we-are-heading" className="uppercase">Who We Are</h1>
            </motion.div>
          </div>
        </div>
        
        {/* Content section - right column */}
        <div className="md:col-span-9 text-left space-y-6 md:space-y-12">
          {/* First heading with animated lines */}
          <div className="text-3xl md:text-5xl lg:text-7xl font-medium leading-tight lg:leading-[1.1]">
            {/* Line 1 */}
            <div className="overflow-hidden mb-0 sm:mb-0" ref={line1Ref}>
              <motion.div
                className="inline-block py-0.5 md:py-1"
                animate={{
                  opacity: line1InView ? 1 : 0,
                  y: line1InView ? 0 : 50,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                }}
                initial={{ opacity: 0, y: 50 }}
              >
                Be it an Institute, <HoverWord 
                  id="makerspace"
                  color="text-blue-600"
                  image="/photos/whoweare/makerspace.jpg"
                  alt=""
                >Makerspace</HoverWord>
              </motion.div>
            </div>
            
            {/* Line 2 */}
            <div className="overflow-hidden mb-0 sm:mb-0" ref={line2Ref}>
              <motion.div
                className="inline-block py-0"
                animate={{
                  opacity: line2InView ? 1 : 0,
                  y: line2InView ? 0 : 50,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
                }}
                initial={{ opacity: 0, y: 50 }}
              >
                or Cafe, enable unique <HoverWord 
                  id="experience"
                  color="text-green-600"
                  image="/photos/whoweare/experience.jpg"
                  alt=""
                >experience</HoverWord> fostering maker
              </motion.div>
            </div>
            
            {/* Line 3 */}
            <div className="overflow-hidden mb-0 sm:mb-0" ref={line3Ref}>
              <motion.div
                className="inline-block py-1"
                animate={{
                  opacity: line3InView ? 1 : 0,
                  y: line3InView ? 0 : 50,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
                }}
                initial={{ opacity: 0, y: 50 }}
              > spirit and&nbsp;
                <HoverWord 
                  id="diy"
                  color="text-red-600"
                  image="/photos/whoweare/diy.jpg"
                  alt=""
                >DIY</HoverWord> attitude.
              </motion.div>
            </div>
          </div>
          
          {/* Second heading with animated lines */}
          <div className="text-3xl md:text-5xl lg:text-7xl font-medium leading-tight lg:leading-[1.1] text-gray-800">
            {/* Line 4 */}
            <div className="overflow-hidden mb-0 sm:mb-0" ref={line4Ref}>
              <motion.div
                className="inline-block py-0"
                animate={{
                  opacity: line4InView ? 1 : 0,
                  y: line4InView ? 0 : 50,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }
                }}
                initial={{ opacity: 0, y: 50 }}
              >
                Build Science temperament
              </motion.div>
            </div>
            
            {/* Line 5 */}
            <div className="overflow-hidden mb-0 sm:mb-0" ref={line5Ref}>
              <motion.div
                className="inline-block py-0"
                animate={{
                  opacity: line5InView ? 1 : 0,
                  y: line5InView ? 0 : 50,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
                }}
                initial={{ opacity: 0, y: 50 }}
              >
                among the next generation
              </motion.div>
            </div>
            
            {/* Line 6 */}
            <div className="overflow-hidden mb-0 sm:mb-0" ref={line6Ref}>
              <motion.div
                className="inline-block py-0"
                animate={{
                  opacity: line6InView ? 1 : 0,
                  y: line6InView ? 0 : 50,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }
                }}
                initial={{ opacity: 0, y: 50 }}
              >
                through hands-on activities.
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;