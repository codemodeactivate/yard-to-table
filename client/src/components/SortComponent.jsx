import React, { useState } from "react";
import { IconRating, IconExperience, IconCost, IconUp, IconDown } from "./Assets/Icons";


const FilterComponent = ({ onFilterChange }) => {
    const [filters, setFilters] = useState([
      { name: "Rating", icon: IconRating, direction: "down" },
      { name: "Experience", icon: IconExperience, direction: "down" },
      { name: "Cost", icon: IconCost, direction: "down" },
    ]);

    const handleFilterChange = (index) => {
      const newFilters = [...filters];
      newFilters[index].direction =
        newFilters[index].direction === "down" ? "up" : "down";

      setFilters(newFilters);
      onFilterChange(newFilters[index]);
    };

    return (
      <div className="flex flex-col space-y-2">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterChange(index)}
            className="btn-filter flex items-center"
          >
            <filter.icon className="mr-2" /> {/* Filter Icon */}
            {filter.name} {/* Filter Name */}
            {filter.direction === "down" ? <IconDown /> : <IconUp />} {/* Direction Icon */}
          </button>
        ))}
      </div>
    );
  };

export default FilterComponent;
