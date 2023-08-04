import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/client";
import App from './App';
import client from './client'; // Make sure the correct path is used for client.js
import { AuthProvider } from './utils/AuthContext';
import './tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
