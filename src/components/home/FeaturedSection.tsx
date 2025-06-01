import React from 'react';
import { Movie } from '../../types/movie';
import MovieCard from '../ui/MovieCard';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  viewAllLink?: string;
  columns?: 2 | 3 | 4;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ 
  title, 
  subtitle, 
  movies, 
  viewAllLink,
  columns = 3
}) => {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  if (!movies.length) return null;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <Link 
              to={viewAllLink} 
              className="flex items-center text-red-500 hover:text-red-400 transition-colors text-sm font-medium"
            >
              View All <ChevronRight size={16} />
            </Link>
          )}
        </div>
        
        <div className={`grid ${columnClasses[columns]} gap-6`}>
          {movies.map((movie) => (
            <div key={movie.id}>
              <MovieCard movie={movie} variant="featured" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;