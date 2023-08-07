import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer";
import PlotsPage from "./pages/PlotsPage";
import JobsPage from "./pages/JobsPage";




function App() {
  return (

      <div className="App flex flex-col min-h-screen">
        <Router>
          <header className="App-header">
            <Nav />
          </header>
          <div className="flex-grow">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/profile-master" element={<ProfilePage />} /> */}
            <Route path="/search" element={<SearchPage />} />
            <Route path="/plots" element={<PlotsPage />} />

            <Route path="/jobs" element={<JobsPage />} />
          </Routes>
          </div>
          <Footer />
        </Router>
      </div>

  );
}

export default App;
