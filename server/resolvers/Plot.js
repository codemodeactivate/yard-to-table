const { Plot } = require("../models/Plot");

const resolvers = {
  Query: {
    // get a single plot by ID
    plots: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Plot.find(params);
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
      return await Plot.findbyIdAndUpdate(id, rest, { new: true });
    },
    // delete a plot by ID
    deletePlot: async (parent, args) => {
      return await Plot.findByIdAndRemove(id);
    },
  },
};

module.exports = resolvers;
