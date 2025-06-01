import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange
}) => {
  return (
    <div className="relative group">
      <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
        <Globe size={18} />
        <span>{selectedLanguage}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => onLanguageChange(language)}
            className={`w-full text-left px-4 py-2 text-sm ${
              selectedLanguage === language
                ? 'bg-red-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;