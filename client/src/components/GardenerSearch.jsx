// GardenerSearch.jsx
import React from 'react';
import SearchComponent from './Search';
import GardenerCard from './GardenerCard';

const GardenerSearch = ({ gardeners, loading, error, searchTerm, setSearchTerm }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <div id="gardener-search">
      <SearchComponent
        placeholder="Search for Gardeners..."
        onSearch={handleSearch}
      />

      {gardeners.map((gardener) => (
        <GardenerCard key={gardener.id} user={gardener} />
      ))}
    </div>
  );
};

export default GardenerSearch;
