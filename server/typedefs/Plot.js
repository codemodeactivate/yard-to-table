const { gql } = require("apollo-server-express");

const plotTypeDefs = gql`
  type Plot {
    id: ID!
    name: String
    address: String
    sqft: Int
    category: String
    image: String
    userID: ID
  }

  input PlotInput {
    name: String
    address: String
    sqft: Int
    category: String
    image: String
    userID: ID
  }
  
  
  extend type Query {
    getPlot(id: ID!): Plot
    getPlots: [Plot]!
    getUserPlots (userID: ID!): [Plot]!
  }

  extend type Mutation {
    addPlot(plotData: PlotInput!): Plot
    editPlot(id: ID!, plotData: PlotInput): Plot
    deletePlot(id: ID!): Plot
  }
  
`;

module.exports = plotTypeDefs;
