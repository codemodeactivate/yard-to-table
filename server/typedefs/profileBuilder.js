const { gql } = require('apollo-server-express');

const profileBuilderTypeDefs = gql`

type Profile {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
    isCompleted: Boolean! # this will be used to determine if the user has completed the profile builder
}





input ProfileInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    confirmPassword: String!
}

input Step1Input {
    # fields for step 1
    firstName: String!
    lastName: String!
  }

  type ProfileStep1 {
    # fields for profile step 1
    firstName: String!
    lastName: String!
  }

  input Step2Input {
    # fields for step 2
    email: String!
  }

  type ProfileStep2 {
    # fields for profile step 2
    email: String!
  }








type Mutation {
    createProfileStep1(input: Step1Input!): ProfileStep1!
    createProfileStep2(input: Step2Input!): ProfileStep2!
    updateProfileStep1(profile: StepInput!): ProfileStep1!
    updateProfileStep2(profile: Step2Input!): ProfileStep2!
    setProfileCompletedStatus(id: ID!, isCompleted: Boolean!): Profile!
}



type Query {
    getProfile(id: ID!): Profile
    getNonCompletedProfiles: [Profile]!
}
`;

module.exports = profileBuilderTypeDefs
