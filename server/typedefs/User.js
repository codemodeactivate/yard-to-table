const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        password: String!
        email: String!
        # Add other fields related to the user
    }

    type SaveFormDataResponse {
        token: String!
        user: User!
    }

    type SignUpResponse {
        firstName: String!
        lastName: String!
        email: String!
        token: String!
    }

    type AuthPayload {
        token: String
        user: User
    }

    type DeletionResponse {
        success: Boolean
        message: String
        id: ID
    }

    extend type Query {
        getUser(id: ID): User
        getUsers: [User]
    }

    input signUpInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }

    extend type Mutation {
        addUser(
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
            plots: [ID]
        ): AuthPayload # Return the AuthPayload object that was created

        editUser(
            id: ID,
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
            plots: [ID]
        ): User

        signUp(input: signUpInput!): SignUpResponse!

        deleteUser(id: ID!): DeletionResponse!

        login(email: String!, password: String!): AuthPayload

        logout: Boolean

        signUp(input: SignUpInput!): SignUpResponse!
    }
`;

module.exports = userTypeDefs;
