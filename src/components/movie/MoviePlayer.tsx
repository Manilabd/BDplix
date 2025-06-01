import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, X, Rewind, FastForward } from 'lucide-react';

interface MoviePlayerProps {
  videoUrl: string;
  posterUrl?: string;
  autoPlay?: boolean;
  onClose?: () => void;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ 
  videoUrl, 
  posterUrl, 
  autoPlay = false,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimeout, setControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Format time in MM:SS format
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle video play/pause
  const togglePlay = (): void => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle video mute/unmute
  const toggleMute = (): void => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (videoRef.current) {
      const newTime = parseFloat(e.target.value);
      videoRef.current.currentTime = (newTime / 100) * videoRef.current.duration;
    }
  };
  
  // Handle fullscreen toggle
  const toggleFullscreen = (): void => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  // Update time and progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    const updateProgress = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };
    
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', updateProgress);
    
    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', updateProgress);
    };
  }, []);
  
  // Show controls on mouse move, hide after delay
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
      
      const timeout = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
      
      setControlsTimeout(timeout);
    };
    
    const playerElement = playerRef.current;
    if (playerElement) {
      playerElement.addEventListener('mousemove', handleMouseMove);
      playerElement.addEventListener('mouseleave', () => {
        if (isPlaying) {
          setShowControls(false);
        }
      });
    }
    
    return () => {
      if (playerElement) {
        playerElement.removeEventListener('mousemove', handleMouseMove);
        playerElement.removeEventListener('mouseleave', () => {});
      }
      if (controlsTimeout) {
        clearTimeout(controlsTimeout);
      }
    };
  }, [isPlaying, controlsTimeout]);

  // Skip forward/backward
  const skipTime = (seconds: number): void => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };
  
  return (
    <div 
      ref={playerRef} 
      className="relative w-full h-full bg-black overflow-hidden group"
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        poster={posterUrl}
        className="w-full h-full object-contain"
        autoPlay={autoPlay}
        onClick={(e) => e.stopPropagation()}
      />
      
      {/* Controls overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        } flex flex-col justify-between p-4`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white font-medium">Now Playing</span>
          </div>
          {onClose && (
            <button 
              onClick={onClose} 
              className="text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-1.5 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        {/* Middle controls */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-8">
          <button 
            onClick={() => skipTime(-10)} 
            className="text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
          >
            <Rewind size={24} />
          </button>
          
          <button 
            onClick={togglePlay} 
            className="text-white bg-red-600 hover:bg-red-700 rounded-full p-5 transition-colors transform hover:scale-105"
          >
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          
          <button 
            onClick={() => skipTime(10)} 
            className="text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full p-3 transition-colors"
          >
            <FastForward size={24} />
          </button>
        </div>
        
        {/* Bottom controls */}
        <div className="space-y-2">
          {/* Progress bar */}
          <div className="flex items-center space-x-2">
            <span className="text-white text-sm">{formatTime(currentTime)}</span>
            <div className="flex-1 group">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:opacity-0 group-hover:[&::-webkit-slider-thumb]:opacity-100 [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-red-600 [&::-webkit-slider-runnable-track]:to-red-600 [&::-webkit-slider-runnable-track]:bg-clip-content [&::-webkit-slider-runnable-track]:bg-no-repeat"
                style={{ 
                  backgroundSize: `${progress}% 100%`,
                  transition: 'background-size 0.1s ease' 
                }}
              />
            </div>
            <span className="text-white text-sm">{formatTime(duration)}</span>
          </div>
          
          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay} 
                className="text-white hover:text-red-500 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <button 
                onClick={toggleMute} 
                className="text-white hover:text-red-500 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>
            
            <button 
              onClick={toggleFullscreen} 
              className="text-white hover:text-red-500 transition-colors"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;