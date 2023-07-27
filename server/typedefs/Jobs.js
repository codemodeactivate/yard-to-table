const { gql } = require('apollo-server-express');

const jobTypeDefs = gql`
    type Job {
        _id: ID!
        title: String!
        description: String
        dateRequested: String!
        homeowner: User
        gardener: User
        plot: Plot
        status: String
    }
    type Query {
        jobs: [Job]
        job(id: ID!) : Job
    }
    type Mutation {
        addJob(title: String!, description: String, dateRequested: String!, homeowner: ID!, gardener: ID!, plot: ID!, status: String!): Job
        updateJob(jobId: ID!, status: String!): Job
        deleteJob(jobId: ID!): Job
    }
`;

modeule.exports = jobTypeDefs;