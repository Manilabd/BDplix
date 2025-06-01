import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import BrowsePage from './pages/BrowsePage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MoviePage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">404</h1>
                <p className="text-xl text-gray-400 mb-6">Page not found</p>
                <a 
                  href="/"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Back to Home
                </a>
              </div>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;