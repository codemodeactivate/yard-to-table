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
    billing: Billing

}

type HomeownerProfile {
    plots: [ID]
}

type GardenerProfile {
    id: ID!
    yearsExperience: Int
    specialty: [String] # Array of strings
    areaServed: [String] # Array of strings
    ## storing rating directly since it will be read
    ## more often than it will be updated
    rating: Float,
    cost: Int
    bio: String
    photo: String
}

input GardenerProfileInput {
    yearsExperience: Int
    specialty: [String]
    areaServed: [String]
    cost: Int
    bio: String
    photo: String
  }



enum CostTier {
    TIER1      # Represents $10-$30
    TIER2     # Represents $31-$60
    TIER3    # Represents $61-$100
    TIER4   # Represents $101+
}

type Billing {
    creditCardNumber: String
    expirationMonth: Int
    expriationYear: Int
    cardHolderName: String
    billingAddress: String
    country: String
    postalCode: String
    isDefault: Boolean
    lastFourDigits: String
    brand: String

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
    getAllGardeners: [User]
    getAllHomeowners: [User]
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

    addGardenerProfile(input: GardenerProfileInput!): GardenerProfile
    createGardenerProfile(input: GardenerProfileInput!): GardenerProfile

    deleteUser(id: ID!): DeletionResponse!

    login(email: String!, password: String!): AuthPayload

    logout: Boolean

    signUp(input: SignUpInput!): SignUpResponse!
    }
`;

module.exports = userTypeDefs;
