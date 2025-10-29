"use client";

import React from "react";

const MakerSpacePage: React.FC = () => {
  return (
  <div className="min-h-screen bg-white text-gray-900 font-sans">
    {/* Hero Section */}
    <section className="relative w-full h-[60vh] flex items-center justify-center text-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/photos/maker-space/maker_space_banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 px-6">
        <h1 className="text-4xl md:text-6xl font-light mb-4 text-white">
          Maker Space Solutions
        </h1>
        <div className="w-20 h-0.5 bg-white/60 mx-auto mb-6"></div>
        <p className="text-lg md:text-2xl text-white/90">
          Transform Learning Through Innovation & Hands-On Discovery
        </p>
      </div>
    </section>
      {/* Introduction Section */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat py-20 px-6"
       /*  style={{
          backgroundImage: 'url("/photos/maker-space/maker_hero_bg.png")',
        }} */
      >
       {/*  <div className="absolute inset-0 bg-white/90"></div> */}

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-light mb-6 text-gray-900">
            Empowering Educational Institutions
          </h2>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-8"></div>
          <p className="text-base md:text-xl text-gray-700 leading-relaxed">
            We design and implement custom maker spaces that foster creativity,
            critical thinking, and practical STEM skills. Each space is
            thoughtfully crafted to inspire experimentation and innovation in
            learners of all ages.
          </p>
        </div>
      </section>

      {/* Core Benefits */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16 text-gray-900 text-center md:text-left">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            {[
              {
                title: "Experiential Learning",
                desc: "Students engage with tangible projects that bridge theoretical concepts with real-world applications, developing problem-solving skills through direct experience.",
              },
              {
                title: "Safe Exploration Environment",
                desc: "Purpose-built spaces that encourage experimentation while maintaining safety standards, allowing learners to test ideas and learn from failures.",
              },
              {
                title: "Tailored Implementation",
                desc: "Every maker space is customized to align with your institution's curriculum, available space, age groups, and educational objectives.",
              },
              {
                title: "Cross-Disciplinary Integration",
                desc: "Spaces designed to support learning across science, technology, engineering, arts, and mathematics, encouraging holistic skill development.",
              },
              {
                title: "Scalable Design",
                desc: "From compact classroom corners to comprehensive facility-wide installations, we adapt to your spatial and budgetary constraints.",
              },
              {
                title: "Educator Support",
                desc: "Comprehensive training programs ensure your staff can confidently guide students and maintain the space effectively.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border-l-2 border-gray-300 pl-6 hover:border-blue-600 transition-all"
              >
                <h3 className="text-xl md:text-2xl font-medium mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-light mb-12 text-gray-900 text-center md:text-left">
          Implementation Process
        </h2>

        <div className="space-y-10">
          {[
            {
              step: "01",
              title: "Consultation & Assessment",
              desc: "We begin with an in-depth analysis of your institutional needs, target audience, existing infrastructure, and educational goals to ensure optimal alignment.",
            },
            {
              step: "02",
              title: "Custom Design & Planning",
              desc: "Our team develops detailed spatial layouts, equipment specifications, and curriculum integration strategies tailored specifically to your requirements.",
            },
            {
              step: "03",
              title: "Installation & Training",
              desc: "Professional installation of all equipment and materials, followed by comprehensive training sessions for educators and facility managers.",
            },
            {
              step: "04",
              title: "Activation & Ongoing Support",
              desc: "Launch support to ensure smooth operations, with continued technical assistance, curriculum updates, and maintenance guidance as your program evolves.",
            },
          ].map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-10 border-b border-gray-200 pb-8">
              <div className="text-5xl font-light text-gray-300 md:w-24">
                {step.step}
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-medium mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Infrastructure Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8 text-gray-900 text-center md:text-left">
            Innovative Learning Infrastructure
          </h2>
          <p className="text-gray-600 mb-12 max-w-3xl leading-relaxed text-center md:text-left mx-auto md:mx-0">
            Each Tecplore learning space is designed around curiosity, experimentation,
            and tangible scientific discovery. Beyond standard maker tools, our environments
            integrate hands-on setups that transform theoretical ideas into observable phenomena.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                category: "Exploration & Engineering",
                items: [
                  "Modular electronic kits and programmable controllers",
                  "Interactive sensor systems and data interfaces",
                  "Mechanisms for testing motion, forces, and energy",
                ],
              },
              {
                category: "Fabrication & Design",
                items: [
                  "Digital fabrication tools for rapid prototyping",
                  "Safe workspaces for model construction and testing",
                  "Custom fixtures and setups for real-world simulations",
                ],
              },
              {
                category: "Discovery & Analysis",
                items: [
                  "Visualization and measurement instruments",
                  "Tools for documenting, analyzing, and iterating ideas",
                  "Interactive exhibits connecting science concepts with practical applications",
                ],
              },
            ].map((cat, i) => (
              <div key={i}>
                <h4 className="text-lg font-semibold mb-3 text-gray-900 uppercase tracking-wide">
                  {cat.category}
                </h4>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {cat.items.map((it, j) => (
                    <li key={j}>• {it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>


            {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-gray-900 text-center md:text-left">
            Partner Testimonials
          </h2>

          <div className="space-y-10 md:space-y-12">
            {[
              {
                quote:
                  "The implementation of our maker space has fundamentally changed how students approach scientific inquiry. The level of engagement and depth of understanding we're seeing is remarkable.",
                author: "Aarvam Learning Center, Trichy",
              },
              {
                quote:
                  "Our interactive STEM installation has become a cornerstone attraction. Families spend meaningful time exploring the exhibits, and feedback has been overwhelmingly positive across all age groups.",
                author: "City Mall Management",
              },
            ].map((t, i) => (
              <div key={i} className="border-l-2 border-blue-500 pl-5 md:pl-6">
                <p className="text-sm md:text-base text-gray-600 italic mb-2 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-gray-800 font-medium text-base md:text-lg">
                  {t.author}
                </p>
              </div>
            ))}
          </div>
        </section>



      {/* Ideal For */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-light mb-10 text-gray-900">
            Ideal For
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["Schools & Colleges", "K-12 and higher education institutions"],
              ["Learning Centers", "After-school programs and enrichment facilities"],
              ["Public Spaces", "Libraries, museums, and community centers"],
              ["Commercial Venues", "Shopping centers and family entertainment spaces"],
            ].map(([title, desc], i) => (
              <div key={i}>
                <h4 className="text-lg font-medium text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-50 text-blue-900 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Begin?</h2>
          <p className="text-blue-800/80 text-lg mb-6">
            Let&apos;s discuss how a maker space can enhance learning at your institution.
          </p>
          <div className="text-blue-700 font-medium">
            Contact us to schedule a consultation
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MakerSpacePage;
