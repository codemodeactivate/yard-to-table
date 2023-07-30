// Importing necessary libraries and components
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLOTS } from '../../'; // update path as per your directory structure

// Defining the 'PlotCard' React component
const PlotCard = () => {
  const { loading, error, data } = useQuery(GET_PLOTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.getPlots.map(({ id, address, name, sqft, category, image }) => (
    <div key={id} className="card">
      <img src={image} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{category}</h6>
        <p className="card-text">{address}</p>
        <p className="card-text">{sqft} sqft</p>
      </div>
    </div>
  ));
};

export default PlotCard;
