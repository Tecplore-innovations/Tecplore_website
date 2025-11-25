
"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FlaskConical, Brain, Users, Atom } from "lucide-react";

// --- Data ---
const stats = [
  { 
    value: 50, 
    suffix: "+", 
    label: "Interactive Exhibits", 
    description: "Hands-on STEM learning modules deployed",
    icon: FlaskConical,
  },
  { 
    value: 95, 
    suffix: "%", 
    label: "Concept Retention", 
    description: "Observed retention rate among students",
    icon: Brain,
  },
  { 
    value: 50, 
    suffix: "+", 
    label: "Teachers Trained", 
    description: "Empowered in experiential learning",
    icon: Users,
  },
  { 
    value: 8, 
    suffix: "+", 
    label: "Core Themes", 
    description: "Spanning Maths, Geology, Space & more",
    icon: Atom,
  },
];

// --- Specialized Counter Component (Fixed in previous step) ---
const Counter = ({ value }: { value: number }) => {

  const elementRef = useRef<HTMLSpanElement>(null);
  // Corrected 'once' to 'triggerOnce' and correct useInView signature
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 }); 
  
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (inView) spring.set(value); 
  }, [inView, value, spring]);

 useEffect(() => display.on("change", (latest) => {
    if (elementRef.current) elementRef.current.textContent = latest.toString();
  }), [display]);

  const setRefs = React.useCallback((node: HTMLSpanElement | null) => {
    elementRef.current = node; 
    ref(node); 
  }, [ref]);

  return <span ref={setRefs} />;
};


// --- Combined Component (FIXED TYPE DEFINITION) ---
// Change {} to object
const AboutSection = React.forwardRef<HTMLElement, object>(({ }, ref) => {
  const containerRef = useRef(null);
  
  // Note: If you encounter triggerOnce errors here, fix them as demonstrated in Counter
  const [titleRef, titleInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [contentRef, contentInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsHeaderRef, statsHeaderInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // Framer Motion Scroll Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 0.4, 0.4, 0.2]);

  return (
    <section 
      ref={ref} 
      className="relative w-full py-20 sm:py-28 md:py-36 flex flex-col gap-24 items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >

      {/* --- 1. Animated Background Pattern (Shared) --- */}
      <motion.div 
       className="absolute inset-0 z-0 opacity-30"
       style={{ 
         backgroundImage: 'url("/patterns/webb.png")',
         backgroundRepeat: 'repeat',
         backgroundSize: 'auto',
         y: backgroundY,
         opacity: backgroundOpacity
       }}
      />
      {/* ... rest of the component content ... */}
      
      {/* 2. Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-400/10 rounded-full blur-3xl"
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-green-400/10 rounded-full blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* --- Section A: What We Do (from WhoWeAre) --- */}
      <div className="relative z-10 max-w-5xl sm:max-w-6xl md:max-w-7xl mx-auto px-6 sm:px-8 md:px-16 w-full">
        {/* Title */}
        <div ref={titleRef} className="mb-8 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={titleInView ? {
              opacity: 1,
              x: 0,
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            } : {}}
          >
           <div className="inline-flex items-center gap-3 sm:gap-4">
            <motion.div 
              className="h-1 bg-gradient-to-r from-blue-600 to-green-600 w-16 sm:w-20"
              initial={{ scaleX: 0 }}
              animate={titleInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
            <h1 className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-gray-800">
              What We Do
            </h1>
          </div>
          </motion.div>
        </div>

        {/* Main statement */}
        <div ref={contentRef} className="space-y-4 sm:space-y-5 md:space-y-6">
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-snug sm:leading-tight md:leading-tight space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-800 break-words"
            >
              We build <span className="font-light text-blue-600">interactive science exhibits</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-800 break-words"
            >
              and set up <span className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">maker spaces</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-gray-700 break-words text-base sm:text-lg md:text-xl lg:text-2xl"
            >
              that spark curiosity.
            </motion.div>
          </div>

          {/* Decorative divider */}
          <motion.div 
            className="mt-8 sm:mt-12 flex items-center gap-4"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={contentInView ? { 
              opacity: 1, 
              scaleX: 1,
              transition: { duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
            } : {}}
            style={{ transformOrigin: 'left' }}
          >
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <div className="w-2 h-2 rounded-full bg-green-600" />
              <div className="w-2 h-2 rounded-full bg-red-600" />
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
          </motion.div>
        </div>
      </div>
      
      {/* --- Section B: Stats Grid (from CounterEffectStats) --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full mt-16">
        
        {/* --- Section Header --- */}
        <div ref={statsHeaderRef} className="mb-16 sm:mb-20">
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={statsHeaderInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="h-1 bg-gradient-to-r from-blue-600 to-green-600 w-16 sm:w-20" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-gray-800">
              By The Numbers
            </h2>
          </motion.div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Vertical Divider Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-transparent group-hover:from-blue-400 group-hover:via-blue-500 transition-colors duration-500" />

              <div className="pl-6 sm:pl-8">
                {/* Icon */}
                <div className="mb-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-extrabold text-3xl sm:text-4xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent leading-none">
                    <Counter value={stat.value} />
                  </span>
                  <span className="font-semibold text-xl sm:text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent leading-none">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection'; 

export default AboutSection;