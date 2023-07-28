const express = require("express");
const { User } = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// require("dotenv").config();

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
        addUser: async (parent, { name, username, email, password, address, isGardener, isHomeowner, gardenerProfile, homeownerProfile }) => {
            if (!name ||
                !username ||
                !email ||
                !password
                /*Commenting these out because we dont' want them to be required
                for sign up. Once signed up they will route to the profile page
                 to fill out the rest of their info.
                 */
                // !address ||
                // isGardener == null ||
                // isHomeowner == null
                ) {
                throw new Error("Please enter all required fields.");
              }

              // check for password length
              if (password.length < 8) {
                throw new Error("Please enter a password of at least 8 characters.");
              }

              // check if username or email already in use
              const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
              if (existingUser) {
                throw new Error("A user with this username or email already exists.");
              }

              // hash password
              const salt = await bcrypt.genSalt();
              const passwordHash = await bcrypt.hash(password, salt);

              // save new user
              const newUser = new User({
                name,
                username,
                email,
                password: passwordHash,
                address,
                isGardener,
                isHomeowner,
                gardenerProfile,
                homeownerProfile
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

              return {
                token,
                user: {
                  id: newUser._id,
                  name: newUser.name,
                  username: newUser.username,
                  email: newUser.email,
                  address: newUser.address,
                  isGardener: newUser.isGardener,
                  isHomeowner: newUser.isHomeowner,
                  gardenerProfile: newUser.gardenerProfile,
                  homeownerProfile: newUser.homeownerProfile,
                },
              };
        },

        editUser: async (parent, { id, ...rest }, context) => { // id is the user's id, rest is the rest of the data
            //find a user by ID and update it with new data.
            //option {new: true} returns updated data
            return await User.findByIdAndUpdate(id, rest, { new: true });
        },

        deleteUser: async (parent, { id }, context) => {
            // Find user and remove it
            const user = await User.findByIdAndRemove(id);

            // Check if user was actually found and removed
            if (!user) {
              return {
                success: false,
                message: "No user found with this id",
                id,
              };
            }

            return {
              success: true,
              message: "User successfully deleted",
              id, // The id of the deleted user
            };
          },
    },
};

// console.log('User Model loaded');
module.exports = userResolver;
