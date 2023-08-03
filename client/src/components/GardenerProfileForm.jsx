import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { CREATE_GARDENER_PROFILE } from "../utils/mutations";

const GardenerProfileForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    yearsExperience: 0,
    specialty: [],
    areaServed: [],
    cost: 0,
    bio: "",
    photo: null, // Added a new field for the photo
  });

  const [addGardenerProfile] = useMutation(CREATE_GARDENER_PROFILE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpecialtyChange = (e) => {
    const options = e.target.options;
    const selectedSpecialty = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedSpecialty.push(options[i].value);
      }
    }
    setFormData({ ...formData, specialty: selectedSpecialty });
  };

  const handleAreaServedChange = (e) => {
    const zipCodes = e.target.value.split(",").map((zip) => zip.trim());
    setFormData({ ...formData, areaServed: zipCodes });
  };

  const handlePhotoChange = (e) => {
    const photoFile = e.target.files[0];
    setFormData({ ...formData, photo: photoFile });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Make the API call to save the gardener profile data
    try {
      const { yearsExperience, specialty, areaServed, cost, bio, photo } = formData;
      const input = {
        yearsExperience: parseInt(yearsExperience),
        specialty,
        areaServed,
        cost: parseInt(cost),
        bio,
        photo,
        // Upload the photo here, if needed
      };

      // Call the mutation
      const { data } = await addGardenerProfile({ variables: { input } });

      // Check the response data and update the user's role if successful
      if (data.addGardenerProfile) {
        // Assuming you have a function to update the user's role to gardener
        // You can call it here, passing the user ID and setting isGardener to true
        // updateUserRole(data.addGardenerProfile.id, true);

        // Optionally, you could show a success message or redirect the user after saving
        alert("Gardener profile saved successfully!");
      } else {
        // Show an error message if the API call was not successful
        alert("Failed to save gardener profile. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error("Error saving gardener profile:", error);
      alert("An error occurred while saving the gardener profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="yearsExperience">Years of Experience:</label>
        <input
          type="number"
          id="yearsExperience"
          name="yearsExperience"
          value={formData.yearsExperience}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="specialty">Specialty:</label>
        <select
          id="specialty"
          name="specialty"
          multiple
          value={formData.specialty}
          onChange={handleSpecialtyChange}
        >
          <option value="vegetable">Vegetable</option>
          <option value="pollinator">Pollinator</option>
          {/* Add more specialty options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="areaServed">Areas Served (separate multiple zip codes with commas):</label>
        <input
          type="text"
          id="areaServed"
          name="areaServed"
          value={formData.areaServed.join(", ")}
          onChange={handleAreaServedChange}
        />
      </div>
      <div>
        <label htmlFor="cost">Avg Cost/Hr:</label>
        <input
          type="number"
          id="cost"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="photo">Profile Photo:</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handlePhotoChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default GardenerProfileForm;
