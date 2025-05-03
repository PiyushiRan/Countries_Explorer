import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CountryCard({ country,minimal = false }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favs.includes(country.cca3));

    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'light');
    };

    window.addEventListener('storage', handleThemeChange);
    return () => window.removeEventListener('storage', handleThemeChange);
  }, [country.cca3]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    let favs = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      favs = favs.filter(code => code !== country.cca3);
    } else {
      favs.push(country.cca3);
    }

    localStorage.setItem('favorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  const handleClick = () => {
    navigate(`/country/${country.cca3}`);
  };

  return (
    <div
      className={`card h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
      role="article" 
    >
      <img src={country.flags.svg} className="card-img-top" alt={country.name.common} />
      <div className="card-body">
        <h5 className="card-title">{country.name.common}</h5>
        {!minimal && (
          <>
            <p className="card-text">Capital: {country.capital}</p>
            <p className="card-text">Region: {country.region}</p>
            <p className="card-text">Population: {country.population.toLocaleString()}</p>
          </>
        )}
        <button
          className={`btn btn-sm ${isFavorite ? 'btn-danger' : 'btn-outline-primary'}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '❤️ Remove' : '🤍 Favorite'}
        </button>
      </div>
    </div>
  );
}

export default CountryCard;
