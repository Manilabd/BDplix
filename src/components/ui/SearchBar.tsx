import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  placeholder?: string;
  compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  className = '', 
  placeholder = 'Search for movies...',
  compact = false
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  const baseClasses = 'bg-gray-800/80 rounded-full flex items-center transition-all duration-300 border border-transparent focus-within:border-gray-600 overflow-hidden';
  const compactClasses = compact 
    ? 'w-10 h-10 focus-within:w-64 px-2' 
    : 'w-full px-4 py-2';

  return (
    <form 
      onSubmit={handleSearch} 
      className={`${baseClasses} ${compactClasses} ${className}`}
    >
      <button 
        type="submit" 
        className={`text-gray-400 hover:text-white ${compact && !isFocused ? 'mx-auto' : 'mr-2'}`}
      >
        <Search size={18} />
      </button>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`bg-transparent text-white placeholder-gray-500 outline-none flex-1 ${compact && !isFocused ? 'w-0' : 'w-full'}`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {query && (
        <button 
          type="button" 
          onClick={clearSearch}
          className="text-gray-500 hover:text-white p-1"
        >
          <X size={16} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;