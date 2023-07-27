const { gql } = require('apollo-server-express');

const plotTypeDefs = gql`
  type Plot {
    _id: ID!
    name: String!
    sqft: Int
    category: String!
    image: String
    user:
  }

  type Query {
    plot(id: ID!): Plot
    plots: [Plot]!
  }

  type Mutation {
    addPlot(name: String!, sqft: Int, category: String!, image: String, user: ID): Plot
    editPlot(id: ID!, name: String, sqft: Int, category: String, image: String, user: ID): Plot
    deletePlot(id: ID!): Plot
    addPlot(
      address: String!,
      name: String,
      sqft: Int,
      category: [String],
      image: [String],
      userId: ID!
  ): Plot
  }
`;

module.exports = plotTypeDefs;
