import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const WhoWeAreSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-24">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="aspect-square rounded-full overflow-hidden bg-gray-100 relative">
            <Image 
              src="/photos/whoweare2.jpg" 
              alt="Educational Innovation"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3">
          <div className="space-y-6 md:space-y-8">
            {/* Main Text */}
            <p className="text-3xl md:text-4xl font-medium leading-tight">
              Be it an institute, makerspace or Cafe enable unique experience fostering maker spirit and DIY attitude. <span className="text-gray-400">Build Science temperament among the next generation through hands-on activities.</span>
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 sm:flex gap-4 sm:gap-8 pt-4 sm:pt-8">
              <Card className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl shadow-sm sm:min-w-[160px] md:min-w-[180px]">
                <div>
                  <div className="text-4xl sm:text-6xl md:text-7xl font-bold text-black tracking-wide">92%</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                    Student Engagement Rate
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl shadow-sm sm:min-w-[160px] md:min-w-[180px]">
                <div>
                  <div className="text-4xl sm:text-6xl md:text-7xl font-bold text-black tracking-wide">80%</div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                    Improved Learning Outcomes
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoWeAreSection;