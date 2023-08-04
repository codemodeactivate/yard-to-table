// MultiFilters.jsx
import React from 'react';

const MultiFilters = ({ selectedSpecialties, setSelectedSpecialties, ratingRange, setRatingRange }) => {
  let specialties = [
    { name: "vegetable", icon: "🌽" },
    { name: "pollinator", icon: "🦋" },
  ];

  const handleCheckboxChange = (specialty) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter((el) => el !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  return (
    <div id="multi-filters-component">
      <div className="filters-container">

        {specialties.map((specialty, idx) => (
          <label key={`specialty-${idx}`} className="icon-checkbox-label">
            <input
              type="checkbox"
              className="hidden-checkbox"
              onChange={() => handleCheckboxChange(specialty.name)}
            />
            <span className="icon-checkbox">
                {specialty.icon} {specialty.name}
            </span>
          </label>
        ))}


        {/* THE FOLLOWING IS A RANGE FILTER THAT I WORKED ON BEFORE I STUDIED THE MOCKUP
        TOO CLOSE BUT THIS IS FUNCTIONAL CODE AT THE MOMENT SO PLEASE DON'T DELETE WE CAN LOOK
        AT IT LATER TO DECIDE IF WE WANT TO INCORPORATE SOMEHOW OR PERHAPS REUSE ELSEHWERE */}
        {/* <label>70
          Rating Range:
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={ratingRange[0]}
            onChange={(e) => setRatingRange([+e.target.value, ratingRange[1]])}
          />
          to
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={ratingRange[1]}
            onChange={(e) => setRatingRange([ratingRange[0], +e.target.value])}
          />
        </label> */}
      </div>
    </div>
  );
};

export default MultiFilters;
