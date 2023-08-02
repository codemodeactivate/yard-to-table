// Import necessary libraries
import React from 'react';

// The userCard component receives a 'user' object as a prop
const UserCard = ({ user }) => {
  // The user data is then displayed inside the component
  return (
    <div key={user.id}>
      <div>
        <h5>{user.firstName}</h5>
        <h6>{user.lastName}</h6>
        <p>Address: {user.address}</p>
        <p>Gardener: {user.isGardener.toString()}</p>
        <p>Homeowner: {user.isHomeowner.toString()}</p>
      </div>
    </div>
  );
};

// Export the userCard component so it can be imported and used in other files
export default UserCard;
