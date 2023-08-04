// Import necessary libraries
import React from 'react';

// The PlotCard component receives a 'plot' object as a prop and an onClick function
const PlotCard = ({ plot, onClick }) => {
  // The plot data is then displayed inside the component
  return (
    <button key={plot.id} onClick={onClick} className="plot-card-button">
  <img src="https://i.stack.imgur.com/IUbDq.jpg" alt={plot.name} />
  <div>
    <h5>{plot.name}</h5>
    <h6>{plot.category}</h6>
    <p>{plot.sqft} sqft</p>
    <p>User: {plot.userID}</p>
  </div>
</button>

  );
};

// Export the PlotCard component so it can be imported and used in other files
export default PlotCard;
