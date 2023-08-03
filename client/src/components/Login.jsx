import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Auth from "../utils/auth";
import { LOGIN_MUTATION } from "../utils/mutations";

function LoginForm(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const mutationResponse = await login({
        variables: {
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.login;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // if (!email || !password) {
  //   console.log('Please enter all required fields.');
  //   return;
  // }

  //   try {
  //     const { data } = await login({
  //       variables: { email, password },
  //     });

  //     if(data && data.login && data.login.token) {
  //       localStorage.setItem('token', data.login.token);
  //     }
  //     // if successful redirect to user's profile page
  //     console.log('Login data:', data);
  //     window.location.replace('/profile');
  //   } catch (error) {
  //    // if unsuccessful, display error message
  //     console.log('Incorrect Email or Password', error);
  //   }
  // };

  return (
    <div className="login-page">
      <h2>Ready to grow more magic?</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          placeholder="yourEmail@test.com"
          type="text"
          id="email"
          onChange={handleChange}
        />
        <div className="login-page">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="******"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
