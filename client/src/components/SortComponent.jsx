// SortComponent.jsx
import React, { useState } from "react";
import { IconRating, IconExperience, IconCost, IconUp, IconDown } from "./Assets/Icons";

const SortComponent = ({ onSortChange, sortOption }) => {
    // console.log("Sort Rating: ", user)
    const [sorts, setSorts] = useState([
      { name: "rating", label: "Rating", icon: IconRating, direction: "down" },
      { name: "yearsExperience", label: "Experience", icon: IconExperience, direction: "up" },
      { name: "cost", label: "Cost", icon: IconCost, direction: "up" },
    ]);

    const handleSortChange = (index) => {
      const newSorts = [...sorts];
      console.log('Sort Option: ', sortOption);
      console.log('Selected sort: ', newSorts[index]);
      console.log('Changing to:', { option: newSorts[index].name, direction: newSorts[index].direction });
      newSorts[index].direction =
        newSorts[index].direction === "down" ? "up" : "down";

      setSorts(newSorts);
      onSortChange({ option: newSorts[index].name, direction: newSorts[index].direction }); // Call the prop function with the updated sort object
    };

    return (
      <div className="flex flex-col space-y-2">
        {sorts.map((sort, index) => {
        //   console.log("Rendering :", sort.name);
        //   console.log("sort.name: ", sort.name);
        //   console.log("sortOption.option: ", sortOption.option);
        //   console.log("isActive: ", sortOption.option === sort.name.toLowerCase());

          return (
            <button
              key={index}
              onClick={() => handleSortChange(index)}
              className={`btn-sort flex items-center text-2xl mb-3 ${sortOption.option === sort.name.toLowerCase() ? 'active-sort' : 'inactive-sort'}`}
            >
                {console.log('sortOption.option: ', sortOption.option)}
                {console.log('sort.name: ', sort.name)}
              <sort.icon className="text-4xl lg:text-xl md:text-2xl sm:text-xl mr-3 icon" /> {/* Sort Icon */}
              <span className="name text-3xl lg:text-xl md:text-xl sm:text-lg whitespace-nowrap name">
                {sort.label} {/* Sort Name */}
              </span>
              {sort.direction === "down" ? <IconUp /> : <IconDown />} {/* Direction Icon */}
            </button>
          );
        })}
      </div>
    );
  };

  export default SortComponent;
