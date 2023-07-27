const { gql } = require('apollo-server-express');

const reviewTypeDefs = gql`
  type Review {
    _id: ID!
    number: Number!
  }

  type Query {
    review(id: ID!): Review
    reviews: [Review]!
  }

  type Mutation {
    createReview(type: Review) : Review
    update Review(id: ID!, type: Review): Review
  }
`;

module.exports = reviewTypeDefs;
