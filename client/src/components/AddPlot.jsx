import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ADD_PLOT, EDIT_PLOT, DELETE_PLOT, GET_PLOTS } from "../utils/mutations";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";


const AddPlot = ({ plot, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  // const { currentUser } = useContext(AuthContext);
  const [userID, setUserID] = useState(currentUser ? currentUser.id : '');
  const [addPlot, { loading: addPlotLoading, error: addPlotError }] =
  useMutation(ADD_PLOT, {
    update(cache, { data: { addPlot } }) {
      const data = cache.readQuery({ query: GET_PLOTS });
      const newData = [...data.getPlots, addPlot];
      cache.writeQuery({ query: GET_PLOTS, data: {getPlots: newData} });
    }
  });

const [editPlot, { loading: editPlotLoading, error: editPlotError }] =
  useMutation(EDIT_PLOT, {
    update(cache, { data: { editPlot } }) {
      const data = cache.readQuery({ query: GET_PLOTS });
      const newData = data.getPlots.map(plot =>
        plot.id === editPlot.id ? editPlot : plot
      );
      cache.writeQuery({ query: GET_PLOTS, data: {getPlots: newData} });
    }
  });

const [deletePlot, { loading: deletePlotLoading, error: deletePlotError }] =
  useMutation(DELETE_PLOT, {
    update(cache, { data: { deletePlot: deletedPlotId } }) {
      const data = cache.readQuery({ query: GET_PLOTS });
      const newData = data.getPlots.filter(plot => plot.id !== deletedPlotId);
      cache.writeQuery({ query: GET_PLOTS, data: {getPlots: newData} });
    }
  });

// Additional state for success and message
const [isSuccess, setIsSuccess] = useState(false);
const [message, setMessage] = useState('');

  // Create state variables for each input field.
  // Variables are empty strings by default unless plot prop is provided
  const [name, setName] = useState(plot ? plot.name || '' : ''); // The OR operator is used to prevent a warning in the console if name is null
  const [address, setAddress] = useState(plot ? plot.address || '' : '');
  const [sqft, setSqft] = useState(plot ? plot.sqft || '' : '');
  const [category, setCategory] = useState(plot ? plot.category || '' : '');
  const [zip, setZip] = useState(plot ? plot.zip || '' : '');
  const [image, setImage] = useState(plot ? plot.image || '' : '');
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
      userID: currentUser?.id,
    };
try {
    if (plot) {
      // If the plot prop is provided, use the editPlot mutation

     await editPlot({
        variables: {
          id: plot.id,
          plotData,
        },
      });
      setIsSuccess(true);
      setMessage('Plot updated successfully!');
    } else {

      // If the plot prop is not provided, use the addPlot mutation
      await addPlot({
        variables: {
          plotData,
        },
      });
      setIsSuccess(true);
      setMessage('Plot updated successfully!');
    }
  } catch (error) {
    setMessage('An error occurred while saving the plot.', error.message);
  }
  };

  const handleDeletePlot = async () => {
    if (plot) {
      try {
        await deletePlot({
          variables: { id: plot.id },
        });
        setIsSuccess(true);
        setMessage('Plot deleted successfully.');
      } catch (error) {
        setMessage('An error occurred while deleting the plot.', error.message);
        console.log(error);
      }
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
        {isSuccess && <div className="text-yard-green">{message}</div>} {/* Display the correct message */}
        <button className="bg-yard-orange text-white" type="submit">Save</button>
        {plot && <button className="bg-yard-red text-white" onClick={handleDeletePlot}>Delete</button>}
      </form>
      {addPlotError && <p>Error creating plot: {addPlotError.message}</p>}
    </div>
  );
};

export default AddPlot;
