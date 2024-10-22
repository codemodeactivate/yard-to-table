import React from 'react';
import { renderSpecialtyIcon } from '../utils/utils';
const GardenerCard = ({ user, onCardClick }) => {
  // console.log("User:", user);
    const renderCostSymbol = (cost) => {
        if (cost >= 10 && cost <= 30) return '$';
        if (cost >= 31 && cost <= 60) return '$$';
        if (cost >= 61 && cost <= 100) return '$$$';
        if (cost >= 101) return '$$$$';
        return 'N/A';
    };
    const renderSpecialtyIcon = () => {
      return user.gardenerProfile.specialty.map((specialty) => {
        if (specialty === 'vegetable') {
          return <span key={specialty} className="text-yard-green mr-2">🌽</span>; // Vegetable Icon
        }
        if (specialty === 'pollinator') {
          return <span key={specialty} className="text-yard-green mr-2">🦋</span>; // Pollinator Icon
        }
        return null;
      });
      };


    const stars = Array.from({ length: user.gardenerProfile.rating }, (_, i) => '⭐').join('');

    // // STARS FOR MODAL
    // const renderStars = (rating) => {
    //   return Array.from({ length: rating }, (_, i) => '⭐').join('');
    // };


    return (

        <div key={user.id} className="p-4 my-10 mx-5 shadow-[0_1px_5px_rgb(0,0,0,0.2)]  relative flex">
          <div className="w-1/5">
            {/* Picture Placeholder */}
            <img src={user.profilePic} alt={`${user.firstName} ${user.lastName}`} className="w-full h-36 object-cover mb-4" />
          </div>
          <div className="w-4/5 pl-10 gap-2">
            {/* Content */}
            <div className="flex items-center">
              <h5 className="text-yard-orange text-xl mr-2">{user.firstName} {user.lastName}</h5>
              {renderSpecialtyIcon()}
            </div>
            <p className="text-yard-blue text-md">{user.gardenerProfile.yearsExperience} years of experience</p>
            <span className="text-sm mb-2 pr-5">{stars}</span><span className="text-yard-green text-sm mr-2">{renderCostSymbol(user.gardenerProfile.cost)}</span>
            <p className="text-yard-gray text-sm">{user.gardenerProfile.bio.substring(0, 240)}...</p>
          </div>
          <button className="bg-yard-orange text-white text-sm  absolute top-2 right-3" onClick={() => onCardClick(user)}>Hire</button>

        </div>
      );



};

export default GardenerCard;
