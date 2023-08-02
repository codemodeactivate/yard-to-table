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
    addPlot: async (parent, { name, address, sqft, category, image, userID }) => {
      const newPlot = await Plot.create({ name, address, sqft, category, image, userID }); //create plot with provided arguments, including userID
       // Then, update the User document with the new plot ID
       await User.findOneAndUpdate(
        { id: userID },
        { $push: { plots: newPlot.id } }
      );

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
