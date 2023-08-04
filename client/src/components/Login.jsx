import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../utils/mutations";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';


const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate(); // Use the useNavigate hook
  const { setLoggedIn } = useAuth();
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: {
          email: formState.email,
          password: formState.password
        }
      });




      if (data && data.login && data.login.token) {
        localStorage.setItem('token', data.login.token);
        setLoggedIn(true);
        // Redirect user to the /profile page
        navigate('/profile');
      }
    } catch (err) {
      // Handle error
      console.error(err);
    }
  }

  return (
    <div className="login-page">
      <h2>Ready to grow more magic?</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="yourEmail@test.com"
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
        />
        <div className="login-page">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
      {error && <div>Login failed</div>} {/* Display error message */}
    </div>
  );
};

export default LoginForm;
