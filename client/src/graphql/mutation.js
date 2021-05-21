import gql from "graphql-tag";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      error {
        field
        message
      }
      user {
        id
        username
        token
        createdAt
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      error {
        field
        message
      }
      user {
        id
        email
        token
        username
        createdAt
      }
    }
  }
`;
