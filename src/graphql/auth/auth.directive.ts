import { ApolloError } from 'apollo-server-core';
import { AuthController } from './auth.controller';
import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';

export class AuthDirective extends SchemaDirectiveVisitor {

  visitFieldDefinition(field: any) {

    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function(...args: any) {
      const [, , { token }] = args;

      const auth = new AuthController();
      
      const isValid = await auth.onTokenValidate({token});

      if (!isValid) throw new ApolloError('Token inválido');

      const result = await resolve.apply(this, args);

      return result;

    }

  }

}