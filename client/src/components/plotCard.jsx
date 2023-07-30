// Import necessary libraries
import React from 'react';

// The PlotCard component receives a 'plot' object as a prop
const PlotCard = ({ plot }) => {
  // The plot data is then displayed inside the component
  return (
    <div key={plot.id}>
      <img src={plot.image} alt={plot.name} />
      <div>
        <h5>{plot.name}</h5>
        <h6>{plot.category}</h6>
        <p>{plot.sqft} sqft</p>
      </div>
    </div>
  );
};

// Export the PlotCard component so it can be imported and used in other files
export default PlotCard;
