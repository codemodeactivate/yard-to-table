import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import PlotCard from "../components/PlotCard";
import AddPlot from "../components/AddPlot";
import { GET_PLOTS, ADD_PLOT, EDIT_PLOT, DELETE_PLOT } from "../utils/mutations";
import { set } from "mongoose";

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_PLOTS);
  const [showAddPlotModal, setShowAddPlotModal] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);

  const toggleAddPlotModal = (plot) => {
    setSelectedPlot(plot);
    setShowAddPlotModal(!showAddPlotModal);
  };

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("Error message:", error.message);
    console.log("Full error object:", error);
    return <p>Error :(</p>;
  }

  return (
    <div>
      <h1>Your Plots</h1>
      {data.getPlots.map((plot) => (
        <PlotCard key={plot.id} plot={plot} />
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
  );
};

export default ProfilePage;
