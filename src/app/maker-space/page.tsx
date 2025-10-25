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
           Setup Maker Space at Your Institute
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Inspire creativity, and STEM learning.
          </p>
         
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
<div className="max-w-6xl mx-auto text-center mb-20 px-4">
  <h2 className="text-4xl font-bold mb-4 text-gray-800">How It Works</h2>
  <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
    Our streamlined process ensures your space transforms into an inspiring environment efficiently
  </p>


  <div className="flex flex-col md:flex-row justify-between gap-8 relative">
   
    {[
      {
        step: 1,
        title: "Initial Discussion",
        description: "We understand your needs and audience.",
      
        color: "from-blue-500 to-blue-600",
        hoverColor: "hover:from-blue-600 hover:to-blue-700"
      },
      {
        step: 2,
        title: "Proposal & Layout",
        description: "Custom layout and project plan for your space.",
       
        color: "from-purple-500 to-purple-600",
        hoverColor: "hover:from-purple-600 hover:to-purple-700"
      },
      {
        step: 3,
        title: "Setup & Training",
        description: "We set up the space and train your staff.",
       
        color: "from-green-500 to-green-600",
        hoverColor: "hover:from-green-600 hover:to-green-700"
      },
      {
        step: 4,
        title: "Launch & Support",
        description: "Space is ready to inspire, with ongoing support.",
      
        color: "from-orange-500 to-orange-600",
        hoverColor: "hover:from-orange-600 hover:to-orange-700"
      }
    ].map((step) => (
      <div 
        key={step.step}
        className={`flex-1 group cursor-pointer transition-all duration-500 transform hover:-translate-y-2`}
      >
        {/* Step Card */}
        <div className={`
          bg-white p-8 rounded-2xl shadow-lg border border-gray-100 
          relative overflow-hidden transition-all duration-300
          group-hover:shadow-2xl group-hover:border-transparent
        `}>
          {/* Gradient Background on Hover */}
          <div className={`
            absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 
            group-hover:opacity-5 transition-opacity duration-300
          `}></div>
          
      
          
         
          
          {/* Content */}
          <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-gray-900 transition-colors">
            {step.title}
          </h3>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
            {step.description}
          </p>
          
          {/* Hover Indicator */}
          <div className={`
            absolute bottom-0 left-1/2 transform -translate-x-1/2 
            w-0 h-1 bg-gradient-to-r ${step.color} 
            group-hover:w-full transition-all duration-300
          `}></div>
        </div>
     
      </div>
    ))}
  </div>

 
</div>

   {/* Testimonials Section */}
<div className="max-w-4xl mx-auto mb-16">
  <h2 className="text-3xl font-bold text-center mb-8">What Our Partners Say</h2>
  <div className="space-y-6">
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-700 italic">
        The maker space at our school transformed the way students learn science. Highly recommended!
      </p>
      <p className="text-gray-900 font-semibold mt-2">– Aarvam Learning Center, Trichy</p>
    </div>
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-700 italic">
        Visitors at our mall love the interactive STEM corner. Great experience for all ages!
      </p>
      <p className="text-gray-900 font-semibold mt-2">– City Mall Management</p>
    </div>
  </div>
</div>

{/* Final CTA Section */}
<div className="text-center py-16 relative">
  <h2 className="text-3xl font-bold mb-4">Ready to Bring a Maker Space?</h2>
  <p className="text-gray-600 mb-6">
    Talk to us and we’ll help you plan the perfect space.
  </p>
</div>

{/* Floating Contact Button 
<a
  href="/contact"
  className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-50"
  title="Contact Us"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 12.79A9 9 0 1111.21 3h.01A9 9 0 0121 12.79z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l3 3"
    />
  </svg>
</a>

*/}

    </div>
  );
};

export default MakerSpacePage;
