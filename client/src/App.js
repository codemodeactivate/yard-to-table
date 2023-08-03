import React from "react";
//import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
// import ProfileBuilder from "./components/ProfileBuilder";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import MasterProfilePage from "./pages/MasterProfilePage";
import Footer from "./components/Footer";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql", // Replace with your server URL
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <header className="App-header">
        <Router>
          <Nav />
          <div className="flex-grow">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            {/* <Route
              path="/homeowner-profile/:zip"
              exact
              element={<ProfileBuilder />}
            />
            <Route
              path="/gardener-profile/:zip"
              exact
              element={<ProfileBuilder />}
            /> */}

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile-master" element={<MasterProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          </div>
          <Footer />
        </Router>
      </header>
    </div>
  );
}

export default App;
