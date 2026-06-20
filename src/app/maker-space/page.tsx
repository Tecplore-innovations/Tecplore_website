"use client";
import React from "react";

const MakerSpacePage: React.FC = () => {
  return (
          <div className="min-h-screen bg-white text-gray-900">
          {/* Hero Section */}
        <section className="relative w-full h-[60vh] flex items-center justify-center text-center overflow-hidden bg-gray-900">
          {/* Background Image */}
          <div className="absolute inset-0">
            <div
              className="w-full h-full bg-cover bg-center transition-opacity duration-700 ease-in-out"
              style={{
                backgroundImage: "url('/photos/maker-space/maker_space_banner.avif')",
               
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

            {/* Text Content */}
            <div className="relative z-10 px-6 max-w-3xl">
              <h1 className="text-4xl md:text-4xl font-semibold mb-6 text-white">
                Maker Space Solutions
              </h1>
              <div className="w-20 h-0.5 bg-white/60 mx-auto mb-8" />

              {/* Tagline Block */}
              <div className="space-y-3 text-slate-300 text-base md:text-lg leading-relaxed">
                <p className="flex flex-col md:flex-row md:justify-center md:gap-3">
                  <span>Experiential Learning</span>
                  <span className="hidden md:inline">|</span>
                  <span>Safe Exploration Environment</span>
                </p>
                <p className="flex flex-col md:flex-row md:justify-center md:gap-3">
                  <span>Cross-Disciplinary Integration</span>
                  <span className="hidden md:inline">|</span>
                  <span>Educator Support</span>
                </p>
              </div>
            </div>
          </section>
                  
    {/* Ideal For */}
      <section className="bg-gray-60 py-8 px-6"
       style={{
    backgroundImage: "url('/patterns/webb.png')",
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
    backgroundPositionY: "5%", // 👈 adjust this value (0% = top, 100% = bottom)
  }}
  >
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-slate-900">
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
                <h4 className="text-lg font-medium text-blue-500 mb-2">{title}</h4>
                <p className="text-stale-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Process */}
        <section className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-semibold mb-8 mt-6 text-gray-900 text-center md:text-left">
            Implementation Process
          </h2>
          <div className="space-y-8">
            {[
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
            ].map((step, i) => (
              <div
                key={i}
                className="flex flex-row items-start gap-4 md:gap-8 border-b border-gray-200 pb-6"
              >
                {/* Step Number */}
                <div className="text-2xl md:text-4xl font-light text-blue-600 flex-shrink-0 w-12 md:w-20 text-center md:text-left">
                  {step.step}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-2xl font-medium mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

            {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12"
    >
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 text-gray-900 text-center md:text-left">
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
                author: "Alagangle, Nagpur",
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
     
         {/* Footer */}
          <footer
            className="relative bg-cover bg-center text-black py-8"
            style={{
            //  backgroundImage: "url('/photos/maker-space/maker_space_illustration.avif')",
             backgroundImage: "url('/patterns/webb.png')",
                backgroundRepeat: 'repeat',
                backgroundSize: 'auto',
                backgroundPositionY: "5%", // 👈 adjust this value (0% = top, 100% = bottom)
            }}
          >
            {/* Optional overlay for better text contrast */}
            <div className="absolute inset-0 bg-blue-50/70" />

            <div className="relative max-w-6xl mx-auto px-6 text-center">
              <h2 className="text-2xl font-semibold mb-4">Ready to Begin?</h2>
              <p className="text-slate-800 text-sm mb-4">
                Let&apos;s discuss how a maker space can enhance learning at your institution.
              </p>

              {/* Contact Us Button */}
              <a
                href="/contact"
                className="inline-block px-4 py-2 border border-blue-700 text-slate-800 rounded-full 
                          hover:bg-blue-700 hover:text-white transition duration-200 font-medium"
              >
                Contact Us!
              </a>
            </div>
          </footer>
    </div>
  );
};

export default MakerSpacePage;
