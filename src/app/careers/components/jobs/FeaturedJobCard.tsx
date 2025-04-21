import React from 'react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { ShareMenu } from '../sharing/ShareMenu';
import { Position } from '../../types';
import { formatSalary, getRelativeTime } from '../../utils';
import Image from 'next/image';

interface FeaturedJobCardProps {
  position: Position;
  onApply: (position: Position) => void;
  baseUrl: string;
}

export const FeaturedJobCard: React.FC<FeaturedJobCardProps> = ({ 
  position, 
  onApply,
  baseUrl 
}) => {
  const jobUrl = `${baseUrl}/jobs/${position.id}`;

  return (
    <div className="group relative w-full max-w-2xl bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          {/* Company Logo */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-gray-100">
            {position.companyLogo ? (
              <Image 
                src={position.companyLogo}
                alt={`${position.title} company logo`}
                width={48}  // 12 * 4 (since we're using w-12)
                height={48} // 12 * 4
                className="w-full h-full object-cover"
                priority={false}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <span className="text-gray-400 text-xl font-medium">
                  {position.title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Employment Type */}
          <span className="px-3 py-1.5 bg-gray-50 text-xs rounded-md h-fit border border-gray-100">
            {position.employmentType}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <ShareMenu 
            jobTitle={position.title}
            companyName={position.companyName ?? position.title} // Fallback to title if companyName is undefined
            jobUrl={jobUrl}
          />
          <button 
            className="p-2 hover:bg-gray-50 rounded-md transition-colors"
            aria-label="Save job"
          >
            <Star className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">
          {position.title}
        </h3>
        <p className="text-base text-gray-600 mt-1.5">
          {position.department}
        </p>
      </div>

      {/* Salary & Location Info */}
      <div className="flex items-center justify-between text-sm mb-8">
        <div className="text-gray-900 font-medium text-base">
          {formatSalary(position.salary)}
        </div>
        <div className="flex items-center gap-6 text-gray-500">
          {/* Experience Required */}
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            {position.experienceRequired}+ yrs
          </span>
          
          {/* Location with Icon */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{position.location}</span>
          </div>
          
          {/* Work Site Type */}
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            {position.workSite}
          </span>
        </div>
      </div>

      {/* Posted Date and Apply Button */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Posted {getRelativeTime(position.datePosted)}
        </div>
        
        {/* Apply Button */}
        <button 
          onClick={() => onApply(position)}
          className="group/apply inline-flex items-center gap-2 text-purple-500 hover:text-purple-600 transition-colors"
        >
          <span className="text-sm font-medium">Apply Now</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/apply:translate-x-1" />
        </button>
      </div>

      {/* New Badge - Conditional */}
      {position.isNew && (
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs rounded-md border border-blue-100">
            New
          </span>
        </div>
      )}
    </div>
  );
};

// Add default export
export default FeaturedJobCard;