import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
// const bcrypt = require('bcrypt');

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Add Logic for handling login
    // bcrypt.hash(password, 10, (err, hash) => {
    
    
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-page">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
