const { User } = require('../models');

const profileBuilderResolvers = {
  Mutation: {
    saveFormData: async (_, { step, input }) => {
      try {
        // Here, you will handle saving the step 1 and step 3 data to the database
        // For step 1, you can access the data using input.step1.firstName, input.step1.lastName, etc.
        // For step 3, you can access the data using input.step3.plotName, input.step3.zip, etc.

        // Implement the logic to save the data to the database, and set isCompleted to true if needed.
        // For example:
        const user = await User.findById(input.userId); // You will need to pass the user ID from the client-side mutation.
        if (!user) {
          throw new Error('User not found');
        }

        user.firstName = input.step1.firstName;
        user.lastName = input.step1.lastName;
        user.email = input.step1.email;
        user.password = input.step1.password;
        user.streetAddress = input.step3.streetAddress;
        user.zip = input.step3.zip;
        // ... Add other fields as needed from step 1 and step 3

        // Mark the profile as completed
        user.profile.isCompleted = true;

        await user.save();

        return {
          success: true,
          message: 'Form data saved successfully',
          userID: user.id,
        };
      } catch (error) {
        console.error('Error saving form data:', error);
        return {
          success: false,
          message: 'An error occurred while saving form data',
          userID: null,
        };
      }
    },
  },
};

module.exports = profileBuilderResolvers;
