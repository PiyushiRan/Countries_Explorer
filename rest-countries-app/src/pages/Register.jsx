import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [inputUsername, setInputUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const trimmedUsername = inputUsername.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedUsername || !trimmedPassword || !trimmedConfirmPassword) {
      setError('All fields are required');
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username already exists
    if (existingUsers.some(user => user.username.toLowerCase() === trimmedUsername.toLowerCase())) {
      setError('Username already exists');
      return;
    }

    // Create new user
    const newUser = { username: trimmedUsername, password: trimmedPassword };
    const updatedUsers = [...existingUsers, newUser];
    
    // Update localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', trimmedUsername); // Store the current user
    localStorage.removeItem('user'); // Clear any existing user session
    
    // Navigate to login page
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