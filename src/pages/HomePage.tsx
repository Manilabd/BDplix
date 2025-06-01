import React from 'react';
import Hero from '../components/home/Hero';
import MovieSlider from '../components/ui/MovieSlider';
import FeaturedSection from '../components/home/FeaturedSection';
import { movieCategories } from '../data/movies';

const HomePage: React.FC = () => {
  const featuredMovies = movieCategories.find(cat => cat.id === "featured")?.movies || [];
  const trendingMovies = movieCategories.find(cat => cat.id === "trending")?.movies || [];

  return (
    <div>
      {/* Hero Section */}
      <Hero featuredMovies={featuredMovies} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Featured movies section with 2 columns */}
        {trendingMovies.length > 0 && (
          <FeaturedSection 
            title="Trending Now" 
            subtitle="The most watched movies this week"
            movies={trendingMovies.slice(0, 2)} 
            viewAllLink="/browse?category=trending"
            columns={2}
          />
        )}
        
        {/* Movie category sliders */}
        {movieCategories
          .filter(category => category.id !== 'featured' && category.movies.length >= 4)
          .map(category => (
            <MovieSlider key={category.id} category={category} />
          ))
        }
      </div>
    </div>
  );
};

export default HomePage;