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
                              <div className="flex-1 bg-white flex">
                                  <div className="w-1/5">
                                      {/* Picture Placeholder */}
                                      <img
                                          src={selectedGardener.profilePic}
                                          alt={`${selectedGardener.firstName} ${selectedGardener.lastName}`}
                                          className="w-full h-48 object-cover"
                                      />
                                  </div>
                                  <div className="w-4/5 pl-10">
                                      {/* Content */}
                                      <div className="flex items-center gap-2">
                                          <h5 className="text-yard-orange text-2xl font-semibold mr-2">
                                              {selectedGardener.firstName}{" "}
                                              {selectedGardener.lastName}
                                          </h5>
                                          {renderSpecialtyIcon(
                                              selectedGardener.gardenerProfile
                                                  .specialty
                                          )}
                                      </div>
                                      <p className="text-yard-blue text-lg">
                                          {
                                              selectedGardener.gardenerProfile
                                                  .yearsExperience
                                          }{" "}
                                          years of experience
                                      </p>
                                      <p className="text-lg">
                                          {stars}
                                      </p>
                                      {console.log(
                                          "selected gardener: ",
                                          stars
                                      )}
                                      <div className="flex mb-2">
                                          <p className="text-yard-green text-xl mr-2">
                                              {renderCostSymbol(
                                                  selectedGardener
                                                      .gardenerProfile.cost
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
                            <div className="flex-3 bg-gray-100 p-4 gap-4">
                              <form onSubmit={() => requestQuote(selectedGardener)}>
                                {/* Question 1 */}
                                <label className="text-yard-orange block">
                                  What plots are you requesting a quote for?
                                </label>
                                <div className="text-yard-blue  flex align-left">
                                  <label className="flex align-center">
                                    <input type="checkbox" name="plot" value="Front yard" />
                                    Front yard
                                  </label>
                                  <label>
                                    <input type="checkbox" name="plot" value="Back yard" />
                                    Back yard
                                  </label>
                                </div>

                                {/* Question 2 */}
                                <label className="text-yard-orange block mb-2">
                                  Type of request
                                </label>
                                <div className="text-yard-blue mb-4">
                                  <label>
                                    <input type="checkbox" name="requestType" value="Initial set up" />
                                    Initial set up
                                  </label>
                                  <label>
                                    <input type="checkbox" name="requestType" value="Ongoing care and maintenance" />
                                    Ongoing care and maintenance
                                  </label>
                                </div>

                                {/* Question 3 */}
                                <label className="text-yard-orange block mb-2">
                                  Any environmental special requests?
                                </label>
                                <div className="text-yard-blue mb-4">
                                  <label>
                                    <input type="checkbox" name="specialRequest" value="No pesticides" />
                                    No pesticides
                                  </label>
                                  <label>
                                    <input type="checkbox" name="specialRequest" value="No herbicides" />
                                    No herbicides
                                  </label>
                                  <label>
                                    <input type="checkbox" name="specialRequest" value="Organic pesticides only" />
                                    Organic pesticides only
                                  </label>
                                  <label>
                                    <input type="checkbox" name="specialRequest" value="Organic herbicides only" />
                                    Organic herbicides only
                                  </label>
                                </div>
                                <div className="flex justify-center">
                                {/* Submit Button */}
                                <button
                                    className="px-4 py-2 bg-yard-orange text-white hover:bg-yard-blue"
                                    type="submit"
                                >
                                    Request a Quote
                                </button>
                                </div>
                              </form>
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
