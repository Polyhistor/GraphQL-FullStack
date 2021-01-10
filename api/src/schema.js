// const { gql } = require('apollo-server')

// const typeDefs = gql`
//   enum PetType {
//     CAT
//     DOG
//   }

// type User {
//   id: ID!
//   username: String!
//   pets: [Pet]!
// }

// type Pet {
//   id: ID!
//   type: PetType!
//   name: String!
//   owner: User!
//   img: String!
//   createdAt: Int!
// }

// input NewPetInput {
//   name: String!
//   type: PetType!
// }

// input PetsInput {
//   type: PetType
// }

// type Query {
//   user: User!
//   pets(input: PetsInput): [Pet]!
//   pet(id: ID!): Pet!
// }

// type Mutation {
//   addPet(input: NewPetInput!): Pet!
// }
// `;

// module.exports = typeDefs

const { gql } = require('apollo-server');

const typeDefs = gql`
  union FootWear = Sneaker | Boot

  """
  Do things here that show up in auto-document
  """
  enum ShoeType {
    JORDAN
    NIKE
    ADIDAS
  }

  type User {
    id: ID!
    username: String!
    shoes: [Shoe]!
    pet: [Pet]!
  }

  type Pet {
    id: ID!
    createdAt: String!
    name: String!
    type: String!
    owner: User!
  }

  input PetInput {
    name: String
    type: String
  }

  # type Shoe {
  #   brand: String!
  #   size: Int!
  # }

  interface Shoe {
    brand: String!
    size: Int!
    user: User!
  }

  type Sneaker implements Shoe {
    brand: String!
    size: Int!
    user: User!
    sport: String
  }

  type Boot implements Shoe {
    brand: String!
    size: Int!
    user: User!
    hasGrips: Boolean
  }

  input ShoesInput {
    brand: String
    size: Int
  }

  input NewShoeInput {
    brand: ShoeType!
    size: Int!
  }

  type Query {
    pets(input: PetInput): [Pet]!
    pet(input: PetInput): Pet
    me: User!
    shoes(input: ShoesInput): [Shoe]!
  }

  type Mutation {
    newShoe(input: NewShoeInput!): Shoe!
    newPet(input: PetInput!): Pet
  }
`;

module.exports = typeDefs;
