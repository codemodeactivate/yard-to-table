const profileBuilderResolvers = {

  Query: {
    getNonCompletedProfiles: async (parent, args, context, info) => {
      // TODO: ADD AUTHORIZATION DOUBLE CHECK TO MAKE SURE ONLY ADMIN CAN ACCESS THIS QUERY

      // Retrieve non-completed profiles, i.e. profiles where isCompleted = false
      const profiles = await Profile.find({ isCompleted: false });
      return profiles;
    },
  },

  Mutation: {
    createProfileStep1: async (parent, args, context, info) => {
      // Handle step 1 of the profile creation
      const step1Data = args.input;
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

    updateProfileStep1: async (parent, args, context, info) => {
      // Handle update for step 1
      const step1Data = args.input;
      const user = context.user;

      const profile = await Profile.findOne({ user: user.id });
      if (!profile) {
        throw new Error('Profile not found');
      }

      profile.step1 = step1Data;
      await profile.save();
      return profile;
    },

    createProfileStep2: async (parent, args, context, info) => {
      // Handle step 2 of the profile creation
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

    updateProfileStep2: async (parent, args, context, info) => {
      // Handle update for step 2
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

    // Add similar functions for other steps if needed

    submitProfile: async (parent, args, context, info) => {
      // Handle final submission
      const user = context.user;
      const profile = await Profile.findOne({ user: user.id });

      if (!profile) {
        throw new Error('Profile not found');
      }

      profile.isCompleted = true; // Set completion flag
      // We can maybe use this later to track down users that don't complete their profile but only start the
      // Initial steps

      await profile.save();
      return profile;
    },
  },
};

module.exports = profileBuilderResolvers;
