import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProfileBuilder from './components/ProfileBuilder';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/homeowner-profile/:zip" exact element={<ProfileBuilder />} />
            <Route path="/gardener-profile/:zip" exact element={<ProfileBuilder />} />
          </Routes>
        </Router>

      </header>
    </div>
  );
}

export default App;