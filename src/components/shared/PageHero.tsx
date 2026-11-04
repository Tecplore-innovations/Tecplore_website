"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "@/lib/animations";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

/** The standard dark hero used at the top of every page except the homepage. */
export default function PageHero({ title, subtitle, backgroundImage, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink py-16 text-ink-foreground md:py-24">
      {backgroundImage && (
        <>
          <div className="absolute inset-0">
            <Image src={backgroundImage} alt="" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 bg-ink/80" />
        </>
      )}

      <motion.div
        className="relative mx-auto max-w-6xl px-6 text-center lg:px-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.h1
          className="mx-auto mb-6 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl"
          variants={fadeInUp}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
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
