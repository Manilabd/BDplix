import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, movieCategories } from '../data/movies';
import MovieDetails from '../components/movie/MovieDetails';
import MoviePlayer from '../components/movie/MoviePlayer';
import MovieSlider from '../components/ui/MovieSlider';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const movie = id ? getMovieById(parseInt(id, 10)) : undefined;
  
  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Movie Not Found</h1>
          <p className="text-gray-400 mb-6">The movie you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  const handlePlay = () => {
    setIsPlaying(true);
  };
  
  const handleClosePlayer = () => {
    setIsPlaying(false);
  };

  // Find related movies based on genres
  const relatedMovies = movieCategories
    .find(category => 
      category.movies.some(m => m.genre.some(g => movie.genre.includes(g)))
    ) || { id: 'related', title: 'Related Movies', movies: [] };

  return (
    <div className="pb-12">
      {isPlaying ? (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <MoviePlayer 
            videoUrl={movie.trailerUrl || "https://player.vimeo.com/external/370467553.sd.mp4?s=af0cee48e87e150b417375d53a95e102b5d85b2f&profile_id=139&oauth2_token_id=57447761"}
            posterUrl={movie.backdropUrl}
            autoPlay={true}
            onClose={handleClosePlayer}
          />
        </div>
      ) : (
        <>
          <MovieDetails movie={movie} onPlay={handlePlay} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            <MovieSlider category={relatedMovies} />
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;