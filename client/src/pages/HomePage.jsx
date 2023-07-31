import React from 'react';
import HomePageCTA from '../components/HomePageCTA.jsx';
import Login from '../components/Login.jsx';

const HomePage = () => {
    const onProfileSelection = (profileType, zip) => {
        console.log(`Selected profile: ${profileType}, ZIP: ${zip}`);
    };
    const LoginPage = () => {
      return <Login/>;
    };

  return (
    <>
    {/* <button onClick={() => setShowLoginPage(true)}>Login</button> */}
    {/* {showLoginPage && <LoginPage />} */}
    <div>
      <p>Marketing YAY !!</p>
      <HomePageCTA onProfileSelection={onProfileSelection} />
      {/* Other components and content as needed */}
    </div>
    </>
  );
};

export default HomePage;
