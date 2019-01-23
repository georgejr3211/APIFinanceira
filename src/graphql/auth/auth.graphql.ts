import { gql } from 'apollo-server-express';

export default gql`
  directive @auth on FIELD_DEFINITION

  type Mutation {
    getToken(email: String!, senha: String!): String
    onTokenValidate(token: String): Boolean
  }

`;