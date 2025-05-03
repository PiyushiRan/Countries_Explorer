import './App.css';
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [username, setUsername] = useState(localStorage.getItem('user') || '');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsername('');
    navigate('/');
  };

  const hideNavbar = location.pathname === '/' || location.pathname === '/login';

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Top Navbar - hidden on Landing and Login pages */}
      {!hideNavbar && (
        <nav className={`navbar navbar-expand-lg fixed-top ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} px-4 shadow`}>
          <Link className="navbar-brand fw-bold" to="/home">🌍 Countries Explorer</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  <i className="bi bi-house-door-fill me-1"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link">
                  <i className="bi bi-star-fill me-1"></i> Favorites
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-2">
  {username ? (
    <>
      <span className="me-2">WELCOME {username},</span>
      <button className="btn btn-outline-primary btn-sm" onClick={handleLogout}>
        <i className="bi bi-box-arrow-right me-1"></i> Logout
      </button>
    </>
  ) : (
    <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/login')}>
      <i className="bi bi-box-arrow-in-right me-1"></i> Login
    </button>
  )}
  <button 
  className="btn btn-sm btn-primary" 
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  style={{ backgroundColor: '#3498db', borderColor: '#3498db' }}
>
  {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
</button>
</div>

          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="p-3">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/country/:code" element={<Details />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login setUsername={setUsername} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
