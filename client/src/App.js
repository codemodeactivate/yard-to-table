import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProfileBuilder from './components/ProfileBuilder';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql', // Replace with your server URL
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/homeowner-profile/:zip" exact element={<ProfileBuilder />} />
            <Route path="/gardener-profile/:zip" exact element={<ProfileBuilder />} />
          </Routes>
        </Router>
    </ApolloProvider>

  )
}

export default App; 
