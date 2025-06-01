import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../data/movies';
import { Movie } from '../types/movie';
import MovieCard from '../components/ui/MovieCard';
import SearchBar from '../components/ui/SearchBar';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const query = searchParams.get('q') || '';

  // Perform search when query changes
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with a small delay
    const timer = setTimeout(() => {
      const searchResults = searchMovies(query);
      setResults(searchResults);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  const handleSearch = (newQuery: string) => {
    if (newQuery) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-6">Search Movies</h1>
          <div className="w-full max-w-3xl">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for movies, genres, actors..."
              className="w-full px-4 py-3"
            />
          </div>
        </div>
        
        {query && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              {isLoading ? 'Searching...' : `Results for "${query}"`}
            </h2>
            {!isLoading && results.length > 0 && (
              <p className="text-gray-400 mt-1">Found {results.length} results</p>
            )}
          </div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : (
          <>
            {query && results.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium text-white mb-2">No results found</h2>
                <p className="text-gray-400">Try a different search term or browse our categories</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </>
        )}
        
        {!query && (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-white mb-2">Popular searches</h2>
            <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-3xl mx-auto">
              {['Action', 'Comedy', 'Sci-Fi', 'Thriller', 'Drama', 'Romance', '2023', 'Animation'].map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-full transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;