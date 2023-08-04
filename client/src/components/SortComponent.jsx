// SortComponent.jsx
import React, { useState } from "react";
import { IconRating, IconExperience, IconCost, IconUp, IconDown } from "./Assets/Icons";

const SortComponent = ({ onSortChange }) => {
    // console.log("Sort Rating: ", user)
    const [sorts, setSorts] = useState([
      { name: "rating", icon: IconRating, direction: "down" },
      { name: "yearsExperience", icon: IconExperience, direction: "up" },
      { name: "cost", icon: IconCost, direction: "up" },
    ]);

    const handleSortChange = (index) => {
      const newSorts = [...sorts];
      newSorts[index].direction =
        newSorts[index].direction === "down" ? "up" : "down";

      setSorts(newSorts);
      onSortChange({ option: newSorts[index].name, direction: newSorts[index].direction });// Call the prop function with the updated sort object
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
            {sort.direction === "down" ? <IconUp /> : <IconDown />} {/* Direction Icon */}
          </button>
        ))}
      </div>
    );
};

export default SortComponent;
