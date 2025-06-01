import React from 'react';
import { Filter as FilterIcon } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import YearSelector from './YearSelector';

interface FilterBarProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
  onFilterToggle: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
  selectedYear,
  onYearChange,
  onFilterToggle
}) => {
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm py-4 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-6">
            <LanguageSelector
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />
            <YearSelector
              selectedYear={selectedYear}
              onYearChange={onYearChange}
            />
          </div>
          
          <button
            onClick={onFilterToggle}
            className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
          >
            <FilterIcon size={18} />
            <span>More Filters</span>
          </button>
          
          {(selectedLanguage !== 'All' || selectedYear) && (
            <div className="flex items-center gap-2">
              <div className="h-4 w-px bg-gray-700"></div>
              <button
                onClick={() => {
                  onLanguageChange('All');
                  onYearChange(null);
                }}
                className="text-sm text-red-500 hover:text-red-400 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;