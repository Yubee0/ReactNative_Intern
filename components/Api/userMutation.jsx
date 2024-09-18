import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($userInfo: UserRegistrationInput!) {
    createUser(input: { userInfo: $userInfo }) {
      errors
      message
    }
  }
`;

export const USER_SESSION_MUTATION = gql`
  mutation UserSession($sessionInfo: UserSessionInput!) {
    userSession(input: { sessionInfo: $sessionInfo }) {
      user {
        id
        name
        email
        roles
      }
      token
      errors
    }
  }
`;
