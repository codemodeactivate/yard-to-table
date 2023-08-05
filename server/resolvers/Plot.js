const Plot = require("../models/Plot");
const { User } = require("../models/User");

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
 addPlot: async (parent, { plotData }, context) => {
  // Log the plotData argument to see what's being passed to the resolver
  console.log("Received plotData:", plotData);

  // Create the new plot and log the result to see what's being returned from the database
  const newPlot = await Plot.create(plotData);
  console.log("New plot created:", newPlot);

  // Then, update the User document with the new plot ID
  const userUpdateResult = await User.findOneAndUpdate(
    { _id: plotData.userID },
    { $push: { plots: newPlot.id } },
    { new: true }
  );
  console.log("User update result:", userUpdateResult);

  return newPlot;
},

editPlot: async (parent, { id, plotData }, context) => {
  // find a plot by ID and update it with new data.
  const updatedPlot = await Plot.findByIdAndUpdate(id, plotData, { new: true });

  // if a userID was included in plotData, update the user's plots as well
  if (plotData.userId) {
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
        throw new Error('Plot not found');
      }
    
      // If the plot has a userId, find the user and remove the plot from their plots
      if (plot.userId) {
        const user = await User.findById(plot.userId); // Find the user
        if (user) { // If the user was found...
          user.plots = user.plots.filter // Filter the user's plots array to remove the plot ID
          (plotId => !plotId.equals(id)); // Remove the plot's ID from the user's plots array
          await user.save(); // Save the user
        }
      }
    
      // Delete the plot
      return await Plot.findByIdAndRemove(id);
    },
  },
};

module.exports = plotResolvers;
