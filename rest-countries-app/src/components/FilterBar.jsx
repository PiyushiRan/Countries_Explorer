import React, { useState, useEffect } from 'react';

function FilterBar({ onFilterChange, initialFilters }) {
  const [selectedRegion, setSelectedRegion] = useState(initialFilters?.region || '');
  const [selectedLanguage, setSelectedLanguage] = useState(initialFilters?.language || '');

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];

  // Update state when initialFilters changes
  useEffect(() => {
    setSelectedRegion(initialFilters?.region || '');
    setSelectedLanguage(initialFilters?.language || '');
  }, [initialFilters]);

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    onFilterChange({ region, language: selectedLanguage });
  };

  const handleLanguageChange = (e) => {
    const language = e.target.value;
    setSelectedLanguage(language);
    onFilterChange({ region: selectedRegion, language });
  };

  return (
    <div className="mb-3">
      <select
        className="form-select"
        onChange={handleRegionChange}
        value={selectedRegion}
        aria-label="Filter by Region"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      
      <select
        className="form-select mt-2"
        onChange={handleLanguageChange}
        value={selectedLanguage}
        aria-label="Filter by Language"
      >
        <option value="">Filter by Language</option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;