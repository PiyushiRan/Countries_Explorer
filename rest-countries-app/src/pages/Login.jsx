import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setUsername }) {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const matchedUser = users.find(
      (user) =>
        user.username === inputUsername.trim() &&
        user.password === password.trim()
    );

    if (matchedUser) {
      localStorage.setItem('user', matchedUser.username);
      setUsername(matchedUser.username);
      navigate('/home');
    } else {
      setError('Invalid username or password');
    }
  };

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

  return (
    <div style={containerStyle}>
      <div className="card shadow p-4" style={{ minWidth: '300px', maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleLogin}
          disabled={!inputUsername.trim() || !password.trim()}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;