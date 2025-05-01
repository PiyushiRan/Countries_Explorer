import React, { useEffect, useState, useCallback } from 'react';
import { getAllCountries, getCountryByName, getCountriesByRegion } from '../services/api';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

function Home({ theme }) {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showScrollBar, setShowScrollBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [filters, setFilters] = useState(
    JSON.parse(localStorage.getItem('filters')) || { region: '', language: '' }
  );

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('light-mode', theme === 'light');
  }, [theme]);

  // Fetch all countries on mount
  useEffect(() => {
    setIsLoading(true);
    getAllCountries()
      .then(data => {
        setCountries(data);
        setIsLoading(false);
      })
      .catch(() => {
        setFilteredCountries([]);
        setIsLoading(false);
      });
  }, []);

  // Memoized applyFilters function
  const applyFilters = useCallback(async (data, { region, language }) => {
    setIsLoading(true);
    let filteredData = data;

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
  }, []);

  // Apply persisted search and filters after countries are loaded
  useEffect(() => {
    if (!countries.length) return;

    if (searchQuery) {
      setIsLoading(true);
      getCountryByName(searchQuery)
        .then(data => {
          if (filters.region || filters.language) {
            applyFilters(data, filters);
          } else {
            setFilteredCountries(data);
            setIsLoading(false);
          }
        })
        .catch(() => {
          setFilteredCountries([]);
          setIsLoading(false);
        });
    } else if (filters.region || filters.language) {
      applyFilters(countries, filters);
    } else {
      setFilteredCountries(countries);
    }
  }, [countries, searchQuery, filters, applyFilters]);

  // Handle scroll for scroll indicator
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBar(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search with persistence
  const handleSearch = (query) => {
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);

    if (query === '') {
      if (filters.region || filters.language) {
        applyFilters(countries, filters);
      } else {
        setFilteredCountries(countries);
      }
    } else {
      setIsLoading(true);
      getCountryByName(query)
        .then(data => {
          if (filters.region || filters.language) {
            applyFilters(data, filters);
          } else {
            setFilteredCountries(data);
          }
          setIsLoading(false);
        })
        .catch(() => {
          setFilteredCountries([]);
          setIsLoading(false);
        });
    }
  };

  // Handle filter change with persistence
  const handleFilterChange = ({ region, language }) => {
    const newFilters = { region: region || '', language: language || '' };
    setFilters(newFilters);
    localStorage.setItem('filters', JSON.stringify(newFilters));

    applyFilters(searchQuery ? filteredCountries : countries, newFilters);
  };

  // Clear search and filters
  const handleClearAll = () => {
    setSearchQuery('');
    setFilters({ region: '', language: '' });
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('filters');
    setFilteredCountries(countries);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`home-page ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      {showScrollBar && (
        <div className="scroll-indicator" onClick={scrollToTop}>
          <span>🌎 Exploring Countries</span>
          <span className="scroll-to-top">↑ Back to top</span>
        </div>
      )}

      <main className="home-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-icon">🌍</span>
              EarthCompass
            </h1>
            <p className="hero-subtitle">
              Discover fascinating information about every country in the world
            </p>
          </div>
        </section>

        <section className="search-filter-section">
          <div className="container">
            <div className="search-filter-card">
              <div className="row align-items-center">
                <div className="col-md-6 mb-2 mb-md-0">
                  <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
                </div>
                <div className="col-md-6 mb-2 mb-md-0">
                  <FilterBar
                    onFilterChange={handleFilterChange}
                    initialFilters={filters}
                  />
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn btn-outline-secondary clear-all-btn"
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </section>

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
                <div className="row">
                  {filteredCountries.map((country) => (
                    <div key={country.cca3} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                      <CountryCard
                        country={country}
                        minimal={true}
                        theme={theme}
                      />
                    </div>
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