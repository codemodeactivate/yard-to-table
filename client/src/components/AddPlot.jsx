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
  const [sqft, setSqft] = useState(plot ? plot.sqft : "");
  const [category, setCategory] = useState(plot ? plot.category : "");
  const [zip, setZip] = useState(plot ? plot.zip : "");
  const [image, setImage] = useState("");
  // const [userID, setUserID] = useState("");

  const handleCreatePlot = async (event) => {
    event.preventDefault();

    const plotData = {
      name,
      address,
      sqft: Number(sqft), // Convert sqft to a number
      category,
      zip,
      image,
      // userID,
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
      <h1 className="text-yard-red text-center">{plot ? "Edit Plot" : "Add New Plot"}</h1>
      <form className="plot-modal flex flex-col items-center" onSubmit={handleCreatePlot}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Plot Name"
        />
        <input
          type="text"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Zip Code"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Street Address"
        />
        <input
          type="number"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
          placeholder="Lot Square Footage"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Garden Type"
        />
         <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Upload a photo"
        />
        <button className="bg-yard-orange text-white" type="submit">Save</button>
      </form>
      {addPlotError && <p>Error creating plot: {addPlotError.message}</p>}
    </div>
  );
};

export default AddPlot;
