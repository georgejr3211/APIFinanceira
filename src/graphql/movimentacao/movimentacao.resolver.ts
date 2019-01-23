import { Movimentacao } from '../../models/movimentacao';
import { MovimentacaoController } from './movimentacao.controller';

export default {

  Query: {
    
    getAllMovimentacoes: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().getAllResources(args);
    },

    getAllMovimentacoesByUser: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().getAllMovimentacoesByUser(args);
    },

    getMovimentacaoBySituacao: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().getMovimentacaoBySituacao(args);
    },

    getMovimentacaoByTipo: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().getMovimentacaoByTipo(args);
    },

    getTotalReceita: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().getTotalReceita();
    },

    getTotalDespesa: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().getTotalDespesa();
    },

    getMovimentacao: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().getResource(args);
    }
  },

  Mutation: {

    createMovimentacao: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().createResource(args);
    },

    updateMovimentacao: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().updateResource(args);
    },

    deleteMovimentacao: (parent: Movimentacao, args: any) => {
      return new MovimentacaoController().deleteResource(args);
    }
  }

}