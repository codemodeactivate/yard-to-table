import gql from 'graphql-tag';

export const SAVE_FORM_DATA_MUTATION = gql`
  mutation SaveFormData($input: SaveFormDataInput!) {
    saveFormData(input: $input) {
      success
      message
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      _id
      firstName
      lastName
      address
      isGardener
    }
  }
`;

export const ADD_NEW_PLOT_MUTATION = gql`
  mutation AddNewPlot($input: AddNewPlotInput!) {
    addNewPlot(input: $input) {
      success
      message
    }
  }
`;

export const GET_PLOTS = gql`
  query GetPlots {
    getPlots {
      _id
      name
      address
      sqft
      category
      image
    }
  }
`;

export const ADD_PLOT = gql`
  mutation AddPlot($plotData: PlotInput!) {
    addPlot(plotData: $plotData) {
      _id
      name
      address
      sqft
      category
      image
    }
  }
`;

export const EDIT_PLOT = gql`
  mutation EditPlot($id: ID!, $plotData: PlotInput) {
    editPlot(id: $id, plotData: $plotData) {
      _id
      name
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
  }
}
`;

