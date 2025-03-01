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
  // Start with showing the fallback image until video is confirmed to be playing
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) {
      return; // Exit if no video element
    }
    
    // Reset state when component mounts or video source changes
    setIsVideoPlaying(false);
    
    // Safe error handler that won't throw its own errors
    const handleVideoError = () => {
      console.log('Video failed to load or play, showing fallback image');
      setIsVideoPlaying(false);
    };
    
    // Only set video playing when we're sure it's actually playing
    const handlePlaying = () => {
      console.log('Video is now playing');
      setIsVideoPlaying(true);
    };
    
    // Add event listeners
    videoElement.addEventListener('playing', handlePlaying);
    videoElement.addEventListener('error', handleVideoError);
    
    // Try to play the video - handle any errors silently
    const attemptPlay = () => {
      if (videoElement) {
        videoElement.play().catch(() => {
          // If play fails, we'll just use the fallback image
          // No need to log anything as the error event will fire
        });
      }
    };
    
    // Load the video then try to play it
    videoElement.load();
    attemptPlay();
    
    // Cleanup
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('playing', handlePlaying);
        videoElement.removeEventListener('error', handleVideoError);
        videoElement.pause();
      }
    };
  }, [videoSrc]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video background - Simple structure with no extra error handling */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover ${isVideoPlaying ? 'block' : 'hidden'}`}
        loop
        muted
        playsInline
        src={videoSrc}
      />

      {/* Fallback image background */}
      <div 
        className={`absolute inset-0 ${isVideoPlaying ? 'hidden' : 'block'}`}
        style={{ 
          backgroundImage: `url('${fallbackImageSrc}')`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        aria-label="Background fallback image"
      />
      
      {/* Overlay for text contrast */}
      <div 
        className="absolute inset-0 bg-black" 
        style={{ opacity: overlayOpacity / 100 }}
        aria-hidden="true"
      />
    </div>
  );
};

export default VideoBackground;