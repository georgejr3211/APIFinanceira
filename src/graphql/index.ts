import { AuthDirective } from './auth/auth.directive';
import { makeExecutableSchema } from 'apollo-server-express';
import { mergeResolvers, mergeTypes, fileLoader } from 'merge-graphql-schemas';

const allTypeDefs = fileLoader(__dirname + '/**/*.graphql.*');
const allResolvers = fileLoader(__dirname + '/**/*.resolver.*');

const typeDefs = mergeTypes(allTypeDefs);
const resolvers = mergeResolvers(allResolvers);

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    auth: AuthDirective
  }
});