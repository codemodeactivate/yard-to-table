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
    gardenType: String
    photo: String
    # Add other fields if needed
}

input SaveFormDataInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
  confirmPassword: String!
  zip: String
  address: String
  isGardener: Boolean
  isHomeowner: Boolean
  plotName: String   # Add the missing fields
  streetAddress: String   # Add the missing fields
  lotSquareFootage: String   # Add the missing fields
  gardenType: String   # Add the missing fields
  photo: String   # Add the missing fields (if you're passing a file URL, use String)
  }


type SaveFormDataResponse {
    success: Boolean!
    message: String!
    # You can include additional fields in the response if needed
}

type Mutation {
    createOrUpdateStep1(input: Step1Input!): Profile
    createOrUpdateStep3(input: Step3Input!): Profile
    saveFormData(input: SaveFormDataInput!): SaveFormDataResponse!
    # Add more mutations for each step as needed
    submitProfile: Profile
}

type Query {
    getProfile(id: ID): Profile
    getNonCompletedProfiles: [Profile]!
}

`;

module.exports = profileBuilderTypeDefs;
