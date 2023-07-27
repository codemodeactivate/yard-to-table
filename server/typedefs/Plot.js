const { gql } = require('apollo-server-express');

const plotTypeDefs = gql`
  type Plot {
    _id: ID!
    name: String!
    sqft: Number
    category: String!
    image: String
    user: 
  }

  type Query {
    plot(id: ID!): Plot
    plots: [Plot]!
  }

  type Mutation {
    createPlot(type: Plot) : Plot
    update Plot(id: ID!, type: Plot): Plot
  }
`;

module.exports = plotTypeDefs;
