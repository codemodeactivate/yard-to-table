const { gql } = require('apollo-server-express');

const profileBuilderTypeDefs = gql`

type Profile {
    id: ID
    user: ID!
    step1: ProfileStep1
    step3: ProfileStep3
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

type ProfileStep3 {
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

# union StepInput = Step1Input | Step3Input

type Mutation {
    createOrUpdateStep1(input: Step1Input!): Profile
    createOrUpdateStep3(input: Step3Input!): Profile
    # Add more mutations for each step as needed
    submitProfile: Profile
}

type Query {
  getProfile(id: ID): Profile
  getNonCompletedProfiles: [Profile]!
}



`;

module.exports = profileBuilderTypeDefs;
