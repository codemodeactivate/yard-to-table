import React, { useState } from 'react';


const SignUpForm = () => {
    //Manage form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    //Form Submission
    const handleSubmit = (event) => {
        //we say event because we're not l337, yet
        event.preventDefault();

        //send Data to server

        console.log(formData);
    };

    const handleChange = (event) => {
        const {name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleClear = () => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
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
            required
        />
        </div>
        <div>
        <button type="submit">Sign Up</button>
        <button type="button" onClick={() => setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        })}>Clear</button>
        </div>
        <div>
        Already a user? <a href="/login">Login</a>
        </div>
    </form>
    );
};

export default SignUpForm;
