
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

  // The real number is in the page HTML for search engines and no-JS visitors.
  // Once the page is live in a browser, reset to 0 so it can count up on view.
  useEffect(() => {
    if (elementRef.current) elementRef.current.textContent = "0";
  }, []);

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

  return <span ref={setRefs}>{value}</span>;
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
      className="relative w-full py-20 sm:py-28 md:py-36 flex flex-col gap-24 items-center overflow-hidden bg-background"
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
              className="h-1 bg-primary w-16 sm:w-20"
              initial={{ scaleX: 0 }}
              animate={titleInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: 'left' }}
            />
            <h2 className="section-label">What We Do</h2>
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
              className="text-foreground break-words"
            >
              Exhibits are <span className="font-light text-primary">the instrument.</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-foreground break-words"
            >
              The learning is <span className="font-bold text-primary">the product.</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={contentInView ? {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }
              } : {}}
              className="text-body break-words text-base sm:text-lg md:text-xl lg:text-2xl"
            >
              We bring together interactive exhibits, maker spaces and educator training, so children learn science by doing.
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
              <div className="w-2 h-2 rounded-full bg-brand-indigo" />
              <div className="w-2 h-2 rounded-full bg-brand-blue" />
              <div className="w-2 h-2 rounded-full bg-brand-cyan" />
            </div>
            <div className="flex-1 h-px bg-border" />
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
            <div className="h-1 bg-primary w-16 sm:w-20" />
            <h2 className="section-label">By The Numbers</h2>
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
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border group-hover:bg-primary transition-colors duration-500" />

              <div className="pl-6 sm:pl-8">
                {/* Icon */}
                <div className="mb-4 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  <stat.icon className="w-6 h-6" />
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary leading-none">
                    <Counter value={stat.value} />
                  </span>
                  <span className="font-semibold text-xl sm:text-2xl text-primary leading-none">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
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