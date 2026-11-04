"use client";
import React from "react";
import CtaSection from "@/components/shared/CtaSection";
import PageHero from "@/components/shared/PageHero";

const idealFor = [
  ["Schools & Colleges", "K-12 and higher education institutions"],
  ["Learning Centers", "After-school programs and enrichment facilities"],
  ["Public Spaces", "Libraries, museums, and community centers"],
  ["Commercial Venues", "Shopping centers and family entertainment spaces"],
];

const steps = [
  {
    step: "01",
    title: "Assessment",
    desc: "We begin with an in-depth analysis of your institutional needs, target audience, existing infrastructure, and educational goals to ensure optimal alignment.",
  },
  {
    step: "02",
    title: "Proposal",
    desc: "Our team develops detailed spatial layouts, equipment specifications, and curriculum integration strategies tailored specifically to your requirements.",
  },
  {
    step: "03",
    title: "Setup",
    desc: "Professional installation of all equipment and materials, followed by comprehensive training sessions for educators and facility managers.",
  },
  {
    step: "04",
    title: "Support",
    desc: "Launch support to ensure smooth operations, with continued technical assistance, curriculum updates, and maintenance guidance as your program evolves.",
  },
];

const testimonials = [
  {
    quote:
      "The implementation of our maker space has fundamentally changed how students approach scientific inquiry. The level of engagement and depth of understanding we're seeing is remarkable.",
    author: "Aarvam Learning Center, Trichy",
  },
  {
    quote:
      "Our interactive STEM installation has become a cornerstone attraction. Families spend meaningful time exploring the exhibits, and feedback has been overwhelmingly positive across all age groups.",
    author: "Alagangle, Nagpur",
  },
];

const MakerSpacePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageHero
        title="Maker Space Solutions"
        subtitle="Experiential Learning | Safe Exploration Environment | Cross-Disciplinary Integration | Educator Support"
        backgroundImage="/photos/maker-space/maker_space_banner.avif"
      />

      {/* Ideal For */}
      <section className="bg-muted px-6 py-16">
        <div className="mx-auto max-w-6xl text-center md:text-left">
          <h2 className="heading-section mb-8">Ideal For</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {idealFor.map(([title, desc]) => (
              <div key={title}>
                <h3 className="mb-2 text-lg font-semibold text-primary">{title}</h3>
                <p className="text-sm text-body">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="heading-section mb-8 text-center md:text-left">Implementation Process</h2>
        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.step}
              className="flex flex-row items-start gap-4 border-b border-border pb-6 md:gap-8"
            >
              <div className="w-12 flex-shrink-0 text-center text-2xl font-light text-primary md:w-20 md:text-left md:text-4xl">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-foreground md:text-2xl">{step.title}</h3>
                <p className="text-sm leading-relaxed text-body md:text-base">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="heading-section mb-12 text-center md:text-left">Partner Testimonials</h2>
          <div className="space-y-10 md:space-y-12">
            {testimonials.map((t) => (
              <div key={t.author} className="border-l-2 border-primary pl-5 md:pl-6">
                <p className="mb-2 text-sm italic leading-relaxed text-body md:text-base">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-base font-semibold text-foreground md:text-lg">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Ready to Begin?"
        text="Let's discuss how a maker space can enhance learning at your institution."
      />
    </div>
  );
};

export default MakerSpacePage;
