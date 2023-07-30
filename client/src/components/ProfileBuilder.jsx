import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

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
                    <form onSubmit={handleSubmit(handleNext)}>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            ref={register('test', { required: true })}
                        />
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
