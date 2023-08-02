const userResolvers = require('./User');
const plotResolvers = require('./Plot');
//const jobResolvers = require('./Jobs');
// const profileBuilderResolvers = require('./ProfileBuilder');
const jobResolvers = require('./Jobs');


// merge all of the resolver objects together

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...plotResolvers.Query,
        //...jobResolvers.Query,
        // ...profileBuilderResolvers.Query,
        ...jobResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...plotResolvers.Mutation,
        //...jobResolvers.Mutation,
        // ...profileBuilderResolvers.Mutation,
        ...jobResolvers.Mutation,
    },
};

module.exports = resolvers;
