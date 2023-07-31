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
    zip: String # Optional ZIP field
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

type MutationResponse {
    success: Boolean!
    message: String
}

input SaveFormDataInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
    zip: String
  }

  
type Mutation {
    createOrUpdateStep1(input: Step1Input!): Profile
    createOrUpdateStep3(input: Step3Input!): Profile
    saveFormData(input: Step1Input!): MutationResponse # Use the Step1Input type for saving the form data
    # Add more mutations for each step as needed
    submitProfile: Profile
}

type Query {
  getProfile(id: ID): Profile
  getNonCompletedProfiles: [Profile]!
}

`;

module.exports = profileBuilderTypeDefs;
