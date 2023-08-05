// SearchPage.jsx
import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import GardenerSearch from "./../components/GardenerSearch";
import MultiFilters from "./../components/MultiFilters";
import { GET_ALL_GARDENERS } from "../utils/mutations";
import SortComponent from "../components/SortComponent";

const SearchPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_GARDENERS);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGardeners, setFilteredGardeners] = useState([]);
  const [sortOption, setSortOption] = useState({ option: "rating", direction: "down" });

  const handleSortChange = (selectedSort) => {
    setSortOption(selectedSort);
  };

  // const handleFilterChange = (filter) => {
  //   console.log('Filter Changed: ', filter);
  // };

  useEffect(() => {
    if (loading || error || !data || !data.getAllGardeners) return;

    let tempGardeners = data.getAllGardeners;

    // Apply the search term filter
    if (searchTerm !== "") {
      tempGardeners = tempGardeners.filter((gardener) =>
        gardener.firstName.includes(searchTerm) ||
        gardener.lastName.includes(searchTerm)
      );
    }

    // Apply the specialties filter
    if (selectedSpecialties.length > 0) {
      tempGardeners = tempGardeners.filter((gardener) =>
        selectedSpecialties.some((specialty) =>
          gardener.gardenerProfile.specialty.includes(specialty)
        )
      );
    }

    // Apply the rating range filter
    tempGardeners = tempGardeners.filter(
      (gardener) =>
        gardener.gardenerProfile.rating >= ratingRange[0] &&
        gardener.gardenerProfile.rating <= ratingRange[1]
    );

    // Apply the sorting logic if there's a sort option selected
    if (sortOption.option) {
      tempGardeners.sort((a, b) => {
        const valueA = a.gardenerProfile[sortOption.option];
        const valueB = b.gardenerProfile[sortOption.option];
        return sortOption.direction === "down" ? valueB - valueA : valueA - valueB;
      });
    }

    setFilteredGardeners(tempGardeners);
  }, [searchTerm, selectedSpecialties, ratingRange, sortOption, data, loading, error]);

  
  return (
        <div id="gardener-search-with-multi-filter">
            <h1 className="text-4xl text-yard-red text-center my-8">
                Gardeners
            </h1>
            <div className="flex">
                <div className="w-1/4 p-4 flex flex-col items-center text-center">
                    <MultiFilters
                        selectedSpecialties={selectedSpecialties}
                        setSelectedSpecialties={setSelectedSpecialties}
                        ratingRange={ratingRange}
                        setRatingRange={setRatingRange}
                    />

                    {/* Sthe following is the rating high to low, price high to low, experience high to low sort */}
                    <SortComponent onSortChange={handleSortChange} sortOption={sortOption}/>

                </div>


                {/* RIGHT HAND SIDE THE GARDENER CARDS */}
                <div className="w-3/4 p-4">
                    <GardenerSearch
                        gardeners={filteredGardeners}
                        loading={loading}
                        error={error}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>




            </div>
        </div>
    );
};

export default SearchPage;
