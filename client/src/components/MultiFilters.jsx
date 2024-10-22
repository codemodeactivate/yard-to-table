// MultiFilters.jsx
import React from "react";

import { GiCorn, GiButterfly } from "react-icons/gi";
const MultiFilters = ({
    selectedSpecialties,
    setSelectedSpecialties,
    ratingRange,
    setRatingRange,
}) => {
    let specialties = [
        { name: "vegetable", icon: <GiCorn /> },
        { name: "pollinator", icon: <GiButterfly /> },
    ];

    const handleCheckboxChange = (specialty) => {
        if (selectedSpecialties.includes(specialty)) {
            setSelectedSpecialties(
                selectedSpecialties.filter((el) => el !== specialty)
            );
        } else {
            setSelectedSpecialties([...selectedSpecialties, specialty]);
        }
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }

    return (
        <div id="multi-filters-component">
            <div className="filters-container flex flex-col text-left">
                <h2 className="text-xl font-semi-bold text-yard-orange mb-2">Filter</h2>

                {specialties.map((specialty, idx) => (



                    <label
                        key={`specialty-${idx}`}
                        className="icon-checkbox-label text-2xl flex items-center md:text-xl sm:text-sm mb-3"
                    >
                        <input
                            type="checkbox"
                            className="hidden-checkbox"
                            onChange={() =>
                                handleCheckboxChange(specialty.name)
                            }
                            checked={selectedSpecialties.includes(specialty.name)}//to make the check boxes check by default
                        />
                        <span className="icon-checkbox flex items-center">
                            <span className="icon text-lg mr-3">{specialty.icon}</span>
                            <span className="name text-lg whitespace-nowrap">{capitalizeFirstLetter(specialty.name)} Gardens</span>


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
