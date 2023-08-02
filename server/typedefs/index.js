const { gql } = require('apollo-server-express');
const jobsTypeDefs = require('./Jobs');
const plotTypeDefs = require('./Plot');
const userTypeDefs = require('./User');
const  profileBuildertypeDefs  = require('./profileBuilder');


const typeDefs = [
    jobsTypeDefs,
    plotTypeDefs,
    userTypeDefs,
    profileBuildertypeDefs,

]

module.exports = typeDefs;
