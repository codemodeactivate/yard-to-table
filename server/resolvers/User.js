const express = require("express");
const { User } = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../.env' });

// console.log(User);
// console.log("User object: ", User);
// console.log("Type of User object: ", typeof User);
// console.log("User.create method: ", User.create);
// console.log("User.save method: ", User.save);
// console.log(process.env.JWT_SECRET);
const userResolver = {
    Query: {
        //get a single user by ID
        getUser: async (parent, { id }, context) => {
            // parent is the parent schema, in this case it is not needed
            // args are the arguments passed in the query
            // context is an object containing the request and response objects
            return await User.findById(id);
        },
        // Get all users
        getUsers: async (parent, args, context) => {
            return await User.find({});
        },
    },

    Mutation: {
        //add a new user

        signUp: async (parent, args, context, info) => {
            const { input } = args;
            let { firstName, lastName, email, password } = input;
            firstName = firstName.trim();
            lastName = lastName.trim();
            // username = username.trim();
            email = email.trim();
            password = password.trim();

            if (!firstName ||
                !lastName ||
                // !username ||
                !email ||
                !password
                /*Commenting these out because we dont' want them to be required
                for sign up. Once signed up they will route to the profile page
                 to fill out the rest of their info.
                 */
                // !address ||
                // isGardener == null ||
                // isHomeowner == null
                // plots == null
                ) {
                throw new Error("Please enter all required fields.");
              }
            //   const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
              // check for password length meeting requirements of regex above
              // this one checks for at least one uppercase, one lowercase, one number, one special character,
              // and a minimum of 8 characters
            //   if (!passwordPattern.test(password)) {
            //     throw new Error("Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.");
            //   }

              const emailPattern = /^\S+@\S+\.\S+$/;
                // check for valid email address
            if (!emailPattern.test(email)) {
            throw new Error("Please enter a valid email address.");
            }

              // check if username or email already in use
              const existingUser = await User.findOne({ email: email } );
              if (existingUser) {
                throw new Error("A user with this email already exists.");
              }

              // hash password
              const salt = await bcrypt.genSalt();
              const passwordHash = await bcrypt.hash(password, salt);

              // save new user
              const newUser = new User({
                firstName,
                lastName,
                // username,
                email,
                password: passwordHash,
                // address,
                // isGardener,
                // isHomeowner,
                // gardenerProfile,
                // homeownerProfile,
                // plots
              });

              await newUser.save();

              // sign jwt
              console.log('JWT Secret:', process.env.JWT_SECRET);
              const token = jwt.sign(
                {
                  id: newUser._id,
                },
                process.env.JWT_SECRET
              );

              const response = {
                user: {
                    id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    // Add other fields related to the user
                },
            };

            return signUpResponse;
        },

        editUser: async (parent, { id, ...rest }, context) => {
            // Check if user id exists in the database.
            const user = await User.findById(id);
            if (!user) {
                throw new Error("No user found with this id");
            }

            // Validate the rest data according to your User model.
            // For example, let's validate if the email provided is valid.
            // Add more validations as per your requirements.
            if (rest.email) {
                const emailPattern = /^\S+@\S+\.\S+$/;
                if (!emailPattern.test(rest.email)) {
                    throw new Error("Please enter a valid email address.");
                }

                // Also check if the email is already in use
                const existingUser = await User.findOne({ email: rest.email });
                if (existingUser && String(existingUser._id) !== id) {
                    throw new Error("A user with this email already exists.");
                }
            }

            try {
                // Update the user.
                const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });
                return updatedUser;
            } catch (err) {
                // Handle any database errors.
                console.error(err);
                throw new Error("An error occurred while updating the user");
            }
        },

        deleteUser: async (parent, { id }, context) => {
            // Check if user id exists in the database.
            const user = await User.findById(id);
            if (!user) {
                throw new Error("No user found with this id");
            }

            try {
                // Delete the user.
                await User.findByIdAndRemove(id);

                return {
                    success: true,
                    message: "User successfully deleted",
                    id,
                };
            } catch (err) {
                // Handle any database errors.
                console.error(err);
                throw new Error("An error occurred while deleting the user");
            }
        }
    },
};

// console.log('User Model loaded');
module.exports = userResolver;
