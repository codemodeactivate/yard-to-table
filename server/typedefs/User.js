const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
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
            name: String!,
            username: String!,
            email: String!,
            password: String!,
            address: String,
            isGardener: Boolean,
            isHomeowner: Boolean,
            gardenerProfile: ID,
            homeownerProfile: ID
        ): AuthPayload # Return the AuthPayload object that was created

        editUser(
            id: ID!,
            name: String,
            username: String,
            email: String,
            password: String,
            address: String,
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
