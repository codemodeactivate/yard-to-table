import React, { useState } from "react";

const GardenerProfileForm = ({ onSave, user }) => {
  // Set initial form state
  const [formState, setFormState] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    address: user.address || "",
    // Add other form fields here, initialized to empty strings or default values
  });

  // Function to handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the onSave function passed as a prop by the parent component
    onSave(formState);
  };

  return (
    <form className="gardener-form flex flex-col w-full items-center" onSubmit={handleSubmit}>
      <label htmlFor="firstName">
        
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={formState.firstName}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="lastName">
        
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={formState.lastName}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email">
        
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="address">
        
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={formState.address}
          onChange={handleChange}
        />
      </label>
      
      {/* Add other form inputs here, following the same pattern */}
      <button className="bg-yard-orange text-white" type="submit">Save</button>
    </form>
  );
};

export default GardenerProfileForm;
