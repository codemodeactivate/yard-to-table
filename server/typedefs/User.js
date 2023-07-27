//comment
const { gql } = require('apollo-server-express');

const User = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        email: String!
        address: String!
        isGardener: Boolean!
        isHomeowner: Boolean!
        gardenerProfile: GardenerProfile
        homeownerProfile: HomeownerProfile
    }

    type: GardenerProfile {
        experience: Int
        areasServed: [String]
        specialties: [String]
        rating: Float
        # more fields as needed...
    }

    type HomeownerProfile {
        gardenType: String
        plots: [Plot]
        # more fields as needed...
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
            isGardener: Boolean!, #
            isHomeowner: Boolean!,
            gardenerProfile: ID,
            homeownerProfile: ID,
        ): User # return the user object that was created
    )
`;

module.exports = User;
