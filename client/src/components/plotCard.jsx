import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PLOTS } from '../../../server/typedefs/Plot'; 

// Defining the 'PlotCard' React component
const PlotCard = ({ plot }) => {
  const { loading, error } = useQuery(GET_PLOTS);

  if (loading) return <p>Loading...</p>; // if loading, display 'Loading...'
  if (error) return <p>Error :(</p>; // if error, display 'Error :('

  <div key={plot.id}>
      <img src={plot.image} alt={plot.name} />
      <div>
        <h5>{plot.name}</h5>
        <h6>{plot.category}</h6>
        <p>{plot.address}</p>
        <p>{plot.sqft} sqft</p>
      </div>
    </div>
};


export default PlotCard;
