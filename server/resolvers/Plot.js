const Plot = require("../models/Plot");
const User = require("../models/User");

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
    addPlot: async (parent, { userID, ...args}) => {
      const plot = await Plot.create( {userID, ...args}); //create plot with provided arguments, including userID
      await User.updateOne({ _id: userID }, { $push: { plots: plot.id } }); //add plot to user's plots array
      return plot; // return plot
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
