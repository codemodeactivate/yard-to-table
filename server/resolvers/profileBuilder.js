const {
    User: { User },
} = require("../models");
const Profile = require("../models/Profile"); // Import the Profile model
const { clearTemporaryData } = require("../utils/utils");
const models = require("../models");
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
          //  TODO: ADD AUTHORIZATION DOUBLE CHECK TO MAKE SURE ONLY ADMIN CAN ACCESS THIS QUERY

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
            tempData.step3 = input;

            // Save the updated temporary data back to storage
            await saveTemporaryData(user.id, tempData);

            return tempData;
        },

        submitProfile: async (parent, args, context, info) => {
            // Retrieve user information from the context
            const user = context.user;

        let profile = await Profile.findOne({ user: user.id });
        if (!profile) {
          profile = new Profile({
            user: user.id,
            step1: step1Data,
          });
        } else {
          profile.step1 = step1Data;
        }
        await profile.save();
        return profile;
      },

      createProfileStep2: async (parent, args, context, info) => {
        // handle step 2 of the profile creation
        const step2Data = args.input;
        const user = context.user;

        const profile = await Profile.findOne({ user: user.id });
        if (!profile) {
          throw new Error('Profile not found');
        }

        profile.step2 = step2Data;
        await profile.save();
        return profile;

      },



      // other steps



      submitProfile: async (parent, args, context, info) => {
        // handle final submission
        const user = context.user;
        const profile = await Profile.findOne({ user: user.id });

        if (!profile) {
          throw new Error('Profile not found');
        }

        profile.isCompleted = true; // set completion flag
        // we can maybe use this later to track down users that don't complete their profile but only start the
        // initial steps

        await profile.save();
        return profile;

      },
    },
  };

  module.exports = profileBuilderResolvers;
