import React from 'react';
import { Calendar } from 'lucide-react';

interface YearSelectorProps {
  startYear?: number;
  endYear?: number;
  selectedYear: number | null;
  onYearChange: (year: number | null) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  startYear = 1990,
  endYear = new Date().getFullYear(),
  selectedYear,
  onYearChange
}) => {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i
  );

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
        <Calendar size={18} />
        <span>{selectedYear || 'Release Year'}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 max-h-60 overflow-y-auto py-2 bg-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <button
          onClick={() => onYearChange(null)}
          className={`w-full text-left px-4 py-2 text-sm ${
            !selectedYear ? 'bg-red-600 text-white' : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          All Years
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => onYearChange(year)}
            className={`w-full text-left px-4 py-2 text-sm ${
              selectedYear === year
                ? 'bg-red-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default YearSelector;