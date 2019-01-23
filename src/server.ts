import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import schema from './graphql/index';

dotenv.config();

createConnection().then(() => console.log('Connected on database'));

const app = express();

app.use(helmet({
  ieNoOpen: true
}));

app.use(compression());

const port = 4000 || process.env.PORT;
const playground = process.env.NODE_ENV === 'development';

const graphqlServer = new ApolloServer({
  playground,
  schema: schema,
  context: (({ req }: { req: express.Request }) => {
    return { token: req.get('x-access-token') };
  })
});

graphqlServer.applyMiddleware({ app });

app.listen(port, () => console.log('Connected on server at port', port));