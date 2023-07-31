import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SAVE_FORM_DATA_MUTATION } from "../utils/mutations";

const ProfileBuilder = () => {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  const { id } = useParams(); // If you need to get an id from the URL
  const navigate = useNavigate();
  const location = useLocation();
  const zip = location?.state?.zip || "";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    plotName: "",
    zip: zip, // Initialized with zip from the previous step if it exists
    streetAddress: "",
    lotSquareFootage: "",
    gardenType: "",
    photo: null, // To handle file upload later
  });

  const [saveFormData, { loading, error }] = useMutation(SAVE_FORM_DATA_MUTATION);

  const handleNext = async (formStepData) => {
    // Merge the new form data with the existing data
    const updatedFormData = {
      ...formData,
      ...formStepData,
      zip: zip, // Set zip code here
    };

    // If this is the first step, submit the data to the server
    if (step === 1) {
      try {
        // Create an object with the required fields for step 1
        const input = {
          firstName: updatedFormData.firstName,
          lastName: updatedFormData.lastName,
          email: updatedFormData.email,
          password: updatedFormData.password,
          confirmPassword: updatedFormData.confirmPassword,
        };

        // Call the mutation with the input object
        const { data } = await saveFormData({
          variables: {
            input: input,
          },
        });

        console.log("SaveFormData Response", data.saveFormData); // Log the response
        // You can also use the response to show a success message, navigate, etc.
      } catch (err) {
        console.error("An error occurred while saving data:", err);
        // Handle the error as needed
      }
    }

    // Update the form data in the state
    setFormData(updatedFormData);

    // Advance to the next step
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = async (formStepData) => {
    // Merge the new form data with the existing data
    const updatedFormData = {
      ...formData,
      ...formStepData,
      zip: zip, // Set zip code here
    };

    try {
      // Call the mutation with the updated form data
      const { data } = await saveFormData({
        variables: {
          input: {
            firstName: updatedFormData.firstName,
            lastName: updatedFormData.lastName,
            email: updatedFormData.email,
            password: updatedFormData.password,
            confirmPassword: updatedFormData.confirmPassword,
            zip: updatedFormData.zip,
            address: updatedFormData.address,
            isGardener: updatedFormData.isGardener,
            isHomeowner: updatedFormData.isHomeowner,
            plotName: updatedFormData.plotName,
            streetAddress: updatedFormData.streetAddress,
            lotSquareFootage: updatedFormData.lotSquareFootage,
            gardenType: updatedFormData.gardenType,
            photo: updatedFormData.photo,
          },
        },
      });

      console.log("Submit Response", data.saveFormData); // Log the response
      // You can also use the response to show a success message, navigate, etc.
    } catch (err) {
      console.error("An error occurred while saving data:", err);
      // Handle the error as needed
    }
  };


    // console.log("formData:", formData); // Log formData here
    return (
        <div>
            {step === 1 && (
                <section>
                    <form onSubmit={handleSubmit(handleNext)}>
                        <div>
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                defaultValue={formData.firstName}
                                {...register("firstName", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                defaultValue={formData.lastName}
                                {...register("lastName", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={formData.email}
                                {...register("email", { required: true })}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                defaultValue={formData.password}
                                {...register("password", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                defaultValue={formData.confirmPassword}
                                {...register("confirmPassword", {
                                    required: true,
                                })}
                            />
                        </div>

                        {/* ... other fields here ... */}
                        {/*This is dynamically added below
            <button type="submit">Next</button>*/}
                    </form>
                </section>
            )}
            {step === 2 && (
                <section>
                    <h2>All signed up!</h2>
                    <p>
                        Next step is to fill out your profile so you can find
                        the right gardener for you!
                    </p>
                    {/* Here you can display any other information about the user's progress */}
                </section>
            )}

            {step === 3 && (
                <section>
                    <h2>Profile</h2>
                    <form onSubmit={handleSubmit(handleFormSubmit)}>
                        <div>
                            <label htmlFor="plotName">Plot Name</label>
                            <input
                                type="text"
                                name="plotName"
                                defaultValue={formData.plotName}
                                {...register("plotName", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="zip">Zip</label>
                            <input
                                type="text"
                                name="zip"
                                value={formData.zip} // Prefilled with zip if it exists
                                // onChange={handleInputChange}
                                {...register("zip", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="streetAddress">
                                Street Address
                            </label>
                            <input
                                type="text"
                                name="streetAddress"
                                defaultValue={formData.streetAddress}
                                {...register("streetAddress", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label htmlFor="lotSquareFootage">
                                Lot Square Footage
                            </label>
                            <input
                                type="number"
                                name="lotSquareFootage"
                                defaultValue={formData.lotSquareFootage}
                                {...register("lotSquareFootage", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label htmlFor="gardenType">Garden Type</label>
                            <select
                                name="gardenType"
                                {...register("gardenType", { required: true })}
                                defaultValue={formData.gardenType}
                            >
                                <option value="pollinator">Pollinator</option>
                                <option value="vegetable">Vegetable</option>
                                <option value="mixed">Mixed</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="photo">Upload Photo</label>
                            <input
                                type="file"
                                defaultValue={formData.photo}
                                name="photo"
                                {...register("photo")}
                            />
                        </div>
                        {/* Other fields and buttons here */}
                    </form>
                </section>
            )}

            <div>
                {step > 1 && <button onClick={handleBack}>Back</button>}
                {step < 3 && (
                    <button onClick={handleSubmit(handleNext)}>Next</button>
                )}
                {step === 3 && (
                    <button onClick={handleFormSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default ProfileBuilder;
