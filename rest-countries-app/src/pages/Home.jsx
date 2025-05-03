import React, { useEffect, useState } from 'react';
import { getAllCountries, getCountryByName, getCountriesByRegion } from '../services/api';
import CountryCard from '../components/CountryCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showScrollBar, setShowScrollBar] = useState(false); // NEW

  useEffect(() => {
    getAllCountries().then(data => {
      setCountries(data);
      setFilteredCountries(data);
    });
  }, []);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) { // you can adjust 150 to a different number
        setShowScrollBar(true);
      } else {
        setShowScrollBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredCountries(countries);
    } else {
      getCountryByName(query)
        .then(data => setFilteredCountries(data))
        .catch(() => setFilteredCountries([]));
    }
  };

  const handleFilterChange = async ({ region, language }) => {
    let filteredData = countries;

    if (region) {
      try {
        filteredData = await getCountriesByRegion(region);
      } catch {
        filteredData = [];
      }
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
  };

  return (
    <div style={{ backgroundColor: '#EAF6F6', minHeight: '200vh' }}>
      {/* Scroll-down visible bar */}
      {showScrollBar && (
        <div className="scroll-bar position-fixed top-0 start-50 translate-middle-x bg-primary text-white p-2 rounded shadow" style={{ zIndex: 1050 }}>
          <span>You're browsing countries 🌎</span>
        </div>
      )}

      {/* Add paddingTop here */}
      <main className="p-3" style={{ paddingTop: '80px' }}>
        <div className="container py-4">
          <div className="card shadow rounded mb-4">
            <div className="card-body">
              <h2 className="mb-3 text-center">🌍 Countries Explorer</h2>
              <p className="text-muted text-center mb-4">Search, filter and explore information about countries worldwide.</p>
              <div className="mb-3">
                <SearchBar onSearch={handleSearch} />
              </div>
              <FilterBar 
                onFilterChange={handleFilterChange} 
                countries={countries} 
                setFilteredCountries={setFilteredCountries}
              />
            </div>
          </div>

          {filteredCountries.length === 0 ? (
            <div className="text-center mt-5">
              <h5>😕 No countries found. Try adjusting your filters or search term.</h5>
            </div>
          ) : (
            <div className="row">
              {filteredCountries.map((country) => (
                <div key={country.cca3} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                  <CountryCard country={country} minimal={true} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
