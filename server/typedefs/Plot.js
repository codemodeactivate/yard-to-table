const { gql } = require("apollo-server-express");

const plotTypeDefs = gql`
  type Plot {
    _id: ID!
    name: String!
    address: String
    sqft: Int
    category: String!
    image: String
  
  }

  extend type Query {
    getPlot(id: ID!): Plot
    getPlots: [Plot]!
  }

  extend type Mutation {
    addPlot(
      name: String!
      address: String!
      sqft: Int!
      category: String!
      image: String
    
    ): Plot
    editPlot(
      _id: ID!
      name: String
      address: String
      sqft: Int
      category: String
      image: String
     
    ): Plot
    deletePlot(id: ID!): Plot
  }
`;

module.exports = plotTypeDefs;
