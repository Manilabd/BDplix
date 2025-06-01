import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '../../types/movie';
import Button from '../ui/Button';

interface HeroProps {
  featuredMovies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ featuredMovies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMovie = featuredMovies[currentIndex];

  // Auto rotate featured movies
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === featuredMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);
    
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!currentMovie) return null;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <img
          src={currentMovie.backdropUrl}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
              {currentMovie.title}
            </h1>
            
            <div className="flex items-center text-sm text-gray-300 mb-4 md:mb-6">
              <span className="inline-block px-2 py-1 mr-3 bg-red-600/90 text-white font-medium rounded text-xs">
                HD
              </span>
              <span className="mr-3">{currentMovie.releaseYear}</span>
              <span className="mr-3">{currentMovie.duration}</span>
              <span className="flex items-center">
                <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {currentMovie.rating}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
              {currentMovie.genre.map((genre, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-gray-800/70 text-gray-300 text-sm rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-8 max-w-lg line-clamp-3 md:line-clamp-4">
              {currentMovie.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to={`/movie/${currentMovie.id}`} className="group">
                <Button 
                  variant="primary" 
                  size="lg"
                  icon={<Play size={18} className="group-hover:animate-pulse" />}
                >
                  Watch Now
                </Button>
              </Link>
              <Link to={`/movie/${currentMovie.id}`}>
                <Button 
                  variant="outline" 
                  size="lg"
                  icon={<Info size={18} />}
                >
                  More Info
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dots indicator */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-red-600 w-6' : 'bg-gray-500 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View featured movie ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;