const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
type User {
    id: ID!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    address: String,
    zip: String,
    profilePic: String
    isGardener: Boolean,
    isHomeowner: Boolean,
    gardenerProfile: GardenerProfile, # Reference to GardenerProfile type
    homeownerProfile: HomeownerProfile # You might also create a HomeownerProfile type

}

type HomeownerProfile {
    plots: [ID]
}

type GardenerProfile {
    yearsExperience: Int
    specialty: [String] # Array of strings
    areaServed: [String] # Array of strings
    ## storing rating directly since it will be read
    ## more often than it will be updated
    rating: Float,
    costTier: CostTier
}



enum CostTier {
    TIER1      # Represents $10-$30
    TIER2     # Represents $31-$60
    TIER3    # Represents $61-$100
    TIER4   # Represents $101+
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

type Query {
    getUser(id: ID): User
    getUsers(isGardener: Boolean, firstName: String, lastName: String, address: String): [User]
}

input signUpInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
}

type Mutation {
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
