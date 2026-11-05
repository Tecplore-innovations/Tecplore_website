"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "@/lib/animations";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  /** A real photo, shown beside the text. Without one the hero is centred text. */
  image?: string;
  children?: React.ReactNode;
}

/** The standard light hero used at the top of every page except the homepage. */
export default function PageHero({ title, subtitle, image, children }: PageHeroProps) {
  const text = (
    <>
      <motion.h1
        className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl"
        variants={fadeInUp}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p className="text-lg leading-relaxed text-body md:text-xl" variants={fadeInUp}>
          {subtitle}
        </motion.p>
      )}
      {children && (
        <motion.div className="mt-8" variants={fadeInUp}>
          {children}
        </motion.div>
      )}
    </>
  );

  return (
    <section className="border-b border-border bg-background py-12 md:py-16">
      <motion.div
        className="mx-auto max-w-6xl px-6 lg:px-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {image ? (
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>{text}</div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card border-2 border-primary">
              <Image src={image} alt="" fill className="object-cover" priority />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl text-center">{text}</div>
        )}
      </motion.div>
    </section>
  );
}
