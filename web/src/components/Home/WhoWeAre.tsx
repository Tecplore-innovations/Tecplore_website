import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

const WhoWeAreSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col md:flex-row gap-12 items-start">
        {/* Image Section */}
        <div className="w-full md:w-1/3 flex-shrink-0">
          <div className="aspect-square rounded-full overflow-hidden bg-gray-100">
            <Image 
              src="/photos/whoweare2.jpg" 
              alt="Educational" 
              className="w-full h-full object-cover"
              width={600}
              height={600}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-2/3">
          <div className="space-y-8">
            {/* Main Text */}
            <p className="text-4xl font-medium leading-tight">
              Be it an institute, makerspace or Cafe enable unique experience fostering maker spirit and DIY attitude. <span className="text-gray-400">Build Science temperament among the next generation through hands-on activities.</span>
            </p>

            {/* Stats Section */}
            <div className="flex gap-8 pt-8">
              <Card className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm min-w-[180px]">
                <div>
                  <div className="text-7xl font-bold text-black tracking-wide">92%</div>
                  <div className="text-sm text-gray-600 mt-2">
                    Student Engagement Rate
                  </div>
                </div>
              </Card>
              
              <Card className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm min-w-[180px]">
                <div>
                  <div className="text-7xl font-bold text-black tracking-wide">80%</div>
                  <div className="text-sm text-gray-600 mt-2">
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