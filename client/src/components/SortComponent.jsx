// SortComponent.jsx
import React, { useState } from "react";
import { IconRating, IconExperience, IconCost, IconUp, IconDown } from "./Assets/Icons";

const SortComponent = ({ onSortChange }) => {
    const [sorts, setSorts] = useState([
      { name: "Rating", icon: IconRating, direction: "down" },
      { name: "Experience", icon: IconExperience, direction: "down" },
      { name: "Cost", icon: IconCost, direction: "down" },
    ]);

    const handleSortChange = (index) => {
      const newSorts = [...sorts];
      newSorts[index].direction =
        newSorts[index].direction === "down" ? "up" : "down";

      setSorts(newSorts);
      onSortChange(newSorts[index]); // Call the prop function with the updated sort object
    };

    return (
      <div className="flex flex-col space-y-2">
        {sorts.map((sort, index) => (
          <button
            key={index}
            onClick={() => handleSortChange(index)}
            className="btn-sort flex items-center"
          >
            <sort.icon className="mr-2" /> {/* Sort Icon */}
            {sort.name} {/* Sort Name */}
            {sort.direction === "down" ? <IconDown /> : <IconUp />} {/* Direction Icon */}
          </button>
        ))}
      </div>
    );
};

export default SortComponent;
