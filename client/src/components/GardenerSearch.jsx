import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import SearchComponent from './../components/Search';
import GardenerCard from '../components/GardenerCard';
import { GET_ALL_GARDENERS } from "../utils/mutations";

const GardenerSearch = () => {
  const { loading, error, data } = useQuery(GET_ALL_GARDENERS);
  const [searchTerm, setSearchTerm] = useState('');
  console.log("GARDENER SEARCH DATA", data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.getAllGardeners) {
    console.error("Unexpected data structure:", data);
    return <p>Unexpected data structure</p>;
  }

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());



  };

  const filteredGardeners = data.getAllGardeners.filter((gardener) => {
    console.log("Gardener Search Specialty: ", gardener.gardenerProfile.specialty)
    if (!gardener.firstName || !gardener.lastName) return false; // Exclude gardeners without a full name
    const firstName = gardener.firstName.toLowerCase();
    const lastName = gardener.lastName.toLowerCase();
    const specialtyMatches = gardener.gardenerProfile.specialty.some((specialty) =>
    specialty.toLowerCase().includes(searchTerm)
  );


    return (
      searchTerm === '' ||
      firstName.includes(searchTerm) ||
      lastName.includes(searchTerm) ||
      specialtyMatches

    );
  });

  console.log('filteredGardeners:', filteredGardeners);

  return (
    <div>
      <h1>Gardeners</h1>
      <SearchComponent
        placeholder="Name, Specialty"
        onSearch={handleSearch}
      />

      {filteredGardeners.map((gardener) => (
        <GardenerCard key={gardener.id} user={gardener} />
      ))}
    </div>
  );
};

export default GardenerSearch;
