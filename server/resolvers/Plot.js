const Plot = require("../models/Plot");

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
    addPlot: async (parent, args) => {
      return await Plot.create(args);
    },
    editPlot: async (parent, { id, ...rest }, context) => {
      //find a user by ID and update it with new data.
      //option {new: true} returns updated data
      return await Plot.findByIdAndUpdate(id, rest, { new: true });
    },
    // delete a plot by ID
    deletePlot: async (parent, { id }) => {
      return await Plot.findByIdAndRemove(id);
    },
  },
};

module.exports = plotResolvers;
