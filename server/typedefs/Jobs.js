const { gql } = require("apollo-server-express");

const jobsTypeDefs = gql`
  type Job {
    _id: ID!
    title: String!
    description: String
    dateRequested: String!
    homeowner: ID
    gardener: ID
    plot: ID
    status: String
  }
  type Query {
    getJobs: [Job]
    getJob(id: ID!): Job
  }
  type Mutation {
    addJob(
      title: String!
      description: String
      dateRequested: String!
      homeowner: ID!
      gardener: ID!
      plot: ID!
      status: String!
    ): Job
    editJob(
      jobId: ID!
      title: String
      description: String
      dateRequested: String
      homeowner: ID
      gardener: ID
      plot: ID
      status: String
    ): Job
    updateJob(jobId: ID!, status: String!): Job
    deleteJob(jobId: ID!): Job
  }
`;

module.exports = jobsTypeDefs;
