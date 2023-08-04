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

    useEffect(() => {
        if (loading || error || !data || !data.getAllGardeners) return;

        let tempGardeners = data.getAllGardeners;

        // Apply the search term filter
        if (searchTerm !== "") {
            tempGardeners = tempGardeners.filter(
                (gardener) =>
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

        setFilteredGardeners(tempGardeners);
    }, [searchTerm, selectedSpecialties, ratingRange, data]);

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
                </div>
                <div className="w-3/4 p-4">
                    <GardenerSearch
                        gardeners={filteredGardeners}
                        loading={loading}
                        error={error}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
                {/* Sthe following is the rating high to low, price high to low, experience high to low sort */}
                <SortComponent onSortChange={handleSortChange}/>



            </div>
        </div>
    );
};

export default SearchPage;
