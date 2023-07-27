const { Jobs } = require("../models");

const JobsResolver = {
  Query: {
    // Get all jobs
    getJobs: async (parent, args, context) => {
      return await Jobs.find({});
    },
    // Get a single job by ID
    getJob: async (parent, { id }, context) => {
      return await Jobs.findById(id);
    },
  },

  Mutation: {
    // Add a new job
    addJob: async (parent, args, context) => {
      const job = await Jobs.create(args);
      return job;
    },

    // Edit a job
    editJob: async (parent, { id, ...rest }, context) => {
      const job = await Jobs.create(id, rest, { new: true });
      return job;
    },

    // Delete a job
    deleteJob: async (parent, { id }, context) => {
      return await Jobs.findByIdAndRemove(id);
    },
  },
};

module.exports = JobsResolver;
