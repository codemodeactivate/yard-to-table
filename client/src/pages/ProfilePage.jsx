import React from 'react';
import { gql, useQuery } from '@apollo/client';
import PlotCard from '../components/plotCard';

const GET_PLOTS = gql`
  query GetPlots {
    getPlots {
      id
      name
      address
      sqft
      category
      image
    }
  }
`;

const ProfilePage = () => {
  const { loading, error, data } = useQuery(GET_PLOTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Your Plots</h1>
      {data.getPlots.map((plot) => (
        <PlotCard key={plot.id} plot={plot} />
      ))}
    </div>
  );
};

export default ProfilePage;
