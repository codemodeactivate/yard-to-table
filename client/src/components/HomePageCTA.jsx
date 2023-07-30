import React from 'react';


const HomePageCTA = ({ onProfileSelection }) => {
  const [zip, setZip] = React.useState('');


  const handleZipChange = (event) => {
    // console.log(event.target.value);
    setZip(event.target.value);
  };

  const handleProfileSelection = (profileType) => {
    onProfileSelection(profileType, zip);
  };

  return (
    <div>
      <label htmlFor="zip">Enter Zip Code:</label>
      <input type="text" id="zip" value={zip} onChange={handleZipChange} />
      <button onClick={() => handleProfileSelection('path1')}>I'm a Homeowner</button>
      <button onClick={() => handleProfileSelection('path2')}>I'm a Gardener</button>
    </div>
  );
};

export default HomePageCTA;
