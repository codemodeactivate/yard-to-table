const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        zip: String
        address: String
        isGardener: Boolean
        isHomeowner: Boolean
        gardenerProfile: ID
        homeownerProfile: ID
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
            email: String!,
            password: String!,
            address: String,
            zip: String,
            isGardener: Boolean,
            isHomeowner: Boolean,
            gardenerProfile: ID,
            homeownerProfile: ID
        ): AuthPayload # Return the AuthPayload object that was created

        editUser(
            id: ID!,
            firstName: String,
            lastName: String,
            email: String,
            password: String,
            address: String,
            zip: String,
            isGardener: Boolean,
            isHomeowner: Boolean,
            gardenerProfile: ID,
            homeownerProfile: ID
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
