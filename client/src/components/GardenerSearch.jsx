import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import SearchComponent from './../components/Search';
import GardenerCard from '../components/GardenerCard';
import { GET_GARDENERS } from "../utils/mutations";

const GardenerSearch = () => {
  const { loading, error, data } = useQuery(GET_GARDENERS);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.getAllGardeners) {
    console.error("Unexpected data structure:", data);
    return <p>Unexpected data structure</p>;
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredGardeners = data.getAllGardeners.filter((gardener) => {
    if (!gardener.firstName) return false; // Exclude gardeners without a name
    return (
      searchTerm === '' ||
      gardener.firstName.includes(searchTerm) ||
      gardener.lastName.includes(searchTerm)
    );
  });

  console.log('filteredGardeners:', filteredGardeners);

  return (
    <div>
      <h1>Gardeners</h1>
      <SearchComponent
        placeholder="Search for Gardeners..."
        onSearch={handleSearch}
      />

      {filteredGardeners.map((gardener) => (
        <GardenerCard key={gardener.id} user={gardener} />
      ))}
    </div>
  );
};

export default GardenerSearch;
