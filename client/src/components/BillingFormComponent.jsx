import React, { useState } from 'react';

const BillingForm = ({ onSave }) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const [lastFourDigits, setLastFourDigits] = useState('');
  const [brand, setBrand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a billing object with the form data
    const billingData = {
      creditCardNumber,
      expirationMonth,
      expirationYear,
      cardholderName,
      billingAddress,
      country,
      postalCode,
      isDefault,
      lastFourDigits,
      brand,
    };

    // Call the onSave function passed as a prop to save the billing data
    onSave(billingData);

    // Clear the form fields after submitting
    setCreditCardNumber('');
    setExpirationMonth('');
    setExpirationYear('');
    setCardholderName('');
    setBillingAddress('');
    setCountry('');
    setPostalCode('');
    setIsDefault(false);
    setLastFourDigits('');
    setBrand('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Credit Card Number</label>
        <input type="text" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)} required />
      </div>
      <div>
        <label>Expiration Month</label>
        <input type="text" value={expirationMonth} onChange={(e) => setExpirationMonth(e.target.value)} required />
      </div>
      <div>
        <label>Expiration Year</label>
        <input type="text" value={expirationYear} onChange={(e) => setExpirationYear(e.target.value)} required />
      </div>
      <div>
        <label>Cardholder Name</label>
        <input type="text" value={cardholderName} onChange={(e) => setCardholderName(e.target.value)} required />
      </div>
      <div>
        <label>Billing Address</label>
        <input type="text" value={billingAddress} onChange={(e) => setBillingAddress(e.target.value)} required />
      </div>
      <div>
        <label>Country</label>
        <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
      </div>
      <div>
        <label>Postal Code</label>
        <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
      </div>
      <div>
        <label>Is Default</label>
        <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
      </div>
      <div>
        <label>Last Four Digits</label>
        <input type="text" value={lastFourDigits} onChange={(e) => setLastFourDigits(e.target.value)} required />
      </div>
      <div>
        <label>Brand</label>
        <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
      </div>
      <button type="submit">Save Billing Information</button>
    </form>
  );
};

export default BillingForm;
