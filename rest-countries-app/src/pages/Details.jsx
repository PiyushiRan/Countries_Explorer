import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../services/api';

function Details() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    getCountryByCode(code).then(data => setCountry(data[0]));
  }, [code]);

  if (!country) return <div className="loading-message">Loading...</div>;

  return (
    <div className="container">
      <div className="details-container">
        {/* Back Button */}
        <button
          className="btn-back mb-3"
          onClick={() => navigate(-1)}
        >
          ← Back to Home
        </button>

        <h2>{country.name.common}</h2>
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="img-fluid mb-3"
          style={{ maxHeight: '200px' }}
        />

        <ul className="list-group mb-3">
          <li className="list-group-item">Capital: {country.capital?.[0]}</li>
          <li className="list-group-item">Region: {country.region}</li>
          <li className="list-group-item">
            Population: {country.population.toLocaleString()}
          </li>
          <li className="list-group-item">
            Languages:{' '}
            {country.languages && Object.values(country.languages).join(', ')}
          </li>
        </ul>

        {/* Neighboring Countries */}
        {country.borders && country.borders.length > 0 ? (
          <div className="mt-3">
            <strong>Neighboring Countries:</strong>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {country.borders.map((borderCode) => (
                <span key={borderCode} className="neighbor-badge">
                  {borderCode}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <strong>Neighboring Countries:</strong>
            <span className="text-muted">No neighboring countries</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
