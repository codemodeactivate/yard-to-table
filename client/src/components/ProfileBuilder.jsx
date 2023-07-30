import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const ProfileBuilder = () => {
    const [step, setStep] = useState(1); // step 1 is the first step
    const [loading, setLoading] = useState(false); // loading is false by default
    const [error, setError] = useState(null); // error is false by default
    const { register, handleSubmit, errors } = useForm(); // useForm hook
    const { zip } = useParams(); // get zip from URL
    const [ profileData, setProfileData ] = useState({}); // profileData is an empty object by default, but keep it across dif steps

    const handleNext = (data) => {
        console.log("Profile Builder Data: ", { data }); // log data to console
        setStep(step + 1); // increment step by 1
    };

    const handleBack = () => {
        setStep(step - 1); // decrement step by 1
    };

    const handleFormSubmit = () => {
        // submit profile to backend
    };
    
    return (
        <div>
            {step === 1 && (
                <section>
                    {/* Step 1 Form */}
                    <form onSubmit={handleSubmit(handleNext)}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            ref={register({
                                required: "First Name is required",
                            })}
                        />
                        {errors.firstName && <p>{errors.firstName.message}</p>}
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            ref={register({
                                required: "Last Name is required",
                            })}
                        />
                        {errors.lastName && <p>{errors.lastName.message}</p>}
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            ref={register({ required: "Email is required" })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            ref={register({ required: "Password is required" })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            ref={register({
                                required: "Confirm Password is required",
                            })}
                        />
                        {errors.confirmPassword && (
                            <p>{errors.confirmPassword.message}</p>
                        )}

                        <button type="submit">Next</button>
                    </form>
                </section>
            )}
            {step === 2 && (
                <section>
                    <p>All signed up!</p>
                    <button onClick={handleNext}>Next</button>
                </section>
            )}
                {/* Repeat for all steps */}



                {step === 3 && (
                    <section>
                        {/*Step 3 Form */}
                        <form onSubmit={handleSubmit(handleNext)}>
                        {/* Fields for plot information, such as plotName, zip, address, etc. */}
                        <label htmlFor="plotName">Plot Name</label>
                        <input
                            type="text"
                            name="plotName"
                            id="plotName"
                            ref={register({})}
                        />
                        <label htmlFor="zip">Zip</label>
                        <input
                            type="text"
                            name="zip"
                            id="zip"
                            ref={register({})}
                            defaultValue={zip} // You can set this based on previous info
                        />

                        {/* Add the rest of the fields here */}
                        <label htmlFor="Street Adress">Street Address</label>
                        <input
                            type="text"
                            name="streetAddress"
                            id="streetAddress"
                            ref={register({})}
                        />
                        <label htmlFor="Lot Square Footage">Lot Square Footage</label>
                        <input
                            type="text"
                            name="lotSquareFootage"
                            id="lotSquareFootage"
                            ref={register({})}
                        />
                        <label htmlFor="Plot Type">Plot Type</label>
                        <select
                            name="plotType"
                            id="plotType"
                            ref={register({})}
                        >
                            <option value="Pollinator">Pollinator</option>
                            <option value="Vegetable">Vegetable</option>
                            <option value="Flower">Flower</option>
                            <option value="Herb">Herb</option>
                            <option value="Mixed">Mixed</option>
                        </select>
                        <label htmlFor="profilePicture">Plot Picture</label>
                        <input
                            type="file"
                            name="plotPicture"
                            id="plotPicture"
                            accept="image/*" // Restrict file types to images
                            ref={register({})}  // This is optional if using react-hook-form
                        />

                        <button type="submit">Next</button>
                        </form>
                    </section>
                    )}

            <div>
                {loading && <p>Loading...</p>}{" "}
                {/* Show loading message when loading */}
                {error && <p>Error: {error.message}</p>}{" "}
                {/* Show error message when there is an error */}
                {step > 1 && !loading && !error && (
                    <button onClick={handleBack}>Back</button>
                )}
                {/* Show the Next button if not on the last step, and not loading or error state */}
                {step < 2 && !loading && !error && (
                    <button onClick={handleNext}>Next</button>
                )}
                {/* Show the Submit button on the last step, and not loading or error state */}
                {step === 2 && !loading && !error && (
                    <button onClick={handleFormSubmit}>Submit</button>
                )}
            </div>
        </div>
    );

};
export default ProfileBuilder;
