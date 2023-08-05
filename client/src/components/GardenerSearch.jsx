// GardenerSearch.jsx
import React, { useState} from 'react';
import SearchComponent from './Search';
import GardenerCard from './GardenerCard';
import { renderSpecialtyIcon, renderCostSymbol } from './../utils/utils';
import HireGardenerModal from './HireGardenerModal';


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
                          {/* HIRE GARDENER MODAL */}
                          <HireGardenerModal
                                selectedGardener={selectedGardener}
                                renderSpecialtyIcon={renderSpecialtyIcon}
                                renderCostSymbol={renderCostSymbol}
                                requestQuote={requestQuote}
                                toggleGardenerModal={toggleGardenerModal}
                                showGardenerModal={showGardenerModal}
                              />

                          {console.log(selectedGardener)}


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
