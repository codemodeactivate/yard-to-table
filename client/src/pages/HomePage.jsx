import React from 'react';
import HomePageCTA from '../components/HomePageCTA.jsx';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';

const HomePage = () => {
    const onProfileSelection = (profileType, zip) => {
        console.log(`Selected profile: ${profileType}, ZIP: ${zip}`);
    };

  return (
    <>

    <div>
      <a href="/" >YardtoTable</a>
      <h2 className="text-2xl text-yard-blue" >Unlock the Abundance in Your Yard</h2>
      <HomePageCTA onProfileSelection={onProfileSelection} />
      {/* <p className="text-center"> Already a member? <Link href="/src/compnents/LoginPage">Login</Link> Here!</p> */}
      <p className="text-center"> Already a member? <Link to="/login">Login</Link> Here!</p>
      <p className="text-center"> Sign Up: <Link to="/signup">Here!</Link></p>
      {/* Other components and content as needed */}

    </div>
    </>
  );
};

export default HomePage;
