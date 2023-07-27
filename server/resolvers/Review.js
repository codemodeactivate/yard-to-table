const { Review } = require("../models/Review");

const resolvers = {
  Query: {
    // get a single review by ID
    reviews: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Review.find(params);
    },
  },
  Mutation: {
    // create a review
    addReview: async (parent, args) => {
      return await Review.create(args);
    },
    editReview: async (parent, { id, ...rest }, context) => {
      //find a review by ID and update it with new data.
      //option {new: true} returns updated data
      return await Review.findbyIdAndUpdate(id, rest, { new: true });
    },
    // delete a review by ID
    deleteReview: async (parent, args) => {
      return await Review.findByIdAndRemove(id);
    },
  },
};

module.exports = resolvers;
