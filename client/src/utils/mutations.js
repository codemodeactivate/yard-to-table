import gql from 'graphql-tag';

export const SAVE_FORM_DATA_MUTATION = gql`
  mutation SaveFormData($input: SaveFormDataInput!) {
    saveFormData(input: $input) {
      success
      message
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
