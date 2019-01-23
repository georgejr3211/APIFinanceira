import { Movimentacao } from './../../models/movimentacao';
import { validate } from 'class-validator';
import { ApolloError } from 'apollo-server-core';

export class MovimentacaoController {

  constructor() { }

  async getAllResources(args: any) {

    let page = 0;
    let limit = 10;
    
    if (args) {
      page = args.page;
      limit = args.limit;  
    }
    
    const resources = await Movimentacao.createQueryBuilder('movimentacao')
                     .innerJoinAndSelect('movimentacao.user', 'user')
                     .orderBy('movimentacao.id', 'DESC')
                     .take(limit)
                     .skip(page)
                     .getMany();

    return resources;
  }

  async getAllMovimentacoesByUser(args: any) {
    
    let page = 0;
    let limit = 10;
    
    if (args) {
      page = args.page;
      limit = args.limit;  
    }
    
    const resources = await Movimentacao.createQueryBuilder('movimentacao')
                     .innerJoinAndSelect('movimentacao.user', 'user')
                     .where('user.id = :id', { id: args.id })
                     .orderBy('movimentacao.id', 'DESC')
                     .take(limit)
                     .skip(page)
                     .getMany();

    return resources;
  }

  async getResource(args: any) {

    const { id } = args;
    
    const resource = await Movimentacao.findOne({ id });

    return resource;
  }

  async getMovimentacaoBySituacao(args: any) {

    let page = 0;
    let limit = 10;
    
    if (args) {
      page = args.page;
      limit = args.limit;  
    }
    
    const resources = await Movimentacao.createQueryBuilder('movimentacao')
                     .orderBy('id', 'DESC')
                     .where('situacao = :situacao', { situacao: args.situacao })
                     .take(limit)
                     .skip(page)
                     .getMany();

    return resources;

  }

  async getMovimentacaoByTipo(args: any) {

    let page = 0;
    let limit = 10;
    
    if (args) {
      page = args.page;
      limit = args.limit;  
    }
    
    const resources = await Movimentacao.createQueryBuilder('movimentacao')
                     .orderBy('id', 'DESC')
                     .where('tipo = :tipo', { tipo: args.tipo })
                     .take(limit)
                     .skip(page)
                     .getMany();

    return resources;

  }

  async getTotalReceita() {
    
    const tipo = 'RECEITA';
    const resource = await Movimentacao.createQueryBuilder('movimentacao')
                     .select('SUM(preco)', 'total')
                     .where('tipo = :tipo', { tipo })
                     .getRawOne();

                     console.log(resource);

    return resource.total;
  }

  async getTotalDespesa() {
    
    const tipo = 'DESPESA';
    const resource = await Movimentacao.createQueryBuilder('movimentacao')
                     .select('SUM(preco)', 'total')
                     .where('tipo = :tipo', { tipo })
                     .getRawOne();

    return -1 * resource.total;
  }

  async createResource(payload: Movimentacao) {

    const compareMovimentacao = await Movimentacao.find({ descricao: payload.descricao });

    if (compareMovimentacao.length) throw new ApolloError('Produto já cadastrado');

    const movimentacao = new Movimentacao();
    movimentacao.descricao = payload.descricao;
    movimentacao.preco = payload.preco;
    movimentacao.tipo = payload.tipo;
    movimentacao.situacao = payload.situacao;

    const canValidate = await this.onValidate(movimentacao);

    if (canValidate.length) {
      throw new ApolloError(canValidate.toString());
    }

    return Movimentacao.save(movimentacao);
  }

  async updateResource(payload: Movimentacao) {

    const movimentacao: Movimentacao = await Movimentacao.findOne({ id: payload.id });
    movimentacao.preco = payload.preco;
    movimentacao.tipo = payload.tipo;
    movimentacao.situacao = payload.situacao;

    const canValidate = await this.onValidate(movimentacao);

    if (canValidate.length) {
      throw new ApolloError(canValidate.toString());
    }

    return movimentacao.save();
  }

  async deleteResource(args: any) {

    const { id } = args;

    const movimentacao: Movimentacao = await Movimentacao.findOne({ id });
    
    if (!movimentacao) {
      throw new ApolloError('Usuário não encontrado');
    }

    const resource = await movimentacao.remove();

    if (resource) return true;

    return false;
  }

  async onValidate(payload: Movimentacao) {
    const errors = await validate(payload);
    return errors;
  }
}