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
        // any other fields needed
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNext = (formData) => {
        console.log(formData);
        if (step === 1) {
            console.log("Step 1 Form Data:", formData);
            navigate(`/next-step/${zip}`, { state: { formData } });
        }

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

            <div>
                {step > 1 && <button onClick={handleBack}>Back</button>}
                {step < 2 && <button onClick={handleNext}>Next</button>}
                {step === 2 && (
                    <button onClick={handleFormSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default ProfileBuilder;
