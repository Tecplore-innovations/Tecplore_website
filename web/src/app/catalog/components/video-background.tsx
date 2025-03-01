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
  const [videoError, setVideoError] = useState<boolean>(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    // Function to handle video errors
    const handleVideoError = () => {
      console.warn('Video playback error, falling back to image');
      setVideoError(true);
    };

    // Function to handle when video playback fails
    const handleVideoPlayError = (error: any) => {
      console.warn('Autoplay prevented or video playback error:', error);
      setVideoError(true);
    };

    if (videoElement) {
      // Listen for any video errors
      videoElement.addEventListener('error', handleVideoError);
      
      // Check if video source is valid
      if (!videoSrc) {
        setVideoError(true);
      } else {
        // Try to play the video when it's ready
        videoElement.addEventListener('canplay', () => {
          videoElement.play().catch(handleVideoPlayError);
        });
      }
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('error', handleVideoError);
      }
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 z-0">
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
        >
          <source src={videoSrc} type="video/mp4" />
          {/* This fallback text will trigger the image fallback via useEffect */}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `url('${fallbackImageSrc}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label="Background fallback image"
        />
      )}
      {/* Add overlay for better text visibility */}
      <div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: overlayOpacity / 100 }}
        aria-hidden="true"
      />
    </div>
  );
};

export default VideoBackground;