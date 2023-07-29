
const profileBuilderResolvers = {

    Query: {
      getNonCompletedProfiles: async (parent, args, context, info) => {
        //TODO: ADD AUTHORIZATION DOUBLE CHECK TO MAKE SURE ONLY ADMIN CAN ACCESS THIS QUERY

        //retrieve non completed profiles, ie profiles where isCompleted = false
        const profiles = await Profile.find({ isCompleted: false });
        return profiles;
      },
    },

    Mutation: {
      createProfileStep1: async (parent, args, context, info) => {
        // handle step 1 of the profile creation
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
