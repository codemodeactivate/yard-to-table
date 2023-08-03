import React from 'react';

const GardenerCard = ({ user }) => {
    const renderCostSymbol = (cost) => {
        if (cost >= 10 && cost <= 30) return '$';
        if (cost >= 31 && cost <= 60) return '$$';
        if (cost >= 61 && cost <= 100) return '$$$';
        if (cost >= 101) return '$$$$';
        return 'N/A';
    };
    const renderSpecialtyIcon = () => {
        if (user.gardenerProfile.specialty.includes('vegetable')) {
          return <span className="text-yard-green mr-2">🌽</span>; // Vegetable Icon
        }
        if (user.gardenerProfile.specialty.includes('pollinator')) {
          return <span className="text-yard-green mr-2">🦋</span>; // Pollinator Icon
        }
        return null;
      };

    const stars = Array.from({ length: user.gardenerProfile.rating }, (_, i) => '⭐').join('');

    return (
        <div key={user.id} className="p-4 border-2 border-black bg-white rounded flex">

            <div className="w-1/4">
                {/*Picture Placeholder */}
                <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} className="w-full h-48 object-cover mb-4" />
            </div>

            <div className="w-3/4 pl-10">
                {/*Content*/}
                <div className="flex items-center mb-2">
                <h5 className="text-yard-orange text-2xl font-semibold mb-2">{user.firstName} {user.lastName}</h5> {/* Custom color class */}
                <p className="text-yard-blue text-lg mb-2">{user.gardenerProfile.yearsExperience} years of experience</p>
                <p className="text-lg mb-2">{stars} stars</p>
                <p>{renderCostSymbol(user.gardenerProfile.cost)}</p>
                <p>{user.gardenerProfile.bio.substring(0, 240)}...</p>
                </div>
            <button className="bg-yard-orange text-white p-2 rounded">Hire</button> {/* Custom color class */}
            </div>
        </div>
    );
};

export default GardenerCard;
