import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlotCard from "../components/PlotCard";
import AddPlot from "../components/AddPlot";
import { GET_PLOTS, ADD_PLOT, EDIT_PLOT, DELETE_PLOT } from "../utils/mutations";
import { set } from "mongoose";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../utils/AuthContext";

const plusIcon = <FontAwesomeIcon icon={faPlus} />;


const PlotsPage = () => {
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
      <h1 className="text-4xl text-yard-red text-center my-8">Your Plots</h1>
      <div className="plot-list flex space-x-4 flex-wrap justify-center">
      {data.getPlots.map((plot) => (
        <PlotCard key={plot.id} plot={plot} onClick={() => toggleAddPlotModal(plot)} />
      ))}
      </div>
      {showAddPlotModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={() => toggleAddPlotModal(null)}>
              X
            </span>
            <AddPlot plot={selectedPlot} />
          </div>
        </div>
      )}
      <div className="add-plot-button flex justify-center flex-col items-center">
      <p className="text-yard-orange">Add New Plot</p>
      <button className="spin-button text-yard-orange text-6xl p-0 m-0 " onClick={() => toggleAddPlotModal(null)}>{plusIcon}</button>
      </div>
    </div>
  );
};

export default PlotsPage;
