import React from 'react';

const SortByStars = ({ sortOption, handleSortChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="sortOption" className="mr-2">
        Sort by stars:
      </label>
      <select id="sortOption" value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
        <option value="starsHighToLow">High to Low</option>
        <option value="starsLowToHigh">Low to High</option>
      </select>
    </div>
  );
};

export default SortByStars;
