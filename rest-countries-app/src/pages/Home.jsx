import React, { useEffect, useState } from 'react';
import { getAllCountries, getCountryByName, getCountriesByRegion } from '../services/api';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // New state for dark mode

  // Check user's preferred color scheme
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    
    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setDarkMode(mediaQuery.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Apply dark/light class to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);

  useEffect(() => {
    setIsLoading(true);
    getAllCountries()
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBar(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredCountries(countries);
    } else {
      setIsLoading(true);
      getCountryByName(query)
        .then(data => {
          setFilteredCountries(data);
          setIsLoading(false);
        })
        .catch(() => {
          setFilteredCountries([]);
          setIsLoading(false);
        });
    }
  };

  const handleFilterChange = async ({ region, language }) => {
    setIsLoading(true);
    let filteredData = countries;

    try {
      if (region) {
        filteredData = await getCountriesByRegion(region);
      }

      if (language) {
        filteredData = filteredData.filter(country => {
          if (Array.isArray(country.languages)) {
            return country.languages.includes(language);
          }
          if (typeof country.languages === 'object') {
            return Object.values(country.languages).includes(language);
          }
          return country.languages === language;
        });
      }

      setFilteredCountries(filteredData);
    } catch (error) {
      setFilteredCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : 'light-mode'}`}>      

      {/* Scroll indicator */}
      {showScrollBar && (
        <div 
          className="scroll-indicator" 
          onClick={scrollToTop}
        >
          <span>🌎 Exploring Countries</span>
          <span className="scroll-to-top">↑ Back to top</span>
        </div>
      )}

      <main className="home-container" >
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content" >
            <h1 className="hero-title">
              <span className="hero-icon">🌍</span>
              EarthCompass
            </h1>
            <p className="hero-subtitle">
              Discover fascinating information about every country in the world
            </p>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="search-filter-section">
          <div className="container">
            <div className="search-filter-card">
              <div className="search-container">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="filter-container">
                <FilterBar 
                  onFilterChange={handleFilterChange} 
                  countries={countries} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="results-section">
          <div className="container">
            {isLoading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading countries...</p>
              </div>
            ) : filteredCountries.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">😕</div>
                <h3>No countries found</h3>
                <p>Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <>
                <div className="results-header">
                  <h2>
                    Showing <span className="highlight">{filteredCountries.length}</span> countries
                  </h2>
                </div>
                <div className="countries-grid">
                  {filteredCountries.map((country) => (
                    <CountryCard 
                      key={country.cca3} 
                      country={country} 
                      minimal={true}
                      darkMode={darkMode} // Pass darkMode prop to CountryCard
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;