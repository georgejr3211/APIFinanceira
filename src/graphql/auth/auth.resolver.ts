import { AuthController } from './auth.controller';

export default {

  Mutation: {
    getToken: (parent: any, args: any) => {
      return new AuthController().createToken(args);
    },
    onTokenValidate: (parent: any, args: any) => {
      return new AuthController().onTokenValidate(args);
    }
  }

}