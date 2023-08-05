const { Jobs } = require("../models");

const JobsResolver = {
  Query: {
    // Get all jobs
    getJobs: async (parent, args, context) => {
      const jobs = await Jobs.find({});
      console.log("Jobs Resolver Get Jobs - SERVER GET JOBS: ", jobs);
      return jobs;
    },
    // Get a single job by ID
    getJob: async (parent, { id }, context) => {
      return await Jobs.findById(id);
    },
  },

  Mutation: {
    // Add a new job
    addJob: async (parent, args, context) => {
      const job = new Jobs(args);
      await job.save();
      return job;
    },

    // Edit a job
    editJob: async (parent, { id, ...rest }, context) => {
      const job = await Jobs.findByIdAndUpdate(id, rest, { new: true });
      return job;
    },

    // Delete a job
    deleteJob: async (parent, { id }, context) => {
      return await Jobs.findByIdAndRemove(id);
    },
  },
};

module.exports = JobsResolver;
