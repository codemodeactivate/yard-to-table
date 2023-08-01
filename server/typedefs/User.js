const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        address: String
        isGardener: Boolean
        isHomeowner: Boolean
        gardenerProfile: ID
        homeownerProfile: ID
        plots: [Plot]
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    extend type Query {
        getUser(id: ID!): User
        getUsers: [User]
    }

    extend type Mutation {
        addUser(
            firstName: String!,
            lastName: String!,
            username: String!,
            email: String!,
            password: String!,
            address: String,
            isGardener: Boolean,
            isHomeowner: Boolean,
            gardenerProfile: ID,
            homeownerProfile: ID
            plots: [ID]
        ): AuthPayload # Return the AuthPayload object that was created

        editUser(
            id: ID!,
            firstName: String,
            lastName: String,
            username: String,
            email: String,
            password: String,
            address: String,
            isGardener: Boolean,
            isHomeowner: Boolean,
            gardenerProfile: ID,
            homeownerProfile: ID
            plots: [ID]
        ): User

        deleteUser(id: ID!): DeletionResponse!
    }

    type DeletionResponse {
      success: Boolean!
      message: String
      id: ID
    }
`;

module.exports = userTypeDefs; 