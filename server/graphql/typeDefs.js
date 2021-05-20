const { gql } = require("apollo-server");

module.exports = gql `

  type User {
    id: ID
    email: String
    token: String
    username: String
    createdAt: String
    phoneNumber:String
    dateOfBirth:String
    location:String
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type UserResponse {
    error: [FieldError]
    user: User
  }


  type Product{
    id:ID!
    name:String!
    price:String!
    producer:Producer!
    type:ProductType!
    amount:String!
  }
  type Producer{
    id:ID!
    name:String!
  }
  type ProductType{
    id:ID!
    name:String!
  }
  type Warehouse{
    id:ID!
    products:[Product]
  }



  type Bill{
    id:ID!
    total:String!
    date:String!
    user:User!
    pay:Payment!

  }
  type Payment{
    id:ID!
    name:String!
  }




  type FieldError {
    field: String!
    message: String!
  }

  type Query {
    getUsers:[User]
  }

  type Mutation {
    register(registerInput: RegisterInput): UserResponse!
  }
 
`;


