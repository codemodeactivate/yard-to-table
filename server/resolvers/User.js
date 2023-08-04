const express = require("express");
const { User } = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '../.env' });
const { GardenerProfileModel } = require("../models")
const { mapCostToTier } = require("../utils/utils");
const  { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
console.log("Resolver file loaded");




// console.log(User);
// console.log("User object: ", User);
// console.log("Type of User object: ", typeof User);
// console.log("User.create method: ", User.create);
// console.log("User.save method: ", User.save);
// console.log(process.env.JWT_SECRET);
//GLOBAL QUERIES//
// const getAllUsersMain = async () => {
//   try {
//     return await User.find({});
//   } catch (err) {
//     console.error(`Error retrieving users: ${err}`);
//     throw new Error('Failed to retrieve users');
//   }
// };

// const getAllGardeners = async () => {
//   try {
//     return await User.find({ isGardener: true }).populate('gardenerProfile');
//   } catch (err) {
//     console.error(`Error retrieving gardeners: ${err}`);
//     throw new Error('Failed to retrieve gardeners');
//   }
// };

const getAllHomeowners = async () => {
  try {
    return await User.find({ isHomeowner: true }).populate('homeownerProfile');
  } catch (err) {
    console.error(`Error retrieving homeowners: ${err}`);
    throw new Error('Failed to retrieve homeowners');
  }
};
//ENDOFGLOBALQUERIES//

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
        getAllUsers: async () => {
            return await User.find({});
        },

          getAllGardeners: async (parent, args, context, info) => {
            try {
              return await User.find({ isGardener: true }).populate('gardenerProfile');
            } catch (err) {
              console.error(`Error retrieving gardeners: ${err}`);
              throw new Error('Failed to retrieve gardeners');
            }
          },
          getAllHomeowners: async (parent, args, context, info) => {
            return await getAllHomeowners();
          },


    },

    Mutation: {
        //add a new user

        signUp: async (parent, args, context, info) => {
          try {
            const { input } = args;
            let { firstName, lastName, email, password } = input;
            firstName = firstName.trim();
            lastName = lastName.trim();
            email = email.trim();
            password = password.trim();

            if (!firstName || !lastName || !email || !password) {
              throw new Error("Please enter all required fields.");
            }

            const emailPattern = /^\S+@\S+\.\S+$/;
            if (!emailPattern.test(email)) {
              throw new Error("Please enter a valid email address.");
            }

            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
              throw new Error("A user with this email already exists.");
            }

            const salt = await bcrypt.genSalt();
            // const passwordHash = await bcrypt.hash(password, salt);
            const passwordHash = password;
            const newUser = new User({
              firstName,
              lastName,
              email,
              password: passwordHash,
            });

            await newUser.save();

            const token = jwt.sign(
              {
                id: newUser._id,
              },
              process.env.JWT_SECRET
            );

            const signUpResponse = {
              id: newUser._id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              token: token, // Include the token in the response
            };

            return signUpResponse; // Return the complete response object
          } catch (error) {
            console.log('Error during sign-up:', error);
            throw new Error('Failed to sign up.');
          }
        },




        login: async (parent, args, context, info) => {
          const { email, password } = args;

          console.log(`Attempting to log in with email: ${email}`); // Log the email attempting to log in

          const user = await User.findOne({ email });
          if (!user) {
            console.log(`No user found with email: ${email}`); // Log if no user is found
            throw new Error("No user with this email exists.");
          } else {
            console.log(`User found with email: ${email}`); // Log if user is found
          }

          console.log('THIS IS WHAT I TYPED IN password:', password);
          console.log('Hashed stored password:', user.password);

          const trimmedPassword = password.trim();
          const trimmedStoredPassword = user.password.trim();

          console.log({
            trimmedPassword, trimmedStoredPassword, compare: await bcrypt.compare(trimmedPassword, trimmedStoredPassword)})

          const isMatch = await bcrypt.compare(trimmedPassword, trimmedStoredPassword);
          if (!isMatch) {
            console.log(`Password does not match for email: ${email}`); // Log if passwords don't match
            throw new Error("Invalid credentials RESOLVER.");
          } else {
            console.log(`Password matches for email: ${email}`); // Log if passwords match
          }

          // sign jwt
          const token = jwt.sign(
            {
              id: user._id,
            },
            process.env.JWT_SECRET
          );
          console.log('Generated token:', token); // Log the token for debugging

          // console.log(`Token generated for email: ${email}`); // Log token generation
          // console.log('Hashed provided password:', await bcrypt.hash(password, user.password.substr(0, 29)));
          return {
            user: {
              email: user.email,
            },
            token: token,
          }
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
        logout: async (parent, args, context, info) => {
          console.log('Logging out...');
          return {
            user: null,
            token: null,
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
        },

        // addGardenerProfile: async (parent, { input } ) => {
        //   const { yearsExperience, specialty, areaServed, rating, cost, bio, photo } = input;

        //   // Now you have the testUserId, you can use it to associate the GardenerProfile with the test user
        //   const gardenerProfile = await gardenerProfile.create({
        //     userId: testUserId, // Assuming you have a field in your GardenerProfile schema to store the user ID
        //     yearsExperience,
        //     specialty,
        //     areaServed,
        //     rating,
        //     cost,
        //     bio,
        //     photo,
        //   });

        //   // Return the saved gardener profile
        //   return gardenerProfile;
        // },
        createGardenerProfile: async (_, { input }, context) => {
          if(!context.userId) {
              throw new Error("You need to be logged in to create a Gardener Profile.");
          };
          console.log("Received createGardenerProfile mutation with input:", input);
          console.log("Context:", context);
          const userId = context.userId; // This is the ID of the logged-in user or tester which you can assign @ top
          console.log("userId:", userId);
          // Update the user's isGardener status to true
          const updatedUser = await context.db.collection('users').findOneAndUpdate(
              { _id: ObjectId(userId) },
              { $set: { isGardener: true } },
              { returnOriginal: false }
          );

          console.log("Updated user:", updatedUser.value);

          // Create the GardenerProfile document
          const gardenerProfile = {
              userId: mongoose.Types.ObjectId(userId),
              yearsExperience: input.yearsExperience,
              specialty: input.specialty,
              areaServed: input.areaServed,
              cost: input.cost,
              bio: input.bio,
              photo: input.photo,
              // Add any other GardenerProfile fields as needed
          };


          console.log("GardenerProfile to be inserted:", gardenerProfile);

          // Insert the gardener profile into the database
          const result = await context.db.collection("gardenerprofiles").insertOne(gardenerProfile);

          console.log("Insert result:", result);

          // Associate the GardenerProfile with the user
          await context.db.collection('users').updateOne(
              { _id: ObjectId(userId) },
              { $set: { gardenerProfile: result.insertedId } }
          );

          console.log("Created gardenerProfile:", gardenerProfile);
          console.log("Updated user:", updatedUser.value);
          return updatedUser.value;
      },



    },
};

// console.log('User Model loaded');
module.exports = userResolver;
