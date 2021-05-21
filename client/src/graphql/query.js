import gql from "graphql-tag";

export const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      image
      price

      producer {
        id
        name
      }
      type {
        id
        name
      }
      amount
    }
  }
`;
