import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from "../utils/mutations";

const SignUpForm = () => {
    // Manage form inputs
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const [signUp, { loading, error }] = useMutation(SIGN_UP_MUTATION);

    // Form Submission
    const handleSubmit = async (event) => {
      event.preventDefault();

      const { firstName, lastName, email, password, confirmPassword } = formData;

      // Validate the form data before submitting
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        console.log("Please enter all required fields.");
        return;
      }

      if (password !== confirmPassword) {
        console.log("Passwords do not match.");
        return;
      }

      try {
        const { data } = await signUp({
          variables: {
            input: {
              firstName,
              lastName,
              email,
              password,
            },
          },
        });

        if (data?.signUp?.user) {
          console.log("Sign-up successful!", data.signUp.user);
          // Do something after successful sign-up, like redirecting to another page
        } else {
          console.log("Sign-up failed. Please try again.");
        }
      } catch (error) {
        console.log("An error occurred while signing up. Please try again later.");
      }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log("handleChange - name:", name, "value:", value);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleClear = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    required
                />
            </div>
            <div>
                <button type="submit">Sign Up</button>
                <button
                    type="button"
                    onClick={() =>
                        setFormData({
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                        })}>
                Clear
                </button>
            </div>
        </form>
    );
};

export default SignUpForm;
