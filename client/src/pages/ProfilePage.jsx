import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import PlotCard from "../components/PlotCard";
import { GET_PLOTS, ADD_PLOT, EDIT_PLOT, DELETE_PLOT } from "../utils/mutations";

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_PLOTS);
  const [addPlot, { data: addPlotData, loading: addPlotLoading, error: addPlotError }] = useMutation(ADD_PLOT);

  // Create state variables for each input field
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [sqft, setSqft] = useState(0);
  const [category, setCategory] = useState("");
  // const [image, setImage] = useState("");
  // const [userID, setUserID] = useState("");

  const handleCreatePlot = async (event) => {
    event.preventDefault();
    addPlot({
      variables: {
        plotData: {
          name,
          address,
          sqft: Number(sqft), // Convert sqft to a number
          category,
          image,
          userID
        }
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
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
        <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} placeholder="Sqft" />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        {/* <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" />
        <input type="text" value={userID} onChange={(e) => setUserID(e.target.value)} placeholder="User ID" /> */}
        <button type="submit">Create Plot</button>
      </form>
    </div>
  );
};

export default ProfilePage;
