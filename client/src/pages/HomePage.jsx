import React from 'react';
import HomePageCTA from '../components/HomePageCTA.jsx';

const HomePage = () => {
    const onProfileSelection = (profileType, zip) => {
        console.log(`Selected profile: ${profileType}, ZIP: ${zip}`);
    };

  return (
    <div>
      <p>Marketing YAY !!</p>
      <HomePageCTA onProfileSelection={onProfileSelection} />
      {/* Other components and content as needed */}
    </div>
  );
};

export default HomePage;
