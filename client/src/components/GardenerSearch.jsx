import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import SearchComponent from './../components/Search';
import UserCard from '../components/UserCard';
import { GET_USERS } from "../utils/mutations";

const GardenerSearch = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredUsers = data.getUsers.filter(user => {
    return user.isGardener && (searchTerm === '' || user.name.includes(searchTerm));
  });

  return (
    <div>
      <h1>Users</h1>
      <SearchComponent
        placeholder="Search for Gardeners..."
        onSearch={handleSearch}
      />
      {filteredUsers.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default GardenerSearch;
