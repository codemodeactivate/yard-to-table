import React from "react";

const HireGardenerModal = ({
  selectedGardener,
  renderSpecialtyIcon,
  renderCostSymbol,
  requestQuote,
  toggleGardenerModal,
  showGardenerModal,
}) => {
  if (!showGardenerModal || !selectedGardener) return null;

  const stars = Array.from(
    { length: selectedGardener.gardenerProfile.rating },
    (_, i) => "⭐"
  ).join("");

  return (
    // {/* MODAL */}
    // {showGardenerModal && selectedGardener && (
    //     (()=> {
    // //       const stars = Array.from({ length: selectedGardener.gardenerProfile.rating }, (_, i) => '⭐').join('');
    //       return (
    //   <div className="modal">
    //       <div className="modal-content">
    //           <span
    //               className="close-button"
    //               onClick={() => toggleGardenerModal(null)}
    //           >
    //               X
    //           </span>
    //           {/* EVENTUAL HIRE GARDENER MODAL */}
    //           {console.log(selectedGardener)}

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
              {selectedGardener.firstName} {selectedGardener.lastName}
            </h5>
            {renderSpecialtyIcon(selectedGardener.gardenerProfile.specialty)}
          </div>
          <p className="text-yard-blue text-lg">
            {selectedGardener.gardenerProfile.yearsExperience} years of
            experience
          </p>
          <p>
            <span className="text-sm">{stars}</span>

            <span className="flex mb-2">
              <span className="text-yard-green text-sm mr-2">
                {renderCostSymbol(selectedGardener.gardenerProfile.cost)}
              </span>
            </span>
          </p>
          <p className="text-yard-gray">
            {selectedGardener.gardenerProfile.bio.substring(0, 240)}
            ...
          </p>
        </div>
      </div>

      {/* Bottom 75% */}
      <div className="gardener-modal-form flex-3 p-5 mt-10 gap-4">
        <form onSubmit={() => requestQuote(selectedGardener)}>
          {/* Question 1 */}
          <div className="flex flex-col">
            <label className="text-yard-orange mb-2">
              What plots are you requesting a quote for?
            </label>
            <div className="text-yard-blue mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="plot"
                  value="Front yard"
                  className="mr-2"
                />
                <label>Front yard</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="plot"
                  value="Back yard"
                  className="mr-2"
                />
                <label>Back yard</label>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="flex flex-col">
            <label className="text-yard-orange mb-2">Type of request</label>
            <div className="text-yard-blue mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="requestType"
                  value="Initial set up"
                  className="mr-2"
                />
                <label>Initial set up</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="requestType"
                  value="Ongoing care and maintenance"
                  className="mr-2"
                />
                <label>Ongoing care and maintenance</label>
              </div>
            </div>
          </div>
          
          {/* Question 3 */}
          <div className="flex flex-col">
            <label className="text-yard-orange mb-2">
              Any environmental special requests?
            </label>
            <div className="text-yard-blue mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="specialRequest"
                  value="No pesticides"
                  className="mr-2"
                />
                <label>No pesticides</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="specialRequest"
                  value="No herbicides"
                  className="mr-2"
                />
                <label>No herbicides</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="specialRequest"
                  value="Organic pesticides only"
                  className="mr-2"
                />
                <label>Organic pesticides only</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="specialRequest"
                  value="Organic herbicides only"
                  className="mr-2"
                />
                <label>Organic herbicides only</label>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-10">
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
  );
};

export default HireGardenerModal;
