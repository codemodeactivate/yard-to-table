const { gql } = require('apollo-server-express');
const jobsTypeDefs = require('./Jobs');
const plotTypeDefs = require('./Plot');
const userTypeDefs = require('./User');

const typeDefs = [
    jobsTypeDefs,
    plotTypeDefs,
    userTypeDefs
]

module.exports = typeDefs;
