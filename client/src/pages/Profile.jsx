// ProfilePage.jsx
import React from 'react';
import PlotCard from './PlotCard'; // update the path as per your directory structure

const ProfilePage = () => {
  return (
    <div className="container">
      <h1>Your Plots</h1>
      <div className="row">
        {/* Render the PlotCard component for each plot. This assumes you've fetched the data elsewhere. */}
        {plots.map((plot) => (
          <div className="col-sm-4" key={plot.id}>
            <PlotCard plot={plot} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
