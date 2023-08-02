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
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      user {
        id
        firstName
        lastName
        email
        # Add other fields as needed
      }
    }
  }
`;
