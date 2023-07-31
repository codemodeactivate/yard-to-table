import gql from 'graphql-tag';

export const SAVE_FORM_DATA = gql`
  mutation SaveFormData($firstName: String!, $lastName: String!, $email: String!, $password: String!, $confirmPassword: String!, $zip: String) {
    saveFormData(firstName: $firstName, lastName: $lastName, email: $email, password: $password, confirmPassword: $confirmPassword, zip: $zip) {
      success
      message
    }
  }
`;
