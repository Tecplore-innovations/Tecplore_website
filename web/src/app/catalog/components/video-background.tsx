"use client";

import React, { useRef, useState, useEffect } from 'react';

// Interface for video background props
export interface VideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc: string;
  overlayOpacity?: number; // Optional prop to control overlay darkness
}

/**
 * VideoBackground Component
 * 
 * A reusable component that displays a looping video with a fallback image
 * if the video cannot be played or loaded.
 * 
 * @param videoSrc - Path to the video file
 * @param fallbackImageSrc - Path to the fallback image
 * @param overlayOpacity - Optional darkness of the overlay (0-100)
 */
const VideoBackground: React.FC<VideoBackgroundProps> = ({ 
  videoSrc, 
  fallbackImageSrc,
  overlayOpacity = 40 // Default 40% opacity
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(true);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    // Function to handle video errors
    const handleVideoError = () => {
      console.warn('Video playback error, falling back to image');
      setIsVideoPlaying(false);
    };

    // Function to handle when video data is loaded
    const handleVideoCanPlay = () => {
      if (videoElement) {
        videoElement.play().catch((error) => {
          // If autoplay fails, fallback to image
          console.warn('Autoplay prevented:', error);
          setIsVideoPlaying(false);
        });
      }
    };

    if (videoElement) {
      videoElement.addEventListener('error', handleVideoError);
      videoElement.addEventListener('canplay', handleVideoCanPlay);
      
      // Check if video source is valid
      if (!videoSrc) {
        setIsVideoPlaying(false);
      }
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('error', handleVideoError);
        videoElement.removeEventListener('canplay', handleVideoCanPlay);
      }
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 z-0">
      {isVideoPlaying ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Fallback text if browser doesn't support video */}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-1"
          style={{ 
            backgroundImage: `url('${fallbackImageSrc}')`,
            backgroundSize: "cover"
          }}
        />
      )}
      {/* Add overlay for better text visibility */}
      <div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: overlayOpacity / 100 }}
      />
    </div>
  );
};

export default VideoBackground;