import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView as useFramerInView } from 'framer-motion';
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

// --- Specialized Counter Component ---
const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useFramerInView(ref, { once: true, margin: "-20px" });
  
  // Slower, heavier physics for a "premium" feel (mass: 1, stiffness: 50)
  const spring = useSpring(0, { mass: 1, stiffness: 50, damping: 20 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => display.on("change", (latest) => {
    if (ref.current) ref.current.textContent = latest.toString();
  }), [display]);

  return <span ref={ref} />;
};

const CounterEffectStats = () => {
  const containerRef = useRef(null);
  const [headerRef, headerInView] = useInView({ threshold: 0.1, triggerOnce: true });

  // --- Shared Background Logic (Matches WhoWeAre) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax exactly matching the previous section for continuity
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  
  return (
    <section 
      ref={containerRef}
      className="relative w-full py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100"
    >
      
      {/* --- 1. Background Pattern (Exact Match) --- */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30"
        style={{ 
          backgroundImage: 'url("/patterns/webb.png")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          y: backgroundY, 
        }}
      />

      {/* --- 2. Floating Orbs (Inverted positions from WhoWeAre for flow) --- */}
      {/* Green Orb now Top Right */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-green-400/10 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Blue Orb now Bottom Left */}
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        
        {/* --- Section Header (Matches typography of 'What We Do') --- */}
        <div ref={headerRef} className="mb-16 sm:mb-20">
           <motion.div 
             className="flex items-center gap-4"
             initial={{ opacity: 0, x: -20 }}
             animate={headerInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.8 }}
           >
             <div className="h-1 bg-gradient-to-r from-blue-600 to-green-600 w-16 sm:w-20" />
             <h2 className="text-lg sm:text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-gray-800">
               By The Numbers
             </h2>
           </motion.div>
        </div>

        {/* --- Stats Grid (Clean, Editorial Layout) --- */}
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
              {/* Vertical Divider Line (Subtle Enterprise Touch) */}
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
};

export default CounterEffectStats;