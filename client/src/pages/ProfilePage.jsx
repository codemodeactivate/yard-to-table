import React from 'react';
import PlotCard from '../components/plotCard';

const ProfilePage = () => {
  // Create an array of plot data

  const plots = []; // TODO: replace this with actual data fetching
  
  // Render a heading and a PlotCard component for each plot
  // Map over the array of plots and render a PlotCard for each plot
  // Pass the plot object as a prop to the PlotCard component
  return (
    <div>
      <h1>Your Plots</h1>
      {plots.map(plot => (
        <PlotCard key={plot.id} plot={plot} />
      ))}
    </div>
  );
};

export default ProfilePage;
