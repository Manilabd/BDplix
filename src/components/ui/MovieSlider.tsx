import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieCategory } from '../../types/movie';
import MovieCard from './MovieCard';

interface MovieSliderProps {
  category: MovieCategory;
}

const MovieSlider: React.FC<MovieSliderProps> = ({ category }) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === 'left' 
        ? -current.offsetWidth * 0.75 
        : current.offsetWidth * 0.75;
      
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (category.movies.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">{category.title}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')} 
            className="p-1.5 rounded-full bg-gray-800/70 hover:bg-gray-700 text-white transition"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="p-1.5 rounded-full bg-gray-800/70 hover:bg-gray-700 text-white transition"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto scrollbar-hide gap-4 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {category.movies.map((movie) => (
          <div key={movie.id} className="flex-none w-[180px] md:w-[200px] lg:w-[220px]">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSlider;