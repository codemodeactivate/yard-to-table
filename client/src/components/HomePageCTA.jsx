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
    if (profileType === 'homeowner-profile') {
      navigate('/homeowner-profile'); //this is the URL they get pushed to going down this path
    // onProfileSelection(profileType, zip);
  } else {
      navigate('/gardener-profile'); //this is the URL they get pushed to going down this path
    // onProfileSelection(profileType, zip);
  }}

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
