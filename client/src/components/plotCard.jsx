// Import necessary libraries
import React from 'react';

// The PlotCard component receives a 'plot' object as a prop
const PlotCard = ({ plot }) => {
  // The plot data is then displayed inside the component
  return (
    <div key={plot.id}>
      {/* Render an image element with the plot image URL and name as alt text */}
      <img src={plot.image} alt={plot.name} />
      <div>
        {/* Display the plot's name, category, address, and size */}
        <h5>{plot.name}</h5>
        <h6>{plot.category}</h6>
        <p>{plot.address}</p>
        <p>{plot.sqft} sqft</p>
      </div>
    </div>
  );
};

// Export the PlotCard component so it can be imported and used in other files
export default PlotCard;
