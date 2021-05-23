const { gql } = require("apollo-server");

module.exports = gql`

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
    image:String!
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


  input InCargo{
    id:String!
    price:String!
    name: String!,
    image: String!,
  }
  input InCargoTicket{
    number:String!
    product:InCargo!
  }



  type Bill{
    id:ID!
    total:String!
    date:String!
    user:User!
    pay:Payment!
    cargoTicket:[CargoTicket]!
  }
  type CargoTicket{
   number:String!,
   product:Product,
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
    getProducts:[Product]
    getMyBills:[Bill]
    
  }

  type Mutation {
    register(registerInput: RegisterInput): UserResponse!
    login(username:String!,password:String!):UserResponse!
    createBill(ticket:[InCargoTicket],pay:String):Boolean!
  }
 
`;
