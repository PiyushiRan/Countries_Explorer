import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const containerStyle = {
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
    backgroundImage: "url('https://images.pexels.com/photos/41953/earth-blue-planet-globe-planet-41953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const cardStyle = {
    maxWidth: '500px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
    color: '#333', // Explicit text color to avoid theme inheritance
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle} className="text-center">
        <h1 style={{ color: '#333' }} className="mb-3">Welcome to EarthCompass</h1>
        <p style={{ color: '#666' }} className="mb-4 fs-5">
          Discover information about countries around the world — powered by the REST Countries API.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/login')}
          >
            Get Started
          </button>
          <button
            className="btn btn-outline-primary btn-lg"
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;