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
    <div>
      <h2 className="text-center" >Billing Information</h2>
    <form className="billing-form flex-col w-full justify-center" onSubmit={handleSubmit}>
      <label htmlFor="creditCardNumber"></label>
      <input
        type="text"
        id="creditCardNumber"
        name="creditCardNumber"
        placeholder="Credit Card Number"
        value={formState.creditCardNumber}
        onChange={handleChange}
        required
      />

      <label htmlFor="expirationMonth"></label>
      <input
        type="text"
        id="expirationMonth"
        name="expirationMonth"
        placeholder="Expiration Month"
        value={formState.expirationMonth}
        onChange={handleChange}
        required
      />

      <label htmlFor="expirationYear"></label>
      <input
        type="text"
        id="expirationYear"
        name="expirationYear"
        placeholder="Expiration Year"
        value={formState.expirationYear}
        onChange={handleChange}
        required
      />

      <label htmlFor="cardholderName"></label>
      <input
        type="text"
        id="cardholderName"
        name="cardholderName"
        value={formState.cardholderName}
        onChange={handleChange}
        required
      />

      <label htmlFor="billingAddress"></label>
      <input
        type="text"
        id="billingAddress"
        name="billingAddress"
        placeholder="Billing Address"
        value={formState.billingAddress}
        onChange={handleChange}
        required
      />

      <label htmlFor="country"></label>
      <input
        type="text"
        id="country"
        name="country"
        placeholder="Country"
        value={formState.country}
        onChange={handleChange}
        required
      />

      <label htmlFor="postalCode"></label>
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        placeholder="Postal Code"
        value={formState.postalCode}
        onChange={handleChange}
        required
      />

      <label htmlFor="isDefault">Make Default Card?</label>
      <input
        type="checkbox"
        id="isDefault"
        name="isDefault"
        checked={formState.isDefault}
        onChange={handleChange}
      />

      <label htmlFor="lastFourDigits"></label>
      <input
        type="text"
        id="lastFourDigits"
        name="lastFourDigits"
        placeholder="Last Four Digits"
        value={formState.lastFourDigits}
        onChange={handleChange}
        required
      />

      <label htmlFor="brand"></label>
      <input
        type="text"
        id="brand"
        name="brand"
        placeholder="Brand"
        value={formState.brand}
        onChange={handleChange}
        required
      />

      <button className="bg-yard-orange text-white" type="submit">Save Billing Information</button>
    </form>
    </div>
  );
};

export default BillingForm;
