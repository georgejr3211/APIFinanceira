import { gql } from 'apollo-server-express';

export default gql`
  
  type Query {
    getAllMovimentacoes(page: Int, limit: Int): [Movimentacao] @auth
    getAllMovimentacoesByUser(id: Int, page: Int, limit: Int): [Movimentacao] @auth
    getMovimentacao(id: ID): Movimentacao @auth
    getMovimentacaoBySituacao(situacao: String, page: Int, limit: Int): [Movimentacao] @auth
    getMovimentacaoByTipo(tipo: String, page: Int, limit: Int): [Movimentacao] @auth
    getTotalReceita: Float @auth
    getTotalDespesa: Float @auth
  }

  type Mutation {

    createMovimentacao(
      idUsuario: Int
      tipo: String
      descricao: String
      preco: Float
      situacao: String
    ): Movimentacao @auth

    updateMovimentacao(
      id: ID
      tipo: String
      descricao: String
      preco: Float
      situacao: String
    ): Movimentacao @auth

    deleteMovimentacao(id: ID): Boolean @auth
  }

  type Movimentacao {
    id: ID
    tipo: String
    descricao: String
    preco: Float
    situacao: String
    user: User
    created_at: String
    updated_at: String
  }

`;