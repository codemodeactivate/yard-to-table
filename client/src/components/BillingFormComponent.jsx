import React, { useState } from "react";

const BillingForm = ({ user, onSave }) => {
  const [formState, setFormState] = useState({
    creditCardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cardholderName: "",
    billingAddress: "",
    country: "",
    postalCode: "",
    isDefault: false,
    lastFourDigits: "",
    brand: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type === "checkbox") {
      setFormState({ ...formState, [name]: event.target.checked });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formState);
    setFormState({
      creditCardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cardholderName: "",
      billingAddress: "",
      country: "",
      postalCode: "",
      isDefault: false,
      lastFourDigits: "",
      brand: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="creditCardNumber">Credit Card Number:</label>
      <input type="text" id="creditCardNumber" name="creditCardNumber" value={formState.creditCardNumber} onChange={handleChange} required />

      <label htmlFor="expirationMonth">Expiration Month:</label>
      <input type="text" id="expirationMonth" name="expirationMonth" value={formState.expirationMonth} onChange={handleChange} required />

      <label htmlFor="expirationYear">Expiration Year:</label>
      <input type="text" id="expirationYear" name="expirationYear" value={formState.expirationYear} onChange={handleChange} required />

      <label htmlFor="cardholderName">Cardholder Name:</label>
      <input type="text" id="cardholderName" name="cardholderName" value={formState.cardholderName} onChange={handleChange} required />

      <label htmlFor="billingAddress">Billing Address:</label>
      <input type="text" id="billingAddress" name="billingAddress" value={formState.billingAddress} onChange={handleChange} required />

      <label htmlFor="country">Country:</label>
      <input type="text" id="country" name="country" value={formState.country} onChange={handleChange} required />

      <label htmlFor="postalCode">Postal Code:</label>
      <input type="text" id="postalCode" name="postalCode" value={formState.postalCode} onChange={handleChange} required />

      <label htmlFor="isDefault">Is Default:</label>
      <input type="checkbox" id="isDefault" name="isDefault" checked={formState.isDefault} onChange={handleChange} />

      <label htmlFor="lastFourDigits">Last Four Digits:</label>
      <input type="text" id="lastFourDigits" name="lastFourDigits" value={formState.lastFourDigits} onChange={handleChange} required />

      <label htmlFor="brand">Brand:</label>
      <input type="text" id="brand" name="brand" value={formState.brand} onChange={handleChange} required />

      <button type="submit">Save Billing Information</button>
    </form>
  );
};

export default BillingForm;
