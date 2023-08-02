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
    // Get all plots for a specific user
getUserPlots: async (parent, args, context) => {
  return await Plot.find({ userID: user.id });
   

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
    { id: plotData.userID },
    { $push: { plots: newPlot.id } }
  );
  console.log("User update result:", userUpdateResult);

  return newPlot;
},

    editPlot: async (parent, { id, ...rest }, context) => {
      // find a plot by ID and update it with new data.
      const plot = await Plot.findByIdAndUpdate(id, rest, { new: true });
  
      // if a userID was included in ...rest, update the user's plots as well
      if (rest.userId) {
          // find the user and add the plot to their plots
          const user = await User.findById(rest.userId);
          user.plots.push(plot.id);
          await user.save();
      }
  
      return plot;
  },
  
    // delete a plot by ID
    deletePlot: async (parent, { id }) => {
      return await Plot.findByIdAndRemove(id);
    },
  },
};

module.exports = plotResolvers;
