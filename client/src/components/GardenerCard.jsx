// Import necessary libraries
import React from 'react';

// The userCard component receives a 'user' object as a prop
const GardenerCard = ({ user }) => {
    // Truncate bio to 240 characters
    const BIO_LENGTH = 240;
    const truncatedBio = user.bio.length > BIO_LENGTH ? user.bio.substring(0, 240) + '...' : user.bio;

    // Render stars based on rating
    const stars = Array.from({ length: user.rating }, (_, i) => '⭐').join('');

    // Icons for specialities , use fontawesome or something later.
    const specialityIcons = {
      vegetable: '🌽',
      pollinator: '🦋',
    };

    return (
      <div key={user.id} className="bg-white p-4 rounded-md shadow-lg w-full flex flex-col">
        <div className="flex">
          <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} className="w-1/4 h-auto rounded-md" />
          <div className="w-3/4 pl-4">
            <h5 className="text-xl font-bold">{user.firstName} {user.lastName}</h5>
            <p className="text-sm">{Object.keys(user.specialities).map(speciality => specialityIcons[speciality]).join(' ')}</p>
            <p className="text-sm">{user.experience} years of experience</p>
            <p className="text-sm">{stars}</p>
            <p className="text-sm">${user.cost}</p>
            <p className="text-sm">{truncatedBio}</p>
            <button className="bg-blue-500 text-white p-2 rounded-md self-end mt-4 hover:bg-blue-600">
              Hire
            </button>
          </div>
        </div>
      </div>
    );
  };


export default GardenerCard;
