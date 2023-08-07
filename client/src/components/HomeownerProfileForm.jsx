import React, { useState } from "react";

const HomeownerProfileForm = ({ onSave, user }) => {
  // Set initial form state
  const [formState, setFormState] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    address: user.address || "",
    newPassword: "",
    confirmNewPassword: "",
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

    // Ensure the new passwords match before submitting the update
    if (
      formState.newPassword &&
      formState.newPassword !== formState.confirmNewPassword
    ) {
      alert("New passwords must match.");
      return;
    }

    // Only include the new password in the update if one was provided
    const dataToSave = { ...formState };
    if (!formState.newPassword) {
      delete dataToSave.newPassword;
      delete dataToSave.confirmNewPassword;
    }

    // Call the onSave function passed as a prop by the parent component
    onSave(dataToSave);
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
          required
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
          required
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
          required
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
          required
        />
      </label>

      <label htmlFor="newPassword">
        New Password
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={formState.newPassword}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="confirmNewPassword">
        Confirm New Password
        <input
          type="password"
          id="confirmNewPassword"
          name="confirmNewPassword"
          value={formState.confirmNewPassword}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default HomeownerProfileForm;
