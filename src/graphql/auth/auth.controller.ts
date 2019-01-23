import { User } from '../../models/user';
import { validate } from 'class-validator';
import { ApolloError } from 'apollo-server-core';
import * as crypto from 'crypto-js';
import * as jwt from 'jsonwebtoken';

export class AuthController {

  constructor() { }

  async createToken(payload: User) {

    const email = payload.email;
    const senha = payload.senha;

    const apiSecret = process.env.API_SECRET as string; 
    const tokenTime = process.env.TOKEN_TIME as string;

    const findUser: User = await User.findOne({ email: email });

    if (!findUser) throw new ApolloError('USUÁRIO NÃO ENCONTRADO');
    
    const decode = crypto.AES.decrypt(findUser.senha, apiSecret).toString(crypto.enc.Utf8);

    if (decode !== senha) throw new ApolloError('Usuário/Senha inválido');

    const token = await jwt.sign({findUser}, apiSecret, { expiresIn: tokenTime });

    return token;

  }

  async onTokenValidate(payload: any) {

    const token = payload.token;
    const apiSecret = process.env.API_SECRET as string; 

    const tokenJWTCompare: any = jwt.verify(token, apiSecret, (err: any, decoded: any) => decoded);

    if (!tokenJWTCompare) return false;

    const user = await User.find({ id: tokenJWTCompare.id });

    if (!user) return false;

    return true;

  }

}