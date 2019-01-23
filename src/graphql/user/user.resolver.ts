import { User } from './../../models/user';
import { UserController } from './user.controller';

export default {

  Query: {
    
    getAllUsers: (parent: User, args: any) => {
      return new UserController().getAllResources(args);
    },

    getUser: (parent: User, args: any) => {
      return new UserController().getResource(args);
    }
  },

  Mutation: {

    createUser: (parent: User, args: any) => {
      return new UserController().createResource(args);
    },

    updateUser: (parent: User, args: any) => {
      return new UserController().updateResource(args);
    },

    deleteUser: (parent: User, args: any) => {
      return new UserController().deleteResource(args);
    }
  }

}