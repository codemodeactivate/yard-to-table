const { User: { User }, } = require("../models");
const Plot = require("../models/Plot"); // Import the Plot model// Import the User model.
// Note that we are using object destructuring here to extract the User model from the models object
const Profile = require("../models/Profile"); // Import the Profile model
const { clearTemporaryData } = require("../utils/utils");
const models = require("../models");
const bcrypt = require('bcrypt')
const TempUserData = require("../models/TempUserData");

const profileBuilderResolvers = {
  Query: {
      getProfile: (parent, { id }) => {
          // Check if the 'id' parameter is null or not provided
          if (!id) {
              return null; // or return an empty object or any other default value
          }

          // Logic to fetch the profile using the provided 'id'
          // Replace this with your actual logic to fetch the profile
          const profile = fetchProfileById(id);

          return profile;
      },
      getNonCompletedProfiles: async (parent, args, context, info) => {
          // TODO: ADD AUTHORIZATION DOUBLE CHECK TO MAKE SURE ONLY ADMIN CAN ACCESS THIS QUERY

          // Retrieve non-completed profiles, i.e. profiles where isCompleted = false
          const profiles = await Profile.find({ isCompleted: false });
          return profiles;
      },
  },

  Mutation: {


      // createOrUpdateStep1: async (parent, { step, input }, context, info) => {
      //     // Retrieve user information from the context
      //     const user = context.user;

      //     // Retrieve existing temporary data for this user
      //     const tempData = await getTemporaryData(user.id);

      //     // Update the specific step's data
      //     tempData[`step${step}`] = input;

      //     // Save the updated temporary data back to storage
      //     await saveTemporaryData(user.id, tempData);

      //     return tempData;
      // },
      // createOrUpdateStep3: async (parent, { step, input }, context, info) => {
      //     // Retrieve user information from the context
      //     const user = context.user;

      //     // Retrieve existing temporary data for this user
      //     const tempData = await getTemporaryData(user.id);

      //     // Update the specific step's data
      //     tempData.step3 = input;

      //     // Save the updated temporary data back to storage
      //     await saveTemporaryData(user.id, tempData);

      //     return tempData;
      // },

      submitProfile: async (parent, args, context, info) => {
          // Retrieve user information from the context
          const user = context.user;

          // Retrieve the completed temporary data for this user
          const tempData = await getTemporaryData(user.id);

          // Create a new profile using the temporary data
          const profile = new Profile({
              user: user.id,
              // Include the data from each step as needed
              step1: tempData.step1,
              step2: tempData.step2,
              //step3: tempData.step3,
              // ... additional steps if needed
              isCompleted: true,
          });

          // Save the new profile
          await profile.save();

          // Optionally, you may clear the temporary data for this user
          await clearTemporaryData(user.id);

          return profile;
      },

      handleStep1: async (input) => {
        if (input.password !== input.confirmPassword) {
          throw new Error("Password and Confirm Password must match");
        }

        // Check if a user with the same email already exists
        let user = await User.findOne({ email: input.email });
        let userID;

        if (user) {
          userID = user._id; // If the user exists, grab the user ID
        } else {
          // If the user doesn't exist, create a temporary entry
          const tempUserData = new TempUserData({
            step1: {
              firstName: input.firstName,
              lastName: input.lastName,
              email: input.email,
              password: input.password,
              confirmPassword: input.confirmPassword,
            },
          });
          await tempUserData.save();
          userID = tempUserData._id; // Grab the temporary ID
          console.log("Temporary USer ID:", userID);
        }

        return {
          success: true,
          message: "Step 1 completed successfully",
          userID: userID,
        };
      },

      handleStep3: async (_, { input }) => {
        try {
          const step3Input = input.step3;

          // Create a new TempUserData entry with the Step 3 data
          const tempUserData = new TempUserData({
            step3: {
              plotName: step3Input.plotName,
              zip: step3Input.zip,
              streetAddress: step3Input.streetAddress,
              lotSquareFootage: step3Input.lotSquareFootage,
              plotType: step3Input.plotType,
            },
          });

          // Save the new TempUserData entry in the database
          await tempUserData.save();

          console.log("STEP 3 INPUT", { tempUserData });
          return {
            success: true,
            message: "Step 3 completed successfully",
            userID: tempUserData._id,
          };
        } catch (error) {
          console.error("An error occurred while handling Step 3:", error);
          return {
            success: false,
            message: "Error while handling Step 3",
            userID: null,
          };
        }
      },




      saveFormData: async function (parent, { step, input }, context, info) {
        switch (step) {
          case 1:
            return this.handleStep1(input); // Change this line
          case 3:
            return this.handleStep3(input.userID, input); // Change this line
          default:
            throw new Error("Invalid step");
        }
      },

    completeProfile: async (parent, { userID }, context, info) => {
      try {
        // Retrieve the temporary data
        const tempData = await TempUserData.findById(userID);

        if (!tempData) {
          throw new Error("Temporary data not found");
        }

        // Check if the user already exists
        let user = await User.findOne({ email: tempData.step1.email });

        // Hash the password
        const hashedPassword = await bcrypt.hash(tempData.step1.password, 10);

        if (user) {
          // Update existing user
          user.password = hashedPassword;
          user.firstName = tempData.step1.firstName;
          user.lastName = tempData.step1.lastName;
          user.isGardener = tempData.step1.isGardener;
          user.isHomeowner = tempData.step1.isHomeowner;
          user.profile.isCompleted = true;
          await user.save();
        } else {
          // Create new user
          user = new User({
            firstName: tempData.step1.firstName,
            lastName: tempData.step1.lastName,
            email: tempData.step1.email,
            password: hashedPassword,
            isGardener: tempData.step1.isGardener,
            isHomeowner: tempData.step1.isHomeowner,
            profile: { isCompleted: true },
          });
          await user.save();
        }

        // Create new Plot document
        const plot = new Plot({
          user: user.id,
          plotName: tempData.step3.plotName,
          zip: tempData.step3.zip,
          streetAddress: tempData.step3.streetAddress,
          lotSquareFootage: tempData.step3.lotSquareFootage,
          plotType: tempData.step3.plotType,
          // ... other fields from Step 3
        });

        // Save the new Plot document
        await plot.save();

        // Clear temporary data
        await tempData.remove();

        return {
          success: true,
          message: "User and Profile created successfully",
          userID: user._id,
        };
      } catch (err) {
        console.error(err);
        throw new Error("Failed to save user and profile. Please try again.");
      }
    }
  }
}

module.exports = profileBuilderResolvers;
