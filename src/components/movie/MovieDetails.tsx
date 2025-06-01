import React from 'react';
import { Play, Info, Star, Clock, Calendar } from 'lucide-react';
import { Movie } from '../../types/movie';
import Button from '../ui/Button';

interface MovieDetailsProps {
  movie: Movie;
  onPlay: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onPlay }) => {
  return (
    <div className="relative">
      {/* Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdropUrl}
          alt={`${movie.title} backdrop`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-[1.02] group">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={onPlay}
                  className="rounded-full bg-red-600/80 p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300"
                >
                  <Play size={32} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Movie Information */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
              <div className="flex items-center gap-1.5">
                <Star size={18} className="text-yellow-500" />
                <span className="text-white font-medium">{movie.rating}</span>
                <span className="text-gray-400">/10</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-300">
                <Clock size={16} />
                <span>{movie.duration}</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-300">
                <Calendar size={16} />
                <span>{movie.releaseYear}</span>
              </div>

              <div className="inline-block px-2 py-1 bg-red-600/90 text-white text-xs font-medium rounded">
                HD
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={onPlay}
                icon={<Play size={18} />}
              >
                Watch Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                icon={<Info size={18} />}
              >
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;