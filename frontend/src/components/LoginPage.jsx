// LoginPage.js
import React, { useState } from 'react';

import '../styles/common.css'


function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    if (username.trim() === '') {
      setErrorMessage('Please enter a username');
      return;
    }

    setErrorMessage(null);
    onLogin(username);
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="input-container">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
