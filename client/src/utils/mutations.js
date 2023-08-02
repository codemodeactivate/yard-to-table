import gql from 'graphql-tag';

export const SAVE_FORM_DATA_MUTATION = gql`
  mutation SaveFormData($input: SaveFormDataInput!) {
    saveFormData(input: $input) {
      success
      message
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

