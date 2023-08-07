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
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">
        First Name
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="lastName">
        Last Name
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="address">
        Address
        <input
          type="text"
          id="address"
          name="address"
          value={formState.address}
          onChange={handleChange}
        />
      </label>
      
      {/* Add other form inputs here, following the same pattern */}
      <button type="submit">Save</button>
    </form>
  );
};

export default GardenerProfileForm;
