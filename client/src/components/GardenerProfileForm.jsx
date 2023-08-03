import React, { useState } from "react";

const GardenerProfileForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    yearsExperience: 0,
    specialty: [],
    areaServed: [],
    cost: 0,
    bio: "",
    photo: null, // Added a new field for the photo
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
