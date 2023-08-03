import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import PlotCard from "../components/PlotCard";
import AddPlot from "../components/AddPlot";
import GardenerProfileComponent from "../components/GardenerProfileComponent"; // Import the GardenerProfileComponent
import { GET_PLOTS, ADD_PLOT, EDIT_PLOT, DELETE_PLOT } from "../utils/mutations";

const MasterProfilePage = () => {
  const { loading, error, data } = useQuery(GET_PLOTS);
  const [showAddPlotModal, setShowAddPlotModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [showGardenerProfile, setShowGardenerProfile] = useState(false); // State to toggle gardener profile

  const toggleAddPlotModal = (plot) => {
    setSelectedPlot(plot);
    setShowAddPlotModal(!showAddPlotModal);
  };

  const toggleGardenerProfile = () => {
    setShowGardenerProfile(!showGardenerProfile);
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("Error message:", error.message);
    console.log("Full error object:", error);
    return <p>Error :(</p>;
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <button onClick={toggleGardenerProfile}>Toggle Profile</button> {/* Add the toggle button */}
      {/* Display gardener profile if showGardenerProfile is true */}
      {showGardenerProfile && <GardenerProfileComponent />} {/* Display the GardenerProfileComponent */}
      {/* Display homeowner profile if showGardenerProfile is false */}
      {!showGardenerProfile && (
        <div>
          <h1>Your Plots</h1>
          {data.getPlots.map((plot) => (
            <PlotCard key={plot.id} plot={plot} onClick={() => toggleAddPlotModal(plot)} />
          ))}
          {showAddPlotModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close-button" onClick={() => toggleAddPlotModal(null)}>
                  &times;
                </span>
                <AddPlot plot={selectedPlot} />
              </div>
            </div>
          )}
          <button onClick={() => toggleAddPlotModal(null)}>+</button>
        </div>
      )}
    </div>
  );
};

export default MasterProfilePage;
