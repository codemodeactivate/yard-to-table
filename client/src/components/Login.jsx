import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../utils/mutations";
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [loginMutation, { error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate(); // Use the useNavigate hook
  const { login } = useAuth(); // Get the new login function from AuthContext

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
      const { data } = await loginMutation({
        variables: {
          email: formState.email,
          password: formState.password
        }
      });

      if (data && data.login && data.login.token) {
        login(data.login); // Use the new login function
        navigate('/profile');
      }
    } catch (err) {
      // Handle error
      console.error(err);
    }
  }

  return (
    <div className="login-page flex flex-col justify-center items-center">
      <h2 className="text-2xl text-yard-blue text-center mb-8">Ready to grow more magic?</h2>
      <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
        {/* <label htmlFor="email">Email:</label> */}
        <input
          placeholder="Email"
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
        />
      
          {/* <label htmlFor="password">Password:</label> */}
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
       
        <button className="bg-yard-orange text-white " type="submit">
          Login
        </button>
      </form>
      {error && <div>Login failed</div>} {/* Display error message */}
    </div>
  );
  
};

export default LoginForm;
