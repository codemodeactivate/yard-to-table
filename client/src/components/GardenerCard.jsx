import React from 'react';

const GardenerCard = ({ user }) => {
    const renderCostSymbol = (cost) => {
        if (cost >= 10 && cost <= 30) return '$';
        if (cost >= 31 && cost <= 60) return '$$';
        if (cost >= 61 && cost <= 100) return '$$$';
        if (cost >= 101) return '$$$$';
        return 'N/A';
    };

    const stars = Array.from({ length: user.gardenerProfile.rating }, (_, i) => '⭐').join('');

    return (
        <div key={user.id} className="p-4 border-2 border-black bg-white rounded">
            <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} className="w-full h-48 object-cover mb-4" />
            <h5 className="text-yard-orange">{user.firstName} {user.lastName}</h5> {/* Custom color class */}
            <p>{user.gardenerProfile.yearsExperience} years of experience</p>
            <p>{stars} stars</p>
            <p>{renderCostSymbol(user.gardenerProfile.cost)}</p>
            <p>{user.gardenerProfile.bio.substring(0, 240)}...</p>
            <button className="bg-yard-orange text-white p-2 rounded">Hire</button> {/* Custom color class */}
        </div>
    );
};

export default GardenerCard;
