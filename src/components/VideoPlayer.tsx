import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';

interface VideoPlayerProps {
  videos: string[];
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(({ videos }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playError, setPlayError] = useState<boolean>(false);

  // Expose videoRef to parent via forwarded ref
  useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleVideoLoaded = () => {
    setIsLoading(false);
    setPlayError(false);
  };

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

  useEffect(() => {
    if (videoRef.current && isClient) {
      setIsLoading(true);
      videoRef.current.src = videos[currentVideoIndex];
      videoRef.current.load();
      attemptPlay();
    }
  }, [currentVideoIndex, videos, isClient]);

  const disableRightClick = (event: React.MouseEvent<HTMLVideoElement>) => {
    event.preventDefault();
  };

  if (!isClient) return null;

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="animate-pulse text-white">Loading...</div>
        </div>
      )}

      {playError && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/fallback-image.jpg)' }}
        />
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop={videos.length === 1}
        onEnded={handleVideoEnd}
        onLoadedData={handleVideoLoaded}
        onError={() => setPlayError(true)}
        onContextMenu={disableRightClick}
        className="w-full h-full object-cover"
        controls={false}
      >
        <source src={videos[currentVideoIndex]} type="video/mp4" />
        <source src={videos[currentVideoIndex]} type="video/webm" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
