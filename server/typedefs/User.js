const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        address: String!
        isGardener: Boolean!
        isHomeowner: Boolean!
        gardenerProfile: ID
        homeownerProfile: ID
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
            address: String!,
            isGardener: Boolean!,
            isHomeowner: Boolean!,
            gardenerProfile: ID,
            homeownerProfile: ID
        ): User # return the user object that was created

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

        deleteUser(
            id: ID!
        ): User
    }
`;

module.exports = userTypeDefs;
