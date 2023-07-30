const { gql } = require('apollo-server-express');

const profileBuilderTypeDefs = gql`

type Profile {
    id: ID!
    user: ID!
    step1: ProfileStep1
    step2: ProfileStep2
    # Add other steps if needed
    isCompleted: Boolean! # this will be used to determine if the user has completed the profile builder
}

type ProfileStep1 {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
}

type ProfileStep2 {
    plotName: String
    zip: String
    streetAddress: String
    lotSquareFootage: String
    plotType: String
    plotPicture: String
    # Add other fields if needed
}

input Step1Input {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
}

input Step3Input {
    plotName: String
    zip: String
    streetAddress: String
    lotSquareFootage: String
    plotType: String
    plotPicture: String
    # Add other fields if needed
}

# Repeat for other steps if needed

type Mutation {
    createProfileStep1(input: Step1Input!): Profile!
    updateProfileStep1(input: Step1Input!): Profile!
    createProfileStep3(input: Step3Input!): Profile!
    updateProfileStep3(input: Step3Input!): Profile!
    # Add mutations for other steps if needed
    submitProfile: Profile!
    setProfileCompletedStatus(id: ID!, isCompleted: Boolean!): Profile!
}

type Query {
    getProfile(id: ID!): Profile
    getNonCompletedProfiles: [Profile]!
}


`;

module.exports = profileBuilderTypeDefs;
