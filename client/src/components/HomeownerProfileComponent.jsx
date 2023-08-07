import React from "react";
// import GardenerCard from "../components/GardenerCard"; // Comment out the GardenerCard component for now
// import HomeownerProfileForm from "../components/HomeownerProfileForm";
import BillingForm from "../components/BillingFormComponent";
import HomeownerProfileForm from "../components/HomeownerProfileForm";


const HomeownerProfileComponent = ({user: currentUser}) => {
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
  const handleSaveHomeownerProfile = (formData) => {
    // Handle saving gardener profile data here
  };

  return (
    <div  className="flex flex-col items-center w-full">
      <h1>Homeowner Profile</h1>
      {/* <GardenerCard user={{ gardenerProfile: gardenerProfileData }} /> */}
      {/* Commented out the GardenerCard component for now */}


      {/* Display the gardener profile form */}
      <HomeownerProfileForm onSave={handleSaveHomeownerProfile}  user={currentUser}/>
      {/* Display the billing form */}
      {/* <BillingForm /> */}


    </div>
  );
};

export default HomeownerProfileComponent;
