import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.log('Please enter all required fields.');
      return;
    }

    try {
      const { data } = await login({
        variables: { email, password },
      });

      if(data && data.login && data.login.token) {
        localStorage.setItem('token', data.login.token);
      }
      // if successful redirect to user's profile page
      console.log('Login data:', data);
      window.location.replace('/profile');
    } catch (error) {
     // if unsuccessful, display error message
      console.log('Incorrect Email or Password', error);
    }
  };

  return (
    <div className="login-page">
      <h2>Ready to grow more magic?</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="login-page">
        <label htmlFor="password">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
