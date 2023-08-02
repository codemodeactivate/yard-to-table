// SearchPage.jsx
import React from 'react';
import GardenerSearch from './../components/GardenerSearch';
const SearchPage = () => (
  <div>
    <h1>Search Page</h1>
    <GardenerSearch />
    {/* Other components or features can be added here */}
  </div>
);

export default SearchPage;





// import React from 'react';
// import { gql, useQuery } from '@apollo/client';

// import UserCard from '../components/UserCard';
// import { GET_USERS } from "../utils/mutations";



// const SearchPage = () => {
//   const { loading, error, data } = useQuery(GET_USERS);

//   if (loading) return <p>Loading...</p>;
//   if (error) {
//     console.log('Error message:' , error.message);
//     console.log('Full error object:' , error);
//     console.log('Network error:', error.networkError);
//     console.log('GraphQL errors:', error.graphQLErrors);
//     return <p>Error :(</p>;
//   }

//   return (
//     <div>
//       <h1>Users</h1>
//       {data.getUsers.filter(user => user.isGardener).map((user) => (
//         <UserCard key={user.id} user={user} />
//       ))}
//     </div>
//   );
// };

// export default SearchPage;
