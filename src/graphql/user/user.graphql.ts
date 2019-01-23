import { gql } from 'apollo-server-express';

export default gql`
  
  type Query {
    getAllUsers(page: Int, limit: Int): [User] @auth
    getUser(id: ID): User @auth
  }

  type Mutation {

    createUser(
      nome: String
      sobrenome: String
      idade: Int
      genero: String
      email: String
      senha: String
      cargo: String
      photoURI: String
      ativo: Boolean
    ): User @auth

    updateUser(
      id: ID
      nome: String
      sobrenome: String
      idade: Int
      genero: String
      email: String
      senha: String
      cargo: String
      photoURI: String
      ativo: Boolean
    ): User @auth

    deleteUser(id: ID): Boolean @auth
  }

  type User {
    id: ID
    nome: String
    sobrenome: String
    idade: Int
    genero: String
    email: String
    senha: String
    cargo: String
    photoURI: String
    ativo: Boolean
  }

`;