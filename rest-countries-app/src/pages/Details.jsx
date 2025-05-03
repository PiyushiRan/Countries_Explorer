import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/api';

function Details() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCountryByCode(code)
      .then(data => {
        setCountry(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [code]);

  if (loading) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading country data...</p>
    </div>
  );

  if (!country) return (
    <div className="error-screen">
      <h2>Country not found</h2>
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
    </div>
  );

  return (
    <div className="details-page">
      <div className="details-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="country-name">{country.name.common}</h1>
      </div>

      <div className="country-container">
        <div className="flag-container">
          <img
            src={country.flags.svg}
            alt={`Flag of ${country.name.common}`}
            className="country-flag"
          />
          {country.coatOfArms?.svg && (
            <div className="coat-of-arms">
              <img
                src={country.coatOfArms.svg}
                alt={`Coat of arms of ${country.name.common}`}
              />
              <span>Coat of Arms</span>
            </div>
          )}
        </div>

        <div className="country-details">
          <div className="details-grid">
            <div className="detail-card">
              <h3>Capital</h3>
              <p>{country.capital?.[0] || 'N/A'}</p>
            </div>
            <div className="detail-card">
              <h3>Region</h3>
              <p>{country.region} {country.subregion && `(${country.subregion})`}</p>
            </div>
            <div className="detail-card">
              <h3>Population</h3>
              <p>{country.population.toLocaleString()}</p>
            </div>
            <div className="detail-card">
              <h3>Area</h3>
              <p>{country.area?.toLocaleString()} km²</p>
            </div>
            <div className="detail-card">
              <h3>Languages</h3>
              <p>{country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
            </div>
            <div className="detail-card">
              <h3>Currency</h3>
              <p>{country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'}</p>
            </div>
          </div>

          <div className="map-section">
            {country.latlng && (
              <button
                className="map-button"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}`,
                    '_blank'
                  )
                }
              >
                <span className="map-icon">🌍</span> View on Map
              </button>
            )}
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="border-countries">
              <h3>Neighboring Countries</h3>
              <div className="border-tags">
                {country.borders.map((borderCode) => (
                  <span 
                    key={borderCode} 
                    className="border-tag"
                    onClick={() => navigate(`/country/${borderCode}`)}
                  >
                    {borderCode}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Details;