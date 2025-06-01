import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { movies } from '../data/movies';
import { Movie, Genre } from '../types/movie';
import MovieCard from '../components/ui/MovieCard';
import FilterBar from '../components/ui/FilterBar';
import { Filter, Search as SearchIcon } from 'lucide-react';

const genres: Genre[] = [
  "Action", "Comedy", "Drama", "Thriller", "Horror", 
  "Sci-Fi", "Romance", "Documentary", "Animation"
];

const languages = ['All', 'English', 'Hindi', 'Bengali', 'Hindi-Dubbed', 'Bengali-Dubbed'];

const BrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryParam = searchParams.get('category');
  
  useEffect(() => {
    const genre = searchParams.get('genre');
    const search = searchParams.get('q');
    const language = searchParams.get('language');
    const year = searchParams.get('year');
    
    let filtered = [...movies];
    
    if (categoryParam === 'trending') {
      filtered = filtered.filter(movie => movie.isTrending);
    } else if (categoryParam === 'featured') {
      filtered = filtered.filter(movie => movie.isFeatured);
    }
    
    if (genre) {
      const genres = genre.split(',');
      setSelectedGenres(genres);
      filtered = filtered.filter(movie => 
        genres.some(g => movie.genre.includes(g))
      );
    }
    
    if (language && language !== 'All') {
      setSelectedLanguage(language);
      filtered = filtered.filter(movie => movie.language === language);
    }
    
    if (year) {
      const yearNum = parseInt(year);
      setSelectedYear(yearNum);
      filtered = filtered.filter(movie => movie.releaseYear === yearNum);
    }
    
    if (search) {
      setSearchTerm(search);
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchLower) ||
        (movie.originalTitle?.toLowerCase().includes(searchLower)) ||
        movie.description.toLowerCase().includes(searchLower) ||
        movie.genre.some(g => g.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredMovies(filtered);
  }, [categoryParam, searchParams]);
  
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if (language === 'All') {
      searchParams.delete('language');
    } else {
      searchParams.set('language', language);
    }
    setSearchParams(searchParams);
  };
  
  const handleYearChange = (year: number | null) => {
    setSelectedYear(year);
    if (year === null) {
      searchParams.delete('year');
    } else {
      searchParams.set('year', year.toString());
    }
    setSearchParams(searchParams);
  };
  
  const handleGenreChange = (genre: string) => {
    const newSelectedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
      
    setSelectedGenres(newSelectedGenres);
    
    if (newSelectedGenres.length > 0) {
      searchParams.set('genre', newSelectedGenres.join(','));
    } else {
      searchParams.delete('genre');
    }
    
    setSearchParams(searchParams);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm) {
      searchParams.set('q', searchTerm);
    } else {
      searchParams.delete('q');
    }
    
    setSearchParams(searchParams);
  };
  
  const getPageTitle = () => {
    if (categoryParam === 'trending') return 'Trending Movies';
    if (categoryParam === 'featured') return 'Featured Movies';
    if (searchParams.has('q')) return `Search Results: "${searchParams.get('q')}"`;
    if (selectedGenres.length > 0) return `${selectedGenres.join(', ')} Movies`;
    return 'Browse Movies';
  };
  
  return (
    <div className="min-h-screen pt-16">
      <FilterBar
        languages={languages}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        onFilterToggle={() => setShowFilters(!showFilters)}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="pb-8">
          <h1 className="text-3xl font-bold text-white mb-6">{getPageTitle()}</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <form onSubmit={handleSearch} className="w-full md:w-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full md:w-80 rounded-md pl-10 pr-4 py-2 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-red-600"
                  placeholder="Search movies..."
                />
              </div>
            </form>
          </div>
          
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-md animate-fadeIn">
              <h3 className="text-white font-medium mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreChange(genre)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      selectedGenres.includes(genre)
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {filteredMovies.length === 0 ? (
          <div className="py-12 text-center">
            <h2 className="text-xl text-white mb-2">No movies found</h2>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredMovies.map((movie) => (
              <div key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;