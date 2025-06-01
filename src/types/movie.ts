export interface Movie {
  id: number;
  title: string;
  originalTitle?: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  genre: string[];
  releaseYear: number;
  duration: string; // Format: "2h 15m"
  rating: number; // Out of 10
  isFeatured?: boolean;
  isTrending?: boolean;
  trailerUrl?: string;
  language: string; // Primary language of the movie
  audioLanguages: string[]; // Available audio languages
  subtitleLanguages: string[]; // Available subtitle languages
  isDubbed?: boolean;
  originalLanguage: string;
  region: string; // Content region (e.g., "IN" for India, "BD" for Bangladesh)
}

export type Genre = 
  | "Action" 
  | "Comedy" 
  | "Drama" 
  | "Thriller" 
  | "Horror" 
  | "Sci-Fi" 
  | "Romance" 
  | "Documentary"
  | "Animation";

export interface MovieCategory {
  id: string;
  title: string;
  movies: Movie[];
}

export type Language = "English" | "Hindi" | "Bengali" | "Hindi-Dubbed" | "Bengali-Dubbed";

export type Region = "IN" | "BD" | "US" | "UK";

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
}