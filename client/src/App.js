import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProfileBuilder from './components/profileBuilder';
// import Profile from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/homeowner-profile/:zip" exact element={<ProfileBuilder />} />
            <Route path="/gardener-profile/:zip" exact element={<ProfileBuilder />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
