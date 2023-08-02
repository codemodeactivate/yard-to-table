import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import PlotCard from "../components/PlotCard";
import { GET_PLOTS, ADD_PLOT, EDIT_PLOT, DELETE_PLOT } from "../utils/mutations";


const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_PLOTS);
  const [addPlot, { data: addPlotData, loading: addPlotLoading, error: addPlotError }] = useMutation(ADD_PLOT);

// Form State
const [plotData, setPlotData] = useState({
  name: "",
  address: "",
  sqft: 0,
  category: "",
  image: "",
  userID: "" // Need to make this the logged in user's ID
});

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setPlotData({
    ...plotData,
    [name]: value
  });
};

const handleCreatePlot = async (event) => {
  event.preventDefault();
  addPlot({
    variables: {
      plotData
    }
  });
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
      <form onSubmit={handleCreatePlot}>
        <input
          type="text"
          name="name"
          value={plotData.name}
          onChange={handleInputChange}
          placeholder="Plot Name"
          required
        />
        <input
          type="text"
          name="address"
          value={plotData.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
        />
        <input
          type="number"
          name="sqft"
          value={plotData.sqft}
          onChange={handleInputChange}
          placeholder="Square Feet"
          required
        />
        <input
          type="text"
          name="category"
          value={plotData.category}
          onChange={handleInputChange}
          placeholder="Category"
          required
        />
        <input
          type="text"
          name="image"
          value={plotData.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <button type="submit">Create Plot</button>
      </form>
    </div>
  );
};

export default ProfilePage;