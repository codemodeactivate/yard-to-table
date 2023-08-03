import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import SearchComponent from './../components/Search';
import GardenerCard from '../components/GardenerCard';
import { GET_USERS } from "../utils/mutations";

const GardenerSearch = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.getUsers) {
    console.error("Unexpected data structure:", data);
    return <p>Unexpected data structure</p>;
  }

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredUsers = data.getUsers.filter(user => {
    if (!user.firstName) return false; // Exclude users without a name
    return user.isGardener && (searchTerm === '' || user.firstName.includes(searchTerm) || user.lastName.includes(searchTerm));
  });
  console.log('filteredUsers:', filteredUsers);
  return (
    <div>
      <h1>Users</h1>
      <SearchComponent
        placeholder="Search for Gardeners..."
        onSearch={handleSearch}
      />

      {filteredUsers.map((user) => (
        <GardenerCard key={user.id} user={user} />
      ))}


    </div>
  );
};

export default GardenerSearch;
