const { gql } = require('apollo-server-express');
const jobsTypeDefs = require('./Jobs');
const plotTypeDefs = require('./Plot');
const userTypeDefs = require('./User');
const  profileBuildertypeDefs  = require('./profileBuilder');
const gardenerTypeDefs = require('./Gardener');
const homeownerTypeDefs = require('./Homeowner');

const typeDefs = [
    jobsTypeDefs,
    plotTypeDefs,
    userTypeDefs,
    profileBuildertypeDefs,
    gardenerTypeDefs,
    homeownerTypeDefs
]

module.exports = typeDefs;
