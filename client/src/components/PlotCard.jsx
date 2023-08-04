// Import necessary libraries
import React from "react";

// The PlotCard component receives a 'plot' object as a prop and an onClick function
const PlotCard = ({ plot, onClick }) => {
  // The plot data is then displayed inside the component
  return (
    <div className="plot-card-container mb-8">
      <button key={plot.id} onClick={onClick} className="plot-card-button">
        <img
          src="https://i.stack.imgur.com/IUbDq.jpg"
          alt={plot.name}
          className="plot-card-image z-0"
        />
        <div className="plot-card-text z-1">
          <h5>{plot.name}</h5>
          <p>
            {plot.category}, {plot.sqft} sqft
          </p>
        </div>
      </button>
    </div>
  );
};

// Export the PlotCard component so it can be imported and used in other files
export default PlotCard;
