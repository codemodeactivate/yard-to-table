// SearchComponent.jsx
import React from 'react';
import PropTypes from 'prop-types';

const SearchComponent = ({ onSearch, renderFilters, placeholder }) => (
  <div className="search-component ">
    <input className="mx-5 underline decoration-yard-gray text-yard-gray" type="text " placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} />
    {renderFilters && renderFilters()}
  </div>
);

SearchComponent.propTypes = {
  onSearch: PropTypes.func.isRequired,
  renderFilters: PropTypes.func,
};

SearchComponent.defaultProps = {
  renderFilters: null,
};

export default SearchComponent;
