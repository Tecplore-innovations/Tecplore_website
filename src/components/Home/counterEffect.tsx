import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart } from "lucide-react";


// Your stats data
const stats = [
  { value: "50+", label: "Interactive STEM exhibits created" },
  { value: "95%", label: "Concept retention among students" },
  { value: "50+", label: "Teachers trained in experiential learning" },
  { value: "08+", label: "Science themes including Maths, Geology, Space, Ecology" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// Component for the Counter Effect Stats
const CounterEffectStats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  const animateCount = (targetValue: string, index: number) => {
    const numericValue = parseInt(targetValue.replace(/\D/g, ''));
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = numericValue;
          return newCounts;
        });
        clearInterval(interval);
      } else {
        setCounts(prev => {
          const newCounts = [...prev];
          newCounts[index] = Math.floor(current);
          return newCounts;
        });
      }
    }, duration / steps);
  };

  const handleInView = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
      stats.forEach((stat, index) => {
        setTimeout(() => animateCount(stat.value, index), index * 200);
      });
    }
  };

  return (
    <motion.div
      className="mb-12 lg:mb-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={handleInView}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 lg:p-16">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/photos/stat_card_bg.avif')" }}
        />
      
        
        {/* Stats Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="text-center cursor-pointer"
            >
            
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {counts[index]}{stat.value.includes('+') ? '+' : ''}
                {stat.value.includes('%') ? '%' : ''}
              </div>
              <div className="text-sm lg:text-base text-gray-900">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


export default function InspiringYoungMindsSection() {
  return (
    <motion.section
      className="bg-white text-black py-12 sm:py-16 lg:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Side Text */}
          <motion.div
            className="lg:w-1/4 text-center lg:text-left relative overflow-hidden rounded-2xl"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Background image — visible only on large screens */}
            <div
              className="hidden lg:block absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/photos/stat_cards.avif')",
              }}
            >
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            {/* Text content — white on desktop, black on mobile */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-center lg:h-full">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-0 flex items-center justify-center lg:justify-start gap-3 text-black lg:text-white">
                Learn and Love Science
                <Heart className="w-8 h-8 text-pink-500 stroke-[2.5]" />
              </h2>
            </div>
          </motion.div>

    
  


          {/* Right Side - Stats Section */}
          <div className="lg:w-3/4">
            <motion.p
              className="text-gray-600 mb-8 sm:mb-12 lg:mb-16 text-base sm:text-lg leading-relaxed"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Experience STEM education through real-world experiments that nurture the next generation of problem solvers.
            </motion.p>

            {/* Stats with Counter Effect Animation */}
            <CounterEffectStats />
          </div>
        </div>
      </div>
    </motion.section>
  );
}