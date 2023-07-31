import React from 'react';
import { useNavigate } from 'react-router-dom';


const HomePageCTA = ({ onProfileSelection }) => {
  const navigate = useNavigate();
  const [zip, setZip] = React.useState('');


  const handleZipChange = (event) => {
    // console.log(event.target.value);
    setZip(event.target.value);
  };

  const handleProfileSelection = (profileType) => {
    if (zip.length !== 5 || isNaN(zip)) { // assuming a 5-digit zip code
      alert('Please enter a valid 5-digit zip code.');
      return;
    }
    if (profileType === 'homeowner') {
      navigate(`/homeowner-profile/${encodeURIComponent(zip)}`, { state: { zip } });
    } else {
      navigate(`/gardener-profile/${encodeURIComponent(zip)}`, { state: { zip } });
    }
  };

  return (
    <div>
      <label htmlFor="zip">Enter Zip Code:</label>
      <input type="text" id="zip" value={zip} onChange={handleZipChange} />
      <button onClick={() => handleProfileSelection('homeowner')}>I'm a Homeowner</button>
      <button onClick={() => handleProfileSelection('gardener')}>I'm a Gardener</button>
    </div>
  );
};

export default HomePageCTA;
