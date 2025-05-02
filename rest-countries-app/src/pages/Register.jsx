import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register({ setUsername }) {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!inputUsername.trim() || !password.trim() || !confirmPassword.trim()) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.some(user => user.username === inputUsername.trim())) {
      setError('Username already exists');
      return;
    }
    const newUser = { username: inputUsername.trim(), password: password.trim() };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', newUser.username);
    setUsername(newUser.username);
    navigate('/login');
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
        <h3 className="text-center mb-4">Register</h3>
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
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={handleRegister}
          disabled={!inputUsername.trim() || !password.trim() || !confirmPassword.trim()}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;