import React from 'react';
import { gql, useQuery } from '@apollo/client';
import userCard from '../components/userCard';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      firstName
      lastName
      email
      address
      zip
      isHomeowner
      isGardener
      
    }
  }
`;

const SearchPage = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log('Error message:' , error.message);
    console.log('Full error object:' , error);
    return <p>Error :(</p>;
  }

  return (
    <div>
      <h1>Users</h1>
      {data.getPlots.map((user) => (
        <userCard key={user.id} plot={user} />
      ))}
    </div>
  );
};

export default SearchPage;
