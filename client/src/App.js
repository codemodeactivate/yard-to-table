import React from "react";
//import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProfileBuilder from "./components/ProfileBuilder";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", // Replace with your server URL
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route
              path="/homeowner-profile/:zip"
              exact
              element={<ProfileBuilder />}
            />
            <Route
              path="/gardener-profile/:zip"
              exact
              element={<ProfileBuilder />}
            />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
