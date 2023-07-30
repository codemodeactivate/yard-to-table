import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ProfileBuilder from './pages/ProfileBuilder';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/profile" exact component={ProfileBuilder} />
          </Switch>
        </Router>

      </header>
    </div>
  );
}

export default App;
