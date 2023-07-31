import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const ProfileBuilder = () => {
    const [step, setStep] = useState(1);
    const { register, handleSubmit, errors } = useForm();
    const { id } = useParams(); // If you need to get an id from the URL
    const navigate = useNavigate();
    const location = useLocation();
    const zip = location?.state?.zip || "";
    console.log("Location State:", location?.state);
    console.log("ZIP Code:", zip);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNext = (formData) => {
        console.log("Step 1 Form Data:", formData);
        setFormData({
          ...formData,
          zip: zip // Set zip code here
        });

        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleFormSubmit = () => {
        // submit profile to backend
    };
    console.log("formData:", formData); // Log formData here
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
                                {...register("firstName", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                {...register("lastName", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                {...register("email", { required: true })}
                            />
                        </div>

                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
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
                    <form onSubmit={handleSubmit(handleNext)}>
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
                                onChange={handleInputChange}
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
                {step === 2 && (
                    <button onClick={handleFormSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default ProfileBuilder;
