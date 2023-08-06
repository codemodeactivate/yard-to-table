import gql from "graphql-tag";

export const SAVE_FORM_DATA_MUTATION = gql`
  mutation SaveFormData($input: SaveFormDataInput!) {
    saveFormData(input: $input) {
      success
      message
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      firstName
      lastName
      email
      address
      isGardener
      isHomeowner
      profilePic
      gardenerProfile {
        bio
        rating
        yearsExperience
        cost
        specialty
      }
  }
  }`


export const CREATE_GARDENER_PROFILE = gql`
  mutation createGardenerProfile($input: GardenerProfileInput!) {
    createGardenerProfile(input: $input) {
      yearsExperience
      specialty
      areaServed
      cost
      bio
      photo
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($isGardener: Boolean, $firstName: String) {
    getUsers(isGardener: $isGardener, firstName: $firstName) {
      id
      firstName
      lastName
      address
      isGardener
      profilePic
      gardenerProfile {
        bio
        rating
        yearsExperience
        cost
        specialty
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      firstName
      lastName
      address
      isGardener
      profilePic
      gardenerProfile {
        bio
        rating
        yearsExperience
        cost
        specialty
      }
    }
  }
`;

export const ADD_PLOT = gql`
  mutation AddPlot($plotData: PlotInput!) {
    addPlot(plotData: $plotData) {
      id
      name
      zip
      address
      sqft
      category
      image
      userID
    }
  }
`;

export const EDIT_PLOT = gql`
  mutation EditPlot($id: ID!, $plotData: PlotInput) {
    editPlot(id: $id, plotData: $plotData) {
      id
      name
      zip
      address
      sqft
      category
      image
    }
  }
`;

export const DELETE_PLOT = gql`
  mutation DeletePlot($id: ID!) {
    deletePlot(id: $id)
  }
`;

export const GET_ALL_GARDENERS = gql`
  query GetAllGardeners {
    getAllGardeners {
      id
      firstName
      lastName
      profilePic
      gardenerProfile {
        yearsExperience
        specialty
        areaServed
        rating
        cost
        bio
      }
    }
  }
`;

export const GET_PLOTS = gql`
  query GetPlots {
    getPlots {
      id
      name
      zip
      address
      sqft
      category
      image
    }
  }
`;

export const SIGN_UP_MUTATION = gql`
  mutation signUp($input: signUpInput!) {
    signUp(input: $input) {
      firstName
      lastName
      email
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

export const GET_JOBS = gql`
  query GetJobs {
    getJobs {
      _id
      homeowner
      gardener
      plot
    }
  }`;

export const DELETE_JOB_MUTATOIN = gql`
  mutation DeleteJob($id: ID!) {
    deleteJob(id: $id) {
      id
    }
  }
`;


export const GET_HOMEOWNERS = gql`
  query getAllHomeowners {
    getAllHomeowners {
      id
      firstName
      lastName
    }
  }`;
