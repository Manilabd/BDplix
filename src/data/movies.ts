import { Movie, MovieCategory } from '../types/movie';

export const movies: Movie[] = [
  {
    id: 1,
    title: "Cosmic Odyssey",
    description: "A journey through space and time as astronauts discover a mysterious artifact that changes humanity's understanding of the universe.",
    posterUrl: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    releaseYear: 2023,
    duration: "2h 35m",
    rating: 9.2,
    isFeatured: true,
    trailerUrl: "https://player.vimeo.com/external/370467553.sd.mp4?s=af0cee48e87e150b417375d53a95e102b5d85b2f&profile_id=139&oauth2_token_id=57447761"
  },
  {
    id: 2,
    title: "Midnight Shadows",
    description: "A detective with a dark past must solve a series of mysterious disappearances in a small coastal town where nothing is as it seems.",
    posterUrl: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/635732/pexels-photo-635732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Thriller", "Mystery", "Crime"],
    releaseYear: 2022,
    duration: "1h 58m",
    rating: 8.7,
    isTrending: true
  },
  {
    id: 3,
    title: "Eternal Love",
    description: "Two souls meet across different lifetimes, drawn together by a love that transcends time and space.",
    posterUrl: "https://images.pexels.com/photos/1024984/pexels-photo-1024984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Romance", "Drama", "Fantasy"],
    releaseYear: 2023,
    duration: "2h 12m",
    rating: 8.5,
    isFeatured: true
  },
  {
    id: 4,
    title: "Final Showdown",
    description: "A legendary martial artist comes out of retirement for one last tournament to reclaim his honor and protect his legacy.",
    posterUrl: "https://images.pexels.com/photos/4412934/pexels-photo-4412934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/7991366/pexels-photo-7991366.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Action", "Sports", "Drama"],
    releaseYear: 2021,
    duration: "1h 45m",
    rating: 7.9,
    isTrending: true
  },
  {
    id: 5,
    title: "Laugh Factory",
    description: "A struggling comedian gets the opportunity of a lifetime when a famous talk show host discovers her unique talent.",
    posterUrl: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/7991514/pexels-photo-7991514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Comedy", "Drama"],
    releaseYear: 2022,
    duration: "1h 40m",
    rating: 8.2
  },
  {
    id: 6,
    title: "Haunted Memories",
    description: "A family moves into their dream home, only to discover it's haunted by spirits with connections to their own past.",
    posterUrl: "https://images.pexels.com/photos/10118868/pexels-photo-10118868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/5699665/pexels-photo-5699665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Horror", "Thriller", "Mystery"],
    releaseYear: 2023,
    duration: "2h 05m",
    rating: 7.6,
    isTrending: true
  },
  {
    id: 7,
    title: "Beyond Tomorrow",
    description: "In a world where AI has evolved beyond human control, one programmer holds the key to humanity's survival.",
    posterUrl: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Sci-Fi", "Action", "Thriller"],
    releaseYear: 2022,
    duration: "2h 20m",
    rating: 8.9,
    isFeatured: true
  },
  {
    id: 8,
    title: "Wilderness",
    description: "A hiking trip turns into a fight for survival when a group of friends encounters an ancient predator in the remote mountains.",
    posterUrl: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/572688/pexels-photo-572688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Adventure", "Horror", "Thriller"],
    releaseYear: 2021,
    duration: "1h 52m",
    rating: 7.4
  },
  {
    id: 9,
    title: "City of Dreams",
    description: "An aspiring musician navigates the competitive music industry while trying to stay true to her artistic vision.",
    posterUrl: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Drama", "Music", "Romance"],
    releaseYear: 2023,
    duration: "2h 10m",
    rating: 8.3,
    isTrending: true
  },
  {
    id: 10,
    title: "Animated Adventure",
    description: "A heartwarming tale of friendship and courage as unlikely heroes embark on a quest to save their magical world.",
    posterUrl: "https://images.pexels.com/photos/3227984/pexels-photo-3227984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Animation", "Adventure", "Family"],
    releaseYear: 2022,
    duration: "1h 45m",
    rating: 8.7,
    isFeatured: true
  },
  {
    id: 11,
    title: "Historical Heroes",
    description: "The untold story of brave individuals who changed the course of history through their extraordinary acts of courage.",
    posterUrl: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/6447217/pexels-photo-6447217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["History", "Drama", "War"],
    releaseYear: 2021,
    duration: "2h 30m",
    rating: 9.1
  },
  {
    id: 12,
    title: "Laugh Out Loud",
    description: "A hilarious comedy about a family vacation that goes hilariously wrong at every turn.",
    posterUrl: "https://images.pexels.com/photos/7991432/pexels-photo-7991432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    backdropUrl: "https://images.pexels.com/photos/7991528/pexels-photo-7991528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    genre: ["Comedy", "Family"],
    releaseYear: 2023,
    duration: "1h 35m",
    rating: 7.8
  }
];

export const movieCategories: MovieCategory[] = [
  {
    id: "featured",
    title: "Featured Movies",
    movies: movies.filter(movie => movie.isFeatured)
  },
  {
    id: "trending",
    title: "Trending Now",
    movies: movies.filter(movie => movie.isTrending)
  },
  {
    id: "action",
    title: "Action & Adventure",
    movies: movies.filter(movie => movie.genre.includes("Action") || movie.genre.includes("Adventure"))
  },
  {
    id: "drama",
    title: "Drama",
    movies: movies.filter(movie => movie.genre.includes("Drama"))
  },
  {
    id: "comedy",
    title: "Comedy",
    movies: movies.filter(movie => movie.genre.includes("Comedy"))
  },
  {
    id: "sci-fi",
    title: "Sci-Fi & Fantasy",
    movies: movies.filter(movie => movie.genre.includes("Sci-Fi") || movie.genre.includes("Fantasy"))
  },
  {
    id: "thriller",
    title: "Thriller & Horror",
    movies: movies.filter(movie => movie.genre.includes("Thriller") || movie.genre.includes("Horror"))
  }
];

// Function to get a movie by ID
export const getMovieById = (id: number): Movie | undefined => {
  return movies.find(movie => movie.id === id);
};

// Function to search movies
export const searchMovies = (query: string): Movie[] => {
  const searchTerm = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm) || 
    movie.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
    movie.description.toLowerCase().includes(searchTerm)
  );
};