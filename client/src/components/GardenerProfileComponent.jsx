import React from "react";
// import GardenerCard from "../components/GardenerCard"; // Comment out the GardenerCard component for now
import GardenerProfileForm from "../components/GardenerProfileForm";
import BillingForm from "../components/BillingFormComponent";

const GardenerProfileComponent = ({user: currentUser}) => {
  // Mock gardener profile data for demonstration purposes
  // Once authtoken is figured out we can use that to verify if the user is logged in
  //and if they are also a gardener
  // const gardenerProfileData = {
  //   yearsExperience: 5,
  //   specialty: ["vegetable", "pollinator"],
  //   areaServed: ["New York", "Los Angeles"],
  //   rating: 4.5,
  //   cost: 50,
  //   bio: "I am an experienced gardener...",
    // Add other gardener profile fields here
  // };

  // Function to handle saving gardener profile data (to be implemented)
  const handleSaveGardenerProfile = (formData) => {
    // Handle saving gardener profile data here
  };

  return (
    <div>
      <h1>Gardener Profile</h1>
      {/* <GardenerCard user={{ gardenerProfile: gardenerProfileData }} /> */}
      {/* Commented out the GardenerCard component for now */}


      {/* Display the gardener profile form */}
      <GardenerProfileForm onSave={handleSaveGardenerProfile} user={currentUser} />
      {/* Display the billing form */}
      <BillingForm user={currentUser}/>


    </div>
  );
};

export default GardenerProfileComponent;
