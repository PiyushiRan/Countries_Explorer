import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from './pages/Favorites';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('user') || '');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Apply theme classes only when not on LandingPage
    if (location.pathname !== '/') {
      document.body.className = theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';
    } else {
      // Reset body classes for LandingPage to avoid theme interference
      document.body.className = '';
    }
    localStorage.setItem('theme', theme);
  }, [theme, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsername('');
    navigate('/');
    setExpanded(false);
  };

  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <div style={{ minHeight: '100vh' }}>
      {!hideNavbar && (
        <nav className={`navbar navbar-expand-lg fixed-top ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-4 shadow`}>
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold" to="/home">🌍 EarthCompass</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link 
                    to="/home" 
                    className="nav-link"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="bi bi-house-door-fill me-1"></i> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link 
                    to="/favorites" 
                    className="nav-link"
                    onClick={() => setExpanded(false)}
                  >
                    <i className="bi bi-star-fill me-1"></i> Favorites
                  </Link>
                </li>
              </ul>
              <div className="d-flex align-items-center gap-2">
                {username ? (
                  <>
                    <span className="me-2 d-none d-sm-inline">WELCOME {username},</span>
                    <button 
                      className="btn btn-outline-primary btn-sm" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-1"></i> 
                      <span className="d-none d-md-inline"> Logout</span>
                    </button>
                  </>
                ) : (
                  <button 
                    className="btn btn-outline-primary btn-sm" 
                    onClick={() => {
                      navigate('/login');
                      setExpanded(false);
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> 
                    <span className="d-none d-md-inline"> Login</span>
                  </button>
                )}
                <button 
                  className="btn btn-sm btn-primary" 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  style={{ backgroundColor: '#3498db', borderColor: '#3498db' }}
                >
                  {theme === 'dark' ? (
                    <>
                      <i className="bi bi-sun-fill me-1 d-none d-md-inline"></i>
                      <span className="d-md-none">☀️</span>
                      <span className="d-none d-md-inline">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-moon-fill me-1 d-none d-md-inline"></i>
                      <span className="d-md-none">🌙</span>
                      <span className="d-none d-md-inline">Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="p-3" style={{ paddingTop: hideNavbar ? '0' : '70px' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home theme={theme} />} />
          <Route path="/country/:code" element={<Details theme={theme} />} />
          <Route path="/favorites" element={<Favorites theme={theme} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;