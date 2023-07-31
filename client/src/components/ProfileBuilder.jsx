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
    // If this is the first step, submit the data to the server
    if (step === 1) {
      try {
        // Create an object with the required fields for step 1
        const input = {
          firstName: formStepData.firstName,
          lastName: formStepData.lastName,
          email: formStepData.email,
          password: formStepData.password,
          confirmPassword: formStepData.confirmPassword,
        };

        // Call the mutation with the input object
        const { data } = await saveFormData({
          variables: {
            input: input,
          },
        });

        console.log("SaveFormData Response", data.saveFormData); // Log the response
        // You can also use the response to show a success message, navigate, etc.

        // Now, update the formData object with the data from Step #1
        setFormData({
          ...formData,
          firstName: formStepData.firstName,
          lastName: formStepData.lastName,
          email: formStepData.email,
          password: formStepData.password,
          confirmPassword: formStepData.confirmPassword,
        });

        // Advance to the next step
        setStep(step + 1);
      } catch (err) {
        console.error("An error occurred while saving data:", err);
        // Handle the error as needed
      }
    } else if (step === 3) {
      try {
        // Call the mutation with the updated form data (including data from Step #3)
        const { data } = await saveFormData({
          variables: {
            input: {
              ...formData, // Include data from Steps #1 and #2
              ...formStepData, // Include data from Step #3
            },
          },
        });

        console.log("Step 3 Submit Response", data.saveFormData);

        // Advance to the next step
        setStep(step + 1);
      } catch (err) {
        console.error("An error occurred while saving data:", err);
        // Handle the error as needed
      }
    } else {
      // If this is not the first or third step, just update the form data and advance to the next step
      setFormData({
        ...formData,
        ...formStepData,
      });
      setStep(step + 1);
    }
  };




  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = async (formStepData) => {
    // Merge the new form data with the existing data (excluding the data from Step #3)
    const updatedFormData = {
      ...formData,
      ...formStepData,
      zip: zip, // Set zip code here
    };
    console.log("Form Step Data (Step 3):", formStepData);
    try {
      // Call the mutation with the updated form data (excluding the data from Step #3)
      const { data } = await saveFormData({
        variables: {
          input: {
            firstName: updatedFormData.firstName,
            lastName: updatedFormData.lastName,
            email: updatedFormData.email,
            password: updatedFormData.password,
            confirmPassword: updatedFormData.confirmPassword,
            zip: updatedFormData.zip,
            plotName: formStepData.plotName, // Include data from Step #3
            streetAddress: formStepData.streetAddress, // Include data from Step #3
            lotSquareFootage: formStepData.lotSquareFootage, // Include data from Step #3
            gardenType: formStepData.gardenType, // Include data from Step #3
            photo: formStepData.photo, // Include data from Step #3
          },
        },
      });

      console.log("Step 1 and 2 Submit Response", data.saveFormData);

      // Now, update the formData object with the data from Step #3
      setFormData({
        ...updatedFormData, // Include data from Step #1 and Step #2
        ...formStepData, // Include data from Step #3
        zip: zip, // Set zip code here
      });

      // Advance to the next step
      setStep(step + 1);
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
                    <button onClick={() => handleFormSubmit(getValues())}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default ProfileBuilder;
