import React, { useEffect, useState } from 'react';
import { getCountryByCode } from '../services/api';
import CountryCard from '../components/CountryCard';

function Favorites() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];

    const fetchCountries = async () => {
      try {
        const results = await Promise.all(favs.map(code => getCountryByCode(code)));
        setCountries(results.map(r => r[0]));
      } catch (error) {
        console.error("Error fetching favorite countries", error);
      } finally {
        setLoading(false);
      }
    };

    if (favs.length > 0) {
      fetchCountries();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#EAF6F6', minHeight: '100vh' }}>
      <div className="container py-4">
        <div className="card shadow rounded mb-4 sticky-top">
          <div className="card-body">
            <h2 className="mb-3 text-center">⭐ Your Favorite Countries</h2>
            <p className="text-muted text-center mb-0">
              Here's a list of all the countries you've marked as favorites.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : countries.length === 0 ? (
          <div className="text-center mt-5 text-muted">
            <i className="bi bi-heartbreak-fill display-4 mb-3 d-block"></i>
            <p>No favorite countries added yet. Go to Home and explore!</p>
          </div>
        ) : (
          <div className="row">
            {countries.map((country) => (
              <div key={country.cca3} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <CountryCard country={country} minimal={true} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
