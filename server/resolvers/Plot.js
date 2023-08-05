const Plot = require("../models/Plot");
const { User, HomeownerProfile } = require("../models/User");

const plotResolvers = {
  Query: {
    //get a single plot by ID
    getPlot: async (parent, { id }, context) => {
      return await Plot.findById(id);
    },
    // Get all plots
    getPlots: async (parent, args, context) => {
      return await Plot.find({});
    },
  },

  Mutation: {
    // create a plot
    addPlot: async (parent, { plotData }, { userId }) => {
      console.log("Received plotData:", plotData);

      // This will create a new plot
      const newPlot = await Plot.create(plotData);
      console.log("New plot created:", newPlot);

      // This will find a user based on the userId
      const user = await User.findById(userId);
      console.log("Found user:", user);

      if (!user) {
        throw new Error('User not found');
      }

      if (!user.homeownerProfile) {
        // If a user does not have a homeowner profile, this will create a new homeownerProfile and add the new plot id to its plots array
        const homeownerProfile = new HomeownerProfile({ plots: [newPlot.id] });
        await homeownerProfile.save();
        console.log("Created new homeownerProfile:", homeownerProfile);

        // Then, it will update the user with this homeownerProfile id
        user.homeownerProfile = homeownerProfile.id;
      } else {
        // If a user already has a homeowner profile, this will find that profile
        const homeownerProfile = await HomeownerProfile.findById(user.homeownerProfile);
        // Then, it will add the new plot id to the homeownerProfile's plots array
        homeownerProfile.plots.push(newPlot.id);
        await homeownerProfile.save();
        console.log("Updated existing homeownerProfile:", homeownerProfile);
      }

      user.isHomeowner = true;
      await user.save();
      console.log("Updated user:", user);

      return newPlot;
    },



    editPlot: async (parent, { id, plotData }, context) => {
      // find a plot by ID and update it with new data.
      const updatedPlot = await Plot.findByIdAndUpdate(id, plotData, {
        new: true,
      });

      // if a userID was included in plotData, update the user's plots as well
      if (plotData.userId) {
        console.log(User.userId);
        // find the user and add the plot to their plots
        const user = await User.findById(plotData.userId);
        user.plots.push(updatedPlot.id); // Make sure to use the updated plot's ID here
        await user.save();
      }

      return updatedPlot;
    },

    // delete a plot
    deletePlot: async (parent, { id }) => {
      // Find the plot by ID
      const plot = await Plot.findById(id);
      if (!plot) {
        throw new Error("Plot not found");
      }

      // If the plot has a userId, find the user and remove the plot from their plots
      if (plot.userId) {
        const user = await User.findById(plot.userId); // Find the user
        if (user) {
          // If the user was found...
          user.plots = user.plots.filter((plotId) => !plotId.equals(id)); // Remove the plot's ID from the user's plots array
          await user.save(); // Save the user
        }
      }

      // Delete the plot
      await Plot.findByIdAndRemove(id);

      // Return the ID of the deleted plot
      return id;
    },

  },
};

module.exports = plotResolvers;
