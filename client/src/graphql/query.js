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

export const GET_MY_BILLS = gql`
 query getMyBills{
  getMyBills{
    id
    user{
      username
    }
    date
    cargoTicket{
      number
      product{
        name
      }
    }
  }
}
`;
