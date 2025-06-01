import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Menu, X, Home, Compass, Heart, Globe } from 'lucide-react';
import SearchBar from '../ui/SearchBar';
import LanguageSelector from '../ui/LanguageSelector';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const location = useLocation();
  
  const languages = ['English', 'Hindi', 'Bengali', 'Hindi-Dubbed', 'Bengali-Dubbed'];

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Explore', path: '/browse', icon: <Compass size={20} /> },
    { name: 'Favorites', path: '/favorites', icon: <Heart size={20} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 shadow-lg backdrop-blur-sm' : 'bg-gradient-to-b from-black/90 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film size={28} className="text-red-600" />
            <span className="text-xl font-bold tracking-tight text-white">Ur<span className="text-red-600">Movie</span>HD</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`text-sm font-medium flex items-center space-x-1 transition-colors duration-200 ${
                  isActive(link.path) ? 'text-red-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Search, Language, and Account (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <SearchBar compact className="w-10 hover:w-64 focus-within:w-64" />
            <LanguageSelector
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <SearchBar compact className="w-10" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden bg-gray-900`}
      >
        <div className="px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2 ${
                isActive(link.path) ? 'bg-gray-800 text-red-500' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
          <div className="px-3 py-2">
            <LanguageSelector
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;