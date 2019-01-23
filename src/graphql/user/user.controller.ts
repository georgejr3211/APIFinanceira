import { User } from './../../models/user';
import { validate } from 'class-validator';
import * as crypto from 'crypto-js';
import { ApolloError } from 'apollo-server-core';

export class UserController {

  constructor() { }

  async getAllResources(args: any) {

    let page = 0;
    let limit = 10;
    
    if (args) {
      page = args.page;
      limit = args.limit;  
    }
    
    const resources = await User.createQueryBuilder('user')
                     .orderBy('id', 'DESC')
                     .take(limit)
                     .skip(page)
                     .getMany();

    return resources;

  }

  async getResource(args: any) {

    const { id } = args;
    
    const resource = await User.findOne({ id });

    return resource;
  }


  async createResource(payload: User) {

    const compareUser = await User.find({ email: payload.email });

    if (compareUser.length) throw new ApolloError('Email já cadastrado');

    const apiSecret = process.env.API_SECRET as string; 
    const hash = crypto.AES.encrypt(payload.senha, apiSecret).toString()

    payload.senha = hash;

    const user = new User();
    user.nome = payload.nome;
    user.sobrenome = payload.sobrenome;
    user.idade = payload.idade;
    user.photoURI = payload.photoURI;
    user.senha = payload.senha;
    user.cargo = payload.cargo;
    user.genero = payload.genero;
    user.email = payload.email;
    user.ativo = payload.ativo;

    const canValidate = await this.onValidate(user);

    if (canValidate.length) {
      throw new ApolloError(canValidate.toString());
    }

    return User.save(user);
  }

  async updateResource(payload: User) {

    const apiSecret = process.env.API_SECRET as string; 
    const hash = crypto.AES.encrypt(payload.senha, apiSecret).toString()

    payload.senha = hash;

    const user: User = await User.findOne({ id: payload.id });
    user.nome = payload.nome;
    user.sobrenome = payload.sobrenome;
    user.idade = payload.idade;
    user.photoURI = payload.photoURI;
    user.senha = payload.senha;
    user.cargo = payload.cargo;
    user.genero = payload.genero;
    user.email = payload.email;
    user.ativo = payload.ativo;

    const canValidate = await this.onValidate(user);

    if (canValidate.length) {
      throw new ApolloError(canValidate.toString());
    }

    return user.save();
  }

  async deleteResource(args: any) {

    const { id } = args;

    const user: User = await User.findOne({ id });
    
    if (!user) {
      throw new ApolloError('Usuário não encontrado');
    }

    const resource = await user.remove();

    if (resource) return true;

    return false;
  }

  async onValidate(payload: User) {
    const errors = await validate(payload);
    return errors;
  }
}