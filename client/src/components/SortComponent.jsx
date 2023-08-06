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
      
      // console.log('Selected sort: ', newSorts[index]);
      // console.log('Changing to:', { option: newSorts[index].name, direction: newSorts[index].direction });  
      newSorts[index].direction =
        newSorts[index].direction === "down" ? "up" : "down";

      setSorts(newSorts);
      onSortChange({ option: newSorts[index].name, direction: newSorts[index].direction }); // Call the prop function with the updated sort object
    };

    console.log('Sort Option: ', sortOption); 

    return (
      
      <div className="sort-component">
      <h2 className="text-xl text-left text-yard-blue pt-10">Sort by:</h2>
      <div className="sort-button-container items-left justify-start flex flex-col space-y-2">
        {sorts.map((sort, index) => {
        //   console.log("Rendering :", sort.name);
        //   console.log("sort.name: ", sort.name);
        //   console.log("sortOption.option: ", sortOption.option);
        //   console.log("isActive: ", sortOption.option === sort.name.toLowerCase());

          return (
            <button
              key={index}
              onClick={() => handleSortChange(index)}
              className={`btn-sort flex justify-start items-center text-xl p-0 ${sortOption.option === sort.name.toLowerCase() ? 'active-sort' : 'inactive-sort'}`}
            >
                {/* {console.log('sortOption.option: ', sortOption.option)} */}
                {/* {console.log('sort.name: ', sort.name)} */}
              <sort.icon className="text-lg  icon" /> {/* Sort Icon */}
              <span className="name text-lg  whitespace-nowrap name ml-2">
                {sort.label} {/* Sort Name */}
              </span>
              {sort.direction === "down" ? <IconUp /> : <IconDown />} {/* Direction Icon */}
            </button>
          );
        })}
      </div>
      </div>
    );
  };

  export default SortComponent;
