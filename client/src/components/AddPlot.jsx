import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ADD_PLOT, EDIT_PLOT, DELETE_PLOT } from "../utils/mutations";

const AddPlot = ({ plot }) => {
  const [addPlot, { loading: addPlotLoading, error: addPlotError }] =
    useMutation(ADD_PLOT);
  const [editPlot, { loading: editPlotLoading, error: editPlotError }] =
    useMutation(EDIT_PLOT);

  // Create state variables for each input field.
  // Variables are empty strings by default unless plot prop is provided
  const [name, setName] = useState(plot ? plot.name : "");
  const [address, setAddress] = useState(plot ? plot.address : "");
  const [sqft, setSqft] = useState(plot ? plot.sqft : 0);
  const [category, setCategory] = useState(plot ? plot.category : "");
  // const [image, setImage] = useState("");
  // const [userID, setUserID] = useState("");

  const handleCreatePlot = async (event) => {
    event.preventDefault();

    const plotData = {
      name,
      address,
      sqft: Number(sqft), // Convert sqft to a number
      category,
      // image,
      // userID
    };

    if (plot) {
      // If the plot prop is provided, use the editPlot mutation

      editPlot({
        variables: {
          id: plot.id,
          plotData,
        },
      });
    } else {

      // If the plot prop is not provided, use the addPlot mutation
      addPlot({
        variables: {
          plotData,
        },
      });
    }
  };

  return (
    <div>
      <h1>{plot ? "Edit Plot" : "Add New Plot"}</h1>
      <form onSubmit={handleCreatePlot}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          type="number"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
          placeholder="Sqft"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        {/* <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image" />
        <input type="text" value={userID} onChange={(e) => setUserID(e.target.value)} placeholder="User ID" /> */}
        <button type="submit">Create Plot</button>
      </form>
      {addPlotError && <p>Error creating plot: {addPlotError.message}</p>}
    </div>
  );
};

export default AddPlot;
