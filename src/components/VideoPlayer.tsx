import React, { useEffect, useRef, useState } from 'react';

interface VideoPlayerProps {
  videos: string[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videos }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playError, setPlayError] = useState<boolean>(false);

  // Set isClient to true after component mounts (client-side)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to handle video end
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  // Function to handle video loading
  const handleVideoLoaded = () => {
    setIsLoading(false);
    setPlayError(false);
  };

  // Function to attempt playing video
  const attemptPlay = async () => {
    if (videoRef.current) {
      try {
        setPlayError(false);
        await videoRef.current.play();
      } catch (error) {
        console.error('Autoplay failed:', error);
        setPlayError(true);
      }
    }
  };

  // Effect to update video source when currentVideoIndex changes
  useEffect(() => {
    if (videoRef.current && isClient) {
      setIsLoading(true);
      videoRef.current.src = videos[currentVideoIndex];
      videoRef.current.load();
      attemptPlay();
    }
  }, [currentVideoIndex, videos, isClient]);

  // Disable right-click and context menu on the video element
  const disableRightClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.preventDefault();
  };

  // Render loading or error state if needed
  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      )}
      
      {playError && (
        <div className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: 'url(/fallback-image.jpg)' }}>
          {/* Fallback content */}
        </div>
      )}
      
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline // Add playsInline for better mobile support
        loop={videos.length === 1} // Loop if only one video
        onEnded={handleVideoEnd}
        onLoadedData={handleVideoLoaded}
        onError={() => setPlayError(true)}
        onContextMenu={disableRightClick}
        className="w-full h-full object-cover"
        controls={false}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        <source src={videos[currentVideoIndex]} type="video/webm" /> {/* Add WebM support */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;