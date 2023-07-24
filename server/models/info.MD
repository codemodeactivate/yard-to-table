```graphql
type User {
  id: ID!
  name: String!
  username: String!
  email: String!
  password: String!   # This won't be exposed in actual queries due to security reasons
  address: String!
  isGardener: Boolean!
  isHomeowner: Boolean!
  gardenerProfile: Gardener
  homeownerProfile: Homeowner
}

type Gardener {
  experience: Int
  areasServed: [String]
  specialties: [String]
  rating: Float
  # more fields as needed...
}

type Homeowner {
  gardenType: String
  plots: [Plot]
  # more fields as needed...
}

type Plot {
  id: ID!
  size: String
  images: [String]
  # more fields as needed...
}

type Message {
  id: ID!
  sender: User!
  receiver: User!
  content: String!
  date: String!
}

type Review {
  id: ID!
  reviewer: User!
  reviewee: User!
  content: String!
  rating: Float!
}
