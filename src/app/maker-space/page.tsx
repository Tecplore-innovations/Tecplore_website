"use client";

import React from "react";

const MakerSpacePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 px-4 md:px-8 py-16">
      
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center rounded-xl mb-12"
        style={{ backgroundImage: "url('/photos/maker-space/maker_space_banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-xl"></div>
        <div className="relative max-w-4xl mx-auto text-center py-24 px-6 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bring a Maker Space to Your School, Institute
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Inspire creativity, innovation, and STEM learning for your students or visitors.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
          <img src="/photos/maker-space/icons/innovation.png" className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Hands-on Learning</h3>
          <p className="text-gray-600">Students engage in real STEM projects and experiments.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
          <img src="/photos/maker-space/icons/fun.png" className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fun & Interactive</h3>
          <p className="text-gray-600">Encourages creativity through playful and safe experimentation.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow duration-300">
          <img src="/photos/maker-space/icons/customizable.png" className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Customizable for Your Space</h3>
          <p className="text-gray-600">We adapt the maker space to your location, audience, and goals.</p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">1. Initial Discussion</h3>
            <p className="text-gray-600">We understand your needs and audience.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">2. Proposal & Layout</h3>
            <p className="text-gray-600">Custom layout and project plan for your space.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">3. Setup & Training</h3>
            <p className="text-gray-600">We set up the space and train your staff.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="font-semibold mb-2">4. Launch & Support</h3>
            <p className="text-gray-600">Space is ready to inspire, with ongoing support.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Partners Say</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700 italic">"The maker space at our school transformed the way students learn science. Highly recommended!"</p>
            <p className="text-gray-900 font-semibold mt-2">– Aarvam Learning Center, Trichy</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700 italic">"Visitors at our mall love the interactive STEM corner. Great experience for all ages!"</p>
            <p className="text-gray-900 font-semibold mt-2">– City Mall Management</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold mb-4">Ready to Bring a Maker Space?</h2>
        <p className="text-gray-600 mb-6">Talk to us and we’ll help you plan the perfect space.</p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default MakerSpacePage;
