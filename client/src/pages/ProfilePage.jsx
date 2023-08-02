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
 const [sqft, setSqft] = useState("");
 const [category, setCategory] = useState("");
 const [image, setImage] = useState("");
 const [userID, setUserID] = useState("");

// Form State
const [plotData, setPlotData] = useState({
  name: "default",
  address: "default",
  sqft: 999,
  category: "Pollinator",
  // image: "",
  // userID: "" // Need to make this the logged in user's ID
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
      plotData: {
        name,
        address,
        sqft,
        category,
        // image,
        // userID
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
        <input type="text" value={sqft} onChange={(e) => setSqft(e.target.value)} placeholder="Sqft" />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" />
        <input type="text" value={userID} onChange={(e) => setUserID(e.target.value)} placeholder="User ID" />
        <button type="submit">Create Plot</button>
      </form>
    </div>
  );
};

export default ProfilePage;