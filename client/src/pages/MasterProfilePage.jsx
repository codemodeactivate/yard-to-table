import React, { useState, useEffect } from "react";  // Import useEffect
import { gql, useQuery, useMutation } from "@apollo/client";
import PlotCard from "../components/PlotCard";
import AddPlot from "../components/AddPlot";
import GardenerProfileComponent from "../components/GardenerProfileComponent";
import HomeownerProfileComponent from "../components/HomeownerProfileComponent";
import { GET_CURRENT_USER } from "../utils/mutations";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";


const MasterProfilePage = () => {

  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const { loading, error, data } = useQuery(GET_CURRENT_USER);

  const [showAddPlotModal, setShowAddPlotModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [profile, setProfile] = useState(null);

  const toggleGardenerProfile = () => {
    setProfile(profile === 'gardener' ? null : 'gardener');
  };

  const toggleHomeownerProfile = () => {
    setProfile(profile === 'homeowner' ? null : 'homeowner');
  };

  // Once the data is loaded, determine the default profile view based on isGardener value
  useEffect(() => {
    if (data && data.getCurrentUser.isGardener) {
      setProfile('gardener');
    } else {
      setProfile('homeowner');
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("Error message:", error.message);
    console.log("Full error object:", error);
    return <p>Error :(</p>;
  }

  console.log("Current User Data", data.getCurrentUser);

  return (
    <div>
      <h1>Your Profile</h1>
      <button onClick={toggleGardenerProfile}>
        {profile === 'gardener' ? 'Hide' : 'Show'} Gardener Profile
      </button>
      <button onClick={toggleHomeownerProfile}>
        {profile === 'homeowner' ? 'Hide' : 'Show'} Homeowner Profile
      </button>
      {profile === 'gardener' && <GardenerProfileComponent />}
      {profile === 'homeowner' && <HomeownerProfileComponent />}
    </div>
  );
};

export default MasterProfilePage;
