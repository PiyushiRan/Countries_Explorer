import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  const containerStyle = {
    position: 'fixed',
    inset: 0, // top: 0, right: 0, bottom: 0, left: 0
    overflow: 'hidden',
    backgroundImage: "url('/images/world-bg.jpeg')",
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
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle} className="text-center">
        <h1 className="mb-3">Welcome to REST Countries Explorer</h1>
        <p className="mb-4 fs-5 text-muted">
          Discover information about countries around the world — powered by the REST Countries API.
        </p>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
