"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "@/lib/animations";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundPattern?: string;
  overlayClass?: string;
  align?: "center" | "left";
  children?: React.ReactNode;
}

export default function PageHero({
  title,
  subtitle,
  backgroundImage,
  backgroundPattern,
  overlayClass = "bg-black/70",
  align = "center",
  children,
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section className="relative text-white py-12 overflow-hidden">
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image src={backgroundImage} alt="" fill className="object-cover" priority />
        </div>
      ) : backgroundPattern ? (
        <div
          className="absolute inset-0 bg-slate-950"
          style={{
            backgroundImage: `url('${backgroundPattern}')`,
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
            backgroundPosition: "center",
          }}
        />
      ) : (
        <div className="absolute inset-0 bg-slate-950" />
      )}

      <div className={`absolute inset-0 ${overlayClass}`} />

      <motion.div
        className={`relative max-w-6xl mx-auto px-6 lg:px-12 ${isCenter ? "text-center" : "text-left"}`}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.h1
          className={`text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight mb-6 ${isCenter ? "max-w-4xl mx-auto" : "max-w-3xl"}`}
          variants={fadeInUp}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className={`text-lg md:text-xl text-slate-300 leading-relaxed ${isCenter ? "max-w-2xl mx-auto" : "max-w-xl"}`}
            variants={fadeInUp}
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div className="mt-10" variants={fadeInUp}>
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
