// GardenerSearch.jsx
import React, { useState} from 'react';
import SearchComponent from './Search';
import GardenerCard from './GardenerCard';
import { renderSpecialtyIcon, renderCostSymbol } from './../utils/utils';


const GardenerSearch = ({ gardeners, loading, error, searchTerm, setSearchTerm }) => {
  // Handle the state of the gardener modal
  const [showGardenerModal, setShowGardenerModal] = useState(false);
  const [selectedGardener, setSelectedGardener] = useState(null);

  const toggleGardenerModal = (gardener) => {
    setSelectedGardener(gardener);
    setShowGardenerModal(!showGardenerModal);
    // const stars = Array.from({ length: selectedGardener.gardenerProfile.rating }, (_, i) => '⭐').join('');


  };
  const requestQuote = (gardener) => {
    // Logic to handle requesting a quote from the selected gardener
    console.log(`Requesting a quote from ${gardener.firstName} ${gardener.lastName}`);
    // You can make API calls here or manage state as needed
  };



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
              <GardenerCard
                  key={gardener.id}
                  user={gardener}
                  onCardClick={toggleGardenerModal}
              />
          ))}

          {/* MODAL */}
          {showGardenerModal && selectedGardener && (
            (()=> {
              const stars = Array.from({ length: selectedGardener.gardenerProfile.rating }, (_, i) => '⭐').join('');
              return (
              <div className="modal">
                  <div className="modal-content">
                      <span
                          className="close-button"
                          onClick={() => toggleGardenerModal(null)}
                      >
                          X
                      </span>
                      {/* EVENTUAL HIRE GARDENER MODAL */}
                      {console.log(selectedGardener)}



                      <div className="h-full flex flex-col">
                          {/* Top 25% */}
                          <div className="flex-1 bg-gray-200">




                              <div className="w-1/5">
                                  {/* Picture Placeholder */}
                                  <img
                                      src={selectedGardener.profilePic}
                                      alt={`${selectedGardener.firstName} ${selectedGardener.lastName}`}
                                      className="w-full h-48 object-cover mb-4"
                                  />
                              </div>
                              <div className="w-4/5 pl-10">
                                  {/* Content */}
                                  <div className="flex items-center mb-5">
                                      <h5 className="text-yard-orange text-2xl font-semibold mr-2">
                                          {selectedGardener.firstName} {selectedGardener.lastName}
                                      </h5>
                                      {renderSpecialtyIcon(selectedGardener.gardenerProfile.specialty)}

                                  </div>
                                  <p className="text-yard-blue text-lg mb-2">
                                      {selectedGardener.gardenerProfile.yearsExperience}{" "}
                                      years of experience
                                  </p>
                                  <p className="text-lg mb-2">STARS: {stars}</p>
                                  {console.log("selected gardener: ", stars)}
                                  <div className="flex mb-2">
                                      <p className="text-yard-green text-xl mr-2">
                                          {renderCostSymbol(
                                              selectedGardener.gardenerProfile.cost
                                          )}
                                      </p>
                                  </div>
                                  <p className="text-yard-gray">
                                      {selectedGardener.gardenerProfile.bio.substring(
                                          0,
                                          240
                                      )}
                                      ...
                                  </p>
                              </div>





                          </div>

                          {/* Bottom 75% */}
                          <div className="flex-3 bg-gray-100 p-4">
                              {/* You can display more details here */}
                              <button
                                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                                  onClick={() => requestQuote(selectedGardener)}
                              >
                                  Request a Quote
                              </button>
                          </div>
                      </div>

                      {/* END OF HIRE GARDENER MODAL */}
                      </div>
                </div>
              );
            })()
        )}
        {/* END MODAL */}
    </div>
  );
};

export default GardenerSearch;
