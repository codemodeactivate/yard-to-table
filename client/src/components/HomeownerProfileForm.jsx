import React from "react";

const HomeownerProfileForm = ({onSave}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default HomeownerProfileForm;
