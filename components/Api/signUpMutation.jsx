import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($userInfo: UserRegistrationInput!) {
    createUser(input: { userInfo: $userInfo }) {
      errors
      message
    }
  }
`;
