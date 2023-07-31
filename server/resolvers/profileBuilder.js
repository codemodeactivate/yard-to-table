const { User: { User } } = require('../models');
const models = require('../models');
console.log(models);
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
    createOrUpdateStep1: async (parent, { step, input }, context, info) => {
      // Retrieve user information from the context
      const user = context.user;

      // Retrieve existing temporary data for this user
      const tempData = await getTemporaryData(user.id);

      // Update the specific step's data
      tempData[`step${step}`] = input;

      // Save the updated temporary data back to storage
      await saveTemporaryData(user.id, tempData);

      return tempData;
    },
    createOrUpdateStep3: async (parent, { step, input }, context, info) => {
      // Retrieve user information from the context
      const user = context.user;

      // Retrieve existing temporary data for this user
      const tempData = await getTemporaryData(user.id);

      // Update the specific step's data
      tempData[`step${step}`] = input;

      // Save the updated temporary data back to storage
      await saveTemporaryData(user.id, tempData);

      return tempData;
    },

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
    saveFormData: async (parent, { input }, context, info) => {
      console.log('Input received: ', input);
      const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        zip,
        isGardener,
        isHomeowner,
        username,
        address,
      } = input;

      if (password !== confirmPassword) {
        throw new Error('Password and Confirm Password must match');
      }

      // const existingUser = await User.findOne({ email });
      // if (existingUser) {
      //   throw new Error('Email already exists');
      // }

      const user = new User({
        firstName,
        lastName,
        email,
        password, // Will be hashed by the pre-save hook
        zip,
        username, // These fields are now optional and will be included if they exist
        address,
        isGardener,
        isHomeowner,
      });
      console.log('User before save: ', user);

      await user.save();

      return {
        success: true,
        message: 'User created successfully',
      };
    },

    }

};

module.exports = profileBuilderResolvers;
