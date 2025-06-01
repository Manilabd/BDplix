import React from 'react';
import { Star, Play, Globe } from 'lucide-react';
import { Movie } from '../../types/movie';
import { Link } from 'react-router-dom';

type MovieCardProps = {
  movie: Movie;
  variant?: 'normal' | 'featured';
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, variant = 'normal' }) => {
  const { id, title, originalTitle, posterUrl, releaseYear, rating, duration, genre, language, isDubbed } = movie;

  const getLanguageDisplay = () => {
    if (isDubbed) {
      return `${language} (Dubbed)`;
    }
    return language;
  };

  if (variant === 'featured') {
    return (
      <div className="relative w-full rounded-xl overflow-hidden group transition-transform duration-300 hover:scale-[1.02]">
        <Link to={`/movie/${id}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
          <img 
            src={posterUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            {originalTitle && (
              <p className="text-sm text-gray-300 mb-2">{originalTitle}</p>
            )}
            <div className="flex items-center text-gray-300 text-sm mb-3">
              <span className="mr-3">{releaseYear}</span>
              <span className="mr-3">{duration}</span>
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span>{rating}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {genre.slice(0, 3).map((g, idx) => (
                <span key={idx} className="px-2 py-1 text-xs bg-gray-800/80 text-gray-300 rounded-full">
                  {g}
                </span>
              ))}
            </div>
            <div className="flex items-center text-sm text-gray-300 mb-3">
              <Globe size={14} className="mr-1" />
              <span>{getLanguageDisplay()}</span>
            </div>
            <div className="mt-4 flex items-center transition-all group-hover:translate-y-[-5px]">
              <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition">
                <Play size={16} />
                <span>Watch Now</span>
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative group overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.05]">
      <Link to={`/movie/${id}`}>
        <div className="aspect-[2/3] relative">
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-2 right-2 flex items-center bg-black/60 text-white text-xs px-1.5 py-1 rounded">
            <Star size={12} className="text-yellow-500 mr-1" />
            <span>{rating}</span>
          </div>
          <div className="absolute top-2 left-2 flex items-center bg-black/60 text-white text-xs px-1.5 py-1 rounded">
            <Globe size={12} className="mr-1" />
            <span>{getLanguageDisplay()}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="rounded-full bg-red-600/80 p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play size={24} className="text-white" />
            </div>
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-white text-sm font-medium line-clamp-1 group-hover:text-red-500 transition-colors duration-200">
            {title}
          </h3>
          {originalTitle && (
            <p className="text-gray-400 text-xs line-clamp-1">{originalTitle}</p>
          )}
          <div className="flex items-center text-gray-400 text-xs mt-1">
            <span>{releaseYear}</span>
            <span className="mx-1.5">•</span>
            <span>{duration}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;